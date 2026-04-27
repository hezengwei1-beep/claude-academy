import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(
  defineConfig({
    title: 'Claude 学院',
    description: '从入门到精通的完整知识体系',
    base: '/claude-academy/',
    lang: 'zh-CN',
    lastUpdated: true,
    cleanUrls: true,
    ignoreDeadLinks: true,
    markdown: { lineNumbers: true },
    head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/claude-academy/logo.svg' }]],
    themeConfig: {
      logo: '/logo.svg',
      siteTitle: 'Claude 学院',
      outline: { level: [2, 3], label: '本页目录' },
      lastUpdated: { text: '最后更新' },
      search: { provider: 'local', options: { translations: { button: { buttonText: '搜索' }, modal: { noResultsText: '没有找到结果', resetButtonTitle: '清除', footer: { selectText: '选择', navigateText: '导航', closeText: '关闭' } } } } },
      nav: [
        { text: '首页', link: '/' },
        { text: '1. Code 指南', link: '/code-guide/preface', activeMatch: '/code-guide/' },
        { text: '2. Prompt', link: '/prompt-guide/preface', activeMatch: '/prompt-guide/' },
        { text: '3. Agent 指南', link: '/agent-guide/preface', activeMatch: '/agent-guide/' },
        { text: '4. MCP 指南', link: '/mcp-guide/preface', activeMatch: '/mcp-guide/' },
        { text: '5. 企业实战', link: '/enterprise/preface', activeMatch: '/enterprise/' },
      ],
      sidebar: {
        '/code-guide/': [
          { text: '《Code 完全指南》', items: [{ text: '前言', link: '/code-guide/preface' }] },
          { text: 'Part 1 快速入门', collapsed: false, items: [
            { text: 'Ch1 安装与首次运行', link: '/code-guide/part1/ch01' },
            { text: 'Ch2 核心命令', link: '/code-guide/part1/ch02' },
          ]},
          { text: 'Part 2 日常高效', collapsed: false, items: [
            { text: 'Ch3 日常用法', link: '/code-guide/part2/ch03' },
            { text: 'Ch4 对话与上下文', link: '/code-guide/part2/ch04' },
          ]},
          { text: 'Part 3 Cowork 桌面', collapsed: false, items: [
            { text: 'Ch5 上手 Cowork', link: '/code-guide/part3/ch05' },
            { text: 'Ch6 十大场景', link: '/code-guide/part3/ch06' },
            { text: 'Ch7 Dispatch', link: '/code-guide/part3/ch07' },
            { text: 'Ch8 Computer Use', link: '/code-guide/part3/ch08' },
            { text: 'Ch9 Skills', link: '/code-guide/part3/ch09' },
          ]},
          { text: 'Part 4 深度配置', collapsed: true, items: [
            { text: 'Ch10 Settings', link: '/code-guide/part4/ch10' },
            { text: 'Ch11 权限详解', link: '/code-guide/part4/ch11' },
            { text: 'Ch12 Hooks', link: '/code-guide/part4/ch12' },
            { text: 'Ch13 Hooks 高级', link: '/code-guide/part4/ch13' },
            { text: 'Ch14 Slash Commands', link: '/code-guide/part4/ch14' },
            { text: 'Ch15 Keybindings+Memory', link: '/code-guide/part4/ch15' },
          ]},
          { text: 'Part 5 团队自动化', collapsed: true, items: [
            { text: 'Ch16 IDE 集成', link: '/code-guide/part5/ch16' },
            { text: 'Ch17 CI/CD', link: '/code-guide/part5/ch17' },
            { text: 'Ch18 Managed Agents', link: '/code-guide/part5/ch18' },
          ]},
          { text: 'Part 6 Recipes', collapsed: true, items: [
            { text: 'R01-05 Git', link: '/code-guide/part6/ch19' },
            { text: 'R06-10 文档', link: '/code-guide/part6/ch20' },
            { text: 'R11-15 团队', link: '/code-guide/part6/ch21' },
            { text: 'R16-20 工程', link: '/code-guide/part6/ch22' },
          ]},
          { text: '附录', collapsed: true, items: [
            { text: 'A 命令速查', link: '/code-guide/appendix/a' },
            { text: 'B 性能成本', link: '/code-guide/appendix/b' },
            { text: 'C 排障', link: '/code-guide/appendix/c' },
          ]},
        ],
        '/prompt-guide/': [
          { text: '《Prompt 工程》', items: [{ text: '前言', link: '/prompt-guide/preface' }] },
          { text: 'Part 1 基础', collapsed: false, items: [
            { text: 'Ch1 模型家族', link: '/prompt-guide/part1/ch01' },
            { text: 'Ch2 基础技术', link: '/prompt-guide/part1/ch02' },
          ]},
          { text: 'Part 2 Claude 特有', collapsed: false, items: [
            { text: 'Ch3 XML 标签', link: '/prompt-guide/part2/ch03' },
            { text: 'Ch4 Thinking', link: '/prompt-guide/part2/ch04' },
            { text: 'Ch5 Caching', link: '/prompt-guide/part2/ch05' },
          ]},
          { text: 'Part 3 场景', collapsed: false, items: [
            { text: 'Ch6 代码', link: '/prompt-guide/part3/ch06' },
            { text: 'Ch7 数据', link: '/prompt-guide/part3/ch07' },
            { text: 'Ch8 写作', link: '/prompt-guide/part3/ch08' },
            { text: 'Ch9 翻译', link: '/prompt-guide/part3/ch09' },
          ]},
          { text: 'Part 4 进阶', collapsed: false, items: [
            { text: 'Ch10 反模式', link: '/prompt-guide/part4/ch10' },
            { text: 'Ch11 API 调优', link: '/prompt-guide/part4/ch11' },
          ]},
        ],
        '/agent-guide/': [
          { text: '《Agent 完全指南》', items: [{ text: '前言', link: '/agent-guide/preface' }] },
          { text: 'Part 1 概念', collapsed: false, items: [
            { text: 'Ch1 什么是 Agent', link: '/agent-guide/part1/ch01' },
            { text: 'Ch2 ReAct 原理', link: '/agent-guide/part1/ch02' },
          ]},
          { text: 'Part 2 Claude Agent', collapsed: false, items: [
            { text: 'Ch3 五种形态', link: '/agent-guide/part2/ch03' },
            { text: 'Ch4 Subagent 实战', link: '/agent-guide/part2/ch04' },
            { text: 'Ch5 选择指南', link: '/agent-guide/part2/ch05' },
          ]},
          { text: 'Part 3 Agent Teams', collapsed: true, items: [
            { text: 'Ch6 架构', link: '/agent-guide/part3/ch06' },
            { text: 'Ch7 配置', link: '/agent-guide/part3/ch07' },
            { text: 'Ch8 编排', link: '/agent-guide/part3/ch08' },
            { text: 'Ch9 Delegate', link: '/agent-guide/part3/ch09' },
            { text: 'Ch10 Plan→Team', link: '/agent-guide/part3/ch10' },
            { text: 'Ch11 文件边界', link: '/agent-guide/part3/ch11' },
            { text: 'Ch12 Worktrees', link: '/agent-guide/part3/ch12' },
          ]},
          { text: 'Part 4 模式', collapsed: true, items: [
            { text: 'Ch13 六种模式', link: '/agent-guide/part4/ch13' },
          ]},
          { text: 'Part 5 SDK', collapsed: true, items: [
            { text: 'Ch14 架构', link: '/agent-guide/part5/ch14' },
            { text: 'Ch15 工具', link: '/agent-guide/part5/ch15' },
            { text: 'Ch16 编排', link: '/agent-guide/part5/ch16' },
            { text: 'Ch17 构建项目', link: '/agent-guide/part5/ch17' },
            { text: 'Ch18 集成', link: '/agent-guide/part5/ch18' },
            { text: 'Ch19 Slack Bot', link: '/agent-guide/part5/ch19' },
          ]},
          { text: 'Part 6 运维', collapsed: true, items: [
            { text: 'Ch20 框架', link: '/agent-guide/part6/ch20' },
            { text: 'Ch21 调试', link: '/agent-guide/part6/ch21' },
            { text: 'Ch22 生产', link: '/agent-guide/part6/ch22' },
          ]},
        ],
        '/mcp-guide/': [
          { text: '《MCP 完全指南》', items: [{ text: '前言', link: '/mcp-guide/preface' }] },
          { text: 'Part 1 认知', collapsed: false, items: [
            { text: 'Ch1 MCP 是什么', link: '/mcp-guide/part1/ch01' },
            { text: 'Ch2 协议解析', link: '/mcp-guide/part1/ch02' },
            { text: 'Ch3 5 分钟安装', link: '/mcp-guide/part1/ch03' },
          ]},
          { text: 'Part 2 使用', collapsed: false, items: [
            { text: 'Ch4 官方 Servers', link: '/mcp-guide/part2/ch04' },
            { text: 'Ch4a Filesystem', link: '/mcp-guide/part2/ch04a' },
            { text: 'Ch4b GitHub', link: '/mcp-guide/part2/ch04b' },
            { text: 'Ch4c 数据库+Memory', link: '/mcp-guide/part2/ch04c' },
            { text: 'Ch5 社区', link: '/mcp-guide/part2/ch05' },
            { text: 'Ch6 工作流', link: '/mcp-guide/part2/ch06' },
          ]},
          { text: 'Part 3 开发', collapsed: true, items: [
            { text: 'Ch7 TypeScript', link: '/mcp-guide/part3/ch07' },
            { text: 'Ch7a 远程部署', link: '/mcp-guide/part3/ch07a' },
            { text: 'Ch7b OAuth', link: '/mcp-guide/part3/ch07b' },
            { text: 'Ch8 Python', link: '/mcp-guide/part3/ch08' },
            { text: 'Ch9 调试发布', link: '/mcp-guide/part3/ch09' },
          ]},
          { text: 'Part 4-6', collapsed: true, items: [
            { text: 'Ch10 +Agent Teams', link: '/mcp-guide/part4/ch10' },
            { text: 'Ch10a 多Server编排', link: '/mcp-guide/part4/ch10a' },
            { text: 'Ch11 企业案例', link: '/mcp-guide/part5/ch11' },
            { text: 'Ch12 安全', link: '/mcp-guide/part6/ch12' },
          ]},
          { text: '附录', collapsed: true, items: [
            { text: 'A 速查', link: '/mcp-guide/appendix/a' },
            { text: 'B 索引', link: '/mcp-guide/appendix/b' },
          ]},
        ],
        '/enterprise/': [
          { text: '《企业实战》', items: [{ text: '前言', link: '/enterprise/preface' }] },
          { text: 'Part 1 案例', collapsed: false, items: [
            { text: 'Ch1 C 编译器', link: '/enterprise/part1/ch01' },
            { text: 'Ch2 可复现配置', link: '/enterprise/part1/ch02' },
            { text: 'Ch3 代码审查', link: '/enterprise/part1/ch03' },
            { text: 'Ch4 企业部署', link: '/enterprise/part1/ch04' },
            { text: 'Ch5 失败教训', link: '/enterprise/part1/ch05' },
          ]},
          { text: 'Part 2 成本', collapsed: false, items: [
            { text: 'Ch6 成本优化', link: '/enterprise/part2/ch06' },
          ]},
          { text: 'Part 3 安全', collapsed: false, items: [
            { text: 'Ch7 安全合规', link: '/enterprise/part3/ch07' },
            { text: 'Ch8 团队治理', link: '/enterprise/part3/ch08' },
          ]},
          { text: 'Part 4 实践', collapsed: false, items: [
            { text: 'Ch9 反模式', link: '/enterprise/part4/ch09' },
            { text: 'Ch10 知识地图', link: '/enterprise/part4/ch10' },
          ]},
          { text: '附录', collapsed: true, items: [
            { text: 'A 资源', link: '/enterprise/appendix/a' },
            { text: 'B 计算器', link: '/enterprise/appendix/b' },
            { text: 'C 版本', link: '/enterprise/appendix/c' },
            { text: 'D 术语', link: '/enterprise/appendix/d' },
            { text: 'E 练习', link: '/enterprise/appendix/e' },
          ]},
        ],
      },
      socialLinks: [{ icon: 'github', link: 'https://github.com/hezengwei1-beep/claude-academy' }],
      footer: { message: 'Claude 学院 — 五本书，零重复，系统性掌握 Claude 全栈能力', copyright: '2026 年 4 月' },
      docFooter: { prev: '上一章', next: '下一章' },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '目录',
      darkModeSwitchLabel: '主题',
    },
    mermaid: { theme: 'default' },
  })
)
