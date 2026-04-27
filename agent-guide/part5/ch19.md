# 完整项目实战：构建 Slack 代码审查 Bot

## 项目目标

从零构建一个 Slack Bot：
- 在 Slack 频道中输入 `/review` 触发代码审查
- Bot 用 Agent SDK 编排 3 个 SubAgent 并行审查
- 审查结果自动发回 Slack 频道

## 技术栈

- TypeScript
- @anthropic-ai/claude-code（Agent SDK）
- @slack/bolt（Slack Bot 框架）
- Node.js 20

## 项目结构

```
slack-review-bot/
├── src/
│   ├── index.ts          # Slack Bot 入口
│   ├── agents/
│   │   ├── security.ts   # 安全审查 Agent
│   │   ├── perf.ts       # 性能审查 Agent
│   │   └── logic.ts      # 逻辑审查 Agent
│   ├── orchestrator.ts   # 编排器
│   └── formatter.ts      # 结果格式化
├── package.json
├── tsconfig.json
└── .env
```

## Step 1: 初始化项目

```bash
mkdir slack-review-bot && cd slack-review-bot
npm init -y
npm install @anthropic-ai/claude-code @slack/bolt
npm install -D typescript @types/node
```

## Step 2: 定义 Agents

```typescript
// src/agents/security.ts
import { createSubAgent } from '@anthropic-ai/claude-code';

export const securityAgent = createSubAgent({
  name: 'security-reviewer',
  model: 'claude-sonnet-4-6',
  systemPrompt: `你是安全审查专家。只关注安全问题：
- SQL 注入
- XSS
- 认证绕过
- 敏感信息泄露
- CSRF
输出 JSON 数组：[{"severity": "critical|high|medium", "file": "...", "line": N, "issue": "...", "fix": "..."}]
只输出 JSON，不要其他文字。`,
  tools: ['Read', 'Grep'],
  maxTokens: 50000,
});
```

```typescript
// src/agents/perf.ts
import { createSubAgent } from '@anthropic-ai/claude-code';

export const perfAgent = createSubAgent({
  name: 'perf-reviewer',
  model: 'claude-sonnet-4-6',
  systemPrompt: `你是性能优化专家。只关注性能问题：
- N+1 查询
- 缺失索引
- 不必要的计算
- 内存泄漏
- 缓存机会
输出同样的 JSON 格式。`,
  tools: ['Read', 'Grep'],
  maxTokens: 50000,
});
```

```typescript
// src/agents/logic.ts
import { createSubAgent } from '@anthropic-ai/claude-code';

export const logicAgent = createSubAgent({
  name: 'logic-reviewer',
  model: 'claude-sonnet-4-6',
  systemPrompt: `你是代码逻辑审查专家。关注：
- 边界情况未处理
- 逻辑错误
- 竞态条件
- 错误处理缺失
输出同样的 JSON 格式。`,
  tools: ['Read', 'Grep'],
  maxTokens: 50000,
});
```

## Step 3: 编排器

```typescript
// src/orchestrator.ts
import { securityAgent } from './agents/security';
import { perfAgent } from './agents/perf';
import { logicAgent } from './agents/logic';

interface ReviewIssue {
  severity: 'critical' | 'high' | 'medium';
  file: string;
  line: number;
  issue: string;
  fix: string;
  category: string;
}

export async function reviewCode(diff: string): Promise<ReviewIssue[]> {
  const prompt = `审查以下 git diff：\n\n${diff}`;

  // 并行执行三个 Agent
  const [secResult, perfResult, logicResult] = await Promise.all([
    securityAgent.run(prompt).catch(e => ({ output: '[]' })),
    perfAgent.run(prompt).catch(e => ({ output: '[]' })),
    logicAgent.run(prompt).catch(e => ({ output: '[]' })),
  ]);

  // 解析结果
  const parse = (output: string, category: string): ReviewIssue[] => {
    try {
      const issues = JSON.parse(output);
      return issues.map((i: any) => ({ ...i, category }));
    } catch {
      return [];
    }
  };

  const allIssues = [
    ...parse(secResult.output, '安全'),
    ...parse(perfResult.output, '性能'),
    ...parse(logicResult.output, '逻辑'),
  ];

  // 按严重度排序
  const order = { critical: 0, high: 1, medium: 2 };
  allIssues.sort((a, b) => order[a.severity] - order[b.severity]);

  return allIssues;
}
```

## Step 4: Slack Bot

```typescript
// src/index.ts
import { App } from '@slack/bolt';
import { execSync } from 'child_process';
import { reviewCode } from './orchestrator';
import { formatForSlack } from './formatter';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN!,
  signingSecret: process.env.SLACK_SIGNING_SECRET!,
});

// 响应 /review 命令
app.command('/review', async ({ command, ack, respond }) => {
  await ack();
  await respond('正在审查代码，请稍候...');

  try {
    // 获取最新的 diff
    const diff = execSync('git diff HEAD~1', {
      cwd: process.env.PROJECT_DIR,
    }).toString();

    if (!diff) {
      await respond('没有检测到代码改动。');
      return;
    }

    // 执行审查
    const issues = await reviewCode(diff);

    // 格式化并发送结果
    const message = formatForSlack(issues);
    await respond(message);
  } catch (error) {
    await respond(`审查失败: ${error.message}`);
  }
});

app.start(3000).then(() => {
  console.log('Review Bot is running on port 3000');
});
```

## Step 5: 格式化输出

```typescript
// src/formatter.ts
import { ReviewIssue } from './orchestrator';

export function formatForSlack(issues: ReviewIssue[]): string {
  if (issues.length === 0) {
    return '✅ 未发现问题，代码看起来不错！';
  }

  const critical = issues.filter(i => i.severity === 'critical');
  const high = issues.filter(i => i.severity === 'high');
  const medium = issues.filter(i => i.severity === 'medium');

  let msg = `*代码审查完成* — 发现 ${issues.length} 个问题\n`;
  msg += `🔴 Critical: ${critical.length} | 🟡 High: ${high.length} | 🔵 Medium: ${medium.length}\n\n`;

  for (const issue of issues) {
    const icon = issue.severity === 'critical' ? '����' : issue.severity === 'high' ? '🟡' : '🔵';
    msg += `${icon} *[${issue.category}]* \`${issue.file}:${issue.line}\`\n`;
    msg += `> ${issue.issue}\n`;
    msg += `> 💡 ${issue.fix}\n\n`;
  }

  return msg;
}
```

## Step 6: 部署

```bash
# .env
SLACK_BOT_TOKEN=xoxb-...
SLACK_SIGNING_SECRET=...
ANTHROPIC_API_KEY=sk-ant-...
PROJECT_DIR=/path/to/your/project
```

```bash
npm run build
npm start
```

## 成本估算

每次审查：
- 3 个 SubAgent × ~10K tokens（input）× $3/M = $0.09 input
- 3 个 SubAgent × ~2K tokens（output）× $15/M = $0.09 output
- **每次审查约 $0.18**

如果团队每天审查 10 次，月成本约 $40。
