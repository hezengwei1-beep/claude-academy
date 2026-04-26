
# 附录 B：环境变量参考

## Agent Teams 相关

| 变量 | 值 | 作用 |
|------|-----|------|
| `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` | `1` | 启用 Agent Teams 功能 |
| `CLAUDE_CODE_FORK_SUBAGENT` | `1` | 启用 /fork 分支子代理 |

## 模型相关

| 变量 | 示例值 | 作用 |
|------|--------|------|
| `CLAUDE_CODE_SUBAGENT_MODEL` | `haiku` / `sonnet` | 设置 subagent 默认模型 |

## 行为控制

| 变量 | 值 | 作用 |
|------|-----|------|
| `CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` | `1` | 禁用后台任务 |

## settings.json 配置项

以下配置项在 `~/.claude/settings.json` 中设置：

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "CLAUDE_CODE_FORK_SUBAGENT": "1",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  },
  "teammateMode": "in-process"
}
```

### teammateMode 选项

| 值 | 说明 | 要求 |
|-----|------|------|
| `in-process` | 所有 teammates 在主终端内运行（默认） | 任何终端 |
| `tmux` | 每个 teammate 独立 tmux 窗格 | 需安装 tmux |
| `auto` | 自动检测终端类型 | iTerm2 支持原生 split |

## 完整推荐配置

### 入门配置

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

### 进阶配置

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "CLAUDE_CODE_FORK_SUBAGENT": "1",
    "CLAUDE_CODE_SUBAGENT_MODEL": "sonnet"
  },
  "teammateMode": "in-process"
}
```

### 专家配置（tmux 用户）

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1",
    "CLAUDE_CODE_FORK_SUBAGENT": "1",
    "CLAUDE_CODE_SUBAGENT_MODEL": "haiku"
  },
  "teammateMode": "tmux"
}
```
