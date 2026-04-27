# GitHub Server 深度实战

## 配置

```json
{
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxx"
    }
  }
}
```

### Token 权限

创建 Personal Access Token 时，选择最小权限：

| 场景 | 需要的 scope |
|------|-------------|
| 只读代码/Issues | `repo:read` |
| 创建 Issues | `repo` |
| 管理 PR | `repo` |
| 读取组织信息 | `read:org` |

**建议**：创建专用的 Token，不要复用日常开发用的 Token。

## 完整工具列表

GitHub Server 提供约 20+ 个工具，按类别：

### Issue 操作
| 工具 | 作用 |
|------|------|
| `list_issues` | 列出仓库的 Issues |
| `get_issue` | 获取单个 Issue 详情 |
| `create_issue` | 创建 Issue |
| `update_issue` | 更新 Issue |
| `add_issue_comment` | 添加评论 |

### PR 操作
| 工具 | 作用 |
|------|------|
| `list_pull_requests` | 列出 PR |
| `get_pull_request` | 获取 PR 详情 |
| `get_pull_request_diff` | 获取 PR 的 diff |
| `create_pull_request` | 创建 PR |
| `merge_pull_request` | 合并 PR |

### 代码操作
| 工具 | 作用 |
|------|------|
| `get_file_contents` | 获取文件内容 |
| `search_code` | 搜索代码 |
| `push_files` | 推送文件改动 |
| `create_branch` | 创建分支 |

### 仓库操作
| 工具 | 作用 |
|------|------|
| `search_repositories` | 搜索仓库 |
| `get_repository` | 获取仓库信息 |
| `list_commits` | 列出提交历史 |

## 实战：自动化 Issue 分诊

### 场景

每天早上自动检查新 Issues，分类并分配。

```
帮我分诊 my-org/my-app 仓库的新 Issues：

1. 用 list_issues 获取 state=open 且没有 label 的 Issues
2. 读取每个 Issue 的标题和正文
3. 自动分类：
   - bug：描述中有错误、崩溃、不工作等关键词
   - feature：描述中有希望、建议、请求等关键词
   - question：描述中有怎么、如何、为什么等关键词
4. 用 update_issue 给每个 Issue 加对应的 label
5. 对 bug 类 Issue，添加评论确认已收到并会排查
6. 生成今日分诊报告
```

### 预期输出

```markdown
# Issue 分诊报告 - 2026-04-26

| # | 标题 | 分类 | 操作 |
|---|------|------|------|
| #234 | 登录页面白屏 | bug | 已加标签 + 评论 |
| #235 | 希望支持暗色模式 | feature | 已加标签 |
| #236 | 如何配置 SSO？ | question | 已加标签 |

**统计**：3 个新 Issue（1 bug / 1 feature / 1 question）
```

## 实战：PR 自动审查

```
获取 my-org/my-app 仓库的 PR #142：

1. 用 get_pull_request 获取 PR 信息
2. 用 get_pull_request_diff 获取改动内容
3. 分析 diff：
   - 安全性问题
   - 性能影响
   - 测试覆盖
4. 用 add_issue_comment 将审查结果作为评论发到 PR 上

评论格式：
## Claude 自动审查

### 发现
- [severity] 问题描述

### 总结
一句话总评
```

## 实战：竞品代码分析

```
搜索 GitHub 上与我们产品类似的开源项目：

1. 用 search_repositories 搜索 "CRM TypeScript" 排序 stars
2. 取前 5 个仓库
3. 对每个仓库：
   - 用 get_repository 获取基本信息（stars、语言、最近活跃度）
   - 用 get_file_contents 读取 README
   - 用 search_code 搜索关键技术方案（如认证、数据库、缓存）
4. 生成对比报告
```

## 安全注意事项

- **不要用 GitHub Server 操作生产仓库的 main 分支**
- `push_files` 和 `merge_pull_request` 是危险操作，确保 Token 权限最小化
- 审查自动发出的 Issue 评论内容，避免泄露内部信息
- 定期轮换 Token
