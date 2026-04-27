# 附录 E：成本计算器

## 快速估算公式

### 单次任务成本

```
单次成本 ≈ (input_tokens × input_price + output_tokens × output_price) / 1,000,000
```

### Agent Teams 任务成本

```
总成本 ≈ 单 agent 预估成本 × teammates 数量 × 协调系数

协调系数：
- 普通模式：1.2
- Delegate Mode：1.3
- Plan → Team：1.5
```

### 月度成本预估

```
月度成本 ≈ 日均任务数 × 单次平均成本 × 22（工作日）
```

## 定价参考表（2026）

| 模型 | Input ($/M tokens) | Output ($/M tokens) |
|------|--------------------|--------------------|
| Claude Opus 4.6 | $5 | $25 |
| Claude Sonnet 4.6 | $3 | $15 |
| Claude Haiku 4.5 | ~$0.25 | ~$1.25 |

> M = 百万 tokens。Thinking tokens 按 output 价格计费。

## Token 估算参照

| 内容类型 | 约等于 |
|----------|--------|
| 1,000 tokens | ~750 英文单词 / ~500 中文字 |
| 1 行代码 | ~10-15 tokens |
| 一个 2,000 行文件 | ~20,000-30,000 tokens |
| CLAUDE.md（推荐长度） | ~2,500 tokens |

## 场景成本估算表

填入你的参数，快速估算成本：

### 场景 A：单 Agent 开发任务

```
模型：[  ] Opus / [  ] Sonnet / [  ] Haiku
预估 input tokens：______ K
预估 output tokens：______ K

成本 = input_K × (input_price / 1000) + output_K × (output_price / 1000)
     = ______ × ______ + ______ × ______
     = $______
```

### 场景 B：Agent Teams 代码审查

```
模型：[  ] Opus / [  ] Sonnet
Teammates 数量：______
单个 reviewer 预估 tokens：______ K（input + output）
协调系数：1.2

总成本 = 单 reviewer 成本 × teammates × 1.2
       = $______ × ______ × 1.2
       = $______
```

### 场景 C：Agent Teams 功能开发

```
模型：[  ] Opus / [  ] Sonnet
Teammates 数量：______
Plan 阶段成本：$______
单个 teammate 预估成本：$______
协调系数：1.5（Plan → Team）

总成本 = Plan 成本 + (单 teammate 成本 × teammates × 1.5)
       = $______ + ($______ × ______ × 1.5)
       = $______
```

### 场景 D：月度团队预算

```
团队人数：______
每人日均 Claude Code 使用：______ 次
每次平均成本：$______ （参考值：$5-15）
月工作日：22

月度预算 = 团队人数 × 日均次数 × 平均成本 × 22
         = ______ × ______ × $______ × 22
         = $______/月
```

## 成本优化检查清单

在你估算完成本后，检查以下优化项：

- [ ] CLAUDE.md 是否已精简到 ~2,500 tokens？
- [ ] 简单的 subagent 任务是否用了 Haiku？
- [ ] 不需要通信的并行任务是否改用了 /batch？
- [ ] 是否设置了 token budget 防止失控？
- [ ] 是否有任务可以用单 agent 完成而不需要多 agent？

## ROI 判断模板

```
额外成本 = Agent Teams 成本 - 单 Agent 成本 = $______
节省时间 = 单 Agent 耗时 - Agent Teams 耗时 = ______ 小时
你的时薪 = $______

ROI = (节省时间 × 时薪 - 额外成本) / 额外成本 × 100%
    = (______ × $______ - $______) / $______ × 100%
    = ______%

> ROI > 0% 就值得用 Agent Teams
```
