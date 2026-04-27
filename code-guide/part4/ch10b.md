# CLAUDE.md 真实案例集

> 来自 GitHub 开源项目中实际使用的 CLAUDE.md。学习真实项目怎么写，比看模板更有价值。

## 案例一：极简型（~500 tokens）

来自一个中型 TypeScript 全栈项目：

```markdown
## Stack
Next.js 14, TypeScript, Prisma, PostgreSQL, Tailwind

## Dev
- `pnpm dev` — localhost:3000
- `pnpm test` — vitest
- `pnpm db:push` — prisma db push

## Rules
- Strict TypeScript, no `any`
- Components: `src/components/[Name]/index.tsx`
- API: `src/app/api/[resource]/route.ts`
- Server actions in `src/actions/`
- Tests co-located: `*.test.ts`

## Gotchas
- Auth uses middleware.ts (edge runtime, no Node APIs)
- File uploads → S3, not local
- Rate limiter in Redis, check REDIS_URL
```

**为什么好**：
- 只有 ~500 tokens
- 只写了 Claude 不看代码无法推导的信息
- 没有重复 tsconfig/eslint 中已有的配置

## 案例二：中等型（~1500 tokens）

来自一个 monorepo 项目：

```markdown
## Architecture
Turborepo monorepo:
- `packages/core` — 业务逻辑（纯 TS，无框架依赖）
- `packages/db` — Prisma schema + migrations
- `apps/web` — Next.js 前端
- `apps/api` — Express API server
- `packages/ui` — 共享 React 组件库

## Commands
- `pnpm dev` — 启动所有 apps
- `pnpm test` — 全量测试
- `pnpm test --filter=core` — 只测 core 包
- `pnpm build` — 构建
- `pnpm db:migrate` — 数据库迁移（只在 packages/db 下运行）

## Cross-Package Rules
- core 包不能依赖任何 React/Next.js
- ui 包不能直接导入 db 包
- API 类型定义在 packages/core/types/ 下，前后端共享
- 新增包时更新 turbo.json 的 pipeline

## Code Style
- 函数式优先，避免 class
- 优先 const + arrow function
- 错误处理：core 包抛自定义 Error，apps 层捕获并转 HTTP status
- 日志：使用 packages/core/logger（不要直接 console.log）

## Current Focus
- 正在迁移认证从 session 到 JWT（packages/core/auth/）
- 不要动 packages/db/migrations/ 中已有的迁移文件
```

**为什么好**：
- monorepo 的跨包规则是 Claude 不看代码很难推导的
- "Current Focus" 标注了正在进行的工作，避免 Claude 与之冲突
- 明确了"不要动"的文件

## 案例三：团队协作型（~2000 tokens）

来自一个多人协作的开源项目：

```markdown
## Project
开源的 API 网关，Go + React dashboard

## Quick Start
```bash
make dev          # 启动所有服务
make test         # 运行测试
make lint         # golangci-lint + eslint
make proto        # 重新生成 protobuf
```

## Architecture
```
cmd/gateway/     — 网关主进程
cmd/dashboard/   — React dashboard
internal/
├── proxy/       — 反向代理核心（性能敏感，改动需 benchmark）
├── config/      — 配置加载（支持 YAML + env + API）
├── auth/        — 认证中间件
├── ratelimit/   — 限流（令牌桶算法，不要改算法）
└── metrics/     — Prometheus 指标
```

## Rules
- Go 代码遵循 Effective Go
- 新增 API 端点需要同时更新 OpenAPI spec（api/openapi.yaml）
- internal/ 下的包不导出到外部
- 性能敏感路径（proxy/）的改动需要附带 benchmark 结果
- Dashboard 组件用 Ant Design，不要引入其他 UI 库

## Review Checklist
PR 需要通过以下检查：
- [ ] `make lint` 无错误
- [ ] `make test` 全绿
- [ ] 新功能有测试
- [ ] API 变更更新了 openapi.yaml
- [ ] 性能敏感改动附带 benchmark

## Known Issues
- #234: 高并发下 config reload 有竞态（workaround: 设置 CONFIG_RELOAD_INTERVAL > 30s）
- Dashboard 的 SSO 配置页面在 Safari 上有样式问题，不要花时间修
```

**为什么好**：
- "不要改算法"——直接告诉 Claude 什么不能动
- "性能敏感路径需要 benchmark"——质量要求
- Known Issues 避免 Claude 去修不该修的 bug
- Review Checklist 让 Claude 知道 PR 的标准

## 案例四：安全项目型（~1800 tokens）

来自一个处理敏感数据的项目：

```markdown
## Security-Critical Project

### Absolute Rules (NEVER violate)
1. **No secrets in code** — all credentials via env vars or Vault
2. **No raw SQL** — always use parameterized queries via ORM
3. **No user input in logs** — sanitize before logging
4. **No disabling TLS** — even in dev
5. **No `any` type** — breaks type safety which is a security feature here

### Data Classification
- PII fields: email, phone, address, ssn → always encrypted at rest
- Financial: account_number, balance → encrypted + audit logged
- Internal: user_id, timestamps → normal handling OK

### Audit Requirements
- Every data access must be logged (src/middleware/audit.ts)
- Log format: {timestamp, user_id, action, resource, ip}
- Don't modify the audit middleware without security team review

### Encryption
- At-rest: AES-256-GCM (src/crypto/encrypt.ts)
- In-transit: TLS 1.3 only
- Key rotation: handled by Vault, don't hardcode rotation logic

### Testing Security
- Security tests in tests/security/
- Run `npm run test:security` separately (slower, hits real services)
- New endpoints must have injection tests

### Code Review
- Security-related changes require 2 reviewers
- Changes to src/crypto/ or src/auth/ → ping @security-team
```

**为什么好**：
- 安全项目的规则必须写在 CLAUDE.md 中（不然 Claude 不知道）
- 数据分类明确——Claude 知道哪些字段需要特殊处理
- "不要修改 audit middleware"——保护关键基础设施

## 提炼：好的 CLAUDE.md 的共同特征

| 特征 | 说明 |
|------|------|
| **短** | 500-2000 tokens，不超过 2500 |
| **只写不可推导的** | 代码约定（linter 有）和目录结构（ls 能看）不写 |
| **有"不要做"** | 明确禁区比明确要求更重要 |
| **有"正在进行"** | 告诉 Claude 当前工作的上下文 |
| **有 Quick Start** | 让 Claude 知道怎么跑项目 |
| **有 Known Issues** | 避免 Claude 去修已知但不需要修的问题 |

## 反面教材

```markdown
## 不要这样写

### 项目历史
2024 年 3 月创建，最初是内部工具...（Claude 不关心）

### 完整依赖列表
- react 18.2.0
- typescript 5.3.2
...（package.json 里有）

### 目录结构
src/
├── components/
│   ├── Button/
...（Claude 能自己看）

### ESLint 规则
- 缩进 2 空格
- 单引号
...（.eslintrc 里有）
```

这些信息 Claude 都能从其他文件获取，写在 CLAUDE.md 中只是浪费 tokens。

## 更多真实案例（来自知名开源项目）

### Anthropic 官方：claude-code-action 的 CLAUDE.md

[源码](https://github.com/anthropics/claude-code-action/blob/main/CLAUDE.md)

**独特之处**：有一个 "Things That Will Bite You" 段落——列出新手必踩的坑，每条引用具体的代码位置。~800 tokens。

### MCP TypeScript SDK 的 CLAUDE.md

[源码](https://github.com/modelcontextprotocol/typescript-sdk/blob/main/CLAUDE.md)

**独特之处**：包含三层架构图（Types → Protocol → Client/Server）和消息流说明。要求迁移文档必须写两个版本——人类可读 + LLM 优化。~700 tokens。

### Helicone 的 CLAUDE.md（monorepo 标杆）

[源码](https://github.com/Helicone/helicone/blob/main/CLAUDE.md)

**独特之处**：包含完整的设计系统规范（字体表格、颜色语义、布局模式），前后端分别有 Do/Don't 代码示例。~2500 tokens（偏长但 monorepo 多服务需要）。

### Karpathy 风格准则（纯行为型）

[源码](https://github.com/forrestchang/andrej-karpathy-skills/blob/main/CLAUDE.md)

**独特之处**：只有 4 条行为原则，无任何项目特定内容。适合作为全局 `~/.claude/CLAUDE.md`。核心规则："If you write 200 lines and it could be 50, rewrite it"。~400 tokens。

### Vercel AI SDK：CLAUDE.md → AGENTS.md 符号链接

[源码](https://github.com/vercel/ai/blob/main/CLAUDE.md)

**独特之处**：CLAUDE.md 是指向 AGENTS.md 的符号链接——一份配置同时兼容 Claude Code、Codex、Cursor 等多个 AI 工具。新趋势。

## 2026 年的新趋势

从以上案例中观察到的趋势：

1. **Progressive Disclosure**：不把所有信息塞进 CLAUDE.md，而是用 `.claude/rules/*.md` + `paths:` 惰性加载
2. **CLAUDE.md ↔ AGENTS.md 统一**：一份文件兼容多个 AI 工具
3. **控制在 200 行以内**：社区共识是单文件不超过 200 行
4. **"Things That Will Bite You" 最高价值**：Claude 从代码推断不出的陷阱才是 CLAUDE.md 的核心价值
