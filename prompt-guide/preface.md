# 《Claude Prompt 工程》

## 为什么专门讲 Claude 的 Prompt

通用 prompt 技巧让你"能用"，Claude 专属技巧让你"用得好"。

Claude 有独特的特性：XML 标签亲和力、Extended Thinking、Prompt Caching、对 System Prompt 的高遵循度。本书专注这些差异化能力。

## 结构

| Part | 内容 | 章节 |
|------|------|------|
| **Part 1** | 模型选择 + 基础技术 | Ch1-2 |
| **Part 2** | Claude 特有：XML / Thinking / Caching | Ch3-5 |
| **Part 3** | 场景实战：代码 / 数据 / 写作 / 翻译 | Ch6-9 |
| **Part 4** | 反模式 + 安全 + API 调优 | Ch10-11 |

> **CLAUDE.md 配置**已移至[《Code 完全指南》Part 4](/code-guide/part4/ch10)，本书不再重复。

## 交叉引用

| 本书章节 | 深入学习请看 |
|----------|------------|
| Ch1 模型选择 | [Agent 指南 Ch1](/agent-guide/part1/ch01) 理解模型在 Agent 中的角色 |
| Ch3 XML 标签 | [Code 指南 Ch10a](/code-guide/part4/ch10a) 了解 System Prompt 中 XML 的使用 |
| Ch5 Caching | [Code 指南 附录B](/code-guide/appendix/b) 了解整体成本优化策略 |
| Ch5a Cookbook | [Agent 指南 Ch22a](/agent-guide/part6/ch22a) DeepLearning.AI 课程导航 |
| Ch6 代码审查 Prompt | [Code 指南 R01-R05](/code-guide/part6/ch19) 完整的审查 Recipes |
| Ch10 反模式 | [Agent 指南 Ch21](/agent-guide/part6/ch21) Agent 特有的失败模式 |
| Ch11 API 调优 | [企业实战 Ch6](/enterprise/part2/ch06) 企业级成本优化 |

## 外部配套资源

| 资源 | 说明 |
|------|------|
| [Anthropic Cookbook](https://github.com/anthropics/anthropic-cookbook) | 80+ 官方 Notebook（41.6k stars） |
| [Anthropic Prompt Guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview) | 官方 Prompt 指南 |
| [AWS Claude Prompt Engineering](https://github.com/aws-samples/prompt-engineering-with-anthropic-claude-v-3) | AWS 官方教程 |
