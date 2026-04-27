# 远程 MCP Server 部署

## 为什么需要远程 Server

stdio Server 只能本地使用。当你需要：
- 团队共享同一个 Server（连接同一个数据库）
- Server 需要访问内网资源
- 需要 7×24 运行的 Server

就需要远程部署。

## Streamable HTTP 传输

远程 Server 使用 Streamable HTTP（替代旧的 HTTP+SSE）：

```
Client ──── HTTP POST（请求）──────→ Server
Client ←─── SSE 流或 JSON（响应）←── Server
```

### TypeScript 远程 Server

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamablehttp.js";
import express from "express";

const app = express();
app.use(express.json());

const server = new McpServer({ name: "remote-server", version: "1.0.0" });

// 定义工具...
server.tool("get_status", "获取系统状态", {}, async () => ({
  content: [{ type: "text", text: "系统正常运行中" }],
}));

// HTTP 端点
const transport = new StreamableHTTPServerTransport("/mcp");
app.use("/mcp", async (req, res) => {
  await transport.handleRequest(req, res);
});

await server.connect(transport);

app.listen(3001, () => {
  console.log("MCP Server running on http://localhost:3001/mcp");
});
```

### 客户端连接

```json
{
  "mcpServers": {
    "remote-server": {
      "url": "http://your-server.example.com:3001/mcp"
    }
  }
}
```

## Docker 部署

### Dockerfile

```dockerfile
FROM node:20-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY . .
EXPOSE 3001
CMD ["node", "dist/index.js"]
```

### docker-compose.yml

```yaml
version: '3.8'
services:
  mcp-server:
    build: .
    ports:
      - "3001:3001"
    environment:
      - DATABASE_URL=postgresql://user:pass@db:5432/myapp
      - NODE_ENV=production
    restart: unless-stopped

  db:
    image: postgres:16
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_PASSWORD=pass

volumes:
  pgdata:
```

### 运行

```bash
docker-compose up -d
```

## 云平台部署

### Railway / Render / Fly.io

这些平台支持一键部署 Node.js 应用：

```bash
# Fly.io 示例
fly launch
fly deploy
```

### AWS / GCP / Azure

对于企业级部署：
- ECS/EKS（AWS）
- Cloud Run（GCP）
- Container Apps（Azure）

配合 Load Balancer + TLS 终止。

## 安全加固

### TLS 加密

远程 Server **必须**使用 HTTPS：

```bash
# 用 Let's Encrypt 获取证书
certbot certonly --standalone -d mcp.example.com
```

或在反向代理（Nginx/Caddy）终止 TLS。

### 认证

远程 Server 应该要求认证。MCP 支持 OAuth 2.1：

```typescript
// 简单的 API Key 认证（入门级）
app.use("/mcp", (req, res, next) => {
  const apiKey = req.headers["x-api-key"];
  if (apiKey !== process.env.MCP_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});
```

完整的 OAuth 认证见下一章。

### 网络隔离

- Server 部署在内网，只通过 VPN 访问
- 或使用 IP 白名单限制
- 不要把 MCP Server 暴露在公网上（除非有完善的认证）

## 监控

```typescript
// 请求日志
app.use("/mcp", (req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    console.log(JSON.stringify({
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: Date.now() - start,
      timestamp: new Date().toISOString(),
    }));
  });
  next();
});
```

接入 Prometheus / Grafana 做可视化监控。
