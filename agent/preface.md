# 前言：为什么你需要理解 Agent

## 2026 年，Agent 是 AI 的主旋律

2024 年，AI 是"聊天机器人"——你问它答。
2025 年，AI 变成"编码助手"——它能改代码。
2026 年，AI 进化为 **Agent（代理）**——它能**自主决策、调用工具、完成多步骤任务**。

Agent 不是一个产品名，而是一种**范式**。理解 Agent，你才能理解 Claude Code 为什么这样设计，Agent Teams 为什么这样工作，以及为什么 MCP 如此重要。

## 这本书解决什么问题

| 你的现状 | 读完后 |
|----------|--------|
| "Agent 是什么？和 ChatGPT 有什么区别？" | 清晰理解 Agent 的定义、架构和能力边界 |
| "Claude Code 里的 Subagent、Agent Teams 怎么选？" | 掌握 Claude 全部 Agent 形态的使用场景 |
| "想自己写一个 Agent 但不知道从哪开始" | 从零用 Agent SDK 构建完整项目 |
| "听过 LangChain、CrewAI 但不知道和 Claude 什么关系" | 理解主流框架的定位和选择 |
| "Agent 经常跑偏或陷入循环怎么办？" | 掌握 Agent 设计模式和调试技巧 |

## 结构

| Part | 内容 | 面向 |
|------|------|------|
| Part 1 | Agent 核心概念：什么是 Agent、与传统 AI 的区别、核心组件 | 零基础 |
| Part 2 | Claude 生态中的 Agent：Subagent / Agent Teams / Managed Agents | Claude 用户 |
| Part 3 | Agent 设计模式：ReAct / Plan-Execute / Reflection / Tool Use | 进阶 |
| Part 4 | Agent SDK 实战：从零构建完整 Agent 项目 | 开发者 |
| Part 5 | 第三方 Agent 框架：LangGraph / CrewAI / AutoGen 与 Claude 集成 | 开发者 |
| Part 6 | Agent 运维：评估、调试、安全、成本 | 专家 |

## 前置条件

- 用过 Claude（Chat 或 Code 都行）
- 如果读 Part 4-5，需要 TypeScript 或 Python 基础
- 不需要机器学习背景
