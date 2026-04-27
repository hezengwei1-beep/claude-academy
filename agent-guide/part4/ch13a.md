# Agentic RAG：让 Agent 自主检索知识

> 这是吴恩达 Agent 教学体系中的重要补充。传统 RAG 是"固定流水线"，Agentic RAG 是"有自主判断力的研究助手"。

## 传统 RAG vs Agentic RAG

### 传统 RAG

```
用户问题 → Embedding → 向量搜索 → Top-K 结果 → LLM 生成答案
```

**固定流程**，不管问题简单还是复杂，都走同一条管道。

### Agentic RAG

```
用户问题 → Agent 判断：
  ├─ 简单事实查询 → 直接检索向量库（快/便宜）
  ├─ 需要多源对比 → 同时查向量库 + SQL + API
  ├─ 需要深度分析 → 迭代检索：查 → 分析 → 补充查 → 再分析
  └─ 检索结果不足 → 自动换数据源或改写查询
```

**Agent 自主决定**何时检索、从哪里检索、检索几次。

### 关键对比

| 维度 | 传统 RAG | Agentic RAG |
|------|----------|-------------|
| 检索策略 | 固定（embed → retrieve） | 动态（Agent 自主决策） |
| 数据源 | 通常单一向量库 | 多源（向量库 + SQL + API + Web） |
| 迭代能力 | 无（一次检索） | 有（检索 → 评估 → 再检索） |
| 自我评估 | 无 | 有（检查答案质量，不够就再查） |
| 成本 | 固定 | 自适应（简单问题少花钱） |
| 质量 | 受 Top-K 限制 | 迭代优化直到满意 |

## Anthropic 的实践：用 Agentic Search 替代传统 RAG

**关键发现**：Anthropic 在 Claude Code 的开发中，最初用传统 RAG（embeddings + 向量库 + 分块检索），后来**完全替换为 Agentic Search**：

- 用 `grep`、`glob`、文件读取 + 迭代式精炼
- 无需预处理或嵌入向量
- Claude Code 创建者 Boris Cherny 的原话：

> "Agentic search generally works better. It is also simpler and doesn't have the same issues around security, privacy, staleness, and reliability."

> "（性能）outperformed everything. By a lot."

**核心哲学**："给模型工具，然后让开"——用更少的工程脚手架、更多的模型能力。

### 这意味着什么

对于**代码库搜索**场景（Claude Code 的主要使用场景），你不需要搭建复杂的 RAG 管道。Claude Code 本身就是 Agentic Search：

```
你：找出所有与支付相关的代码

Claude Code（Agentic Search）：
1. [Grep] 搜索 "payment|pay|billing|charge" → 找到 15 个文件
2. [Read] 读取最相关的 5 个文件
3. [分析] 这些文件之间的调用关系
4. [Grep] 搜索 Stripe 相关的导入 → 补充发现 2 个配置文件
5. [Read] 读取配置文件确认集成方式
6. 输出完整的支付模块分析
```

这比"把整个代码库切成 chunks → embedding → 向量搜索"更准确、更灵活、更实时。

## 五种 Agentic RAG 架构模式

### 模式 1：Router RAG（路由式）

```
用户问题 → 路由 Agent
  ├─ 简单查询 → Naive RAG（快）
  ├─ 复杂分析 → Full Agentic RAG（慢但准）
  └─ 关系查询 → GraphRAG
```

**优势**：简单查询不浪费资源，复杂查询不牺牲质量。
**数据**：可节省约 40% 成本，降低 35% 延迟。

### 模式 2：Self-RAG（自评估式）

```
检索 → 生成答案 → 自我评估：
  "我的答案有足够的证据支持吗？"
  ├─ 是 → 输出
  └─ 否 → 重新检索或换数据源
```

**适合**：需要高准确度的场景（法律、医疗、金融）。

### 模式 3：Corrective RAG（纠正式）

```
检索 → 评估检索结果的相关性
  ├─ 相关 → 生成答案
  └─ 不相关 → 重写查询 / 换数据源 / 回退到 Web 搜索
```

**适合**：数据源质量参差不齐的场景。

### 模式 4：Hierarchical Agent RAG（层级式）

```
主管 Agent
  ├─ SQL Worker → 查结构化数据
  ├─ Vector Worker → 查非结构化文档
  ├─ API Worker → 查外部服务
  └─ Web Worker → 搜索互联网

主管综合所有 Worker 的结果生成答案
```

**适合**：企业级多源数据场景。

**在 Claude Code 中实现**：

```
创建一个 3 人检索团队：

1. db-searcher：用 PostgreSQL MCP Server 查结构化数据
2. doc-searcher：用 Filesystem MCP Server 搜索文档
3. web-searcher：用 Fetch MCP Server 获��网页内容

各自检索后汇总给 Lead，Lead 综合生成答案。
```

### 模式 5：HyDE（假设文档嵌入）

```
用户问题 → LLM 先生成一个"假设性答案"
→ 把假设答案嵌入向量
→ 用假设答案的向量去检索真实文档
→ 用真实文档生成最终答案
```

**原理**：假设答案虽然可能不准确，但它的语义空间比原始问题更接近真实答案，因此检索效果更好。

**适合**：长尾查询、专业领域问题。

## 在 Claude Code 中实现 Agentic RAG

### 方案 A：纯 Claude Code（推荐）

对于代码库和本地文件，不需要向量数据库：

```
分析 docs/ 目录下所有关于 API 设计的文档：

1. 先用 Glob 找到所有 .md 文件
2. 用 Grep 搜索包含 "API" 的文件
3. 读取最相关的文件
4. 如果信息不够，扩大搜索范围
5. 综合分析生成报告
```

### 方案 B：Claude + MCP（多源）

```json
{
  "mcpServers": {
    "postgres": { "command": "npx", "args": ["-y", "@mcp/server-postgres"], "env": { "DATABASE_URL": "..." } },
    "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem", "./docs"] },
    "fetch": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-fetch"] }
  }
}
```

```
回答"我们的付费用户最关心什么功能"：

1. 查数据库：付费用户的功能使用频率统计
2. 搜索文档：产品路线图中的优先级
3. 获取网页：竞品的功能对比
4. 综合三个数据源生成洞察
```

### 方案 C：Agent SDK + 向量数据库（产品级）

```typescript
import { createAgent } from '@anthropic-ai/claude-code';

const searchVectorDB: Tool = {
  name: 'search_knowledge_base',
  description: '在知识库中语义搜索，返回最相关的文档片段',
  parameters: {
    properties: {
      query: { type: 'string' },
      topK: { type: 'number', default: 5 },
    },
    required: ['query'],
  },
  execute: async ({ query, topK = 5 }) => {
    // 调用你的向量数据库（Pinecone/Weaviate/Chroma）
    const results = await vectorDB.search(query, topK);
    return { data: results.map(r => r.content).join('\n\n') };
  },
};

const searchSQL: Tool = {
  name: 'query_analytics',
  description: '查询分析数据库获取用户行为数据',
  execute: async ({ sql }) => {
    const result = await analyticsDB.query(sql);
    return { data: JSON.stringify(result) };
  },
};

const agent = createAgent({
  model: 'claude-sonnet-4-6',
  systemPrompt: `你是一个智能研究助手。
当用户提问时：
1. 先判断问题类型（事实查询/分析/对比）
2. 选择合适的数据���（知识库/数据库/两者都用）
3. 检索信息
4. 评估信息是否足够回答问题
5. 不够就补充检索
6. 生成有引用的答案`,
  tools: [searchVectorDB, searchSQL],
});
```

## 何时用 Agentic RAG vs 传统 RAG

| 场景 | 推荐 |
|------|------|
| 简单 FAQ 系统 | 传统 RAG（够用且便宜） |
| 代码库搜索 | Claude Code 自带的 Agentic Search |
| 多源企业知识库 | Agentic RAG（Hierarchical） |
| 需要高准确度 | Self-RAG 或 Corrective RAG |
| 成本敏感 | Router RAG（按复杂度路由） |

## 推荐学习资源

| 资源 | 说明 |
|------|------|
| [Building Agentic RAG with LlamaIndex](https://www.deeplearning.ai/short-courses/building-agentic-rag-with-llamaindex/) | DeepLearning.AI 免费课程，2 小时 |
| [Agentic RAG Survey (arXiv 2501.09136)](https://arxiv.org/abs/2501.09136) | 学术综述，系统分类 |
| [NVIDIA: Traditional vs Agentic RAG](https://developer.nvidia.com/blog/traditional-rag-vs-agentic-rag/) | 工程视角对比 |
| [Anthropic RAG Cookbook](https://platform.claude.com/cookbook/capabilities-retrieval-augmented-generation-guide) | Claude 官方 RAG 实现指南 |
