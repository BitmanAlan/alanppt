# Decompose Prompt · 把整页视觉图拆成透明 PNG 图层

> 用法：在 Step 1 完成、拿到 N 张整页 PNG 之后，把下面的 Prompt 发给同一个图像模型。
> 目的：把"视觉骨架"（线条/色块/图表/几何元素）和"文字"分离，文字留给 Step 3 用 pptxgenjs 重写。
> 详细工作流见 `references/mckinsey-pptx.md`。

---

## Prompt（中文版 · 直接复制发给模型）

```text
请将刚才生成的 N 张 PPT 页面视觉图进行拆分处理。

要求：
1. 将每一页中的所有非文字视觉元素拆分为独立 PNG 图像。
2. 每个元素单独一张 PNG，不要合并多个元素。
3. 每个 PNG 必须是透明背景。
4. 保持所有元素在原页面中的相对位置、大小和比例，不要移动、缩放或改变长宽比。
5. 不要包含任何文字内容；所有标题、标签、数字、说明文字后续会用可编辑文本框重建。
6. 如一次无法全部生成，请分批输出，直到所有页面视觉元素拆分完成。
7. 直接输出 PNG 图片，不要打包成文件夹。

请按以下命名逻辑组织：
第1页：page1_01_header_rule, page1_02_kpi_tiles, page1_03_decision_panel, page1_04_waterfall_chart 等
第2页：page2_01_matrix_grid, page2_02_bubbles, page2_03_benchmark_bars 等
第3页：page3_01_roadmap_grid, page3_02_work_blocks, page3_03_scorecard_panel 等
（按实际页面元素调整后缀语义，但保持 pageN_NN_<语义> 的格式）
```

---

## 命名规范（必须严格遵守）

Step 3 的脚本会按文件名加载，命名规则：

```
pageN_NN_<semantic-name>.png
^      ^^  ^
|      ||  └─ 语义短名，小写下划线，对应内容（header_rule / kpi_tiles / waterfall / matrix / bars / roadmap / scorecard ...）
|      |└─ 层级序号 01-99，按从下到上的 z-index 顺序（先调用的在底层）
|      └─ 序号补零
└─ 页号（page1 / page2 / page3...）
```

**好命名例子**：
- `page1_01_header_rule.png` — 第 1 页底层装饰（标题钉 + 分隔线）
- `page1_02_kpi_tiles.png` — 第 1 页中层（3 个 KPI 卡）
- `page1_03_waterfall_chart.png` — 第 1 页上层（waterfall）
- `page2_01_matrix_grid.png` — 第 2 页底层（2x2 网格 + 边框）
- `page2_02_bubbles.png` — 第 2 页中层（4 个气泡）

**避免**：
- ❌ `slide1.png`（缺序号和语义）
- ❌ `image-1.png`（无意义）
- ❌ `第一页底色.png`（中文路径在脚本里不稳）

---

## 拆图常见问题

| 问题 | 处理 |
|---|---|
| 模型把文字也留在了 PNG 里 | 再发一次 Prompt，强调"不要包含任何文字内容" |
| 透明背景丢失（背景是白的） | 强调"必须是透明背景"；如果还不行，让模型导出 SVG 或换 Nano Banana / Imagen |
| 元素位置漂移 | 强调"保持原位置和比例"；最坏情况下用 SVG 程序化在 Step 3 重画（见 make-deck.js 的 buildAssets） |
| 一页元素太多分批输出 | 按需求 6 接受分批，最后用 `pageN_NN_*` 顺序统一编号 |
| 模型抗拒拆图 | 换"请帮我把这些视觉元素分别导出"等更温和说法；或直接用 SVG 程序化方案跳过 Step 2 |

---

## 跳过 Step 2 的判断

如果整页视觉里的图表都是**标准咨询元件**（waterfall / 2x2 / bar chart / roadmap / scorecard / diagnostic strip），**不必走 Step 2 拆图**。直接用 `make-deck.js` 的 SVG 原语在 Step 3 程序化生成，质量稳定可控，还能精确对齐网格。

什么时候**必须**走 Step 2：
- 图表是非标准的、设计师手画的复杂图形
- 有插画 / icon 集合需要保留
- image-2 生成的视觉本身已经很满意，只是想加可编辑文字
