# Hooks 高级组合模式

## 组合模式一：完整的代码质量流水线

每次文件修改后，自动运行 lint → format → typecheck → test：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "cd $PROJECT_DIR && npx eslint --fix $FILE_PATH 2>/dev/null; npx prettier --write $FILE_PATH 2>/dev/null; npx tsc --noEmit 2>&1 | head -20; npx vitest run --reporter=verbose --changed 2>&1 | tail -20",
        "description": "Full quality pipeline: lint → format → typecheck → test"
      }
    ]
  }
}
```

### 拆成多个 Hook（更清晰）

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx eslint --fix $FILE_PATH 2>/dev/null || true",
        "description": "Auto-fix lint issues"
      },
      {
        "matcher": "Write|Edit",
        "command": "npx prettier --write $FILE_PATH 2>/dev/null || true",
        "description": "Auto-format"
      },
      {
        "matcher": "Write|Edit",
        "command": "npx tsc --noEmit 2>&1 | grep -E 'error TS' | head -5",
        "description": "Type check (show first 5 errors)"
      }
    ]
  }
}
```

多个 Hook 按定义顺序依次执行。

## 组合模式二：安全护栏 + 审计日志

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "echo \"[$(date)] BASH: $COMMAND\" >> ~/.claude/audit.log",
        "description": "Audit log all bash commands"
      },
      {
        "matcher": "Bash",
        "command": "echo '$COMMAND' | grep -qiE '(rm -rf|drop table|truncate|--force|reset --hard)' && echo 'BLOCKED: 危险命令被拦截' && exit 1 || exit 0",
        "description": "Block dangerous commands"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "echo \"[$(date)] FILE: $FILE_PATH\" >> ~/.claude/audit.log",
        "description": "Audit log file changes"
      }
    ]
  }
}
```

审计日志写到 `~/.claude/audit.log`，方便事后追溯。

## 组合模式三：Agent Teams 质量门控

```json
{
  "hooks": {
    "TaskCompleted": [
      {
        "command": "cd $PROJECT_DIR && npm test -- --changed 2>&1 | tail -10",
        "description": "Run tests when teammate completes a task"
      }
    ],
    "TeammateIdle": [
      {
        "command": "echo \"[$(date)] Teammate idle: $TEAMMATE_NAME\" >> ~/.claude/team.log",
        "description": "Log teammate idle events"
      }
    ]
  }
}
```

## 组合模式四：智能通知

当 Claude 修改了特定文件时发送通知：

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "echo '$FILE_PATH' | grep -q 'src/auth/' && osascript -e 'display notification \"认证模块被修改: $FILE_PATH\" with title \"Claude Code Alert\"' || true",
        "description": "Alert when auth module is modified"
      }
    ]
  }
}
```

macOS 上用 `osascript` 发送系统通知。

## 组合模式五：自动备份

在 Claude 修改文件前自动备份：

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "[ -f '$FILE_PATH' ] && cp '$FILE_PATH' '$FILE_PATH.bak.$(date +%s)' || true",
        "description": "Backup file before modification"
      }
    ]
  }
}
```

## Hook 调试技巧

### 1. 先测试命令

在终端中手动运行 Hook 命令，确认它能正常工作：

```bash
FILE_PATH=src/index.ts npx eslint --fix $FILE_PATH 2>/dev/null; echo $?
```

### 2. 添加日志

```json
{
  "command": "echo '[HOOK] Running lint on $FILE_PATH' >&2 && npx eslint --fix $FILE_PATH 2>/dev/null || true",
}
```

Hook 的 stderr 输出会显示在 Claude Code 中。

### 3. 超时保护

Hook 不应该执行太久。如果某个 Hook 可能慢，加超时：

```bash
timeout 10 npx eslint --fix $FILE_PATH 2>/dev/null || true
```

10 秒超时，超时后静默失败。

### 4. 条件执行

只对特定文件类型执行：

```bash
echo '$FILE_PATH' | grep -qE '\.(ts|tsx)$' && npx eslint --fix $FILE_PATH || true
```

只对 .ts/.tsx 文件运行 eslint。
