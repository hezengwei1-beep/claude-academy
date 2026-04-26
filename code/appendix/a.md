# 附录 A：命令速查表

## CLI 参数

| 参数 | 作用 |
|------|------|
| `claude` | 交互模式 |
| `claude -p "任务"` | 非交互模式 |
| `claude --resume` | 恢复上次会话 |
| `claude --model opus` | 指定模型 |
| `claude --worktree <name>` | 在 worktree 中启动 |
| `claude --version` | 查看版本 |
| `claude --output json` | JSON 格式输出 |

## 斜杠命令

| 命令 | 作用 |
|------|------|
| `/help` | 显示帮助 |
| `/exit` | 退出 |
| `/clear` | 清除对话 |
| `/compact` | 压缩上下文 |
| `/resume` | 恢复会话 |
| `/rewind` | 回滚检查点 |
| `/plan` | 规划模式 |
| `/fast` | 快速模式 |
| `/mcp` | 管理 MCP |
| `/agents` | 管理子代理 |
| `/loop` | 定时循环 |
| `/batch` | 批量处理 |
| `/commit` | 提交代码 |

## 键盘快捷键

| 快捷键 | 作用 |
|--------|------|
| `Enter` | 发送 |
| `Shift+Enter` | 换行 |
| `Ctrl+C` | 中断 |
| `Ctrl+D` | 退出 |
| `Esc` | 取消 |
| `Tab` | 补全路径 |
| `Up/Down` | 历史 |
| `Shift+Tab` | Delegate Mode |
| `Shift+Up/Down` | 切换 Teammate |
| `Ctrl+T` | 任务列表 |

## 配置文件路径

| 文件 | 路径 |
|------|------|
| 全局设置 | `~/.claude/settings.json` |
| 全局指令 | `~/.claude/CLAUDE.md` |
| 项目设置 | `.claude/settings.json` |
| 项目指令 | `CLAUDE.md` |
| MCP 配置 | `.mcp.json` |
| Desktop MCP | `~/Library/Application Support/Claude/claude_desktop_config.json` |
