# Image-2 Prompt Template · 麦肯锡咨询风 16:9 整页视觉

> 用法：把下面的 JSON 块复制到 GPT Image 2 / Nano Banana / Imagen 3。
> 第一步先发"Shared Visual System"作为风格锚定；然后每页一份独立 Prompt。
> 详细工作流见 `references/mckinsey-pptx.md`。

---

## Shared Visual System（共享视觉系统 · 所有页公用）

每次生成第一页前，先把这段贴给模型作为风格基准。后续每页 Prompt 可以省略 `style` 字段（模型会沿用），只发 `slide_number` / `title` / `layout` / `exact_text` 等差异部分。

```json
{
  "type": "strategy consulting presentation slide",
  "aspect_ratio": "16:9",
  "style": {
    "overall": "McKinsey / BCG style executive board presentation, dense but highly organized, premium consulting report aesthetic",
    "composition": "strict modular grid, strong alignment, conclusion-first title, small navigation label, thin divider lines, compact charts, high information density",
    "background": "pure white with subtle light gray panels, no decorative gradients, no stock photography",
    "color_palette": ["deep navy #17365D", "charcoal #17212B", "cool gray #D9DEE5", "consulting red #C62828", "muted steel blue #2F5F8F", "forest green #3A7D5A", "amber #D79B35"],
    "typography": "clean business sans-serif, hierarchy similar to professional consulting decks; titles bold, labels compact, numbers large",
    "chart_language": "waterfall charts, 2x2 matrix, benchmark bars, roadmap tracks, scorecard dots, thin axis lines, direct labels",
    "quality": "commercial-grade slide visual, crisp text, pixel-accurate grid, high-resolution, export-ready"
  },
  "constraints": [
    "No 3D decorative hero scene",
    "No marketing landing page style",
    "No rounded card-heavy SaaS dashboard look",
    "No stock photo background",
    "Keep all Chinese text accurate and readable",
    "Leave enough clean whitespace around sections"
  ]
}
```

---

## 单页 Prompt 模板（必填骨架）

每页一份，按下面字段顺序填。**所有字段都不能省**——`exact_text` 决定模型写哪些字，`visual_emphasis` 决定红色 accent 落在哪里。

```json
{
  "type": "strategy consulting presentation slide",
  "slide_number": "01",
  "section": "EXECUTIVE SUMMARY",
  "title": "<结论先行的一句话标题 · ≤ 28 个中文字符>",
  "subtitle": "<补论据的副标 · 1-2 句话 · 说明数据来源或方法>",
  "layout": {
    "top": "<顶部区域描述：标题 + section label + 分隔线>",
    "middle": "<中部主视觉描述：KPI tiles / matrix / chart>",
    "right_middle": "<可选 · 右侧辅助面板>",
    "bottom": "<底部区域描述：waterfall / 结论条 / next step>"
  },
  "exact_text": [
    "<必须出现在画面里的精确文字 1>",
    "<必须出现在画面里的精确文字 2>",
    "<…通常 8-15 条，包括标题、KPI 数字、章节标签>"
  ],
  "visual_emphasis": "<哪个元素用红色高亮 · 一份 deck 整体只允许 ≤ 3 次红色>"
}
```

---

## 9 种常用 layout（按场景选）

| layout type | 适合的页面性质 | 关键视觉元素 |
|---|---|---|
| **EXECUTIVE SUMMARY** | 整份 deck 的第 1 页，给出总结论 | 3 KPI tiles + 决策含义 + value waterfall |
| **MARKET LANDSCAPE** | 市场拆解 / 行业分析 | 2x2 矩阵 + benchmark bars + 管理启示 |
| **IMPLEMENTATION ROADMAP** | 落地计划 | 3 条 swimlane × 4 时间段 + 执行 scorecard |
| **DIAGNOSTIC** | 现状诊断 | 横向 7 节点 diagnostic strip + KPI 卡 |
| **OPTION COMPARISON** | 多方案对比 | 3 列卡片，每列 KPI + 优劣点 + 推荐度 |
| **VALUE WATERFALL** | 拆解价值来源 / 成本结构 | 5+ 根 waterfall 条 + 直接标签 |
| **DECISION 2x2** | 决策矩阵 | 大 2x2 + 四象限气泡 + 推荐路径 |
| **PROCESS** | 流程 / 链路 | 横向 4-7 步流程 + 每步动作 + 节奏面板 |
| **CLOSING** | 收尾页 / next step | 3 条 next step + timeline + 联系人 |

---

## 示例：3 页咨询测试 deck

下面三段是已验证可生成的 Prompt（来自 `~/dev/ppt/v2_image2_workflow/image2_prompts.md`），可以当作"骨架案例"参考填法：

### Page 1 · Executive Summary 示例

```json
{
  "type": "strategy consulting presentation slide",
  "slide_number": "01",
  "section": "EXECUTIVE SUMMARY",
  "title": "三项动作可在12个月内释放 18-24% EBITDA 改善空间",
  "subtitle": "基于标杆差距、价格纪律与组织效率的综合测算；优先级按价值密度与落地难度排序。",
  "layout": {
    "top": "large conclusion-first title on the left, section label on the right, thin divider line",
    "middle": "three KPI tiles with slim colored top rules; each tile contains one oversized number and short label",
    "right_middle": "small decision implication panel with two action statements",
    "bottom": "consulting waterfall chart showing baseline 100, price discipline +6, customer mix +8, delivery efficiency +5, target 119; direct labels above bars"
  },
  "exact_text": [
    "18-24%",
    "EBITDA提升空间",
    "3.8x",
    "价值/复杂度排序",
    "90天",
    "首轮试点周期",
    "决策含义",
    "先收敛到少数高确定性动作",
    "建立周度价值追踪机制",
    "价值瀑布：三项动作构成主要改善来源"
  ],
  "visual_emphasis": "red accent only on the highest value lever and vertical title rule; otherwise navy/gray restrained consulting style"
}
```

### Page 2 · Market Landscape 示例

```json
{
  "type": "strategy consulting presentation slide",
  "slide_number": "02",
  "section": "MARKET LANDSCAPE",
  "title": "增长瓶颈不在需求端，而在细分市场选择和商业动作一致性",
  "subtitle": "四象限拆解显示，最大利润池集中在两个高确定性客群，但当前资源仍分散在低回报场景。",
  "layout": {
    "top": "conclusion title and concise subtitle",
    "main_left": "large 2x2 market attractiveness vs commercial reachability matrix, four bubbles of different sizes, thin grid lines",
    "main_right": "benchmark horizontal bar chart with four metrics: 价格纪律, 客户组合, 渠道覆盖, 交付效率",
    "bottom": "single bold management implication statement"
  },
  "exact_text": [
    "利润池吸引力",
    "商业可达性",
    "A类核心客户",
    "B类高潜客户",
    "C类稳定场景",
    "D类机会型项目",
    "标杆差距",
    "管理启示：资源应从平均覆盖转向\"高潜客群 + 标准化动作包\"的组合打法。"
  ],
  "visual_emphasis": "make B类高潜客户 clearly highlighted in red, but keep the rest analytical and understated"
}
```

### Page 3 · Implementation Roadmap 示例

```json
{
  "type": "strategy consulting presentation slide",
  "slide_number": "03",
  "section": "IMPLEMENTATION ROADMAP",
  "title": "建议以 3 条工作流推进：先锁定价值，再建立节奏，最后固化能力",
  "subtitle": "每条工作流均设置可量化里程碑，避免停留在方案层面；第 4 周即可形成第一轮经营看板。",
  "layout": {
    "top": "conclusion title and subtitle",
    "main_left": "three horizontal roadmap swimlanes across W1-2, W3-4, W5-8, W9-12; colored work blocks for 价值锁定, 节奏建立, 能力固化",
    "main_right": "compact execution scorecard with four rows and green/amber/red status dots",
    "bottom": "next-step statement"
  },
  "exact_text": [
    "W1-2",
    "W3-4",
    "W5-8",
    "W9-12",
    "1 价值锁定",
    "2 节奏建立",
    "3 能力固化",
    "执行看板",
    "价格例外率",
    "高潜客户覆盖",
    "行动闭环周期",
    "试点毛利提升",
    "下一步：用两周完成数据校验与试点市场选择，随后进入 90 天价值冲刺。"
  ],
  "visual_emphasis": "roadmap should feel like a consulting implementation plan, not a project management app screenshot"
}
```

---

## 给模型的语气提示（直接复制可用）

如果模型生成出来"太像 SaaS 营销页 / 太花哨"，加这段补充提示：

> 请按麦肯锡或 BCG 的客户汇报材料风格生成，不要用任何 3D 装饰、不要营销 hero scene、不要 SaaS 仪表盘的圆角卡片、不要素材库照片。整体克制、网格严谨、信息密度高，红色只作为单点强调。
