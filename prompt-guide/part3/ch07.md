# 场景实战：数据分析与 SQL

## SQL 生成的 Prompt 优化

### 给 Schema 上下文

```xml
<schema>
-- 用户表
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(100),
  plan_type VARCHAR(20) DEFAULT 'free', -- free/pro/enterprise
  created_at TIMESTAMP DEFAULT NOW(),
  last_login_at TIMESTAMP
);

-- 事件表
CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  event_type VARCHAR(50) NOT NULL, -- page_view/click/purchase/signup
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 订单表
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  amount DECIMAL(10,2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending', -- pending/completed/refunded
  created_at TIMESTAMP DEFAULT NOW()
);
</schema>

<question>
找出过去 30 天内，注册后 7 天内完成首次付费的用户比例（按注册周分组），
同时显示平均首单金额。
</question>

<constraints>
- PostgreSQL 语法
- 只包含 completed 的订单
- 日期范围用参数化写法
- 每个 JOIN 和子查询加注释解释意图
- 结果按周降序排列
</constraints>
```

### Claude 输出

```sql
-- 计算各注册周的用户 7 天内付费转化率和平均首单金额
WITH registered_users AS (
  -- 过去 30 天内注册的用户
  SELECT id, created_at AS registered_at,
         DATE_TRUNC('week', created_at) AS register_week
  FROM users
  WHERE created_at >= NOW() - INTERVAL '30 days'
),
first_orders AS (
  -- 每个用户的首单（注册后 7 天内的第一笔完成订单）
  SELECT DISTINCT ON (o.user_id)
    o.user_id,
    o.amount,
    o.created_at AS order_at
  FROM orders o
  JOIN registered_users ru ON o.user_id = ru.id
  WHERE o.status = 'completed'
    AND o.created_at <= ru.registered_at + INTERVAL '7 days'
  ORDER BY o.user_id, o.created_at ASC
)
SELECT
  ru.register_week,
  COUNT(DISTINCT ru.id) AS total_registered,
  COUNT(DISTINCT fo.user_id) AS converted,
  ROUND(
    COUNT(DISTINCT fo.user_id)::NUMERIC / 
    NULLIF(COUNT(DISTINCT ru.id), 0) * 100, 1
  ) AS conversion_rate_pct,
  ROUND(AVG(fo.amount), 2) AS avg_first_order_amount
FROM registered_users ru
LEFT JOIN first_orders fo ON ru.id = fo.user_id
GROUP BY ru.register_week
ORDER BY ru.register_week DESC;
```

## 数据解读的 Prompt 模板

```xml
<data>
| 日期 | DAU | 新注册 | 付费转化率 | 流失率 | ARPU |
|------|-----|--------|-----------|--------|------|
| W14 | 12,500 | 3,200 | 2.1% | 8.2% | $12.5 |
| W13 | 15,000 | 2,800 | 3.5% | 5.1% | $14.2 |
| W12 | 14,200 | 3,100 | 3.2% | 4.8% | $13.8 |
| W11 | 13,800 | 2,900 | 3.4% | 4.5% | $14.0 |
</data>

<task>
作为数据分析师，深度解读这份数据：

1. **异常识别**：哪些指标有异常变化？定义"异常"为环比变化 >20%
2. **关联分析**：指标之间是否有因果关系？（如 DAU 下降是否与流失率上升相关？）
3. **根因假设**：列出 3 个可能的原因假设，每个假设说明：
   - 假设内容
   - 支持这个假设的数据证据
   - 反对这个假设的数据证据
   - 需要补充什么数据来验证
4. **行动建议**：基于置信度最高的假设，给出 3 个具体行动
5. **补充数据需求**：还需要哪些数据来做更准确的判断？
</task>

<output_format>
用数据说话，不要空洞的建议。
每个结论都要引用具体的数字。
</output_format>
```

## 数据可视化描述

Claude 无法直接生成图表，但可以描述图表或生成 Mermaid/ASCII 图：

```
基于以上数据，用 Mermaid 画一个双 Y 轴图表：
- 左 Y 轴：DAU（折线图）
- 右 Y 轴：付费转化率（柱状图）
- X 轴：周
```

输出 Mermaid 代码可以在 VitePress 等工具中渲染。

## Excel/CSV 数据处理

```xml
<task>
处理以下 CSV 数据（前 10 行示例）：
</task>

<data format="csv">
date,product,region,revenue,units
2026-03-01,Widget A,North,12500,250
2026-03-01,Widget B,North,8900,178
...
</data>

<analysis>
1. 按产品汇总月度收入趋势
2. 按区域对比各产品的市场份额
3. 找出增长最快和下降最快的产品-区域组合
4. 用 Markdown 表格输出，关键数字加粗
</analysis>
```
