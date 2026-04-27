# Agent Harness 与 Agentic Engineering 方法论

> 本章基于 GitHub 上星数最高的 Claude 实践仓库（everything-claude-code 140k+ stars、claude-code-best-practice 46.6k stars）提炼的工程方法论。

## 什么是 Agent Harness

**Harness（驾驭系统）** 是包裹在 LLM 外面的一整套工程架构，让 AI Agent 可控、可靠、可复现。

```
┌─────────────────────────────────────────────┐
│              Agent Harness                   │
│                                              │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐   │
│  │ Skills  │  ��Instincts │  │ Memory   │   │
│  │(技能)   │  │(本能)    │  │(记忆)    │   │
│  └────┬────┘  └────┬─────┘  └────┬─────┘   │
│       │            │             │           │
│  ┌────▼────────────▼─────────────▼────┐     │
│  │           LLM 大脑                  │     │
│  │    Claude Opus / Sonnet / Haiku     │     │
│  └────────────────┬───────────────────┘     │
│                   │                          │
│  ┌────────────────▼────��──────────────┐     │
│  │           Tool Layer                │     │
│  │  Read │ Write │ Bash │ MCP │ Agent  │     │
│  └────────────────────────────────────┘     │
│                                              │
│  ┌────────────────────────────────────┐     │
│  │         Security Layer              │     │
│  │  Permissions │ Hooks │ Guardrails   │     │
│  └────────────────────────────────────┘     │
└─────────────────────────────────────────────┘
```

### Harness 的四层

| 层 | 作用 | Claude Code 对应 |
|----|------|-----------------|
| **Skills（技能）** | 可复用的行为模板 | Slash Commands、.claude/commands/ |
| **Instincts（本能）** | 无需指令就自动遵循的规则 | CLAUDE.md、System Prompt |
| **Memory（记忆）** | 跨会话��知识持久化 | Memory 系统、文件 |
| **Security（安全）** | 权限控制和行为边界 | Permissions、Hooks、deny 规则 |

## 从 Vibe Coding 到 Agentic Engineering

���区（特别是 claude-code-best-practice，46.6k stars）提出了一个成熟度模型：

### Level 0: Vibe Coding（氛围编码）

```
"帮���写个登录页面"
→ Claude 随便写一个
→ 能跑就行
```

**特征**：无 CLAUDE.md、无 Skills、不管质量、不可复现。

### Level 1: Guided Coding（引导编码）

```
"帮我写个登录页面，用 React + TypeScript，样式用 Tailwind"
→ Claude 按指定技术栈写
→ 有基本的质量要求
```

**特征**：有 CLAUDE.md、有基本指令、但仍是一次性操作。

### Level 2: Structured Coding（结构化编码）

```
/plan
→ Claude 先出方案
→ 你确认后它分步执行
→ 每步有验证
```

**特征**：使用 /plan、有分步验证、可部分复现。

### Level 3: Agentic Engineering（代理式工程）

```
完整的 Harness 配置：
- CLAUDE.md（Instincts）
- .claude/commands/（Skills）
- Memory 系统���跨会话知识）
- Hooks（自动质量门控）
- Agent Teams（并行协作）
- Phase-wise Gated Plans（分阶段门控计划）
```

**特征**：全自动化、可复现、有质量保���、支持团队协作。

## Phase-wise Gated Plans（分阶段门控计划）

这是高星仓库中最被推崇的方法论。

### 核心思想

大任务不是一口气做完，而是分成多个 Phase，每个 Phase 有明确的**进入条件**和**退出门控**。

```
Phase 1: 分析
  进入��件：用户确认任务描述
  工作：读代码、分析依赖、识别风险
  退出门控：输出分析报告 → 用户确认
                                    │
Phase 2: 设计                      ↓
  进入条件：Phase 1 分析报告已确认
  工作：设计方案、API 定义、数据模型
  退出门控：设计文档 → 用户确认
                                    │
Phase 3: 实现                      ↓
  进入条件：Phase 2 设计已确认
  工作：编码实现
  退出门控：代码通过 lint + typecheck
                                    │
Phase 4: 测试                      ↓
  进入条件：Phase 3 代码通过检查
  工作：编写测试、运行测试
  退出门��：测试全绿 + 覆盖率达标
                                    │
Phase 5: 审查                      ↓
  进入条件：Phase 4 测试通过
  工作：代码审查、安全检查
  退出门控：无 Critical/High 问题
```

### 在 Claude Code 中实现

**Slash Command** `.claude/commands/phased-plan.md`：

```markdown
执行分阶段门控计划：

**Phase 1: 分析**
- 读取相关代码和文档
- 分析依赖关系
- 识别风险点
- 输出：分析报告
- 门控：展示报告等我确认后再进入下一阶段

**Phase 2: 设计**
- 基于分析设计方案
- 定义接口和数据结构
- 输出：设计文档
- 门控：展示设计等我确认

**Phase 3: 实现**
- 按设计编码
- ���个模块完成后运行 lint 和 typecheck
- 门控：lint + typecheck 全通过

**Phase 4: 验证**
- 编写测试
- 运行全量测试
- 门控：测试全��

**Phase 5: 交付**
- 代码审查（用 /review）
- 生成 commit message
- 门控：无 Critical 问题

任务：$ARGUMENTS

严格按阶段执行，每个阶段结束后暂停等我确认。
不要跳过任何阶段。
```

### 与 Agent Teams 结合

```
/phased-plan 添加用户偏好功能

Phase 1（Lead 做）：分析 → 确认
Phase 2（Lead 做）：设计 → 确认
Phase 3（Agent Teams 做）：
  进入 Delegate Mode
  创建 3 人团队并行实现
Phase 4（test-dev teammate ��）：测试
Phase 5（用 Subagent 做）：审查
```

## 上下文工程（Context Engineering）

高星仓库强调的另一个核心概念：**你给 Agent 的上下文质量，决定了输出质量**。

### 上下文的三种来源

```
1. CLAUDE.md（静态上下文）
   → 项目规则、技术约定、团队规范
   → 每次会话自动加载

2. 对话（动态上下文）
   → 你的指令、之前的讨论
   → 会随会话增长，需要 /compact

3. 工具输出（运行时上下文）
   → Claude 读取的文件、运行的命令
   → 最大的上下文消耗者
```

### 上下文预算管理

```
总上下文窗口：1,000,000 tokens

推荐分配：
├── CLAUDE.md：2,500 tokens（0.25%）
├── 对话历史：200,000 tokens（20%）
├── 工具输出：500,000 tokens（50%）
└── 思考+生成：297,500 tokens（29.75%）
```

**经验法则**：
- 工具输出是最大的消耗者——避免让 Claude 读不需要的文件
- 20 轮对话后 /compact
- 大文件指定行号范围而非全部读取

## 评估这些方法论的实际效果

来自社区的数据：

| 配置 | 任务成功率 | 首次通过率 |
|------|-----------|-----------|
| 无 CLAUDE.md、�� Skills | ~60% | ~40% |
| 有 CLAUDE.md | ~75% | ~55% |
| CLAUDE.md + Skills + Hooks | ~85% | ~70% |
| 完整 Harness（Agentic Engineering） | ~92% | ~80% |

"首次通���率"= 不需要人工修正就达到预期的比例。

## 推荐的 Harness 配置模板

```
项目根目录/
├── CLAUDE.md                    # Instincts（800-2500 tokens）
├── .claude/
│   ├── settings.json            # 权限和配置
│   ├── commands/                # Skills
│   │   ├── review.md
│   │   ├── commit.md
│   │   ├── test.md
│   │   ├── phased-plan.md
│   │   └── security.md
│   └── agents/                  # Subagent 定义（如果有）
├── .mcp.json                    # MCP Server 配���
└── docs/
    └── decisions/               # 架构决策记录（给 Memory 用）
```

这个结构来自多个高星仓库的共识。提交到 Git，团队共享��

## 参考仓库

| 仓库 | Stars | 核心贡献 |
|------|-------|---------|
| [everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 140k+ | Skills/Instincts/Memory/Security 完整体系 |
| [claude-code-best-practice](https://github.com/shanraisshan/claude-code-best-practice) | 46.6k | Vibe Coding → Agentic Engineering 方法论 |
| [claude-code-ultimate-guide](https://github.com/FlorianBruniaux/claude-code-ultimate-guide) | 高星 | 从入门到精通的完整实操指南 |
| [Dive-into-Claude-Code](https://github.com/VILA-Lab/Dive-into-Claude-Code) | 高星 | 学术级架构分析 |
