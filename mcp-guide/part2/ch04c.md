# 数据库 Server 深度实战

## PostgreSQL Server

### 配置

```json
{
  "postgres": {
    "command": "npx",
    "args": ["-y", "@mcp/server-postgres"],
    "env": {
      "DATABASE_URL": "postgresql://readonly_user:password@localhost:5432/myapp"
    }
  }
}
```

### 关键安全实践

**必须使用只读用户**：

```sql
-- 创建只读用户
CREATE USER mcp_readonly WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE myapp TO mcp_readonly;
GRANT USAGE ON SCHEMA public TO mcp_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO mcp_readonly;

-- 确保未来新建的表也有读权限
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT ON TABLES TO mcp_readonly;
```

绝对不要给 MCP Server 使用有 INSERT/UPDATE/DELETE 权限的用户。

### 可用工具

| 工具 | 作用 |
|------|------|
| `query` | 执行 SQL 查询 |
| `list_tables` | 列出所有表 |
| `describe_table` | 查看表结构 |

### 实战：用户行为分析

```
帮我分析用户行为数据：

1. 先用 list_tables 看看有哪些表
2. 用 describe_table 查看 users、events、subscriptions 表的结构
3. 查询以下指标：

   a. 最近 30 天的 DAU 趋势（按天分组）
   SELECT DATE(created_at), COUNT(DISTINCT user_id)
   FROM events WHERE created_at > NOW() - INTERVAL '30 days'
   GROUP BY DATE(created_at) ORDER BY 1;

   b. 用户留存率（注册后 7 天还活跃的比例）

   c. 付费转化漏斗（注册 → 首次使用 → 付费）

   d. Top 10 活跃用户及其使用模式

4. 整理成分析报告，包含数据表格和关键洞察
```

### 预期输出

```markdown
# 用户行为分析报告

## 1. DAU 趋势
| 日期 | DAU | 环比 |
|------|-----|------|
| 04-25 | 1,234 | +2.3% |
| 04-24 | 1,206 | -1.1% |
| ... | ... | ... |

**洞察**：DAU 整体稳定，周末有 15-20% 的下降属正常。

## 2. 7 日留存率
整体留存率：34.2%
- 免费用户：28.5%
- 付费用户：67.3%

**洞察**：付费用户留存显著高于免费用户，说明付费功能有实际价值。

## 3. 转化漏斗
注册 → 首次使用：72.3%（1000 → 723）
首次使用 → 7日活跃：34.2%（723 → 247）
7日活跃 → 付费：8.1%（247 → 20）

**瓶颈**：首次使用到7日活跃的转化率最低，建议优化新用户引导。
```

### 查询安全策略

Server 内部应该限制：
1. 禁止 DDL 语句（CREATE/ALTER/DROP）
2. 禁止 DML 语句（INSERT/UPDATE/DELETE）
3. 查询超时限制（如 30 秒）
4. 结果行数限制（如 LIMIT 10000）

```
如果你需要写入操作（如记录分析结果），
用 Filesystem MCP Server 写到文件，而不是写数据库。
```

## Memory Server 深度实战

### 知识图谱模型

Memory Server 用图数据库的方式存储信息：

```
Entity（实体节点）
├── name: "张三"
├── entityType: "person"
└── observations: ["是后端团队 lead", "擅长 Go 和 Rust"]

Relation（关系边）
├── from: "张三"
├── to: "认证模块"
└── relationType: "负责"
```

### 实战：构建项目知识图谱

```
帮我建立项目的知识图谱：

1. 创建团队成员实体：
   - 张三（后端 lead，负责认证和支付）
   - 李四（前端，负责用户界面）
   - 王五（DevOps，负责 CI/CD 和部署）

2. 创建模块实体：
   - 认证模块（src/auth/，JWT 认证）
   - 支付模块（src/payment/，Stripe 集成）
   - 用户界面（src/frontend/，React + Tailwind）

3. 创建关系：
   - 张三 → 负责 → 认证模块
   - 张三 → 负责 → 支付模块
   - 李四 → 负责 → 用户界面
   - 认证模块 → 依赖 → 用户界面（登录页面）
   - 支付模块 → 依赖 → 认证模块（需要认证后才能支付）

4. 记住以下关键信息：
   - 认证模块在 2026-03 做过一次重构，从 session 改为 JWT
   - 支付模块的 Stripe webhook 偶尔有延迟，已知问题
   - 前端在迁移到 Next.js App Router 中
```

### 跨会话记忆

建立知识图谱后，在未来的任何会话中：

```
谁负责认证模块？
→ 张三。他是后端 lead，认证模块在 2026-03 从 session 重构为 JWT。

支付模块有什么已知问题？
→ Stripe webhook 偶尔有延迟，这是已知问题。

如果我要改认证模块的接口，需要通知谁？
→ 需要通知李四（前端有登录页面依赖认证模块）和检查支付模块（依赖认证）。
```

Memory Server 让 Claude 在**跨会话**中保持项目上下文，不需要每次都重新解释。
