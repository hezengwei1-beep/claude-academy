# 附录 A：MCP Server 配置速查表

## 配置文件位置

| 环境 | 路径 |
|------|------|
| Claude Desktop (macOS) | `~/Library/Application Support/Claude/claude_desktop_config.json` |
| Claude Desktop (Windows) | `%APPDATA%\Claude\claude_desktop_config.json` |
| Claude Code（项目级） | `.mcp.json`（项目根目录） |
| Claude Code（全局） | `~/.claude/settings.json` 中的 `mcpServers` |

## 常用 Server 配置模板

### Filesystem
```json
{ "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "目录路径"] }
```

### Memory
```json
{ "command": "npx", "args": ["-y", "@modelcontextprotocol/server-memory"] }
```

### Fetch
```json
{ "command": "npx", "args": ["-y", "@modelcontextprotocol/server-fetch"] }
```

### Git
```json
{ "command": "uvx", "args": ["mcp-server-git", "--repository", "仓库路径"] }
```

### GitHub
```json
{ "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"], "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "token" } }
```

## Claude Code 命令

| 命令 | 作用 |
|------|------|
| `/mcp` | 查看/管理 MCP Servers |
| `/mcp add <name> <command> <args>` | 添加 Server |

## 调试命令

```bash
# Inspector
npx @modelcontextprotocol/inspector <server-command>

# Claude Desktop 日志
tail -f ~/Library/Logs/Claude/mcp*.log
```
