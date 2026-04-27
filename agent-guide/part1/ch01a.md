# 吴恩达的 Agentic AI 框架

> 本章基于 Andrew Ng（吴恩达）2024 年提出的 Agentic AI 框架。这是目前业界引用最广的 Agent 分类体系。

## 背景

2024 年 3 月，吴恩达在一次演讲中提出了 **"Agentic Workflows"（代理式工作流）** 的概念，并定义了四种核心设计模式。这个框架迅速成为 AI Agent 领域的"通用语言"。

他的核心观点：

> "我认为 AI Agentic Workflows 将在今年推动 AI 的巨大进步——甚至可能超过下一代基础模型带来的进步。"

## Agentic vs Non-Agentic

吴恩达首先区分了两种 AI 工作模式：

### Non-Agentic（非代理式）

```
用户输入 → LLM 一次性生成 → 输出
```

就像让一个人写文章但**不允许回头修改**——从第一个字写到最后一个字，一气呵成。

### Agentic（代理式）

```
用户输入 → LLM 生成初稿 → 自我审查 → 修改 → 再审查 → 定稿
```

就像正常的写作过程——写初稿、回头看、改、再看、再改。

**关键洞察**：即使用一个较弱的模型（如 GPT-3.5），采用 Agentic 工作流后的输出质量，可以**超过用强模型（如 GPT-4）但非 Agentic 方式**的输出质量。

这意味着：**工作流设计比模型本身更重要**。

## 四大设计模式

### 模式一：Reflection（反思）

**核心思想**：让 LLM 审查自己的输出，找出问题并改进。

```
生成 → 自我审查 → 发现问题 → 修正 → 再审查 → 通过
```

**最简实现**（零工具，纯 prompt）：

```
请帮我写一个 Python 函数实现快速排序。
写完后，请以代码审查者的角色审查你的代码：
1. 有没有 bug？
2. 边界情况处理了吗？（空列表、单元素、重复元素）
3. 有没有更好的写法？
基于审查结果修改代码。
```

**进阶实现（双 Agent）**：

```
Agent A（生成者）：写代码
Agent B（审查者）：审查 Agent A 的代码
Agent A 基于审查意见修改
Agent B 再审查
重复直到通过
```

**在 Claude Code 中实现**：

```
用一个 subagent 审查你刚才写的代码。
subagent 的角色是安全专家，只找安全漏洞。
基于它的发现修复问题。
```

**或用 Agent Teams**：

```
创建一个 2 人团队：
1. coder：写代码
2. reviewer：审查 coder 的代码，发消息给 coder 指出问题

coder 改完后 reviewer 再审查，直到 reviewer 说"通过"。
```

### 模式二：Tool Use（工具使用）

**核心思想**：让 LLM 调用外部工具获取信息或执行操作。

```
LLM 判断需要什么信息/操作 → 调用工具 → 获取结果 → 继续思考
```

**这正是 Claude Code 的核心能力**——Read、Write、Edit、Bash、Grep 都是工具。

**吴恩达的分类**：

| 工具类型 | 说明 | Claude 对应 |
|----------|------|------------|
| 信息检索 | 搜索、查数据库 | Grep、MCP（数据库） |
| 代码执行 | 运行代码验证结果 | Bash |
| 外部 API | 调用第三方服务 | MCP Servers |
| 文件操作 | 读写文件 | Read、Write、Edit |

**关键原则**：工具的**描述质量**决定了 Agent 能否正确使用工具。

```
# 差：LLM 不知道什么时候用
name: "do_stuff"

# 好：LLM 清楚知道什么时候用、怎么用
name: "query_user_database"
description: "查询用户数据库。输入 SQL SELECT 语句。只支持 SELECT。
用于回答关于用户数量、活跃度、注册趋势等问题。"
```

### 模式三：Planning（规划）

**核心思想**：让 LLM 先制定计划，再按计划执行。

```
任务 → 分解为子任务 → 确定顺序和依赖 → 逐步执行 → 验证
```

**吴恩达的规划层级**：

```
Level 1: 简单规划
  "先搜索文件 → 读取 → 分析 → 回答"

Level 2: 分层规划
  "Phase 1: 分析 → Phase 2: 设计 → Phase 3: 实现 → Phase 4: 测试"

Level 3: 自适应规划
  执行过程中根据新信息调整计划
  "原计划改 A 文件，但发现 B 也需要改 → 更新计划"
```

**在 Claude Code 中实现**：

```
/plan

重构用户认证模块。
先出完整的分阶段计划，每个阶段列出：
- 要做什么
- 涉及哪些文件
- 依赖哪个前置阶段
- 预计复杂度
```

**与 Agent Teams 结合**：

```
1. /plan 制定计划
2. 用 Delegate Mode 创建团队
3. 按计划分配任务给各 teammate
4. 每个阶段完成后验证再进入下一阶段
```

### 模式四：Multi-Agent Collaboration（多代理协作）

**核心思想**：多个专业化的 Agent 各司其职，协作完成复杂任务。

```
Agent A（研究者）→ 收集信息
Agent B（分析师）→ 分析数据
Agent C（写作者）→ 撰写报告
Agent D（审查者）→ 审查质量
```

**吴恩达的关键观点**：

1. **专业化比通用化更有效**——一个"安全专家"Agent 比一个"什么都做"的 Agent 在安全方面表现更好
2. **对话比指令更自然**——让 Agent 之间对话讨论，比给一个 Agent 所有指令更好
3. **角色定义是关键**——每个 Agent 的 system prompt 要明确定义角色、职责和边界

**在 Claude Code 中的完整实现**：

```
进入 Delegate Mode。

创建一个 4 人团队来做竞品分析：

1. researcher
   - 角色：技术调研员
   - 任务：用 Fetch MCP Server 获取竞品网站信息
   
2. analyst
   - 角色：数据分析师
   - 任务：用 PostgreSQL MCP Server 查询我们的产品数据

3. writer
   - 角色：报告撰写者
   - 任务：基于 researcher 和 analyst 的发现写报告
   - 依赖：等前两人完成

4. reviewer
   - 角色：质量审查
   - 任务：审查 writer 的报告，提出改进
   - writer 根据反馈修改（Reflection 模式嵌入 Multi-Agent 模式）
```

## 四种模式的组合

吴恩达强调，**这四种模式不是互斥的，最强大的 Agent 系统是它们的组合**：

```
Multi-Agent（多个专业 Agent）
  + Planning（每个 Agent 有自己的计划）
    + Tool Use（每个 Agent 使用不同的工具）
      + Reflection（完成后互相审查）
```

**在 Claude Code 中的终极组合**：

```
/plan → 制定计划（Planning）
→ Agent Teams（Multi-Agent）
  → 每个 teammate 使用 MCP Servers（Tool Use）
  → 完成后互相审查（Reflection）
```

## 与我们 Agent 指南的对应关系

| 吴恩达的模式 | Agent 指南章节 |
|-------------|--------------|
| Reflection | Ch13（设计模式）+ 本章深度 |
| Tool Use | Ch1-2（核心概念）+ MCP 完全指南 |
| Planning | Ch10（Plan→Team）+ Ch13 |
| Multi-Agent | Ch3-12（Agent 全景 + Teams） |

本章补充了吴恩达框架的**理论视角和组合方法论**。具体的实操指南在对应章节中。

## 推荐学习资源

| 资源 | 平台 | 内容 |
|------|------|------|
| **AI Agentic Design Patterns with AutoGen** | DeepLearning.AI | 四大模式 + AutoGen 实操 |
| **AI Agents in LangGraph** | DeepLearning.AI | 状态机编排 + 条件分支 |
| **Multi AI Agent Systems with crewAI** | DeepLearning.AI | 角色驱动多 Agent |
| **Functions, Tools and Agents with LangChain** | DeepLearning.AI | Tool Use 基础 |
| **Building Agentic RAG with LlamaIndex** | DeepLearning.AI | RAG + Agent 组合 |
| **吴恩达博客：Agentic Design Patterns** | deeplearning.ai/blog | 四大模式的原始定义 |
| **The Batch Newsletter** | deeplearning.ai/the-batch | Agent 领域动态 |

所有 DeepLearning.AI 短课程均**免费**，每门 1-2 小时。

## 关键性能数据

吴恩达在演讲中展示了一组颠覆性的数据（HumanEval 编码基准测试）：

| 模式 | 正确率 |
|------|--------|
| GPT-3.5 zero-shot（非 Agentic） | 48.1% |
| GPT-4 zero-shot（非 Agentic） | 67.0% |
| **GPT-3.5 + Agentic Workflow** | **超过 GPT-4 zero-shot** |

**这意味着**：一个弱模型 + Agentic 工作流 > 一个强模型 + 非 Agentic 方式。

工作流设计的投入产出比，可能高于换更强的模型。用吴恩达的话说：

> "花 $100K 在 Agentic reasoning 上取得的进展，可能超过花 $100M 在模型 scaling 上的效果。"

## 吴恩达对未来的预测

1. **近期**：Agentic reasoning 已成为 LLM 的默认特性，大多数新模型自动使用
2. **中期**：到 2030 年，超过 70% 的软件项目将由 AI Agent 指导开发
3. **长期**：AGI 仍需"很多个十年"——与其等更强的模型，不如在现有模型上叠加 Agentic 工作流
4. **关键洞见**：Agent 系统需要更长的响应时间，用户需要接受"不再是即时回答"的交互模式

## 来源

- [Sequoia AI Ascent 演讲视频](https://www.youtube.com/watch?v=sal78ACtGTc)
- [The Batch Issue 242 - 四大模式原文](https://www.deeplearning.ai/the-batch/tag/letters/)
- [Twitter 原始帖子](https://x.com/AndrewYNg/status/1773393357022298617)
