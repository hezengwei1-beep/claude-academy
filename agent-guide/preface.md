# 《Agent 完全指南》

## 从概念到编程构建——一本书讲透 Agent

本书是 Claude 学院中最核心的一本。它回答三个问题：

1. **Agent 是什么？**（Part 1-2）—— 概念、原理、Claude 的五种 Agent 形态
2. **怎么用好 Agent？**（Part 3-4）—— Agent Teams 深度实操、六种设计模式
3. **怎么自己造 Agent？**（Part 5-6）—— SDK 编程、完整项目、第三方框架、生产运维

## 结构

| Part | 内容 | 章节 | 面向 |
|------|------|------|------|
| **Part 1** | 核心概念 | Ch1-2 | 什么是 Agent、ReAct 循环原理 |
| **Part 2** | Claude Agent 全景 | Ch3-5 | 五种形态、Subagent 实战、选择指南 |
| **Part 3** | Agent Teams 深度 | Ch6-12 | 架构、配置、编排、Delegate、Plan、文件边界、Worktrees |
| **Part 4** | 设计模式 | Ch13 | ReAct / Plan-Execute / Reflection / Debate 等六种 |
| **Part 5** | SDK 编程 | Ch14-19 | 架构、工具、编排、从零构建、产品集成、Slack Bot |
| **Part 6** | 框架与运维 | Ch20-22 | LangGraph/CrewAI、调试评估、生产运维 |

## 前置条件

- 读过《Code 完全指南》Part 1-2（或有同等使用经验）
- Part 5-6 需要 TypeScript 或 Python 基础
- 不需要 AI/ML 背景

## 学习路径

```
只想用 Agent → Part 1-4（概念 + Teams 实操）
想自己造 Agent → Part 1-2 → Part 5-6（概念 + SDK）
全面掌握 → 从头到尾
```

## 交叉引用

| 本书章节 | 深入学习请看 |
|----------|------------|
| Ch1a 吴恩达框架 | [DeepLearning.AI 课程导航](/agent-guide/part6/ch22a) 有完整学习路径 |
| Ch6-12 Agent Teams | [Code 指南 Ch12-13](/code-guide/part4/ch12) 了解 Hooks 与 Teams 的配合 |
| Ch13a Agentic RAG | [MCP 指南 Ch4c](/mcp-guide/part2/ch04c) 了解 Memory Server 在 RAG 中的作用 |
| Ch14-19 SDK 编程 | [Prompt 工程 Ch5a Cookbook](/prompt-guide/part2/ch05a) 有 6 个官方 SDK Notebook |
| Ch20 LangGraph/CrewAI | [MCP 指南 Ch10a](/mcp-guide/part4/ch10a) 了解多 Server 编排与多 Agent 的组合 |
| Ch21 调试评估 | [企业实战 Ch5](/enterprise/part1/ch05) 的失败案例是最好的反面教材 |

## 外部配套资源

| 资源 | 说明 |
|------|------|
| [Anthropic Cookbook - Agent SDK](https://github.com/anthropics/anthropic-cookbook/tree/main/claude_agent_sdk) | 6 个官方 Notebook |
| [Anthropic Cookbook - Agent Patterns](https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents) | 3 种官方架构模式 |
| [Building Effective Agents](https://anthropic.com/research/building-effective-agents) | Anthropic 官方博文 |
| [DeepLearning.AI Agent 课程](https://www.deeplearning.ai/courses/?courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B0%5D=Agents) | 16 门免费课程 |
