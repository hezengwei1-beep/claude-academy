# Filesystem Server 深度实战

## 能力全览

Filesystem Server 不只是"读写文件"。它提供了 11 个工具：

| 工具 | 作用 | 示例 |
|------|------|------|
| `read_file` | 读取单个文件 | 读取 config.json |
| `read_multiple_files` | 批量读取 | 同时读取 5 个文件 |
| `write_file` | 创建/覆写文件 | 生成报告 |
| `edit_file` | 编辑文件（diff 模式） | 修改配置项 |
| `create_directory` | 创建目录 | 创建输出目录 |
| `list_directory` | 列出目录内容 | 浏览文件结构 |
| `directory_tree` | 目录树 | 查看完整层级 |
| `move_file` | 移动/重命名 | 文件整理 |
| `search_files` | 搜索文件内容 | 查找关键词 |
| `get_file_info` | 文件元数据 | 大小、修改时间 |
| `list_allowed_directories` | 查看权限范围 | 确认可访问路径 |

## 安全边界详解

### 允许的目录

Filesystem Server **只能访问你在配置中明确指定的目录**：

```json
{
  "filesystem": {
    "command": "npx",
    "args": [
      "-y", "@modelcontextprotocol/server-filesystem",
      "/Users/me/Documents",
      "/Users/me/Projects/my-app"
    ]
  }
}
```

- 可以访问 `/Users/me/Documents` 及其所有子目录
- 可以访问 `/Users/me/Projects/my-app` 及其所有子目录
- **不能访问** `/Users/me/Desktop`、`/etc/`、`~/.ssh/` 等未指定的目录
- 符号链接如果指向未授权目录，也会被拒绝

### 常见安全错误

```json
// 危险：授予了整个 Home 目录
{ "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me"] }

// 安全：只授予需要的目录
{ "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/Documents", "/Users/me/Projects"] }
```

## 实战：智能文件整理系统

### 配置

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem",
        "/Users/me/Downloads",
        "/Users/me/Documents/Organized"
      ]
    }
  }
}
```

### 操作步骤

```
1. 先用 list_directory 查看 ~/Downloads 的内容
2. 用 get_file_info 获取每个文件的类型和大小
3. 对 PDF 文件，用 read_file 读取前几页判断是发票、文档还是电子书
4. 在 ~/Documents/Organized 下创建分类目录：
   - 发票/
   - 技术文档/
   - 电子书/
   - 图片/
   - 其他/
5. 用 move_file 将文件移动到对应目录
6. 生成整理报告写入 ~/Documents/Organized/整理记录.md
```

### 预期输出

```markdown
# 文件整理报告 - 2026-04-26

## 统计
- 总文件数：47
- 已分类：45
- 无法分类：2

## 分类详情
| 类别 | 数量 | 典型文件 |
|------|------|---------|
| 发票 | 12 | 阿里云-202604.pdf, AWS-invoice.pdf |
| 技术文档 | 8 | MCP-spec.pdf, React-18-guide.pdf |
| 电子书 | 5 | 深入理解TypeScript.pdf |
| 图片 | 15 | screenshot-*.png |
| 其他 | 5 | meeting-notes.txt |

## 无法分类
- corrupted-file.dat（文件损坏）
- unknown.bin（未知格式）
```

## 实战：跨目录内容同步

```
我需要把 ~/Projects/docs-en/ 下的所有 .md 文件
与 ~/Projects/docs-zh/ 下的文件对比：

1. 用 directory_tree 查看两边的文件结构
2. 找出 en 中有但 zh 中没有的文件（待翻译）
3. 找出 en 中修改时间比 zh 更新的文件（待更新）
4. 生成同步报告
```

## 性能注意事项

- `read_multiple_files` 比多次 `read_file` 更高效
- 大文件（>1MB）读取可能较慢，考虑只读取部分内容
- `directory_tree` 在大目录（>1000 个文件）中较慢，可以用 `list_directory` + 深度限制替代
- `search_files` 在大量文件中搜索时考虑用 pattern 限制范围
