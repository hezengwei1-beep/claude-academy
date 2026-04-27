# Claude Code System Prompt 拆解

> 基于 [Piebald-AI/claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts) 的分析。了解 Claude Code 的"大脑"是怎么被指令的。

## 为什么要了解 System Prompt

Claude Code 不是一个"裸模型"——它在启动时被注入了一个精心设计的 System Prompt，定义了它的行为规则、工具使用方式和安全边界。

了解这些，你可以：
1. 理解 Claude Code 为什么有时会"拒绝"某些操作
2. 写出更有效的指令（与 System Prompt 协同而非冲突）
3. 在 CLAUDE.md 中正确覆盖默认行为

## System Prompt 的结构

Claude Code 的 System Prompt 大约包含以下几个部分：

### 1. 身份定义

```
你是 Claude Code，Anthropic 的官方 CLI 编码代理。
你帮助用户完成软件工程任务。
```

### 2. 工具定义（24+ 个内置���具）

每个工具都有精确的描述，告诉 Claude 什么时候该用：

| 工具 | System Prompt 中的描述（意译） |
|------|------------------------------|
| **Read** | 读取文件。优先使用此工具而非 cat/head/tail |
| **Write** | 写入��件。如果文件已存在，必须先 Read |
| **Edit** | 精确字符串替换。old_string 必须唯一 |
| **Bash** | 执行 shell 命令。避免用 Bash 做能用专用工具的事 |
| **Grep** | 搜索文件内容。优先于 grep/rg 命令 |
| **Glob** | 搜索文件名。优先于 find/ls |
| **Agent** | 创建子代理处理复杂任务 |

### 3. 行为规则

System Prompt 中嵌入了大量的行为规则：

**代码修改规则**：
- 不要添加任务之外的功能
- 不要在未修改的代码中添加注释或类型注解
- 不要添加不必要的错误处理
- Bug 修复不需要顺便清理周围代码

**Git 规则**：
- 不要在未明确请求时 commit
- 不要在未明确请求时 push
- 永远不要 force push
- 永远不要 --no-verify
- 优先创建新 commit 而非 amend

**安全规则**：
- 注意 OWASP Top 10
- 如果发现自己写了不安全的代码，立即修复
- 不要生成或猜测 URL

### 4. 工具优先级

System Prompt 明确要求：

```
重要：当有专用工具可用时，不要使用 Bash：
- 读��件用 Read，不用 cat/head/tail
- 编辑文件用 Edit，不用 sed/awk
- 创建文件用 Write，不用 echo/heredoc
- 搜索文��用 Glob，不用 find
- 搜索内容用 Grep，不用 grep/rg
```

这就是为什么 Claude Code 总是用 Read 而不是 `cat`——System Prompt 规定的。

### 5. 输出规则

```
- 输出显示给用户的文本要简洁
- 使用 GitHub-flavored Markdown
- 引用代码时包含 file_path:line_number
```

## System Prompt 与 CLAUDE.md 的关系

```
System Prompt（Claude Code 内置，你不能修改）
    ↓ 基础规则
CLAUDE.md（你可以添加规则）
    ↓ 项目特定规则
你的对话指令
    ↓ 当前任务指令
```

**优先��**：System Prompt > CLAUDE.md > 对话指令

这意味着：
- 你**不能**在 CLAUDE.md 中覆盖 System Prompt 的安全规则（如"不要 force push"）
- 你**可以**添加 System Prompt ���有的规则（如"用 vitest 不用 jest"）
- 你**可以**细化 System Prompt 的规则（如"commit message 用中文"）

## 利用 System Prompt 写更好的指令

### 与 System Prompt 协同

```
# 好：利用 Claude 已知的工具优先级
帮我找出所有调用 getUserById ���地方
（Claude 会自动用 Grep 而非 grep）

# 差：与 System Prompt 冲突
运行 grep -r "getUserById" src/
（Claude 可能会拒绝并建议用 Grep 工具）
```

### 理解拒绝行为

如果 Claude Code 拒绝做某事，通常是 System Prompt 中有规则禁止：

| 你的请求 | Claude 拒绝原因 | System Prompt 规则 |
|----------|----------------|-------------------|
| "git push --force" | 危险操作 | "永远不要 force push" |
| "帮我 amend 上一个 commit" | 可能丢失工作 | "优先创建新 commit" |
| "把所有 TODO 删掉" | 范围太大 | "不要做任务之外的操作" |
| "顺便重构一下这个函数" | 超出范围 | "不要添加未请求的改进" |

### 明确覆盖

如果你确实需要做 System Prompt 限制的操作：

```
# 明确说你知道风险
我需要 amend 上一个 commit（我知道这会修改历史，这是我想要的）

# Claude 会照做，因为你明确请求了
```

## 参考资源

| 资源 | 说明 |
|------|------|
| [claude-code-system-prompts](https://github.com/Piebald-AI/claude-code-system-prompts) | 完整 System Prompt 拆解 |
| [Dive-into-Claude-Code](https://github.com/VILA-Lab/Dive-into-Claude-Code) | 学术级���构分析含 27 种 hook 事件 |
| [learn-claude-code](https://github.com/shareAI-lab/learn-claude-code) | 12 课 Harness 工程原理（中/���/日） |
