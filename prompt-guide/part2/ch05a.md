# Anthropic Cookbook：官方代码示例导航

> [anthropic-cookbook](https://github.com/anthropics/anthropic-cookbook)（41.6k stars）是 Anthropic 官方维护的 80+ 个 Jupyter Notebook 集合。每个示例都可直接运行。本章整理与学院内容最相关的部分。

## 与 Prompt 工程最相关的 Cookbook

### Tool Use（14 个 Notebook）

这是 Cookbook 中最丰富的部分。

| Notebook | 核心内容 | 与本学院的关系 |
|----------|---------|---------------|
| `calculator_tool` | 最简工具调用示例 | Prompt Ch2 基础补充 |
| `extracting_structured_json` | 用 tool use 强制 JSON 输出 | **关键**——比 JSON mode 更可靠的结构化输出 |
| `tool_choice` | auto/any/tool 三种选择策略 | 理解 Agent 如何选工具 |
| `parallel_tools` | 并行工具调用 | Agent 指南 Ch2 补充 |
| `tool_use_with_pydantic` | Pydantic 定义 schema | SDK 开发必备 |
| `vision_with_tools` | 视觉 + 工具组合 | 多模态 Agent |
| `tool_search_with_embeddings` | 用向量检索最相关工具 | **高级**——工具数量多时的检索策略 |
| `memory_cookbook` | 工具实现的记忆管理 | Code 指南 Memory 章节补充 |
| `automatic-context-compaction` | 自动上下文压缩 | Code 指南 Ch4 对话管理 |
| `customer_service_agent` | 完整客服 Agent | 完整示例参考 |
| `threat_intel_enrichment_agent` | 安全情报 Agent | 安全领域 Agent 示例 |
| `tool_evaluation` | 评估工具调用准确性 | **关键**——Agent 评估方法 |

### Prompt Caching（2 个 Notebook）

| Notebook | 核心内容 | 关键代码 |
|----------|---------|---------|
| `prompt_caching` | 基础缓存用法 | `cache_control: {"type": "ephemeral"}` |
| `speculative_prompt_caching` | 投机性缓存——**高级策略** | 预测性地缓存可能需要的内容 |

**投机性缓存**是我们学院完全没有的内容：

```python
# 传统缓存：缓存已知会重复的内容
messages = [
    {"role": "user", "content": [
        {"type": "text", "text": LARGE_CONTEXT, "cache_control": {"type": "ephemeral"}},
        {"type": "text", "text": "问题A"}
    ]}
]

# 投机性缓存：预测性地缓存
# 即使不确定下一次是否用同样的前缀，也先缓存
# 如果命中，省 90%；如果不命中，只多付缓存写入成本（25%）
# 期望值分析：命中率 > 28% 就值得
```

### Extended Thinking（2 个 Notebook）

| Notebook | 核心内容 |
|----------|---------|
| `extended_thinking` | 思考预算管理、`budget_tokens` 参数 |
| `extended_thinking_with_tool_use` | **关键**——Thinking + Tool Use 组合 |

Thinking + Tool Use 组合的关键发现：

```python
# Extended Thinking 与 Tool Use 组合时的注意事项：
# 1. thinking 发生在工具调用之前
# 2. 每轮工具调用后 thinking 可能重新开始
# 3. budget_tokens 是整个对话的总预算，不是每轮的
response = client.messages.create(
    model="claude-opus-4-6",
    thinking={"type": "enabled", "budget_tokens": 10000},
    tools=[...],
    messages=[...]
)
```

## 与 Agent 构建最相关的 Cookbook

### Agent 设计模式（patterns/agents/）

Anthropic 官方定义的三种 Agent 架构模式：

| 模式 | Notebook | 架构 |
|------|---------|------|
| **Prompt Chaining** | `basic_workflows` | A → B → C 顺序链 |
| **Routing** | `basic_workflows` | 路由器分发到不同处理器 |
| **Evaluator-Optimizer** | `evaluator_optimizer` | 生成 → 评估 → 优化循环（=吴恩达的 Reflection） |
| **Orchestrator-Workers** | `orchestrator_workers` | 编排器 + 多工作者（=Agent Teams 的底层模式） |

配套博文：[Building Effective Agents](https://anthropic.com/research/building-effective-agents)

**核心观点**（来自 Anthropic 官方博文）：

> "成功的 Agent 不需要复杂的框架。它们建立在简单、可组合的模式之上。"

Anthropic 推荐的实现顺序：
1. 先从简单的 Prompt Chaining 开始
2. 需要分支时加 Routing
3. 需要迭代时加 Evaluator-Optimizer
4. 需要并行时加 Orchestrator-Workers
5. **只有以上都不够时才上完整的 Agent 循环**

### Claude Agent SDK Cookbook（6 个 Notebook）

从简到繁的 Agent SDK 实战：

| # | Notebook | 内容 | 复杂度 |
|---|---------|------|--------|
| 00 | One-liner Research Agent | `query()` 一行代码 Agent | 入门 |
| 01 | Chief of Staff Agent | 多 Agent + Memory + Hooks | 中级 |
| 02 | Observability Agent | MCP 集成（Git/GitHub） | 中级 |
| 03 | Site Reliability Agent | SRE 事件响应 + Prometheus | 高级 |
| 04 | Migrating from OpenAI | 从 OpenAI SDK 迁移 | 参考 |
| 05 | Session Browser | Session 浏览器 Demo | 参考 |

### Managed Agents Cookbook（8 个 Notebook）

云端托管 Agent 的完整示例：

| Notebook | 场景 | 核心学习点 |
|----------|------|-----------|
| Data Analyst Agent | CSV → HTML 报告 | 文件挂载、产物提取 |
| Slack Data Bot | Slack Bot | 多轮 session 管理 |
| SRE Incident Responder | 事件响应 | 告警 → 调查 → PR → 审批 → 合并 |
| Iterate & Fix Tests | 迭代修复 | Agent/Environment/Session 概念 |
| Issue to PR | Issue → PR | 全流程自动化 |
| Explore Codebase | 陌生代码库 | 动态资源添加 |
| Human-in-the-Loop | 人工审批 | 自定义审批流 |
| Prompt Versioning | Prompt 管理 | 版本控制、回滚、评估 |

## 与 RAG 最相关的 Cookbook

| Notebook | 内容 | 与 Agentic RAG 的关系 |
|----------|------|---------------------|
| `retrieval_augmented_generation/guide` | 从零构建 RAG | 传统 RAG 基线 |
| `contextual-embeddings/guide` | 语义搜索 + BM25 + Reranker | 混合检索策略 |
| `knowledge_graph/guide` | 知识图谱构建 | GraphRAG 的基础 |
| `text_to_sql/guide` | 自然语言转 SQL | Agentic RAG 的 SQL 分支 |
| LlamaIndex `Router_Query_Engine` | 查询路由 | Router RAG 模式 |
| LlamaIndex `SubQuestion_Query_Engine` | 子问题拆解 | Agentic RAG 的分治模式 |
| LlamaIndex `Multi_Document_Agents` | 多文档 Agent | Agentic RAG 的多源模式 |

## 评估相关

| Notebook | 内容 |
|----------|------|
| `building_evals` | 构建自动化评估框架 |
| `generate_test_cases` | 自动生成测试用例 |
| `tool_evaluation` | 评估工具调用准确性 |

**评估框架的核心方法**：
```python
# Anthropic 推荐的评估方式
# 1. 定义 golden test cases
# 2. 用弱模型跑基线
# 3. 用 agentic workflow 跑实验组
# 4. 用强模型（Opus）做 judge
# 5. 量化对比
```

## 如何使用 Cookbook

### 直接运行

```bash
git clone https://github.com/anthropics/anthropic-cookbook.git
cd anthropic-cookbook
pip install -r requirements.txt
jupyter notebook
```

### 推荐学习顺序

```
Week 1: 基础
  → tool_use/calculator_tool.ipynb
  → tool_use/extracting_structured_json.ipynb
  → misc/prompt_caching.ipynb

Week 2: Agent
  → patterns/agents/basic_workflows.ipynb
  → patterns/agents/evaluator_optimizer.ipynb
  → claude_agent_sdk/00_The_one_liner_research_agent.ipynb

Week 3: 进阶
  → extended_thinking/extended_thinking_with_tool_use.ipynb
  → claude_agent_sdk/01_The_chief_of_staff_agent.ipynb
  → capabilities/retrieval_augmented_generation/guide.ipynb

Week 4: 生产
  → managed_agents/CMA_orchestrate_issue_to_pr.ipynb
  → misc/building_evals.ipynb
  → observability/usage_cost_api.ipynb
```

## 仓库地址

**https://github.com/anthropics/anthropic-cookbook** (41.6k stars)

所有 Notebook 均为 MIT 协议，可自由使用和修改。
