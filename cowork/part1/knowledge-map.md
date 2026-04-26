
# 全书知识地图

## 概念关系图

```mermaid
graph TB
    subgraph "Claude 协作体系"
        A[Claude Desktop] --> B[Cowork 桌面代理]
        A --> C[Chat 聊天模式]
        
        D[Claude Code CLI] --> E[单 Agent 会话]
        D --> F[Subagents 子代理]
        D --> G[Agent Teams 代理团队]
        D --> H[Git Worktrees 工作树]
    end

    subgraph "Cowork 能力"
        B --> B1[文件操作]
        B --> B2[Computer Use 屏幕操作]
        B --> B3[Dispatch 手机远程]
        B --> B4[Skills 可复用工作流]
        B --> B5[Plugins/Connectors]
    end

    subgraph "Agent Teams 四组件"
        G --> G1[Team Lead 负责人]
        G --> G2[Teammates 队友]
        G --> G3[Task List 共享任务]
        G --> G4[Mailbox 邮箱通信]
    end

    subgraph "编排模式"
        G1 --> M1[默认模式: Lead 也干活]
        G1 --> M2[Delegate Mode: Lead 纯协调]
        G1 --> M3[Plan → Team: 先规划后执行]
    end

    subgraph "关键实践"
        P1[文件边界隔离]
        P2[Token Budget 控制]
        P3[CLAUDE.md 精简]
        P4[Hooks 质量门控]
        P5[3-5 人甜区]
    end

    G --> P1
    G --> P2
    G --> P3
    G --> P4
    G --> P5

    style B fill:#e1f5fe
    style G fill:#fff3e0
    style F fill:#f3e5f5
    style H fill:#e8f5e9
```

## 工具选择决策树

```mermaid
flowchart TD
    START[你的任务是什么？] --> Q1{是代码任务吗？}
    
    Q1 -->|否| COWORK[✅ Claude Cowork]
    Q1 -->|是| Q2{需要多个 agent 吗？}
    
    Q2 -->|否| SINGLE[✅ 单个 Claude Code]
    Q2 -->|是| Q3{agent 之间需要通信吗？}
    
    Q3 -->|否| Q4{需要独立 Git 分支吗？}
    Q3 -->|是| TEAMS[✅ Agent Teams]
    
    Q4 -->|是| WORKTREE[✅ Git Worktrees]
    Q4 -->|否| Q5{需要隔离上下文吗？}
    
    Q5 -->|是| SUBAGENT[✅ Subagents]
    Q5 -->|否| BATCH[✅ /batch]

    style COWORK fill:#e1f5fe
    style TEAMS fill:#fff3e0
    style SUBAGENT fill:#f3e5f5
    style WORKTREE fill:#e8f5e9
    style SINGLE fill:#fce4ec
    style BATCH fill:#f5f5f5
```

## 难度层级路径

```mermaid
graph LR
    subgraph "小白路径"
        L1[Ch1 时代背景] --> L2[Ch2 全景]
        L2 --> L3[Ch4 上手 Cowork]
        L3 --> L4[Ch5 十大场景]
        L4 --> L5[Ch6 Dispatch]
    end

    subgraph "进阶路径"
        L5 --> M1[Ch9 架构解析]
        M1 --> M2[Ch10 配置]
        M2 --> M3[Ch11 编排基础]
        M3 --> M4[Ch15 Subagents]
        M4 --> M5[Ch16 Worktrees]
    end

    subgraph "专家路径"
        M3 --> H1[Ch12 Delegate Mode]
        H1 --> H2[Ch13 Plan→Team]
        H2 --> H3[Ch14 文件边界]
        H3 --> H4[Part 5 案例篇]
        H4 --> H5[Part 6 进阶篇]
    end

    style L1 fill:#c8e6c9
    style L5 fill:#c8e6c9
    style M1 fill:#fff9c4
    style M5 fill:#fff9c4
    style H1 fill:#ffccbc
    style H5 fill:#ffccbc
```

## 成本—能力矩阵

```
能力 ▲
     │
  高 │          ┌──────────┐
     │          │  Agent   │
     │          │  Teams   │
     │    ┌─────┤  (3-7x)  │
     │    │ Sub │          │
  中 │    │agents│──────────┘
     │    │(1.5-│
     │    │ 2x) │  ┌──────────┐
     │    └─────┘  │Worktrees │
  低 │  ┌──────┐   │  (Nx1x)  │
     │  │单agent│   └──────────┘
     │  │ (1x) │
     │  └──────┘
     └──────────────────────────► 成本
       低        中          高
```

## 章节—能力映射

| 你想学 | 读这些章 |
|--------|----------|
| 文件自动化 | Ch4, Ch5, Ch8 |
| 手机远程控制 | Ch6 |
| 屏幕自动化 | Ch7 |
| 多代理架构 | Ch9, Ch17 |
| 团队编排 | Ch11, Ch12, Ch13, Ch14 |
| 子代理并行 | Ch15 |
| Git 并行开发 | Ch16 |
| 真实案例 | Ch18, Ch19, Ch20, Ch21 |
| 成本优化 | Ch22, Ch23 |
| 质量保障 | Ch24, Ch26 |
| 社区工具 | Ch25 |
| 编程式构建 | Agent SDK 篇 |
