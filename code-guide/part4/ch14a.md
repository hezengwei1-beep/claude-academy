# Skills 与 Subagent 模板扩展集

> 基于社区高星仓库（232+ Skills from claude-skills、100+ Subagents from VoltAgent）精选的实用模板。

## 工程类 Skills（25 个精选）

### 代码生成

```markdown
<!-- .claude/commands/scaffold.md -->
基于 $ARGUMENTS 生成项目脚手架：
1. 分析描述，确定技术栈
2. 创建目录结构
3. 生成配置文件（tsconfig/eslint/prettier）
4. 生成入口文件
5. 初始化 package.json
6. 不要安装依赖（让用户自己 npm install）
```

```markdown
<!-- .claude/commands/api-endpoint.md -->
为 $ARGUMENTS 创建 REST API 端点：
1. 创建路由文件
2. 创建 controller（输入验证 + 业务逻辑调用）
3. 创建 service（业务逻辑）
4. 创建类型定义
5. 创建测试文件（正常路径 + 错误路径）
6. 遵循项目现有的代码风格
```

```markdown
<!-- .claude/commands/component.md -->
创建 React 组件 $ARGUMENTS：
1. 创建组件文件（函数组件 + TypeScript）
2. 创建样式（如果项目用 Tailwind 则内联，否则 CSS Module）
3. 创建测试文件
4. 创建 Storybook story（如果项目有 Storybook）
5. 在 index.ts 中导出
```

### 代码质量

```markdown
<!-- .claude/commands/lint-fix.md -->
修复当前项目的所有 lint 错误：
1. 运行 npm run lint 查看所有错误
2. 按文件分组
3. 自动���复（eslint --fix）
4. 手动修复无法自动修复的
5. 再次运��� lint 确认全绿
6. 不要改变代码逻辑，只修格式和规范问题
```

```markdown
<!-- .claude/commands/type-fix.md -->
修复所有 TypeScript 类型错误：
1. 运行 npx tsc --noEmit
2. 按错误类型分组
3. 逐个修复（优先消除 any 类型）
4. 不要用 @ts-ignore 或 as any 绕过
5. 再次运行确认无错误
```

```markdown
<!-- .claude/commands/dead-code.md -->
找出并清理死代码：
1. ��索所有未导出且未在当前��件使用的函数
2. 搜索所有未使用的 import
3. 搜索所有注释掉的代码块（超过 5 行的）
4. 列出发现，等我确认后再删除
5. 不要删除测试文件中的代码
```

### Git 与协作

```markdown
<!-- .claude/commands/pr-desc.md -->
基于当前��支的改动生成 PR 描述：
1. git log main...HEAD --oneline
2. git diff main...HEAD --stat
3. 生成 PR 描述：
   ## Summary
   - bullet points 概述改动

   ## Changes
   - 按模块分组的详细改动

   ## Test Plan
   - 如何验证这些改动

   ## Screenshots
   （如���有 UI 改动标注"需要补充截图"）
```

```markdown
<!-- .claude/commands/release-notes.md -->
生成版本发布说明：
1. git log v$ARGUMENTS...HEAD
2. 分类整理：Features / Fixes / Breaking Changes / Other
3. 格式：用户友好的语言（不是 commit message 的直译）
4. 标注 breaking changes 的迁移方法
```

### 调试与分析

```markdown
<!-- .claude/commands/profile.md -->
对 $ARGUMENTS 做性能分析：
1. 识别关键路径
2. 分析时间复杂度
3. 检查数据库查询（N+1？缺索引？）
4. 检查内存使用模式
5. 给出优化建议和预期提升
```

```markdown
<!-- .claude/commands/deps-audit.md -->
全面审计项目依赖：
1. npm audit（安全漏洞）
2. npm outdated（过期包��
3. 分析 bundle size 贡献（哪些包最大）
4. 检查是否有废弃的包需要替换
5. 输出表格 + 行动计划
```

## Subagent 模板（10 个精选）

### 使用方式

在对话中直接描述或通过 /agents 管理：

```
用一个 security-auditor subagent 审查 src/auth/
```

### 模板集

**security-auditor**：
```
角色：安全审计员
模型：sonnet
工具：Read, Grep
指令：按 OWASP Top 10 审查代码，只报告 High 和 Critical 问题。
输出：JSON 格式 [{"severity", "file", "line", "issue", "fix"}]
```

**perf-analyzer**：
```
角色：性能分析师
模型：sonnet
工具：Read, Grep, Bash
��令：分析代码性能瓶颈。关注 N+1 查询、缺失索引、不必要的计算、内存泄漏。
```

**test-writer**：
```
角色：测试工程师
模型：sonnet
工具：Read, Write, Bash
指令：为指定文件编写测试。覆盖正常路径、错误路径、边界情况。使用项目的测试框架。
```

**doc-generator**：
```
角色：技术文档作者
模型：haiku（省成本）
工具：Read, Grep
指令：为指定代码生成文档。包含概述、参数、返回值、使用示例。
```

**code-reviewer**：
```
角色：代码审查员
模型：sonnet
工具：Read, Grep
指令：审查代码改动。关注逻辑正确性、边界情况、错误处理。不关注代码风格。
```

**dependency-checker**：
```
角色：依赖分析师
模型：haiku
工具：Read, Bash
指令：检查 package.json 的依赖健康度。安全漏洞、过期包、废弃包。
```

**migration-validator**：
```
角色：数据库迁移验证员
模型���sonnet
工具：Read
指令：验证数据库迁移的安全性。检查可回滚性、锁表风险、数据丢失风险。
```

**api-designer**：
```
角色：API 设计师
模型：sonnet
工具：Read, Grep
指令：审查 API 设计。RESTful 规范、命名一致性、错误处理统一性、版本管理。
```

**complexity-analyzer**：
```
角色：复杂度分析师
模型：haiku
工具：Read, Glob
指令：分析代码复杂度。找出超过 50 行的函数、嵌套超过 3 层的逻辑、圈复杂度过高的模块。
```

**i18n-checker**：
```
角色：国际化检查员
模型：haiku
工具：Read, Grep
指令：检查硬编码的用户可见字符串，标记需要国际化的位置。
```

## 参考资源

| 仓库 | 内容 |
|------|------|
| [claude-skills](https://github.com/alirezarezvani/claude-skills) | 232+ Skills |
| [awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 1000+ 跨平台 Skills |
| [awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | 100+ Subagent |
| [awesome-claude-code-toolkit](https://github.com/rohitg00/awesome-claude-code-toolkit) | 135 agents + 42 commands |
