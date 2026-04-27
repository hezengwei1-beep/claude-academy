# 附录 G：中英术语对照表

## 核心概念

| 英文 | 中文 | 说明 |
|------|------|------|
| Agent | 代理 | AI 代理实例，能自主执行任务 |
| Agent Teams | 代理团队 | 多个 Claude Code 实例协作的功能 |
| Subagent | 子代理 | 单会话内生成的并行工作者 |
| Team Lead | 团队负责人 | Agent Teams 中的主会话 |
| Teammate | 队友 | Agent Teams 中的协作实例 |
| Task List | 任务列表 | Agent Teams 中共享的待办事项 |
| Mailbox | 邮箱 | Agent Teams 中代理间的通信机制 |
| Delegate Mode | 委派模式 | Lead 不执行只协调的模式 |
| Cowork | 协作模式 | Claude Desktop 中的桌面自动化代理 |
| Dispatch | 远程派发 | 从手机向桌面端发送任务的功能 |
| Computer Use | 电脑使用 | Claude 直接操作屏幕的能力 |

## 技术术语

| 英文 | 中文 | 说明 |
|------|------|------|
| Context Window | 上下文窗口 | 模型单次能处理的最大 token 数 |
| Token | 令牌/标记 | 文本的最小计费单位 |
| Prompt | 提示词 | 给 AI 的输入指令 |
| System Prompt | 系统提示 | 定义 AI 角色和行为的指令 |
| Prompt Caching | 提示缓存 | 重复使用的 prompt 只计费一次 |
| Git Worktree | Git 工作树 | 同一仓库的多个独立工作目录 |
| Spawn | 创建/生成 | 创建新的 teammate 实例 |
| Hook | 钩子 | 事件触发时自动执行的脚本 |
| Skill | 技能 | Cowork 中可复用的提示词模板 |
| Plugin | 插件 | 扩展功能的第三方模块 |
| Connector | 连接器 | 连接外部服务的接口 |

## 架构术语

| 英文 | 中文 | 说明 |
|------|------|------|
| Orchestration | 编排 | 协调多个代理的工作 |
| Swarm | 集群 | 大规模多代理并行 |
| Pipeline | 流水线 | 按顺序执行的任务链 |
| Fan-out | 扇出 | 一个任务拆分为多个并行任务 |
| Fan-in | 扇入 | 多个并行结果汇总为一个 |
| Isolation | 隔离 | 代理间上下文/文件的独立性 |
| File Boundary | 文件边界 | 限定每个代理可修改的文件范围 |

## 工作流术语

| 英文 | 中文 | 说明 |
|------|------|------|
| Plan Mode | 规划模式 | 先制定计划再执行 |
| Supervised Workflow | 有监督的工作流 | 人类在旁监督 AI 执行 |
| Token Budget | Token 预算 | 限制单次任务的 token 消耗上限 |
| Quality Gate | 质量门控 | 自动化的质量检查点 |
| Anti-pattern | 反模式 | 应避免的不良实践 |
| Context Amnesia | 上下文遗忘 | 主代理忽略子代理结果的问题 |
| Infinite Exploration | 无限探索 | 代理无边界地读取文件的问题 |

## 模型名称

| 名称 | 定位 |
|------|------|
| Claude Opus 4.6 | 最强大的模型，推荐用于 Team Lead |
| Claude Sonnet 4.6 | 高性价比，推荐用于 Teammates |
| Claude Haiku 4.5 | 最快最便宜，适合简单 Subagent 任务 |

## 工具名称

| 名称 | 说明 |
|------|------|
| Claude Code | Anthropic 的 CLI 编码代理 |
| Claude Desktop | Anthropic 的桌面应用（含 Chat + Cowork） |
| Claude Squad | 社区开源多代理管理工具（tmux 管理） |
| Agent SDK | 编程式构建代理的开发工具包 |
| CLAUDE.md | 项目级指令文件 |
| settings.json | Claude Code 配置文件 |
