# OAuth 2.1 认证实战

## 为什么需要 OAuth

API Key 简单但有局限：
- 无法细粒度控制权限
- 无法追踪是谁在调用
- 无法自动过期和刷新

OAuth 2.1 解决了所有这些问题。

## MCP 的 OAuth 流程

```
1. Client 连接 Server，Server 返回 401 + OAuth metadata URL
2. Client 获取 OAuth 配置（authorization endpoint, token endpoint）
3. Client 引导用户到授权页面登录
4. 用户登录并授权
5. Client 获得 authorization code
6. Client 用 code 换取 access token
7. Client 在后续请求中携带 token
```

## Server 端实现

```typescript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import express from "express";

const app = express();

// OAuth 2.1 metadata
app.get("/.well-known/oauth-authorization-server", (req, res) => {
  res.json({
    issuer: "https://mcp.example.com",
    authorization_endpoint: "https://mcp.example.com/oauth/authorize",
    token_endpoint: "https://mcp.example.com/oauth/token",
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code"],
    code_challenge_methods_supported: ["S256"],  // PKCE 必须
  });
});

// 授权端点
app.get("/oauth/authorize", (req, res) => {
  const { client_id, redirect_uri, state, code_challenge } = req.query;
  // 展示登录页面，验证用户身份
  // 验证通过后重定向到 redirect_uri + authorization code
  res.redirect(`${redirect_uri}?code=AUTH_CODE&state=${state}`);
});

// Token 端点
app.post("/oauth/token", express.urlencoded({ extended: true }), (req, res) => {
  const { grant_type, code, code_verifier } = req.body;
  // 验证 code 和 code_verifier（PKCE）
  // 生成 access token
  res.json({
    access_token: "eyJ...",
    token_type: "bearer",
    expires_in: 3600,
  });
});

// MCP 端点（需要认证）
app.use("/mcp", (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({
      error: "unauthorized",
      auth_url: "https://mcp.example.com/.well-known/oauth-authorization-server",
    });
  }
  // 验证 token
  const token = auth.slice(7);
  if (!verifyToken(token)) {
    return res.status(401).json({ error: "invalid_token" });
  }
  next();
});
```

## 企业 SSO 集成

### 与现有身份提供商对接

如果你的公司已经用 Okta / Azure AD / Google Workspace：

```typescript
// 用现有的 OAuth provider 作为上游
const OAUTH_CONFIG = {
  authorization_endpoint: "https://your-company.okta.com/oauth2/authorize",
  token_endpoint: "https://your-company.okta.com/oauth2/token",
  // MCP Server 作为 OAuth client，代理到公司的 IdP
};
```

### 权限映射

```typescript
// 基于用户角色限制可用工具
function getToolsForUser(userRole: string) {
  const baseTools = ["query", "list_tables", "describe_table"];

  if (userRole === "admin") {
    return [...baseTools, "create_table", "alter_table"];
  }
  if (userRole === "analyst") {
    return [...baseTools, "export_data"];
  }
  return baseTools;  // 默认只读
}
```

## 客户端配置

```json
{
  "mcpServers": {
    "secure-server": {
      "url": "https://mcp.example.com/mcp",
      "auth": {
        "type": "oauth2",
        "authorizationUrl": "https://mcp.example.com/oauth/authorize",
        "tokenUrl": "https://mcp.example.com/oauth/token",
        "clientId": "my-claude-client",
        "scopes": ["read", "write"]
      }
    }
  }
}
```

## PKCE（必须）

MCP 的 OAuth 实现**要求 PKCE**（Proof Key for Code Exchange）：

```
1. Client 生成随机的 code_verifier
2. Client 计算 code_challenge = SHA256(code_verifier)
3. 授权请求带 code_challenge
4. Token 请求带 code_verifier
5. Server 验证 SHA256(code_verifier) === code_challenge
```

PKCE 防止授权码被截获后被第三方使用。
