# Layouts · 咨询风网页 deck

> 配套 `assets/template-consulting.html`。10 种核心 layout，每种都是完整可粘贴的 `<section>` 代码块。
> 风格锚点：McKinsey / BCG / Bain 客户汇报材料 · 结论先行 · 网格至上 · 配色克制 · **呼吸优先**
> 详细工作流见 `SKILL.md`。
>
> ⚠️ **呼吸优先（套 layout 时第一原则）**：layout 是骨架不是填空题——**每个槽位不必填满**。论点 ≤3-4 个且能少则少，每页留 ≥30% 负空间，正文不顶版边，宁可拆成两页也不挤满。模板已把版边/卡距/卡内 padding 调到"宽松档"，**不要为塞更多内容而改小这些间距**。交付前必跑 `visual-qa.md` 的换眼视觉 QA。
>
> 💡 **留白要"分布"不要"塌底"**：内容偏少的页，给中间正文区（`.slide` 的 1fr 行那个直接子元素）加 `class="... center-y"` 纵向居中，让留白分到上下两侧；否则内容堆在上半、下半页大片空白会显得"没做完"。

---

## Pre-flight 类名清单（**写 slide 前必查**）

这些类必须在 `template-consulting.html` 的 `<style>` 里有定义。缺一个就会样式崩。打开模板搜一遍：

**画布 + 容器**：`slide` / `slide.dark` / `slide-head` / `slide-foot` / `page-no` / `section-label` / `deck-meta`

**字号 helper**：`h-statement` / `h-hero` / `h-xl` / `h-md` / `lead` / `body` / `t-cat` / `t-meta` / `t-foot` / `mono` / `num-mega` / `num`

**颜色 helper**：`muted` / `strong` / `accent` / `navy`

**装饰**：`hairline` / `hairline-thick` / `top-rule` / `top-rule.red` / `top-rule.green` / `top-rule.amber` / `title-pin`

**网格**：`grid` / `grid-12` / `grid-3` / `grid-4` / `grid-2` / `grid-2-1` / `grid-1-2` / `col-span-N`

**组件**：
- KPI：`kpi-tile` / `kpi-tile.kpi-red` / `kpi-tile.kpi-green` / `kpi-tile.kpi-amber` + `kpi-num` / `kpi-label` / `kpi-note`
- Panel / Quote：`panel` / `panel-title` / `panel-item` / `pull-quote` + `source`
- Waterfall：`waterfall` / `bar` / `bar.bar-red` / `bar.bar-green` / `bar.bar-amber` / `bar.bar-navy-2` / `bar-value` / `waterfall-labels`
- Horizontal bars：`h-bars` / `row` + `label` / `track` / `fill` / `fill.fill-red/green/amber` / `value`
- 2x2 Matrix：`matrix-2x2` / `axis-y` / `axis-x` / `axis-x-label` / `axis-y-label` / `matrix-area` / `bubble` / `bubble.bubble-red/green/amber`
- Roadmap：`roadmap` / `roadmap-head` / `roadmap-lane` / `lane-label` / `lane-block` / `lane-block.b-navy/red/green/amber`
- Scorecard：`scorecard` / `sc-head` / `sc-row` / `sc-label` / `sc-value` / `sc-dot` / `sc-dot.dot-green/amber/red`
- Diagnostic strip：`diag-strip` / `diag-label` / `diag-track` / `diag-line` / `diag-nodes` / `diag-node` / `diag-node.n-red/green/amber`

**动效 hook**：`[data-anim]` / `[data-anim][data-delay="1..7"]` / `[data-anim-num]` / `[data-anim-bar]` / `[data-anim-hbar]`

如果你要的类不在模板里——**在模板的 `<style>` 里补**，不要在 slide 里 inline 重写。

---

## 主题节奏规划（**挑布局前必做**）

每页 `<section>` 必须明确 light（白底，默认）或 dark（深色底，加 `class="slide dark"`）。

**节奏硬规则**：
- 7 页以下：1 个 dark hero 即可（封面 OR 大引述 OR 收尾，三选一）
- 8-15 页：≥ 1 个 dark hero + ≥ 1 个 dark 章节幕封
- 15+ 页：每 4-5 页插入 1 个 dark 页换气
- 连续 3 页以上同 light/dark = 视觉疲劳，不允许
- 数据密集页（KPI / 2x2 / scorecard / roadmap）默认 light（数据要清晰）
- 章节切换、引述、结论页可以 dark（情绪节点）

**生成后自检**：`grep 'class="slide' index.html` 列出所有页主题，人工确认节奏合理再交付。

---

## 标题层级使用规则

| 类 | 字号 | 用法 |
|---|---|---|
| `h-statement` | 5.2vw / 84px | 大引述 / pull quote / 单页 manifesto，一页只能有一个 |
| `h-hero` | 3.1vw / 48px | 章节大标题 / 数据页结论标题，每页一个 |
| `h-xl` | 2.2vw / 36px | 子标题 / 章节内分节 |
| `h-md` | 1.55vw / 24px | 卡片标题 / 段落小标 |
| `lead` | 1.25vw / 20px | 副标段落（标题下面那一行解释） |
| `body` | 1.05vw / 16px | 正文 / 列表 / 卡片内说明 |
| `t-cat` | 0.84vw / 13px | 章节小标 SemiBold caps |
| `t-meta` | 0.78vw / 11.5px | 页码 / section label / mono caps |

**标题写法铁律**：**结论先行**。
- ❌ "关于 EBITDA 的分析"（描述性）
- ✅ "三项动作可在 12 个月内释放 18-24% EBITDA 改善空间"（结论性）
- ❌ "市场情况"
- ✅ "增长瓶颈不在需求端，而在细分市场选择"

副标用来补论据 / 数据来源 / 方法说明。

---

## 配色使用规则

**默认 navy（#17365D）做主色**——KPI 数字、主色块、bar 默认色。

**红色（#C62828）只用 3 次**：
- 整份 deck 红色出现 ≤ 3 次
- 每次红色都对应"最该看的那一项"（最高 KPI / 最关键象限 / 最强干预动作 / 红灯状态）
- 红色 vertical 标题钉（`.title-pin`）每页可有一个（封面 / 章节幕封）

**绿色 / amber（#3A7D5A / #D79B35）只用作状态色**：
- 绿 = 正向数据 / 收尾里程碑 / 绿灯 status
- amber = 中等数据 / 黄灯 status
- 不能拿绿/amber 做装饰色

**绝对禁用**：渐变、阴影、`border-radius` > 4px、WebGL、点阵装饰、Stock photo

---

# 10 种 Layout

## Layout 1 · 开场封面（Cover）

**用途**：第 1 页。结论先行的大标题 + 副标 + 汇报 meta。

**关键决策**：标题必须是 deck 的核心结论，不是 "XX 项目汇报" 这种描述性标题。

```html
<section class="slide" data-layout="cover">
  <div class="slide-head">
    <div class="page-no">01 / 10</div>
    <div class="deck-meta">[替换：客户名 / 项目名]</div>
    <div class="section-label">EXECUTIVE SUMMARY</div>
  </div>

  <div class="grid" style="grid-template-rows: 1fr auto; padding: var(--sp-7) 0;">
    <div class="grid" style="align-content: end; gap: var(--sp-5);">
      <div class="t-cat" data-anim data-delay="1">[战略诊断 · 价值释放]</div>
      <h1 class="h-statement" data-anim data-delay="2">
        <span class="title-pin"></span>三项动作可在 12 个月内<br>释放 18-24% EBITDA 改善空间
      </h1>
      <p class="lead" style="max-width: 50em;" data-anim data-delay="3">
        基于标杆差距、价格纪律与组织效率的综合测算；优先级按价值密度与落地难度排序。
      </p>
    </div>
    <div class="grid grid-3" style="border-top: 1px solid var(--line); padding-top: var(--sp-5);" data-anim data-delay="4">
      <div><div class="t-meta">汇报对象</div><div class="h-md" style="margin-top: 4px;">[CEO / 董事会]</div></div>
      <div><div class="t-meta">汇报日期</div><div class="h-md" style="margin-top: 4px;">2026-05-25</div></div>
      <div><div class="t-meta">汇报人</div><div class="h-md" style="margin-top: 4px;">[Alan Lee]</div></div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">CONFIDENTIAL</div>
    <div class="center"></div>
    <div class="right">← → 翻页 · ESC 索引 · B 静态</div>
  </div>
</section>
```

---

## Layout 2 · 章节幕封（Section Divider）

**用途**：每幕开场。深色底 + 大编号 + 章节标题 + 章节定调一句话。

**节奏**：dark hero 页，用来呼吸 + 标记结构。

```html
<section class="slide dark" data-layout="section-divider">
  <div class="slide-head">
    <div class="page-no" style="color: rgba(255,255,255,0.9);">02 / 10</div>
    <div class="deck-meta">CHAPTER 01</div>
    <div class="section-label">MARKET LANDSCAPE</div>
  </div>

  <div class="grid" style="grid-template-rows: 1fr; align-content: center; padding: var(--sp-8) 0;">
    <div class="grid" style="gap: var(--sp-5); max-width: 50em;">
      <div class="num-mega" style="color: var(--red);" data-anim data-delay="1">01</div>
      <div class="t-cat" style="color: rgba(255,255,255,0.62);" data-anim data-delay="2">市场结构与利润池</div>
      <h1 class="h-hero" style="color: var(--paper);" data-anim data-delay="3">
        增长瓶颈不在需求端，<br>而在细分市场选择与商业动作一致性
      </h1>
      <p class="lead" style="color: rgba(255,255,255,0.72); max-width: 38em;" data-anim data-delay="4">
        本章将拆解利润池分布、标杆差距和资源错配现象，识别 12-18 个月内的高确定性增长机会。
      </p>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">CHAPTER 01</div>
    <div class="center">市场拆解 · 标杆差距 · 资源重配</div>
    <div class="right">03 - 06</div>
  </div>
</section>
```

---

## Layout 3 · Executive Summary（3 KPI + 决策含义 + 诊断链路）

**用途**：第 2-3 页通常会有的"汇报第一锤"。一页给出 deck 最重要的 3 个数字。

**结构**：标题（结论） + 诊断链路（diagnostic strip） + 3 KPI tiles + 决策含义 panel。

```html
<section class="slide" data-layout="executive-summary">
  <div class="slide-head">
    <div class="page-no">03 / 10</div>
    <div class="deck-meta">VALUE DIAGNOSTIC</div>
    <div class="section-label">EXECUTIVE SUMMARY</div>
  </div>

  <div class="grid" style="grid-template-rows: auto auto 1fr; gap: var(--sp-6);">
    <div data-anim>
      <h2 class="h-hero"><span class="title-pin"></span>三项动作贡献超过 70% 的可捕获价值</h2>
      <p class="lead" style="max-width: 60em; margin-top: var(--sp-3);">
        基线 EBITDA 100；价格纪律、客户组合与交付效率分别贡献 +6 / +8 / +5，达成 119 的目标状态。
      </p>
    </div>

    <div class="diag-strip" data-anim data-delay="1">
      <div class="diag-label">价值诊断链路</div>
      <div class="diag-track">
        <div class="diag-line"></div>
        <div class="diag-nodes">
          <div class="diag-node"><span class="label">基线</span></div>
          <div class="diag-node"><span class="label">价盘</span></div>
          <div class="diag-node n-red"><span class="label">客户</span></div>
          <div class="diag-node n-red"><span class="label">渠道</span></div>
          <div class="diag-node n-red"><span class="label">交付</span></div>
          <div class="diag-node n-green"><span class="label">组织</span></div>
          <div class="diag-node n-green"><span class="label">看板</span></div>
        </div>
      </div>
    </div>

    <div class="grid-2-1" style="align-items: start; gap: var(--sp-6);">
      <div class="grid grid-3">
        <div class="kpi-tile" data-anim data-delay="2">
          <div class="kpi-num" data-anim-num>18-24%</div>
          <div class="kpi-label">EBITDA 提升空间</div>
          <div class="kpi-note">由价格纪律、组合优化和交付效率共同驱动</div>
        </div>
        <div class="kpi-tile kpi-red" data-anim data-delay="3">
          <div class="kpi-num" data-anim-num>3.8x</div>
          <div class="kpi-label">价值 / 复杂度排序</div>
          <div class="kpi-note">Top 3 动作贡献超过 70% 的可捕获价值</div>
        </div>
        <div class="kpi-tile kpi-green" data-anim data-delay="4">
          <div class="kpi-num" data-anim-num>90 天</div>
          <div class="kpi-label">首轮试点周期</div>
          <div class="kpi-note">先跑通一个区域、两条产品线和核心客户群</div>
        </div>
      </div>

      <div class="panel" data-anim data-delay="5">
        <div class="panel-title">决策含义</div>
        <div class="panel-item">先收敛到少数高确定性动作</div>
        <div class="panel-item">建立周度价值追踪机制</div>
        <div class="panel-item">90 天内完成首轮闭环验证</div>
      </div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">03</div>
    <div class="center">价值诊断 · 关键发现</div>
    <div class="right">2026-05-25</div>
  </div>
</section>
```

**变体**：
- 4 KPI 改 `grid grid-4`（数字会变小，慎用）
- 不需要 diagnostic strip 时直接删 `.diag-strip` block
- 决策含义改成"管理启示"或"行动建议"

---

## Layout 4 · 2x2 矩阵（Market / Decision Quadrant）

**用途**：市场象限 / 战略象限 / 优先级矩阵。气泡大小可代表权重。

**关键约束**：
- 红色气泡只能 1 个（标"最该看的"那一项）
- 气泡上文字 ≤ 6 个中文字符（再长会撑破气泡）
- 气泡之间不要有重叠

```html
<section class="slide" data-layout="matrix-2x2">
  <div class="slide-head">
    <div class="page-no">04 / 10</div>
    <div class="deck-meta">SEGMENT ATTRACTIVENESS</div>
    <div class="section-label">MARKET LANDSCAPE</div>
  </div>

  <div class="grid" style="grid-template-rows: auto 1fr auto; gap: var(--sp-5);">
    <div data-anim>
      <h2 class="h-hero"><span class="title-pin"></span>最大利润池集中在两个高确定性客群</h2>
      <p class="lead" style="max-width: 60em; margin-top: var(--sp-3);">
        四象限拆解显示，B 类高潜客户具备最高的"吸引力 × 可达性"组合，但当前资源仍分散在 C / D 类。
      </p>
    </div>

    <div class="grid-2-1" style="gap: var(--sp-6); align-items: stretch;">
      <div class="matrix-2x2" data-anim data-delay="1">
        <div class="axis-y">
          <span>高</span>
          <span class="axis-y-label">利润池吸引力</span>
          <span>低</span>
        </div>
        <div class="axis-x">
          <span>低</span>
          <span class="axis-x-label">商业可达性</span>
          <span>高</span>
        </div>
        <div class="matrix-area">
          <div class="bubble" style="left:30%; top:30%; width:14%; aspect-ratio:1;">A 类<br>核心客户</div>
          <div class="bubble bubble-red" style="left:72%; top:25%; width:18%; aspect-ratio:1;">B 类<br>高潜客户</div>
          <div class="bubble bubble-green" style="left:32%; top:72%; width:13%; aspect-ratio:1;">C 类<br>稳定场景</div>
          <div class="bubble bubble-amber" style="left:70%; top:74%; width:10%; aspect-ratio:1;">D 类<br>机会项目</div>
        </div>
      </div>

      <div class="grid" style="gap: var(--sp-5); align-content: start;">
        <div class="h-md" data-anim data-delay="2">标杆差距</div>
        <div class="h-bars" data-anim data-delay="3">
          <div class="row">
            <div class="label">价格纪律</div>
            <div class="track"><div class="fill" data-anim-hbar style="width:86%;"></div></div>
            <div class="value">86</div>
          </div>
          <div class="row">
            <div class="label">客户组合</div>
            <div class="track"><div class="fill" data-anim-hbar style="width:71%;"></div></div>
            <div class="value">71</div>
          </div>
          <div class="row">
            <div class="label">渠道覆盖</div>
            <div class="track"><div class="fill fill-red" data-anim-hbar style="width:100%;"></div></div>
            <div class="value">100</div>
          </div>
          <div class="row">
            <div class="label">交付效率</div>
            <div class="track"><div class="fill fill-amber" data-anim-hbar style="width:52%;"></div></div>
            <div class="value">52</div>
          </div>
        </div>
      </div>
    </div>

    <div class="panel" data-anim data-delay="4">
      <div class="panel-title">管理启示</div>
      <div class="panel-item">资源应从平均覆盖转向"高潜客群 + 标准化动作包"的组合打法</div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">04</div>
    <div class="center">市场象限 · 标杆差距</div>
    <div class="right">2026-05-25</div>
  </div>
</section>
```

---

## Layout 5 · 落地路标（Roadmap Swimlanes + Scorecard）

**用途**：实施计划。3 条工作流 × 4 时间段 + 右侧执行 scorecard。

**关键约束**：每个 `lane-block` 必须明确 `grid-column: N / span M` 占据哪些时间段。

```html
<section class="slide" data-layout="roadmap">
  <div class="slide-head">
    <div class="page-no">05 / 10</div>
    <div class="deck-meta">IMPLEMENTATION PLAN</div>
    <div class="section-label">IMPLEMENTATION ROADMAP</div>
  </div>

  <div class="grid" style="grid-template-rows: auto 1fr; gap: var(--sp-6);">
    <div data-anim>
      <h2 class="h-hero"><span class="title-pin"></span>建议以 3 条工作流推进：<br>先锁定价值，再建立节奏，最后固化能力</h2>
      <p class="lead" style="max-width: 64em; margin-top: var(--sp-3);">
        每条工作流均设置可量化里程碑，避免停留在方案层面；第 4 周即可形成第一轮经营看板。
      </p>
    </div>

    <div class="grid-2-1" style="gap: var(--sp-6); align-items: stretch;">
      <div class="roadmap" data-anim data-delay="1">
        <div class="roadmap-head">
          <div></div>
          <div>W1-2</div><div>W3-4</div><div>W5-8</div><div>W9-12</div>
        </div>
        <div class="roadmap-lane">
          <div class="lane-label">1 价值锁定</div>
          <div class="lane-block b-navy" style="grid-column: 2 / span 2;">
            清理价格例外、客户分层与 Top 机会清单
          </div>
          <div></div><div></div>
        </div>
        <div class="roadmap-lane">
          <div class="lane-label">2 节奏建立</div>
          <div></div>
          <div class="lane-block b-red" style="grid-column: 3 / span 2;">
            周度经营会、红黄绿预警与行动闭环
          </div>
          <div></div>
        </div>
        <div class="roadmap-lane">
          <div class="lane-label">3 能力固化</div>
          <div></div><div></div>
          <div class="lane-block b-green" style="grid-column: 4 / span 2;">
            形成模板、看板与一线销售动作手册
          </div>
        </div>
      </div>

      <div class="scorecard" data-anim data-delay="2">
        <div class="sc-head">执行看板</div>
        <div class="sc-row"><div class="sc-label">价格例外率</div><div class="sc-value">&lt; 5%</div><div class="sc-dot dot-green"></div></div>
        <div class="sc-row"><div class="sc-label">高潜客户覆盖</div><div class="sc-value">85%</div><div class="sc-dot dot-green"></div></div>
        <div class="sc-row"><div class="sc-label">行动闭环周期</div><div class="sc-value">7 天</div><div class="sc-dot dot-amber"></div></div>
        <div class="sc-row"><div class="sc-label">试点毛利提升</div><div class="sc-value">+6 pt</div><div class="sc-dot dot-red"></div></div>
      </div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">05 · NEXT STEPS</div>
    <div class="center">用两周完成数据校验与试点市场选择，随后进入 90 天价值冲刺</div>
    <div class="right">END</div>
  </div>
</section>
```

---

## Layout 6 · 价值瀑布（Value Waterfall）

**用途**：拆解价值来源 / 成本结构 / EBITDA 桥。5 根 bar 表达：起点 → +X → +Y → +Z → 终点。

**关键约束**：
- bar 数量 5-7 根最佳，超过 7 根视觉拥挤
- 红色 bar 只能 1 根（最大贡献项）
- bar 上的数字必须用 `data-anim-num` 入场

```html
<section class="slide" data-layout="value-waterfall">
  <div class="slide-head">
    <div class="page-no">06 / 10</div>
    <div class="deck-meta">EBITDA BRIDGE</div>
    <div class="section-label">VALUE DECOMPOSITION</div>
  </div>

  <div class="grid" style="grid-template-rows: auto 1fr; gap: var(--sp-6);">
    <div data-anim>
      <h2 class="h-hero"><span class="title-pin"></span>价值瀑布：三项动作构成主要改善来源</h2>
      <p class="lead" style="max-width: 60em; margin-top: var(--sp-3);">
        从基线 100 出发，价格纪律 +6、客户组合 +8、交付效率 +5；高潮项目标红，其余项目克制处理。
      </p>
    </div>

    <div class="grid" style="grid-template-rows: 1fr auto; gap: var(--sp-3);">
      <div class="waterfall" data-anim data-delay="1">
        <div class="bar" data-anim-bar style="height: 50%;"><span class="bar-value" data-anim-num>100</span></div>
        <div class="bar bar-navy-2" data-anim-bar style="height: 65%;"><span class="bar-value" data-anim-num>+6</span></div>
        <div class="bar bar-red" data-anim-bar style="height: 78%;"><span class="bar-value" data-anim-num>+8</span></div>
        <div class="bar bar-amber" data-anim-bar style="height: 70%;"><span class="bar-value" data-anim-num>+5</span></div>
        <div class="bar bar-green" data-anim-bar style="height: 95%;"><span class="bar-value" data-anim-num>119</span></div>
      </div>
      <div class="waterfall-labels">
        <span>当前基线</span>
        <span>价格纪律</span>
        <span>客户组合</span>
        <span>交付效率</span>
        <span>目标状态</span>
      </div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">06</div>
    <div class="center">价值贡献拆解</div>
    <div class="right">2026-05-25</div>
  </div>
</section>
```

---

## Layout 7 · 横向流程（Diagnostic Process / Pipeline）

**用途**：诊断链路 / 工作流程 / 7 步方法论。横向 N 节点 + 颜色分段表示状态。

**用法**：单独使用时是一个"流程图页"；嵌在 `executive-summary` 里时是一个组件。

```html
<section class="slide" data-layout="process">
  <div class="slide-head">
    <div class="page-no">07 / 10</div>
    <div class="deck-meta">VALUE CHAIN</div>
    <div class="section-label">DIAGNOSTIC FRAMEWORK</div>
  </div>

  <div class="grid" style="grid-template-rows: auto auto 1fr; gap: var(--sp-6);">
    <div data-anim>
      <h2 class="h-hero"><span class="title-pin"></span>价值诊断链路：从基线到看板的 7 个环节</h2>
      <p class="lead" style="max-width: 60em; margin-top: var(--sp-3);">
        前 2 个环节是基线（蓝色），中间 3 个环节是干预重点（红色），后 2 个环节是组织 enabler（绿色）。
      </p>
    </div>

    <div class="diag-strip" data-anim data-delay="1" style="padding: var(--sp-6) var(--sp-5);">
      <div class="diag-label">价值诊断链路</div>
      <div class="diag-track" style="height: 40px;">
        <div class="diag-line"></div>
        <div class="diag-nodes">
          <div class="diag-node"><span class="label">基线</span></div>
          <div class="diag-node"><span class="label">价盘</span></div>
          <div class="diag-node n-red"><span class="label">客户</span></div>
          <div class="diag-node n-red"><span class="label">渠道</span></div>
          <div class="diag-node n-red"><span class="label">交付</span></div>
          <div class="diag-node n-green"><span class="label">组织</span></div>
          <div class="diag-node n-green"><span class="label">看板</span></div>
        </div>
      </div>
    </div>

    <div class="grid grid-3" style="gap: var(--sp-5);">
      <div class="panel" data-anim data-delay="2">
        <div class="panel-title navy">基线（前 2 环）</div>
        <div class="panel-item">数据基线统一口径</div>
        <div class="panel-item">价盘清理与建账</div>
        <div class="body muted" style="margin-top: var(--sp-3);">目的：让后续干预动作有可对比的起点。</div>
      </div>
      <div class="panel" data-anim data-delay="3" style="background: var(--red-tint);">
        <div class="panel-title accent">干预重点（中间 3 环）</div>
        <div class="panel-item">客户分层与高潜识别</div>
        <div class="panel-item">渠道资源重配</div>
        <div class="panel-item">交付效率提升</div>
        <div class="body muted" style="margin-top: var(--sp-3);">目的：贡献 70%+ 的可捕获价值。</div>
      </div>
      <div class="panel" data-anim data-delay="4" style="background: var(--green-tint);">
        <div class="panel-title" style="color: var(--green);">组织 Enabler（后 2 环）</div>
        <div class="panel-item">销售组织 + 激励重配</div>
        <div class="panel-item">周度经营看板</div>
        <div class="body muted" style="margin-top: var(--sp-3);">目的：让价值改善可持续、可复制。</div>
      </div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">07</div>
    <div class="center">7 环价值诊断框架</div>
    <div class="right">2026-05-25</div>
  </div>
</section>
```

---

## Layout 8 · 方案对比（Option Comparison）

**用途**：3 套方案 / 3 条路径 / 3 种打法的并列对比。每列有"成本 / 周期 / 回报 / 风险 / 推荐度"几行指标。

**关键约束**：推荐方案必须用红色 vertical accent 或 `kpi-tile.kpi-red` 标出。

```html
<section class="slide" data-layout="option-comparison">
  <div class="slide-head">
    <div class="page-no">08 / 10</div>
    <div class="deck-meta">STRATEGIC OPTIONS</div>
    <div class="section-label">DECISION</div>
  </div>

  <div class="grid" style="grid-template-rows: auto 1fr auto; gap: var(--sp-5);">
    <div data-anim>
      <h2 class="h-hero"><span class="title-pin"></span>三套实施路径：推荐"聚焦试点 + 快速复制"</h2>
      <p class="lead" style="max-width: 60em; margin-top: var(--sp-3);">
        全面铺开方案投入最大但风险集中；最小试点方案保守但失去时间窗；推荐方案在 90 天内验证 + 6 个月内复制。
      </p>
    </div>

    <div class="grid grid-3" style="gap: var(--sp-5); align-items: stretch;">
      <!-- 方案 A -->
      <div class="grid" style="gap: var(--sp-4); border: 1px solid var(--line); padding: var(--sp-5);" data-anim data-delay="1">
        <div class="t-cat muted">方案 A</div>
        <div class="h-md">全面铺开</div>
        <div class="hairline"></div>
        <div class="grid" style="grid-template-columns: 1fr auto; gap: var(--sp-2); font-size: var(--t-body);">
          <div class="muted">投入</div><div class="strong mono">¥ 18M</div>
          <div class="muted">周期</div><div class="strong mono">12 月</div>
          <div class="muted">回报</div><div class="strong mono">+22%</div>
          <div class="muted">风险</div><div class="strong" style="color:var(--red);">高</div>
        </div>
        <div class="body muted" style="margin-top: var(--sp-2);">资源集中铺开，回报最大但失败成本同样大；不适合现阶段。</div>
      </div>

      <!-- 方案 B 推荐 -->
      <div class="grid" style="gap: var(--sp-4); border: 2px solid var(--red); padding: var(--sp-5); background: var(--paper-tint);" data-anim data-delay="2">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <div class="t-cat accent">方案 B · 推荐</div>
          <div class="t-meta accent">RECOMMENDED</div>
        </div>
        <div class="h-md">聚焦试点 + 快速复制</div>
        <div class="hairline-thick"></div>
        <div class="grid" style="grid-template-columns: 1fr auto; gap: var(--sp-2); font-size: var(--t-body);">
          <div class="muted">投入</div><div class="strong mono">¥ 8M</div>
          <div class="muted">周期</div><div class="strong mono">9 月</div>
          <div class="muted">回报</div><div class="strong" style="color:var(--red);">+18-24%</div>
          <div class="muted">风险</div><div class="strong" style="color:var(--green);">中等</div>
        </div>
        <div class="body" style="margin-top: var(--sp-2);">先在一个区域跑通，证伪后快速复制到 3 区域；现阶段最优解。</div>
      </div>

      <!-- 方案 C -->
      <div class="grid" style="gap: var(--sp-4); border: 1px solid var(--line); padding: var(--sp-5);" data-anim data-delay="3">
        <div class="t-cat muted">方案 C</div>
        <div class="h-md">最小可行试点</div>
        <div class="hairline"></div>
        <div class="grid" style="grid-template-columns: 1fr auto; gap: var(--sp-2); font-size: var(--t-body);">
          <div class="muted">投入</div><div class="strong mono">¥ 3M</div>
          <div class="muted">周期</div><div class="strong mono">6 月</div>
          <div class="muted">回报</div><div class="strong mono">+8%</div>
          <div class="muted">风险</div><div class="strong" style="color:var(--green);">低</div>
        </div>
        <div class="body muted" style="margin-top: var(--sp-2);">单点试错风险最低，但市场窗口期内只能拿到小部分价值。</div>
      </div>
    </div>

    <div class="panel" data-anim data-delay="4">
      <div class="panel-title">决策建议</div>
      <div class="panel-item">立项方案 B，2 周内完成试点市场选择和数据校验</div>
      <div class="panel-item">如试点 60 天后 ROI 仍不达预期，可降级为方案 C 保底</div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">08</div>
    <div class="center">方案对比 · 决策建议</div>
    <div class="right">2026-05-25</div>
  </div>
</section>
```

---

## Layout 9 · 大引述 / Manifesto（Big Statement）

**用途**：用 80px 大字砸一个核心观点。每份 deck 最多 1-2 个，太多就稀释了。

**节奏**：dark 页搭配 statement，效果最强。

```html
<section class="slide dark" data-layout="big-statement">
  <div class="slide-head">
    <div class="page-no" style="color: rgba(255,255,255,0.9);">09 / 10</div>
    <div class="deck-meta">THE CORE POINT</div>
    <div class="section-label">MANIFESTO</div>
  </div>

  <div class="grid" style="grid-template-rows: 1fr; align-content: center; padding: var(--sp-7) 0;">
    <div class="grid" style="gap: var(--sp-6); max-width: 60em;">
      <div class="t-cat" style="color: var(--red);" data-anim data-delay="1">CORE TAKEAWAY</div>
      <h1 class="h-statement" style="color: var(--paper);" data-anim data-delay="2">
        让组织节奏成为<br>价值的护城河
      </h1>
      <div class="grid" style="gap: var(--sp-3); max-width: 50em;" data-anim data-delay="3">
        <p class="lead" style="color: rgba(255,255,255,0.85); font-size: var(--t-md);">
          方案不缺，缺的是把方案变成<strong style="color:var(--paper);">每周可追踪的动作</strong>。
        </p>
        <p class="lead" style="color: rgba(255,255,255,0.65);">
          —— 7 个企业试点项目复盘的共同结论
        </p>
      </div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">09 · STATEMENT</div>
    <div class="center"></div>
    <div class="right">→ NEXT STEPS</div>
  </div>
</section>
```

---

## Layout 10 · 收尾 / Next Steps（Closing）

**用途**：最后一页。3 条 next step + 时间窗 + 联系方式。

**写法**：每条 next step 必须有"动作 + 时间 + 负责人 / 输出物"三要素，不能虚。

```html
<section class="slide" data-layout="closing">
  <div class="slide-head">
    <div class="page-no">10 / 10</div>
    <div class="deck-meta">NEXT 30 DAYS</div>
    <div class="section-label">NEXT STEPS</div>
  </div>

  <div class="grid" style="grid-template-rows: auto 1fr auto; gap: var(--sp-6);">
    <div data-anim>
      <h2 class="h-hero"><span class="title-pin"></span>下一步：用 2 周完成数据校验与试点市场选择</h2>
      <p class="lead" style="max-width: 60em; margin-top: var(--sp-3);">
        随后进入 90 天价值冲刺，目标是在 Q3 形成第一轮经营看板。
      </p>
    </div>

    <div class="grid grid-3" style="gap: var(--sp-5); align-items: stretch;">
      <div class="kpi-tile" data-anim data-delay="1">
        <div class="t-cat muted">WEEK 1</div>
        <div class="h-md" style="margin-top: var(--sp-2);">数据校验</div>
        <div class="body muted">统一基线口径，输出 3 张数据底表（价盘 / 客户 / 交付）。</div>
        <div class="t-meta" style="margin-top: var(--sp-3);">OWNER · 数据组</div>
      </div>
      <div class="kpi-tile kpi-red" data-anim data-delay="2">
        <div class="t-cat accent">WEEK 2</div>
        <div class="h-md" style="margin-top: var(--sp-2);">试点市场选择</div>
        <div class="body muted">3 个候选区域中选 1 个，决策标准已对齐。</div>
        <div class="t-meta" style="margin-top: var(--sp-3);">OWNER · 战略组</div>
      </div>
      <div class="kpi-tile kpi-green" data-anim data-delay="3">
        <div class="t-cat" style="color: var(--green);">WEEK 3 - 12</div>
        <div class="h-md" style="margin-top: var(--sp-2);">90 天冲刺</div>
        <div class="body muted">周度经营会 + 红黄绿预警 + 行动闭环。</div>
        <div class="t-meta" style="margin-top: var(--sp-3);">OWNER · 项目组</div>
      </div>
    </div>

    <div class="grid grid-3" style="border-top: 1px solid var(--line); padding-top: var(--sp-5);" data-anim data-delay="4">
      <div><div class="t-meta">下一次汇报</div><div class="h-md" style="margin-top: 4px;">2026-06-15</div></div>
      <div><div class="t-meta">汇报内容</div><div class="h-md" style="margin-top: 4px;">数据校验结果 + 试点选择</div></div>
      <div><div class="t-meta">汇报人</div><div class="h-md" style="margin-top: 4px;">[Alan Lee]</div></div>
    </div>
  </div>

  <div class="slide-foot">
    <div class="left">END</div>
    <div class="center">Thank you · Questions?</div>
    <div class="right">[Alan Lee] · alan@example.com</div>
  </div>
</section>
```

---

# 选 layout 决策表

| 页内容性质 | 推荐 layout | 备注 |
|---|---|---|
| 第 1 页 | Layout 1 Cover | 标题必须是结论 |
| 章节开场 | Layout 2 Section Divider | dark 页换气 |
| 数据钉子页（最重要的 3 个数字） | Layout 3 Executive Summary | 通常第 2-3 页 |
| 市场象限 / 战略矩阵 | Layout 4 2x2 Matrix | 红色气泡 ≤ 1 |
| 实施计划 / 时间安排 | Layout 5 Roadmap | 配 scorecard |
| 拆解贡献 / EBITDA 桥 | Layout 6 Value Waterfall | bar 5-7 根 |
| 流程 / 方法论 / 价值链路 | Layout 7 Process | 节点分色段 |
| 多方案对比 | Layout 8 Option Comparison | 推荐项标红 |
| 一句话观点砸 | Layout 9 Big Statement | dark 页 + 每 deck ≤ 2 次 |
| 收尾 / next step | Layout 10 Closing | 每条 next 有"动作+时间+负责人" |

# 7 页 / 10 页 / 15 页 标准节奏建议

| 总页数 | 节奏 |
|---|---|
| **7 页** | Cover → ExecSummary → 2x2 → Waterfall → Roadmap → BigStatement (dark) → Closing |
| **10 页** | Cover → ExecSummary → SectionDivider1 (dark) → 2x2 → Waterfall → Process → SectionDivider2 (dark) → OptionCompare → Roadmap → Closing |
| **15 页** | Cover → ExecSummary → SectionDivider1 (dark) → 2x2 → Waterfall → Process → DataPage → SectionDivider2 (dark) → OptionCompare → Roadmap → Scorecard深化 → DataPage → BigStatement (dark) → DeepDive → Closing |
