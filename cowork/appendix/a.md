
# 附录 A：命令与快捷键速查表

## Agent Teams 快捷键

| 快捷键 | 作用 |
|--------|------|
| `Shift+Down` | 切换到下一个 teammate |
| `Shift+Up` | 切换到上一个 teammate |
| `Ctrl+T` | 切换任务列表视图 |
| `Enter` | 进入当前 teammate 的会话详情 |
| `Escape` | 中断当前 teammate 的操作 |
| `Shift+Tab` | 切换 Delegate Mode |

## Claude Code 通用命令

| 命令 | 作用 |
|------|------|
| `/agents` | 打开 agents 管理界面 |
| `/plan` | 进入规划模式 |
| `/resume` | 恢复之前的会话 |
| `/rewind` | 回滚到检查点 |
| `/loop` | 定时运行任务 |
| `/batch` | 批量执行独立任务 |
| `/fork` | 创建分支会话（需启用） |

## Worktree 命令

| 命令 | 作用 |
|------|------|
| `claude --worktree <name>` | 创建命名 worktree 并启动会话 |
| `claude --worktree` | 自动命名创建 worktree |
| `git worktree add <path> -b <branch>` | 手动创建 worktree |
| `git worktree list` | 列出所有 worktree |
| `git worktree remove <path>` | 删除 worktree |

## Agent Teams 自然语言指令模板

### 创建团队
```
创建一个 [N] 人团队来 [任务目标]：
- [name-1]：[职责]，负责 [文件范围]
- [name-2]：[职责]，负责 [文件范围]
- [name-3]：[职责]，负责 [文件范围]

规则：
1. 每人只修改自己范围内的文件
2. 接口变更先发消息确认
3. 完成后在任务列表标记
```

### 进入 Delegate Mode
```
进入 Delegate Mode。从现在开始只做协调，不要自己读文件或写代码。
```

### 发送消息
```
给 [teammate-name] 发消息：[消息内容]
```

### 任务管理
```
添加任务到任务列表：[任务描述] [分配给 teammate-name]
显示当前任务列表状态
```

### 关闭团队
```
关闭 [teammate-name]
清理所有 teammates
```

## Subagent 指令模板

### 创建 Subagent
```
用一个 subagent [任务描述]，结果汇报给我。
```

### @-mention 调用
```
@[agent-name] [指令]
```

### 并行 Subagents
```
用 [N] 个 subagent 并行：
1. subagent-1：[任务]
2. subagent-2：[任务]
3. subagent-3：[任务]
各自完成后汇报给我。
```
