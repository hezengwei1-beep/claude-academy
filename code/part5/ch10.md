# 第十章 排障指南

## 通用排障流程

```
1. 版本检查 → claude --version（是否最新？）
2. 配置检查 → 检查 settings.json 格式
3. 认证检查 → API Key 是否有效
4. 网络检查 → 连接是否稳定
5. 权限检查 → 文件和工具权限
6. 重启 → 退出并重新启动 claude
7. 清空 → /clear 清除对话
8. 社区 → github.com/anthropics/claude-code/issues
```

## 常见问题

### Q1: 安装后 `claude` 命令找不到

**原因**：npm 全局安装路径不在 PATH 中。

**解法**：
```bash
# 查看全局路径
npm root -g

# 添加到 PATH（zsh）
echo 'export PATH="$(npm root -g)/../bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

### Q2: API Key 无效

**症状**：`Authentication failed` 或 `Invalid API key`

**解法**：
```bash
# 检查环境变量
echo $ANTHROPIC_API_KEY

# 重新设置
export ANTHROPIC_API_KEY="sk-ant-..."
```

### Q3: 文件修改权限被拒绝

**症状**：Claude 想修改文件但你拒绝了，现在它不再尝试。

**解法**：告诉它"我之前拒绝了，现在请重新修改这个文件"。或重启会话。

### Q4: settings.json 语法错误

**症状**：Claude Code 启动异常或配置不生效。

**解法**：
```bash
# 验证 JSON 格式
cat ~/.claude/settings.json | python3 -m json.tool
```

常见错误：多余的逗号、缺少引号、不匹配的括号。

### Q5: MCP Server 连接失败

**症状**：`/mcp` 显示 Server 状态为 disconnected。

**排查**：
```bash
# 手动运行 Server 看是否报错
npx -y @modelcontextprotocol/server-filesystem ~/Documents

# 检查 Node.js 版本
node --version  # 需要 >= 18
```

### Q6: Agent Teams 功能不可用

**排查**：
```bash
echo $CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS  # 应输出 1
claude --version  # 应 >= 2.1.32
```

### Q7: 长会话后质量下降

**原因**：上下文窗口接近上限，自动压缩导致信息丢失。

**解法**：
1. `/compact` 手动压缩
2. 或开新会话，把需要的上下文通过文件传递

### Q8: Hook 不触发

**排查**：
1. 检查 settings.json 中 `hooks` 字段的格式
2. 确认 `matcher` 字符串与实际工具名匹配
3. 手动运行 hook 命令看是否有错误

### Q9: 更新后行为变化

**原因**：新版本可能有行为调整。

**解法**：
```bash
# 查看 changelog
npm info @anthropic-ai/claude-code changelog

# 如需回退
npm install -g @anthropic-ai/claude-code@版本号
```

### Q10: Worktree 创建失败

**原因**：当前不在 Git 仓库中，或分支名冲突。

**解法**：
```bash
# 确认在 Git 仓库中
git status

# 查看现有 worktree
git worktree list

# 清理无效 worktree
git worktree prune
```

## 获取帮助

- **官方文档**：https://code.claude.com/docs
- **GitHub Issues**：https://github.com/anthropics/claude-code/issues
- **反馈**：在 Claude Code 中输入 `/help`
