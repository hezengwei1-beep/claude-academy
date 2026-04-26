# 多 Server 编排模式

## 为什么需要编排

单个 MCP Server 解决单个问题。真实工作流通常跨越多个系统：

```
"查数据库找出问题用户 → 在 GitHub 创建 Issue → 在 Slack 通知团队"
```

这需要三个 Server 协同工作。

## 模式一：顺序编排

一个任务按顺序调用多个 Server：

```
任务：每日用户流失分析

Step 1: PostgreSQL Server → 查询昨日流失用户
Step 2: GitHub Server → 为每个流失原因创建 Issue
Step 3: Slack Server → 发送日报到 #product 频道
Step 4: Filesystem Server → 保存详细报告到本地
```

### 配置

```json
{
  "mcpServers": {
    "postgres": {
      "command": "npx", "args": ["-y", "@mcp/server-postgres"],
      "env": { "DATABASE_URL": "..." }
    },
    "github": {
      "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "..." }
    },
    "slack": {
      "command": "npx", "args": ["-y", "@mcp/server-slack"],
      "env": { "SLACK_BOT_TOKEN": "..." }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "~/Reports"]
    }
  }
}
```

### Prompt

```
执行每日流失分析：

1. 查询数据库：
   SELECT u.id, u.email, u.plan_type, 
          MAX(e.created_at) as last_active
   FROM users u LEFT JOIN events e ON u.id = e.user_id
   WHERE u.created_at < NOW() - INTERVAL '30 days'
   GROUP BY u.id
   HAVING MAX(e.created_at) < NOW() - INTERVAL '7 days'
   ORDER BY u.plan_type DESC
   LIMIT 50;

2. 分析流失原因模式（按 plan_type 分组）

3. 如果付费用户流失 > 5 人，在 GitHub my-org/product 创建 Issue：
   标题：[Alert] 付费用户流失异常 - {日期}
   正文：流失详情和建议

4. 在 Slack #product-alerts 发送摘要

5. 保存完整报告到 ~/Reports/churn-{日期}.md
```

## 模式二：并行扇出

多个数据源并行获取，然后合并：

```
┌→ PostgreSQL: 用户数据
├→ GitHub: 代码活跃度
├→ Slack: 团队沟通数据
└→ 汇总为综合报告
```

### Prompt

```
并行收集以下数据，然后综合分析：

数据源 1（数据库）：上月活跃用户数、付费用户数、ARPU
数据源 2（GitHub）：上月 commit 数、PR 数、Issue 关闭数
数据源 3（Slack）：#support 频道上月消息数

收集完成后，生成月度运营报告，分析三个维度的趋势和关联。
```

## 模式三：条件路由

根据一个 Server 的结果决定调用哪个 Server：

```
查数据库 → 
  如果有告警 → GitHub 创建 Issue + Slack 通知
  如果正常 → 只写日志到 Filesystem
```

### Prompt

```
1. 查数据库：SELECT COUNT(*) FROM errors WHERE created_at > NOW() - INTERVAL '1 hour'

2. 如果错误数 > 100：
   - 在 GitHub 创建紧急 Issue
   - 在 Slack #oncall 频道发送告警（@channel）
   
3. 如果错误数 10-100：
   - 在 Slack #dev 频道发送提醒（不 @channel）
   
4. 如果错误数 < 10：
   - 只记录到 ~/Reports/hourly-check.md
```

## 模式四：MCP + Agent Teams

最强大的组合——多个 Agent 各自使用不同的 MCP Server：

```
进入 Delegate Mode。

创建 3 人分析团队：

1. data-analyst
   - 使用 PostgreSQL Server 查询数据
   - 输出关键指标和趋势

2. code-analyst
   - 使用 GitHub Server 分析代码活跃度
   - 输出开发效率指标

3. report-writer
   - 等前两人完成
   - 使用 Filesystem Server 写入报告
   - 使用 Slack Server 分发报告

每人只使用自己对应的 MCP Server。
```

## 编排注意事项

### 1. 错误处理

某个 Server 不可用时不应阻塞整个流程：

```
如果 Slack Server 不可用，跳过通知步骤，
将通知内容写入 ~/Reports/pending-notifications.md，
标注"待发送"。
```

### 2. 顺序依赖

明确标注哪些步骤有依赖：

```
Step 1（无依赖）：查数据库
Step 2（依赖 Step 1）：基于数据创建 Issue
Step 3（依赖 Step 1）：基于数据发通知
Step 4（依赖 Step 2+3）：生成完整报告
```

Step 2 和 3 可以并行，Step 4 必须等 2 和 3 都完成。

### 3. 幂等性

编排脚本应该是幂等的——重复运行不会造成重复 Issue 或重复通知：

```
在创建 Issue 前，先搜索是否已有同标题的 open Issue。
在发 Slack 前，检查是否已发过相同内容。
```
