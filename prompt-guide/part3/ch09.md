# 场景实战：翻译深度优化

## 技术文档翻译的核心挑战

翻译不只是语言转换。技术文档翻译要解决：
1. **术语一致性**：同一个术语在全文中翻译要一致
2. **代码块保护**：代码不翻译，但注释要翻译
3. **格式保持**：Markdown 结构、链接、图片引用不能破坏
4. **语境适配**：不是逐字翻译，是传达含义

## 术语表驱动翻译

```xml
<glossary>
| English | 中文 | 说明 |
|---------|------|------|
| Model Context Protocol | 模型上下文协议 | 首次出现用全称，后续用 MCP |
| Agent | 代理 | 不翻译为"智能体" |
| Prompt | 提示词 | 不翻译为"指令" |
| Token | Token | 不翻译 |
| Webhook | Webhook | 不翻译 |
| Rate limiting | 速率限制 | |
| Middleware | 中间件 | |
| Deploy | 部署 | |
| CI/CD | CI/CD | 不翻译 |
</glossary>

<source>
[待翻译的英文内容]
</source>

<rules>
1. 严格按术语表翻译，不要自创翻译
2. 术语首次出现时：中文（English），后续直接用中文或缩写
3. 代码块（```...```）内的代码不翻译
4. 代码块内的注释（// 或 #）翻译
5. Markdown 链接：[显示文本](url) → 只翻译显示文本
6. 图片 alt text 翻译
7. 保持所有 Markdown 格式标记（#、-、|、>）
8. 不要翻译 HTML 标签和属性
</rules>
```

## 分段翻译长文档

长文档一次性翻译容易质量退化。分段策略：

```xml
<strategy>
这是一个长文档的第 {N}/{Total} 段。

前面几段的翻译中确定的术语选择：
- "context window" → "上下文窗口"（第 1 段确定）
- "streaming" → "流式传输"（第 2 段确定）

请保持术语一致性。
</strategy>

<source>
[当前段落的英文内容]
</source>
```

## 翻译质量自检

```xml
<task>
翻译完成后，请自检以下项目：

1. **术语一致性**：搜索所有术语在译文中是否翻译一致
2. **遗漏检测**：对比原文和译文的段落数、列表项数是否一致
3. **格式完整性**：检查 Markdown 格式是否保持
4. **代码块完整性**：检查代码块是否未被误翻译
5. **流畅度**：通读译文，标注不自然的表达

自检结果放在译文末尾的 <qa> 标签中。
</task>
```

## 学术论文翻译

```xml
<task>翻译学术论文</task>

<rules>
- 学术术语使用该领域的标准中文翻译
- 如果某术语无公认翻译，保留英文并加注"（暂无统一译名）"
- 数学公式和符号不翻译
- 参考文献编号保持原样
- 摘要的翻译要特别精准，因为可能被学术数据库索引
- 保持被动语态的学术风格（"本研究发现..."）
</rules>

<academic_glossary>
| English | 标准翻译 | 领域 |
|---------|---------|------|
| Attention mechanism | 注意力机制 | NLP |
| Transformer | Transformer | 保留英文 |
| Fine-tuning | 微调 | ML |
| Benchmark | 基准测试 | 通用 |
| State-of-the-art | 最先进的 | 通用 |
| Ablation study | 消融实验 | ML |
</academic_glossary>
```

## 本地化（不只是翻译）

真正的本地化超越翻译——要适配目标市场：

```xml
<task>将以下英文产品文案本地化为面向中国市场的中文版</task>

<source>
Get started for free. No credit card required.
Join 100,000+ developers who trust our platform.
</source>

<localization_rules>
- 不是逐字翻译，是传达同样的营销效果
- 适配中国用户习惯（如"免费试用"比"无需信用卡"更有吸引力）
- 数字表达适配（100,000+ → 10万+）
- 社会证明适配（如果有中国知名客户可以替换）
- CTA（行动号召）要符合中文互联网习惯
</localization_rules>

<output>
输出三个版本：
1. 直译版（忠实原文）
2. 意译版（传达意图）
3. 创意版（完全本地化）
</output>
```
