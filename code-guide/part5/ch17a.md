# claude-code-action：官方 GitHub Actions 集成

> [anthropics/claude-code-action](https://github.com/anthropics/claude-code-action) 是 Anthropic 官方的 GitHub Actions 集成，让 Claude Code 直接在 CI/CD 中运行。

## 与手写 CLI 调用的区别

| 维度 | 手写 `claude -p` | claude-code-action |
|------|-----------------|-------------------|
| 配置复杂度 | 需要手动 install + 配置 | 一个 `uses:` 搞定 |
| PR 评论 | 需要自己用 gh api 发 | 自动发到 PR |
| 上下文 | 需要手动传 diff | 自动获取 PR 上下文 |
| 权限 | 手动管理 | 与 GitHub 权限集成 |
| MCP 支持 | 需要手动配置 | 原生支持 |
| 更新 | 手动 npm update | 自动用最新版 |

## 基础用法：自动 PR 审查

```yaml
# .github/workflows/claude-review.yml
name: Claude Code Review
on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            审查这个 PR 的改动：
            1. 安全性问题
            2. 性能影响
            3. 逻辑正确性
            4. 测试覆盖
            
            格式：每个问题标注严重度 [Critical/High/Medium/Low]
```

Claude 会自动：
1. 获取 PR 的 diff
2. 分析改动
3. 在 PR 上发表评论

## 进阶：带 MCP 的审查

```yaml
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            深度审查这个 PR：
            1. 审查代码改动
            2. 检查是否有依赖安全漏洞
            3. 评估测试覆盖率
          mcp_config: |
            {
              "mcpServers": {
                "fetch": {
                  "command": "npx",
                  "args": ["-y", "@modelcontextprotocol/server-fetch"]
                }
              }
            }
```

## 进阶：Issue 自动处理

```yaml
name: Claude Issue Handler
on:
  issues:
    types: [opened, labeled]

jobs:
  handle:
    if: contains(github.event.issue.labels.*.name, 'claude-fix')
    runs-on: ubuntu-latest
    permissions:
      contents: write
      pull-requests: write
      issues: write
    steps:
      - uses: actions/checkout@v4
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
          prompt: |
            修复 Issue #${{ github.event.issue.number }}：
            ${{ github.event.issue.title }}
            
            ${{ github.event.issue.body }}
            
            步骤：
            1. 分析 Issue 描述
            2. 定位相关代码
            3. 实现修复
            4. 编写测试
            5. 创建 PR
```

给 Issue 打上 `claude-fix` 标签，Claude 自动修复并创建 PR。

## 配置选项

| 参数 | 说明 | 必须 |
|------|------|------|
| `anthropic_api_key` | API Key | 是 |
| `prompt` | 任务描述 | 是 |
| `model` | 模型选择 | 否（默认 sonnet） |
| `max_tokens` | Token 上限 | 否 |
| `mcp_config` | MCP Server 配置 | 否 |
| `allowed_tools` | 允许的工具列表 | 否 |

## 成本控制

CI 中每次 PR 都触发 Claude = 成本累积。控制策略：

```yaml
# 只在 PR 创建时审查（不在每次 push 时）
on:
  pull_request:
    types: [opened]  # 不包含 synchronize

# 只审查大于 10 行改动的 PR
jobs:
  review:
    if: github.event.pull_request.additions + github.event.pull_request.deletions > 10
```

```yaml
# 限制模型和 token
      - uses: anthropics/claude-code-action@v1
        with:
          model: claude-haiku-4-5    # 用便宜模型做初筛
          max_tokens: 50000          # 限制输出
```

## 与 Cookbook Managed Agents 的关系

| 工具 | 适合场景 |
|------|---------|
| **claude-code-action** | GitHub 原生集成，PR 审查和 Issue 处理 |
| **Managed Agents (Cookbook)** | 复杂的多步骤自动化（Issue → Fix → PR → CI → Review） |
| **手写 claude -p** | 完全自定义的 CI 脚本 |

简单的 PR 审查用 `claude-code-action`，复杂的全流程用 Managed Agents。
