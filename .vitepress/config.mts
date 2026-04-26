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

    head: [
      ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }],
    ],

    themeConfig: {
      logo: '/logo.svg',
      siteTitle: 'Claude 学院',

      outline: { level: [2, 3], label: '本页目录' },
      lastUpdated: { text: '最后更新' },

      search: {
        provider: 'local',
        options: {
          translations: {
            button: { buttonText: '搜索全部内容', buttonAriaLabel: '搜索' },
            modal: {
              noResultsText: '没有找到结果',
              resetButtonTitle: '清除',
              footer: { selectText: '选择', navigateText: '导航', closeText: '关闭' },
            },
          },
        },
      },

      nav: [
        { text: '首页', link: '/' },
        {
          text: 'Code 精通',
          link: '/code/preface',
          activeMatch: '/code/',
        },
        {
          text: 'Prompt 实战',
          link: '/prompt/preface',
          activeMatch: '/prompt/',
        },
        {
          text: '协作全书',
          link: '/cowork/preface',
          activeMatch: '/cowork/',
        },
        {
          text: 'MCP 全书',
          link: '/mcp/preface',
          activeMatch: '/mcp/',
        },
        {
          text: 'Recipes',
          link: '/recipes/preface',
          activeMatch: '/recipes/',
        },
        {
          text: 'Agent SDK',
          link: '/sdk/preface',
          activeMatch: '/sdk/',
        },
      ],

      sidebar: {
        // ========== Code 精通 ==========
        '/code/': [
          {
            text: '《Claude Code 从零精通》',
            items: [{ text: '前言', link: '/code/preface' }],
          },
          {
            text: 'Part 1 快速入门',
            collapsed: false,
            items: [
              { text: 'Ch1 安装与首次运行', link: '/code/part1/ch01' },
              { text: 'Ch2 核心命令', link: '/code/part1/ch02' },
            ],
          },
          {
            text: 'Part 2 日常高效',
            collapsed: false,
            items: [
              { text: 'Ch3 日常高效用法', link: '/code/part2/ch03' },
              { text: 'Ch4 对话与上下文', link: '/code/part2/ch04' },
            ],
          },
          {
            text: 'Part 3 深度配置',
            collapsed: false,
            items: [
              { text: 'Ch5 Settings 配置', link: '/code/part3/ch05' },
              { text: 'Ch5a 权限模型详解', link: '/code/part3/ch05a' },
              { text: 'Ch6 Hooks 自动化', link: '/code/part3/ch06' },
              { text: 'Ch6a Hooks 高级组合', link: '/code/part3/ch06a' },
            ],
          },
          {
            text: 'Part 4 团队集成',
            collapsed: false,
            items: [
              { text: 'Ch7 IDE 集成', link: '/code/part4/ch07' },
              { text: 'Ch8 CI/CD 集成', link: '/code/part4/ch08' },
            ],
          },
          {
            text: 'Part 5 专家',
            collapsed: false,
            items: [
              { text: 'Ch9 性能与成本', link: '/code/part5/ch09' },
              { text: 'Ch10 排障指南', link: '/code/part5/ch10' },
            ],
          },
          {
            text: '附录',
            collapsed: true,
            items: [
              { text: 'A 命令速查表', link: '/code/appendix/a' },
            ],
          },
        ],

        // ========== Prompt 实战 ==========
        '/prompt/': [
          {
            text: '《Prompt 工程实战》',
            items: [{ text: '前言', link: '/prompt/preface' }],
          },
          {
            text: 'Part 1 基础篇',
            collapsed: false,
            items: [
              { text: 'Ch1 Claude 模型家族', link: '/prompt/part1/ch01' },
              { text: 'Ch2 Prompt 基础技术', link: '/prompt/part1/ch02' },
            ],
          },
          {
            text: 'Part 2 Claude 特有技术',
            collapsed: false,
            items: [
              { text: 'Ch3 XML 标签与结构化', link: '/prompt/part2/ch03' },
              { text: 'Ch4 Extended Thinking', link: '/prompt/part2/ch04' },
              { text: 'Ch5 Prompt Caching', link: '/prompt/part2/ch05' },
            ],
          },
          {
            text: 'Part 3 场景实战',
            collapsed: false,
            items: [
              { text: 'Ch6 代码生成与审查', link: '/prompt/part3/ch06' },
              { text: 'Ch6a 数据分析与 SQL', link: '/prompt/part3/ch06a' },
              { text: 'Ch7 写作、翻译与分析', link: '/prompt/part3/ch07' },
              { text: 'Ch7a 翻译深度优化', link: '/prompt/part3/ch07a' },
            ],
          },
          {
            text: 'Part 4 进阶',
            collapsed: false,
            items: [
              { text: 'Ch8 CLAUDE.md 管理', link: '/prompt/part4/ch08' },
              { text: 'Ch9 反模式与安全', link: '/prompt/part4/ch09' },
              { text: 'Ch10 API 调优与评估', link: '/prompt/part4/ch10' },
            ],
          },
        ],

        // ========== 协作全书 ==========
        '/cowork/': [
          {
            text: '《协作全书》',
            items: [{ text: '前言', link: '/cowork/preface' }],
          },
          {
            text: 'Part 1 认知篇',
            collapsed: false,
            items: [
              { text: 'Ch1 AI 协作时代背景', link: '/cowork/part1/ch01' },
              { text: 'Ch2 协作体系全景', link: '/cowork/part1/ch02' },
              { text: 'Ch3 决策树', link: '/cowork/part1/ch03' },
              { text: '知识地图', link: '/cowork/part1/knowledge-map' },
            ],
          },
          {
            text: 'Part 2 Cowork 桌面篇',
            collapsed: false,
            items: [
              { text: 'Ch4 20 分钟上手', link: '/cowork/part2/ch04' },
              { text: 'Ch5 十大场景实战', link: '/cowork/part2/ch05' },
              { text: 'Ch6 Dispatch 远程', link: '/cowork/part2/ch06' },
              { text: 'Ch7 Computer Use', link: '/cowork/part2/ch07' },
              { text: 'Ch8 Skills 生态', link: '/cowork/part2/ch08' },
            ],
          },
          {
            text: 'Part 3 Agent Teams',
            collapsed: true,
            items: [
              { text: 'Ch9 四组件架构', link: '/cowork/part3/ch09' },
              { text: 'Ch10 环境配置', link: '/cowork/part3/ch10' },
              { text: 'Ch11 编排基础', link: '/cowork/part3/ch11' },
              { text: 'Ch12 Delegate Mode', link: '/cowork/part3/ch12' },
              { text: 'Ch13 Plan→Team', link: '/cowork/part3/ch13' },
              { text: 'Ch14 文件边界', link: '/cowork/part3/ch14' },
            ],
          },
          {
            text: 'Part 4 Subagents',
            collapsed: true,
            items: [
              { text: 'Ch15 Subagents 实战', link: '/cowork/part4/ch15' },
              { text: 'Ch16 Git Worktrees', link: '/cowork/part4/ch16' },
              { text: 'Ch17 选择指南', link: '/cowork/part4/ch17' },
            ],
          },
          {
            text: 'Part 5 案例篇',
            collapsed: true,
            items: [
              { text: 'Ch18 C 编译器案例', link: '/cowork/part5/ch18' },
              { text: 'Ch18a 可复现配置', link: '/cowork/part5/ch18a' },
              { text: 'Ch19 代码审查案例', link: '/cowork/part5/ch19' },
              { text: 'Ch20 企业部署', link: '/cowork/part5/ch20' },
              { text: 'Ch21 失败教训', link: '/cowork/part5/ch21' },
            ],
          },
          {
            text: 'Part 6 进阶篇',
            collapsed: true,
            items: [
              { text: 'Ch22 成本优化', link: '/cowork/part6/ch22' },
              { text: 'Ch23 CLAUDE.md', link: '/cowork/part6/ch23' },
              { text: 'Ch24 Hooks 门控', link: '/cowork/part6/ch24' },
              { text: 'Ch25 社区工具', link: '/cowork/part6/ch25' },
              { text: 'Ch26 反模式排障', link: '/cowork/part6/ch26' },
              { text: 'Ch27 Agent SDK', link: '/cowork/part6/ch27' },
            ],
          },
          {
            text: 'Workshop 实战',
            collapsed: true,
            items: [
              { text: 'W1 审查开源 PR', link: '/cowork/workshop/w01' },
              { text: 'W2 日常自动化', link: '/cowork/workshop/w02' },
              { text: 'W3 多代理开发', link: '/cowork/workshop/w03' },
            ],
          },
          {
            text: '附录',
            collapsed: true,
            items: [
              { text: 'A 命令速查', link: '/cowork/appendix/a' },
              { text: 'B 环境变量', link: '/cowork/appendix/b' },
              { text: 'C 资源索引', link: '/cowork/appendix/c' },
              { text: 'D Prompt 模板', link: '/cowork/appendix/d' },
              { text: 'E 成本计算器', link: '/cowork/appendix/e' },
              { text: 'F 版本日志', link: '/cowork/appendix/f' },
              { text: 'G 术语表', link: '/cowork/appendix/g' },
              { text: 'H 小结与练习', link: '/cowork/appendix/h' },
            ],
          },
        ],

        // ========== MCP 全书 ==========
        '/mcp/': [
          {
            text: '《MCP 全书》',
            items: [{ text: '前言', link: '/mcp/preface' }],
          },
          {
            text: 'Part 1 认知篇',
            collapsed: false,
            items: [
              { text: 'Ch1 MCP 是什么', link: '/mcp/part1/ch01' },
              { text: 'Ch2 协议深度解析', link: '/mcp/part1/ch02' },
              { text: 'Ch3 5 分钟安装', link: '/mcp/part1/ch03' },
            ],
          },
          {
            text: 'Part 2 使用篇',
            collapsed: false,
            items: [
              { text: 'Ch4 官方 Servers', link: '/mcp/part2/ch04' },
              { text: 'Ch4a Filesystem 深度', link: '/mcp/part2/ch04a' },
              { text: 'Ch4b GitHub 深度', link: '/mcp/part2/ch04b' },
              { text: 'Ch4c 数据库 & Memory', link: '/mcp/part2/ch04c' },
              { text: 'Ch5 社区 Servers', link: '/mcp/part2/ch05' },
              { text: 'Ch6 个人工作流', link: '/mcp/part2/ch06' },
            ],
          },
          {
            text: 'Part 3 开发篇',
            collapsed: false,
            items: [
              { text: 'Ch7 TypeScript 构建', link: '/mcp/part3/ch07' },
              { text: 'Ch8 Python 构建', link: '/mcp/part3/ch08' },
              { text: 'Ch9 调试与发布', link: '/mcp/part3/ch09' },
              { text: 'Ch9a 远程 Server 部署', link: '/mcp/part3/ch07a' },
              { text: 'Ch9b OAuth 认证实战', link: '/mcp/part3/ch07b' },
            ],
          },
          {
            text: 'Part 4-6 进阶',
            collapsed: true,
            items: [
              { text: 'Ch10 MCP + Agent Teams', link: '/mcp/part4/ch10' },
              { text: 'Ch10a 多 Server 编排', link: '/mcp/part4/ch10a' },
              { text: 'Ch11 企业案例', link: '/mcp/part5/ch11' },
              { text: 'Ch12 安全与合规', link: '/mcp/part6/ch12' },
            ],
          },
          {
            text: '附录',
            collapsed: true,
            items: [
              { text: 'A 配置速查', link: '/mcp/appendix/a' },
              { text: 'B 资源索引', link: '/mcp/appendix/b' },
            ],
          },
        ],

        // ========== Recipes ==========
        '/recipes/': [
          {
            text: '《高级 Recipes》',
            items: [{ text: '前言', link: '/recipes/preface' }],
          },
          {
            text: 'Part 1 自定义扩展',
            collapsed: false,
            items: [
              { text: 'Ch1 Slash Commands', link: '/recipes/part1/ch01' },
              { text: 'Ch2 Keybindings & Memory', link: '/recipes/part1/ch02' },
            ],
          },
          {
            text: 'Part 2 远程自动化',
            collapsed: false,
            items: [
              { text: 'Ch3 Managed Agents', link: '/recipes/part2/ch03' },
            ],
          },
          {
            text: 'Part 3 · 20 个 Recipes',
            collapsed: false,
            items: [
              { text: 'R01-R05 Git 与代码', link: '/recipes/part3/r01-r05' },
              { text: 'R06-R10 文档与分析', link: '/recipes/part3/r06-r10' },
              { text: 'R11-R15 团队与管理', link: '/recipes/part3/r11-r15' },
              { text: 'R16-R20 大型工程', link: '/recipes/part3/r16-r20' },
              { text: '速览版（全部 20 个）', link: '/recipes/part3/ch04' },
            ],
          },
          {
            text: 'Part 4 企业部署',
            collapsed: false,
            items: [
              { text: 'Ch5 团队治理', link: '/recipes/part4/ch05' },
            ],
          },
        ],

        // ========== Agent SDK ==========
        '/sdk/': [
          {
            text: '《Agent SDK 实战》',
            items: [{ text: '前言', link: '/sdk/preface' }],
          },
          {
            text: 'Part 1 SDK 基础',
            collapsed: false,
            items: [
              { text: 'Ch1 架构与安装', link: '/sdk/part1/ch01' },
              { text: 'Ch2 自定义工具', link: '/sdk/part1/ch02' },
            ],
          },
          {
            text: 'Part 2 多代理编排',
            collapsed: false,
            items: [
              { text: 'Ch3 SubAgent 编��', link: '/sdk/part2/ch03' },
            ],
          },
          {
            text: 'Part 3 产品集成',
            collapsed: false,
            items: [
              { text: 'Ch4 Web/CLI/Bot/CI', link: '/sdk/part3/ch04' },
              { text: 'Ch4a Slack Bot 完整实战', link: '/sdk/part3/ch04a' },
            ],
          },
          {
            text: 'Part 4 生产运维',
            collapsed: false,
            items: [
              { text: 'Ch5 评估·监控·安全', link: '/sdk/part4/ch05' },
            ],
          },
        ],
      },

      socialLinks: [
        { icon: 'github', link: 'https://github.com/anthropics/claude-code' },
      ],

      footer: {
        message: 'Claude 学院 — 六本书覆盖 Claude 全栈能力',
        copyright: '基于 Anthropic 官方文档与社区最佳实践 · 2026 年 4 月',
      },

      docFooter: { prev: '上一章', next: '下一章' },
      returnToTopLabel: '回到顶部',
      sidebarMenuLabel: '目录',
      darkModeSwitchLabel: '主题',
    },

    mermaid: { theme: 'default' },
  })
)
