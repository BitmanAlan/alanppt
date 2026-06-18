# C 路径 · 麦肯锡可编辑 pptx · 完整工作流

> 这是 alanppt 的**第三条产出路径**：image-first 工作流，最终交付一个**真正可在 PowerPoint 里二次编辑**的 .pptx 文件。
> 适合客户咨询汇报 / 高管展示 / 需要"对方接着改"的场景。
> 网页 PPT（A 杂志风 / B 瑞士风）请走 `layouts.md` / `layouts-swiss.md`，不要混用本文档。
>
> ⚠️ **两条铁律（image-first 最易翻车处）**：① **呼吸优先**——image-2 生图时 prompt 里就要写"generous whitespace / ≥30% negative space / 版边留白 / 每页≤3-4论点"，否则图像模型默认把版面塞满，后面再补救很难；② **换眼 QA 必跑**——pptx 渲染成图后按 `visual-qa.md` 派全新子agent挑刺（重点查呼吸/留白/溢出），修验回环后才交付。自检清单见 `checklist-mckinsey.md`（含 P2-5 呼吸量化项）。

---

## 0 · 何时走 C 路径（决策点）

| 用户信号 | 走 C |
|---|---|
| "要 .pptx 文件" / "PPT 要发给别人改" | ✅ |
| "客户要咨询风" / "麦肯锡风" / "BCG 风" / "执行汇报" | ✅ |
| "高管展示" / "董事会" / "投决会" | ✅ |
| "网页 deck" / "发链接就能看" | ❌ 走 A 或 B |
| "杂志风" / "Monocle 风" / "瑞士风" / "Swiss Style" | ❌ 走 A 或 B |
| "一张封面" / "公众号头图" | ❌ 走 D |

**硬规则**：一份 deck 只走一条路径。如果客户既要网页版又要 pptx，**分别做两份**，不要试图共用资产。

---

## 1 · 四步工作流

```
Step 1: 用 image-2 类模型按 JSON Prompt 生成 16:9 整页视觉图（3-N 页）
Step 2: 把每页拆成独立透明 PNG 视觉素材（图层化）
Step 3: 用 pptxgenjs 把 PNG 图层放回原位 + 加可编辑文本框
Step 4: 在 PowerPoint / Keynote 里打开验证，文字必须独立可改
```

### Step 1 · 生成 16:9 整页视觉图

**工具选择（按可用性排序）**：
1. GPT Image 2（OpenAI，文字渲染最稳）
2. Nano Banana / Google Imagen 3（中文文字也 OK）
3. Midjourney v6（视觉密度高但中文文字常崩，慎用）

**输入**：本 skill 提供的 image2 prompt 模板 → `assets/mckinsey-pptx/image2-prompt-template.md`

模板里有：
- **Shared Visual System**（共享视觉系统，所有页公用，确保风格一致）
- **Page N Prompt**（每页一份，必须含 `slide_number` / `section` / `title` / `subtitle` / `layout` / `exact_text` / `visual_emphasis`）

**关键约束**（写 prompt 时务必写进 `constraints`）：
- `No 3D decorative hero scene` — 拒绝 3D 装饰
- `No marketing landing page style` — 拒绝营销页风格
- `No rounded card-heavy SaaS dashboard look` — 拒绝 SaaS 圆角卡片
- `No stock photo background` — 拒绝商务握手图
- `Keep all Chinese text accurate and readable` — 中文必须可读
- `Leave enough clean whitespace around sections` — 留白要够

**产出**：每页一张 1600×900 的 PNG 全页视觉图，放到 `项目/page_visual_previews/page_N_full_visual.png`。

### Step 2 · 拆成透明 PNG 视觉素材

**为什么要拆**：整页图里的文字是渲染上去的"图像文字"，不可编辑。要拿到可编辑文本，必须把"视觉骨架"（线条/色块/图表条/2x2 矩阵/路标）和"文字"分离 —— 视觉留作 PNG 图层，文字在 Step 3 用 pptxgenjs 的文本框重写。

**输入**：本 skill 提供的拆图 Prompt → `assets/mckinsey-pptx/decompose-prompt.md`

发给 image-2 模型时，把"刚才生成的 3 张 PPT 页面视觉图"换成实际页数。命名逻辑必须严格遵守（后面 Step 3 脚本按文件名加载）：

```
page1_01_header_rule.png
page1_02_kpi_tiles.png
page1_03_decision_panel.png
page1_04_waterfall_chart.png
page2_01_matrix_grid.png
...
```

**产出**：`项目/png_assets/*.png`，每个素材独立、透明背景、保持原位置和比例。

### Step 3 · 重建可编辑 pptx

**输入**：本 skill 提供的 `assets/mckinsey-pptx/make-deck.js`（Node 脚本模板）

脚本结构：
- 顶部 `ROOT` 改成实际项目根目录
- `buildAssets()` 用 SVG 原语函数 +sharp 生成 PNG（这是兜底方案：如果 Step 2 拆图效果不理想，直接用 SVG 程序化重画素材，质量稳定可控）
- `addSlide1/2/3(...)` 是每页的内容（文字 + 图层位置），按项目实际内容填
- `main()` 写出 .pptx

**两种素材来源**（按场景选）：

| 场景 | 用什么 |
|---|---|
| 完全照搬 image-2 的视觉效果（图表很复杂、设计师做的） | Step 2 拆出来的 PNG |
| 视觉是标准咨询元件（waterfall / 2x2 / bar chart / 路标） | 直接用 `make-deck.js` 的 SVG 原语，跳过 Step 2 |
| 混合 | 复杂图用 PNG，简单元件用 SVG |

**SVG 原语库**（在 `make-deck.js` 顶部，可直接调用）：

```
rect(x, y, w, h, fill, stroke, sw, r)   // 矩形（含圆角，但咨询风默认 r=0）
line(x1, y1, x2, y2, color, w)          // 线段
circle(cx, cy, r, fill, stroke, sw)     // 圆
text(x, y, value, size, color, weight, anchor)  // SVG 文字（preview 用，最终 pptx 用文本框）
```

**常见咨询元件**（在 `make-deck.js` 的 `buildAssets()` 里有示例，可复制改）：
- Header rule + 红色 vertical 标题钉 + 分隔线
- KPI tile row（3-4 个，顶部彩色细条，下面大数字 + label）
- Value waterfall（5 根条，颜色按起点/落点/高潮分）
- 2x2 matrix grid（带四个气泡，气泡大小代表权重）
- Benchmark horizontal bar chart（4-5 条横向 bar）
- Roadmap swimlanes（3 条横向 + 4 个时间点，色块代表阶段任务）
- Scorecard panel（4 行指标 + 绿/黄/红状态点）
- Diagnostic strip（横向 7 个节点 + 颜色分段）

**输出**：`项目/mckinsey_style_NAME_editable.pptx`，16:9，可在 PowerPoint 里直接改文字。

### Step 4 · 验证可编辑性

打开 .pptx（PowerPoint / Keynote / WPS）：
1. **点击任意标题/正文**——必须能进入编辑状态，能改文字
2. **点击图表元素**（waterfall 条 / 2x2 圆）——这些应该是 PNG 图层，不可编辑（这是预期，文字独立才能改）
3. **检查字体**——中文是否显示正常，没有方框

如果文字也变成图片不可改，回 Step 3 检查是不是把整页 PNG 当背景了，没有把文字用 `addText` 单独写。

---

## 2 · 文件路径约定

```
项目/                              ← 通常是 ~/Desktop/<项目名>/pptx/
├── 项目记录.md                     ← 大纲 + 每页定调
├── page_visual_previews/           ← Step 1 整页视觉图（也是 Step 3 buildPreviews 输出）
│   ├── page_1_full_visual.png
│   └── ...
├── png_assets/                     ← Step 2 拆出来的透明 PNG（或 Step 3 SVG 生成的）
│   ├── page1_01_header_rule.png
│   └── ...
├── make-deck.js                    ← 从 assets/mckinsey-pptx/make-deck.js 拷贝改造
├── package.json                    ← 装 pptxgenjs + sharp
└── mckinsey_style_NAME_editable.pptx  ← 最终产物
```

**命令模板**（在项目根目录）：

```bash
cd ~/Desktop/<项目名>/pptx
npm install pptxgenjs sharp
node make-deck.js
open mckinsey_style_*.pptx
```

---

## 3 · 配色（咨询风固定调色板，不自定义）

McKinsey/BCG 风的视觉灵魂之一就是**克制的配色**。本 skill 写死一套，不接受自定义 hex：

```js
const C = {
  ink: "#17212B",        // 正文 / 标题深色
  muted: "#5C6773",      // 次要文字 / 说明
  line: "#D9DEE5",       // 分隔线 / 表格线
  pale: "#F4F6F8",       // 浅色背景块
  blue: "#17365D",       // 主蓝（深海军）
  blue2: "#2F5F8F",      // 次蓝（次要数据）
  red: "#C62828",        // 强调红（**整页只用一个 accent，红色留给最关键的那条**）
  amber: "#D79B35",      // 中性琥珀（黄灯状态 / 中等数据）
  green: "#3A7D5A",      // 绿色（绿灯状态 / 正向数据 / 收尾里程碑）
  white: "#FFFFFF",      // 反色文字（深底块上）
};
```

**硬规则**：
- 红色（#C62828）一份 deck 出现**不超过 3 次**，每次都标"最该看的那一项"
- 不允许出现：玫红 / 桃红 / 亮紫 / 荧光绿 / 渐变 / 阴影
- 不允许：圆角 > 4px（咨询风默认直角，最多卡片 4px 圆角）

---

## 4 · 排版铁律（与网页 A/B 风不同）

| 维度 | 麦肯锡 pptx | 网页 A 杂志风 | 网页 B 瑞士风 |
|---|---|---|---|
| 字体 | Arial（兼容性最好）/ 微软雅黑 / 苹方 | Noto Serif SC + Playfair Display | Inter + Helvetica + Noto Sans SC |
| 字号 | 大标题 22-26pt，正文 8-12pt | hero 6.8vw | hero 7.4vw weight 200 |
| 信息密度 | **高**（一页讲 3-4 个论点） | 中（一页 1 个论点） | 中（一页 1 个论点） |
| 标题样式 | **结论先行**（标题就是结论，副标补论据） | 描述性大标题 | 数据型 / 命题型大标题 |
| 留白 | 章节间留白，但元素内紧凑 | 全屏大留白 | 不对称大留白 |
| 装饰 | 红色 vertical rule + 顶部色条 + 1px hairline | WebGL 流体背景 | 8×8 直角小方块 + 点阵 |
| 入场动画 | **无**（PowerPoint 默认） | Motion One recipes | Motion One recipes |
| 翻页方式 | PowerPoint / Keynote | 键盘 ← → / 触屏 | 键盘 ← → / 触屏 |

**特别注意"结论先行"**：标题不要写"关于市场的分析"，要写"增长瓶颈不在需求端，而在细分市场选择"——一句话能让读者跳过整页内容也知道你的结论。

---

## 5 · 常见坑（吸取 v1/v2 经验）

| 坑 | 现象 | 修法 |
|---|---|---|
| **文字变成图片不可改** | PowerPoint 里点击标题进不了编辑态 | Step 3 没用 `addText`，把整页 PNG 当背景了；文字必须独立 |
| **图层错位** | 重建后图表条偏离了坐标轴 | Step 3 没用 `addImg` 整页覆盖（`x:0, y:0, w:W, h:H`），而是按拆图坐标定位时算错了 |
| **中文显示方框** | 用了 Helvetica 之类无中文字体 | `fontFace` 改成 `Arial`，再不行用"微软雅黑"或"苹方" |
| **图层之间互相遮挡** | KPI tile 盖住了 header rule | `addImg` 的调用顺序就是图层 z-index，先调先底层 |
| **红色用爆了** | 每页都有红色，视觉疲劳 | 红色只标"最该看的那一项"，一份 deck ≤ 3 次 |
| **图表细节糊** | image-2 生成的图表线条扭曲、文字模糊 | 别让 image-2 画精细图表，让它画"色块结构"，文字和数字用 pptxgenjs 重写 |
| **PNG 透明度丢失** | 拆图后背景是白的 | Step 2 Prompt 必须强调"透明背景"；模型不听话就再拆一次或换模型 |
| **路径硬编码** | `make-deck.js` 里写死了别人电脑的路径 | 每次新项目第一件事改 `ROOT` 常量 |

---

## 6 · 不要在 image-2 阶段做的事

image-2 模型擅长"视觉骨架 + 整体氛围"，不擅长"精准文字 + 精细图表数据"。这些必须留到 Step 3 用 pptxgenjs 重写：

- ❌ 精确百分比 / 货币金额（"18-24%" 这种数字让 image-2 写经常出错）
- ❌ 复杂 benchmark 表（行列对齐 image-2 经常崩）
- ❌ 长段落正文（image-2 写长中文几乎必崩）
- ❌ 图例说明
- ❌ 页脚 / 页码 / 公司名

image-2 阶段只画**视觉骨架**：色块、线条、bar 高度、bubble 大小、roadmap 色块、scorecard 状态点的颜色分布。所有文字让它先用"占位词"画着，最终都被 Step 3 的 `addText` 文本框覆盖。

---

## 7 · 参考资料（归档）

- 原始实验：`~/dev/ppt/v2_image2_workflow/`（v2 image2 workflow 的工作版本）
- v1 验证：`~/dev/ppt/v1_local_rebuild/`（早期纯本地重建版本）
- 提示词参考来源：https://github.com/YouMind-OpenLab/awesome-gpt-image-2

这些是历史档案，新项目走本文档 + `assets/mckinsey-pptx/` 即可，不需要再读 `~/dev/ppt/`。
