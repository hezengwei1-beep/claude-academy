
# 前言

## 为什么是"Claude Prompt 工程"而不是"通用 Prompt 工程"

市面上有大量通用的 prompt engineering 教程，但 Claude 和 GPT-4 对 prompt 的响应方式是不同的。Claude 有自己的特性：

- **XML 标签**：Claude 对 XML 标签的响应特别好
- **Extended Thinking**：Claude 有独特的深度思考模式
- **System Prompt 权重**：Claude 对 system prompt 的遵循度极高
- **CLAUDE.md**：Claude Code 的项目级指令系统
- **Prompt Caching**：Claude API 的缓存机制可以大幅降成本

通用技巧只能让你"能用"，针对 Claude 的技巧让你"用得好"。这本书专注后者。

## 本书结构

| Part | 内容 | 面向 |
|------|------|------|
| Part 1 | Claude 模型特性、基础 prompt 技术 | 所有人 |
| Part 2 | Claude 特有技术（XML、Thinking、Caching） | 进阶用户 |
| Part 3 | 场景实战（代码、写作、数据、翻译） | 实操者 |
| Part 4 | API 层优化和评估 | 开发者 |
| Part 5 | CLAUDE.md 与项目级 prompt 管理 | Claude Code 用户 |

## 与系列其他书的关系

```
《Prompt 工程实战》→ 基础层：一个 Claude 怎么用好
《协作全书》      → 协作层：多个 Claude 怎么协作
《MCP 全书》      → 连接层：Claude 怎么连接外部世界
```

三本书独立可读，但技能是叠加的。
