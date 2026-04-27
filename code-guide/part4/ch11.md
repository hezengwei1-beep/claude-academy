# 权限模型详解

## 权限的三层架构

```
Layer 1: Tool 级别 — 哪些工具可以用
Layer 2: Pattern 级别 — 工具的哪些参数模式可以用
Layer 3: Runtime 级别 — 每次调用时是否需要确认
```

## Tool 级别控制

```json
{
  "permissions": {
    "allow": [
      "Read",      // 读文件 — 安全
      "Glob",      // 搜索文件名 — 安全
      "Grep"       // 搜索文件内容 — 安全
    ],
    "deny": []
  }
}
```

未列在 allow 中的工具默认需要每次确认。

## Pattern 级别控制

可以精确到工具的参数模式：

```json
{
  "permissions": {
    "allow": [
      "Read",
      "Glob",
      "Grep",
      "Bash(npm test)",           // 只允许 npm test
      "Bash(npm run lint)",       // 只允许 npm run lint
      "Bash(npm run build)",      // 只允许 npm run build
      "Bash(git status)",         // 只允许 git status
      "Bash(git diff *)",         // 允许所有 git diff 命令
      "Bash(git log *)"           // 允许所有 git log 命令
    ],
    "deny": [
      "Bash(rm -rf *)",           // 禁止 rm -rf
      "Bash(git push --force *)", // 禁止 force push
      "Bash(git reset --hard *)", // 禁止 hard reset
      "Bash(drop *)",             // 禁止 SQL drop
      "Bash(* > /dev/*)"          // 禁止重定向到设备文件
    ]
  }
}
```

### Pattern 语法

- `*` 匹配任意字符
- 精确匹配优先于通配符匹配
- deny 优先于 allow（deny 是黑名单）

### 常见安全 Pattern

```json
{
  "deny": [
    "Bash(rm -rf *)",
    "Bash(rm -r *)",
    "Bash(git push --force *)",
    "Bash(git push -f *)",
    "Bash(git reset --hard *)",
    "Bash(git clean -f *)",
    "Bash(git checkout -- *)",
    "Bash(chmod 777 *)",
    "Bash(curl * | bash)",
    "Bash(wget * | bash)"
  ]
}
```

## 场景化权限配置

### 日常开发（平衡安全和效率）

```json
{
  "permissions": {
    "allow": [
      "Read", "Glob", "Grep",
      "Write", "Edit",
      "Bash(npm *)",
      "Bash(git status)", "Bash(git diff *)", "Bash(git log *)",
      "Bash(git add *)", "Bash(git commit *)"
    ],
    "deny": [
      "Bash(git push --force *)",
      "Bash(git reset --hard *)",
      "Bash(rm -rf *)"
    ]
  }
}
```

### 代码审查（只读模式）

```json
{
  "permissions": {
    "allow": [
      "Read", "Glob", "Grep",
      "Bash(git diff *)", "Bash(git log *)", "Bash(git blame *)",
      "Bash(npm test)"
    ],
    "deny": [
      "Write", "Edit",
      "Bash(git commit *)", "Bash(git push *)"
    ]
  }
}
```

### CI/CD 自动化（严格受限）

```json
{
  "permissions": {
    "allow": [
      "Read", "Glob", "Grep",
      "Bash(npm test)", "Bash(npm run lint)", "Bash(npm run build)"
    ],
    "deny": [
      "Write", "Edit",
      "Bash(git *)",
      "Bash(rm *)",
      "Bash(curl *)",
      "Bash(wget *)"
    ]
  }
}
```

## 权限继承

```
~/.claude/settings.json（全局）
  ↓ 被继承
.claude/settings.json（项目级）
  ↓ 可覆盖
.claude/settings.local.json（个人级）
```

项目级可以覆盖全局设置。个人级可以覆盖项目级。

## 权限审计

定期检查权限配置是否合理：

```bash
# 查看当前生效的权限
cat ~/.claude/settings.json | python3 -c "
import json, sys
config = json.load(sys.stdin)
perms = config.get('permissions', {})
print('Allow:', perms.get('allow', []))
print('Deny:', perms.get('deny', []))
"
```
