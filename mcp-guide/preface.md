# 《MCP 完全指南》

## 为什么需要这本书

Claude 很聪明，但它是一个"没有手脚的大脑"——它能思考，但无法直接操作你的 GitHub、查你的数据库、发你的 Slack 消息。

MCP（Model Context Protocol）给了它手脚。

通过 MCP，Claude 可以连接到几乎任何外部系统——数据库、API、SaaS 工具、本地文件系统。一个标准协议，装一个 Server 就多一种能力。

## 结构

| Part | 内容 | 面向 |
|------|------|------|
| **Part 1** | MCP 是什么、协议解析、首次安装 | 所有人 |
| **Part 2** | 官方 Server、社区 Server、实战工作流 | 使用者 |
| **Part 3** | TypeScript/Python 构建、远程部署、OAuth | 开发者 |
| **Part 4-5** | MCP + Agent Teams、企业案例 | 进阶/管理者 |
| **Part 6** | 安全与合规 | 所有人 |

## 交叉引用

| 本书章节 | 深入学习请看 |
|----------|------------|
| Ch1 MCP 是什么 | [Agent 指南 Ch1](/agent-guide/part1/ch01) 理解 Agent 为什么需要工具 |
| Ch3 首次安装 | [Code 指南 Ch10](/code-guide/part4/ch10) Settings 中的 MCP 配置 |
| Ch4a-4c Server 深度 | [Code 指南 R15](/code-guide/part6/ch21) Cowork + MCP 联合工作流 |
| Ch7 TypeScript 构建 | [Agent 指南 Ch15](/agent-guide/part5/ch15) 自定义工具是 MCP 的子集 |
| Ch10 MCP + Agent Teams | [Agent 指南 Ch6-11](/agent-guide/part3/ch06) Agent Teams 完整操作 |
| Ch12 安全 | [企业实战 Ch7-8](/enterprise/part3/ch07) 企业安全全景 |

## 外部配套资源

| 资源 | 说明 |
|------|------|
| [modelcontextprotocol.io](https://modelcontextprotocol.io) | MCP 官网（130+ 页文档） |
| [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 官方 Server（76k stars） |
| [awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | 社区 Server 索引（85.7k stars） |
| [MCP Inspector](https://github.com/modelcontextprotocol/inspector) | 调试工具 |
| [DeepLearning.AI MCP 课程](https://learn.deeplearning.ai/courses/mcp-build-rich-context-ai-apps-with-anthropic/) | 免费实操课程 |
