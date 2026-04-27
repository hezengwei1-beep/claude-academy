# 附录 F：版本变更日志

本附录记录 Claude Code 多代理相关功能的版本演进。帮你判断当前版本支持哪些能力。

> 以下信息基于公开资料整理，可能不完全准确。以 `claude --version` 和官方 changelog 为准。

## Claude Code 版本线

| 版本 | 日期（约） | 多代理相关变化 |
|------|-----------|---------------|
| v2.0.x | 2025 Q3 | Claude Code 正式发布，Subagents 基础能力 |
| v2.1.0 | 2025 Q4 | Subagents 并行执行支持，/agents 管理界面 |
| v2.1.10 | 2025 Q4 | @-mention 调用 subagent |
| v2.1.20 | 2026 Q1 | Git Worktree 集成（`claude --worktree`） |
| **v2.1.32** | **2026 Q1** | **Agent Teams 实验性功能首次引入** |
| v2.1.40 | 2026 Q1 | Agent Teams: Delegate Mode（Shift+Tab） |
| v2.1.50 | 2026 Q2 | Agent Teams: Task List 依赖追踪 |
| v2.1.60 | 2026 Q2 | Agent Teams: tmux/iTerm2 split-pane 支持 |
| v2.1.70 | 2026 Q2 | Hooks 系统：TeammateIdle, TaskCreated, TaskCompleted |
| v2.1.80 | 2026 Q2 | /fork subagent（实验性，需 CLAUDE_CODE_FORK_SUBAGENT=1） |
| v2.1.90+ | 2026 Q2 | Agent Teams 持续改进、Bug 修复 |

## Claude Desktop / Cowork 版本线

| 时间 | 变化 |
|------|------|
| 2026 年 1 月 | Claude Cowork 正式发布（macOS Apple Silicon） |
| 2026 年 2 月 | Windows 版 Cowork 上线 |
| 2026 年 3 月 | Dispatch 功能发布（手机远程派发） |
| 2026 年 3 月 | Computer Use 集成到 Cowork |
| 2026 年 4 月 | Skills 和 Plugins 生态扩展 |

## 模型版本线

| 模型 | 发布日期（约） | 关键能力 |
|------|--------------|---------|
| Claude 3.5 Sonnet | 2024 Q3 | Claude Code 首个支持模型 |
| Claude 3.5 Haiku | 2024 Q4 | Subagent 低成本模型选项 |
| Claude Sonnet 4.0 | 2025 Q2 | 增强的编码和工具使用能力 |
| Claude Opus 4.0 | 2025 Q2 | 最强推理能力 |
| **Claude Opus 4.6** | **2026 Q1** | **1M 上下文，Agent Teams 的推荐模型** |
| **Claude Sonnet 4.6** | **2026 Q1** | **高性价比选择，适合 subagent 和 teammate** |
| Claude Haiku 4.5 | 2025 Q4 | 最快最便宜，适合简单 subagent 任务 |

## 实验性功能状态跟踪

| 功能 | 环境变量 | 引入版本 | 当前状态 |
|------|----------|---------|---------|
| Agent Teams | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | v2.1.32 | 实验性 |
| Fork Subagent | `CLAUDE_CODE_FORK_SUBAGENT` | v2.1.80 | 实验性 |

> **"实验性"意味着**：功能可用但不保证向后兼容。API 和行为可能在后续版本中变化。不建议用于生产环境的关键流程。

## 如何检查你的版本

```bash
# Claude Code 版本
claude --version

# 检查 Agent Teams 是否可用
echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS

# 检查已安装的 npm 包版本
npm list -g @anthropic-ai/claude-code

# 更新到最新版
npm update -g @anthropic-ai/claude-code
```

## 何时需要更新

- **发现文档中描述的功能不可用** → 可能版本不够新
- **遇到已知 Bug** → 检查 GitHub Issues 是否已修复
- **安全更新通知** → 立即更新
- **常规** → 建议每 2-4 周更新一次
