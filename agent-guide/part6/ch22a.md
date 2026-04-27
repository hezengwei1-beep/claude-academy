# DeepLearning.AI Agent 课程导航

> 吴恩达的 DeepLearning.AI 平台提供了目前最系统的 AI Agent 免费课程体系。本章整理所有课程并标注与本学院内容的对应关系。

## 旗舰课程

| 课程 | 讲师 | 内容 | 学院对应 |
|------|------|------|---------|
| **[Agentic AI](https://www.deeplearning.ai/courses/agentic-ai/)** | Andrew Ng | 四大模式 + Function Calling + MCP + 评估部署 | Agent 指南全书 |
| **[Claude Code: Highly Agentic Coding](https://www.deeplearning.ai/short-courses/claude-code-a-highly-agentic-coding-assistant/)** | Anthropic | Claude Code 的 Agentic 最佳实践 | Code 完全指南 |
| **[Agent Skills with Anthropic](https://www.deeplearning.ai/short-courses/agent-skills-with-anthropic/)** | Anthropic | Claude 技能系统 | Code 指南 Part 4 |
| **[MCP: Build Rich-Context AI Apps](https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/)** | Anthropic | MCP 协议实操 | MCP 完全指南 |

## 设计模式课程

| 课程 | 框架 | 核心学习点 | 学院对应 |
|------|------|-----------|---------|
| **[AI Agentic Design Patterns with AutoGen](https://www.deeplearning.ai/short-courses/ai-agentic-design-patterns-with-autogen/)** | AutoGen | 四大模式的代码实现 | Agent 指南 Ch1a + Ch13 |
| **[AI Agents in LangGraph](https://www.deeplearning.ai/short-courses/ai-agents-in-langgraph/)** | LangGraph | 状态机编排 + 条件分支 | Agent 指南 Ch20 |
| **[Functions, Tools and Agents with LangChain](https://www.deeplearning.ai/short-courses/functions-tools-agents-langchain/)** | LangChain | Tool Use 基础 | Agent 指南 Ch1-2 |
| **[Building Agentic RAG with LlamaIndex](https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/)** | LlamaIndex | Agentic RAG | Agent 指南 Ch13a |

## 多代理系统课程

| 课程 | 框架 | 核心学习点 | 学院对应 |
|------|------|-----------|---------|
| **[Multi AI Agent Systems with crewAI](https://www.deeplearning.ai/short-courses/multi-ai-agent-systems-with-crewai/)** | CrewAI | 角色驱动多 Agent | Agent 指南 Ch20 |
| **[Practical Multi AI Agents with crewAI](https://www.deeplearning.ai/short-courses/practical-multi-ai-agents-and-advanced-use-cases-with-crewai/)** | CrewAI | 进阶：优化+人类反馈 | Agent 指南 Ch20-22 |
| **[Design & Deploy Multi-Agent Systems](https://www.deeplearning.ai/courses/design-develop-and-deploy-multi-agent-systems-with-crewai/)** | CrewAI | 完整课：可观测性+评估+部署 | Agent 指南 Ch21-22 |

## Agent 通信协议课程

| 课程 | 协议 | 核心学习点 | 学院对应 |
|------|------|-----------|---------|
| **[A2A: Agent2Agent Protocol](https://www.deeplearning.ai/short-courses/a2a-the-agent2agent-protocol/)** | Google A2A | Agent 发现与通信标准化 | 扩展知识 |
| **[ACP: Agent Communication Protocol](https://learn.deeplearning.ai/courses/acp-agent-communication-protocol/)** | IBM ACP | Agent 间通信 | 扩展知识 |

## Coding Agent 课程

| 课程 | 内容 | 学院对应 |
|------|------|---------|
| **[Building Coding Agents with Tool Execution](https://www.deeplearning.ai/short-courses/building-coding-agents-with-tool-execution/)** | 代码 Agent + 沙箱执行 | Agent 指南 Part 5 |
| **[Spec-Driven Development with Coding Agents](https://www.deeplearning.ai/short-courses/spec-driven-development-with-coding-agents/)** | JetBrains，规范驱动开发 | Code 指南 + Agent 指南 |
| **[Gemini CLI: Code with Open-Source Agent](https://www.deeplearning.ai/short-courses/gemini-cli-code-and-create-with-an-open-source-agent/)** | Google Gemini CLI | 竞品了解 |

## 推荐学习顺序

如果你已经在读 Claude 学院，以下顺序最高效：

```
阶段 1（配合 Agent 指南 Part 1-2）：
  → Agentic AI（旗舰课，概念全面）
  → AI Agentic Design Patterns with AutoGen（四大模式代码实现）

阶段 2（配合 Agent 指南 Part 3）：
  → Multi AI Agent Systems with crewAI（多代理基础）
  → Claude Code: Highly Agentic Coding（Claude 专项）

阶段 3（配合 Agent 指南 Part 4-5）：
  → AI Agents in LangGraph（状态机编排）
  → Building Agentic RAG with LlamaIndex（RAG + Agent）
  → MCP: Build Rich-Context AI Apps（MCP 实操）

阶段 4（配合 Agent 指南 Part 6）：
  → Practical Multi AI Agents with crewAI（进阶优化）
  → Building Coding Agents with Tool Execution（Agent 安全执行）
```

## 不在 DeepLearning.AI 但值得看的资源

| 资源 | 类型 | 内容 |
|------|------|------|
| [Sequoia AI Ascent 演讲](https://www.youtube.com/watch?v=sal78ACtGTc) | 视频 | 吴恩达 Agentic Workflows 原始演讲 |
| [The Batch Newsletter](https://www.deeplearning.ai/the-batch/) | 周刊 | Agent 领域动态 |
| [Anthropic Engineering Blog](https://www.anthropic.com/engineering) | 博客 | Claude Agent 实践 |
| [LangChain Blog](https://blog.langchain.dev/) | 博客 | LangGraph Agent 实践 |
| [arXiv: Agentic RAG Survey](https://arxiv.org/abs/2501.09136) | 论文 | Agentic RAG 系统分类 |

## 全部免费

所有 DeepLearning.AI 短课程（Short Courses）均**免费**，每门约 1-2 小时，含 Jupyter Notebook 实操环境。完整课程页面：

**[DeepLearning.AI - Agent 课程筛选](https://www.deeplearning.ai/courses/?courses_date_desc%5BrefinementList%5D%5Btopic%5D%5B0%5D=Agents)**
