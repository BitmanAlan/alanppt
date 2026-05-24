/**
 * alanppt · C 路径 · McKinsey-style editable pptx generator
 *
 * 用法：
 *   1. 把 assets/mckinsey-pptx/ 整个目录拷贝到你的项目根目录
 *   2. cd 进去，`npm install`
 *   3. 改下面的 PROJECT 常量（标题、作者、页数等）和 addSlideN 函数（每页内容）
 *   4. `node make-deck.js` → 输出 mckinsey_style_<name>_editable.pptx
 *
 * 详细工作流：alanppt skill 的 references/mckinsey-pptx.md
 *
 * 结构：
 *   §1 配色 + 画布常量（固定，不要改）
 *   §2 SVG 工具函数（rect / line / circle / text / pngFromSvg）
 *   §3 pptx 工具函数（addText / addImg / slideCommon）
 *   §4 咨询图表原语库（header / KPI tile row / waterfall / 2x2 matrix / benchmark bars / roadmap / scorecard）
 *   §5 ★ buildAssets() —— 项目特定：用 §4 原语拼出每页的视觉骨架，输出 PNG
 *   §6 ★ addSlideN(pptx, assets) —— 项目特定：每页 = addImg 图层 + addText 文本框
 *   §7 main() —— 装配 pptx，写出文件
 *
 * ★ = 你需要按项目内容修改的部分
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const pptxgen = require("pptxgenjs");

// ──────────────────────────────────────────────────────────────────────────────
// 项目配置（每个新项目改这里）
// ──────────────────────────────────────────────────────────────────────────────

const PROJECT = {
  name: "demo",                        // 输出文件名后缀：mckinsey_style_<name>_editable.pptx
  title: "McKinsey Style Test Deck",  // pptx metadata title
  subject: "McKinsey-style PPT method test",
  author: "Alan",
  company: "",
  lang: "zh-CN",
};

// 默认 ROOT 是脚本同目录；可以用 PROJECT_ROOT 环境变量覆盖
const ROOT = process.env.PROJECT_ROOT || __dirname;
const ASSETS = path.join(ROOT, "png_assets");
const PREVIEWS = path.join(ROOT, "page_visual_previews");

fs.mkdirSync(ASSETS, { recursive: true });
fs.mkdirSync(PREVIEWS, { recursive: true });

// ──────────────────────────────────────────────────────────────────────────────
// §1 配色 + 画布常量（固定，不要改）
// ──────────────────────────────────────────────────────────────────────────────

const W = 1600;
const H = 900;
// pptxgenjs 用英寸；CUSTOM_WIDE = 13.333 × 7.5 inch
const SX = 13.333 / W;
const SY = 7.5 / H;

const C = {
  ink: "#17212B",     // 正文 / 标题深色
  muted: "#5C6773",   // 次要文字
  line: "#D9DEE5",    // 分隔线
  pale: "#F4F6F8",    // 浅背景块
  blue: "#17365D",    // 主蓝
  blue2: "#2F5F8F",   // 次蓝
  red: "#C62828",     // 强调红（一份 deck ≤ 3 次）
  amber: "#D79B35",   // 中性琥珀
  green: "#3A7D5A",   // 绿（正向数据 / 收尾里程碑）
  white: "#FFFFFF",
};

// ──────────────────────────────────────────────────────────────────────────────
// §2 SVG 工具函数
// ──────────────────────────────────────────────────────────────────────────────

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function svgShell(body, bg = "none") {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <rect width="${W}" height="${H}" fill="${bg}"/>
    ${body}
  </svg>`;
}

async function pngFromSvg(filename, body, bg = "none") {
  const out = path.join(ASSETS, filename);
  await sharp(Buffer.from(svgShell(body, bg))).png().toFile(out);
  return out;
}

async function previewFromSvg(filename, body) {
  const out = path.join(PREVIEWS, filename);
  await sharp(Buffer.from(svgShell(body, C.white))).png().toFile(out);
  return out;
}

function line(x1, y1, x2, y2, color = C.line, w = 2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="${w}"/>`;
}

function rect(x, y, w, h, fill, stroke = "none", sw = 0, r = 0) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function circle(cx, cy, r, fill, stroke = "none", sw = 0) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function text(x, y, value, size, color = C.ink, weight = 400, anchor = "start") {
  return `<text x="${x}" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}" text-anchor="${anchor}">${esc(value)}</text>`;
}

// ──────────────────────────────────────────────────────────────────────────────
// §3 pptx 工具函数（坐标换算 + 文本框 + 图片层）
// ──────────────────────────────────────────────────────────────────────────────

const pt = (v) => v * SX;   // x 方向像素 → 英寸
const pty = (v) => v * SY;  // y 方向像素 → 英寸

function addText(slide, value, x, y, w, h, opts = {}) {
  slide.addText(value, {
    x: pt(x), y: pty(y), w: pt(w), h: pty(h),
    fontFace: opts.fontFace || "Arial",  // 中文走 Arial → PowerPoint 自动 fallback 到苹方/雅黑
    fontSize: opts.fontSize || 12,
    color: (opts.color || C.ink).replace("#", ""),
    bold: !!opts.bold,
    margin: opts.margin ?? 0,
    breakLine: opts.breakLine,
    fit: "shrink",
    valign: opts.valign || "top",
    align: opts.align || "left",
  });
}

function addImg(slide, img, x, y, w, h) {
  slide.addImage({ path: img, x: pt(x), y: pty(y), w: pt(w), h: pty(h) });
}

function slideCommon(pres, slide, pageNo, section) {
  // 左上页码 + 右上 section label + 底部 1px hairline
  addText(slide, String(pageNo).padStart(2, "0"), 70, 46, 70, 35, { fontSize: 16, bold: true, color: C.ink });
  addText(slide, section, 1340, 44, 180, 28, { fontSize: 8, color: C.muted, align: "right" });
  slide.addShape(pres.ShapeType.line, {
    x: pt(70), y: pty(840), w: pt(1460), h: 0,
    line: { color: "D9DEE5", width: 1 },
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// §4 咨询图表原语库（用 SVG 字符串拼装，可在 buildAssets 里组合）
//   每个原语返回 SVG body 字符串，不直接写文件——这样多个原语可以叠在同一张 PNG 里
// ──────────────────────────────────────────────────────────────────────────────

// 4.1 顶部红色标题钉 + 分隔线 + 右上 section badge
function primHeader({ pinX = 70, pinY = 78, dividerY = 227, badgeX = 1220, badgeW = 230 } = {}) {
  return [
    rect(pinX, pinY, 12, 118, C.red),
    line(pinX, dividerY, 1530, dividerY, C.line, 2),
    rect(badgeX, 70, badgeW, 44, C.pale, "none", 0, 4),
    line(badgeX, 132, badgeX + badgeW, 132, C.line, 2),
  ].join("");
}

// 4.2 3-4 张 KPI tile（顶部彩色细条，下面留位置给大数字+label，由 addText 填）
function primKpiTiles({ y = 400, count = 3, startX = 105, gap = 330, tileW = 285, tileH = 145, colors }) {
  const cols = colors || [C.blue, C.red, C.green, C.amber].slice(0, count);
  let s = "";
  for (let i = 0; i < count; i++) {
    const x = startX + i * gap;
    s += rect(x, y, tileW, tileH, C.white, C.line, 2, 4);
    s += rect(x, y, tileW, 9, cols[i] || C.blue);
  }
  return s;
}

// 4.3 决策含义面板（右侧浅灰块 + 两条横线分隔）
function primDecisionPanel({ x = 1140, y = 300, w = 335, h = 145 } = {}) {
  return [
    rect(x, y, w, h, C.pale, "none", 0, 4),
    line(x + 40, y + 70, x + 300, y + 70, C.line, 2),
    line(x + 40, y + 108, x + 300, y + 108, C.line, 2),
  ].join("");
}

// 4.4 价值瀑布（N 根条，颜色高潮项用红色）
function primWaterfall({ y = 545, bottom = 735, startX = 155, gap = 275, barW = 120, heights, colors, highlightIdx }) {
  const hs = heights || [85, 125, 150, 110, 190];
  const cs = colors || hs.map((_, i) => i === highlightIdx ? C.red : i === 0 ? C.blue : i === hs.length - 1 ? C.green : i % 2 ? C.blue2 : C.amber);
  let s = line(110, bottom, 1475, bottom, C.line, 2);
  // 纵向浅竖虚线
  for (let i = 0; i < hs.length; i++) {
    s += line(185 + i * gap, y + 30, 185 + i * gap, bottom, "#EEF1F4", 2);
  }
  for (let i = 0; i < hs.length; i++) {
    const x = startX + i * gap;
    const top = bottom - hs[i];
    s += rect(x, top, barW, hs[i], cs[i]);
    // 连接线（每两条 bar 之间顶部水平虚线）
    if (i > 0) s += line(x - gap + barW, top + 25, x, top + 25, C.muted, 2);
  }
  return s;
}

// 4.5 2x2 矩阵（外框 + 十字线 + 顶部底部浅灰条）
function primMatrix2x2({ x = 95, y = 205, w = 1410, h = 575 } = {}) {
  return [
    rect(x, y, w, h, C.white, C.line, 2, 4),
    line(x, y + (h - 12) / 2 + 6, x + w, y + (h - 12) / 2 + 6, C.line, 2),  // 水平线
    line(x + w / 2, y, x + w / 2, y + h, C.line, 2),                        // 垂直线
    rect(x, y, w, 54, C.pale),                                              // 顶部 axis label 槽
    rect(x, y + h - 54, w, 54, C.pale),                                     // 底部 axis label 槽
  ].join("");
}

// 4.6 矩阵气泡（cx/cy/r/fill/stroke 都自定义；highlightIdx 标红圈强调）
function primBubbles(bubbles, highlightIdx = -1) {
  return bubbles.map((b, i) => {
    const stroke = i === highlightIdx ? C.red : (b.stroke || C.blue);
    return circle(b.cx, b.cy, b.r, b.fill || "#E8EEF5", stroke, 3);
  }).join("");
}

// 4.7 横向 benchmark bar chart（4-5 条横 bar，长度代表得分）
function primBenchmarkBars({ x = 1010, y = 330, gap = 72, barH = 28, widths, colors }) {
  const cs = colors || [C.blue, C.blue2, C.red, C.amber, C.green];
  let s = "";
  for (let i = 0; i < widths.length; i++) {
    s += line(x, y + i * gap, x + 450, y + i * gap, "#EEF1F4", 2);
    s += rect(x, y + i * gap + 5, widths[i], barH, cs[i] || C.blue);
  }
  return s;
}

// 4.8 横向 roadmap swimlanes（默认 3 条 lane × 4 时间段；blocks = [{ lane, period, color }]）
function primRoadmap({ laneYs = [310, 505, 700], periodXs = [270, 595, 920, 1245], blocks = [], blockW = 350, blockH = 100 }) {
  let s = "";
  // 横向 lane 主线
  for (const y of laneYs) s += line(160, y, 1460, y, C.line, 3);
  // 纵向时间分隔线
  for (const x of periodXs) s += line(x, 245, x, 760, "#EEF1F4", 2);
  // 任务色块 + 圆形 milestone marker
  for (const b of blocks) {
    const y = laneYs[b.lane];
    const x = periodXs[b.period] - 45;
    s += rect(x, y - 50, blockW, blockH, b.color || C.blue, "none", 0, 4);
    s += circle(x, y, 16, C.white, b.color || C.blue, 5);
  }
  return s;
}

// 4.9 Scorecard 面板（4-5 行指标 + 右侧绿/黄/红状态点）
function primScorecard({ x = 1010, y = 255, w = 430, h = 375, rows = 4, statusColors }) {
  const cs = statusColors || [C.green, C.green, C.amber, C.red];
  let s = rect(x, y, w, h, C.white, C.line, 2, 4) + rect(x, y, w, 52, C.pale);
  for (let i = 0; i < rows + 1; i++) s += line(x, y + 52 + i * 64, x + w, y + 52 + i * 64, C.line, 1.5);
  for (let i = 0; i < rows; i++) s += circle(x + w - 65, y + 95 + i * 64, 13, cs[i] || C.muted);
  return s;
}

// 4.10 横向 diagnostic strip（一条横线 + N 个圆点，按颜色分段表示状态）
function primDiagnosticStrip({ y = 248, h = 86, x = 95, w = 1395, nodes = 7, segmentColors = [C.blue, C.blue, C.red, C.red, C.red, C.green, C.green] }) {
  let s = rect(x, y, w, h, C.pale, "none", 0, 4);
  // 节点之间分隔
  for (let i = 0; i < nodes - 1; i++) s += line(x + 217 + i * 196, y + 10, x + 217 + i * 196, y + h - 10, C.line, 1.5);
  // 主线
  s += line(x + 85, y + 44, x + 85 + (nodes - 1) * 196, y + 44, "#CBD3DC", 3);
  // 节点圆点
  for (let i = 0; i < nodes; i++) s += circle(x + 85 + i * 196, y + 44, 8, segmentColors[i] || C.muted);
  return s;
}

// ──────────────────────────────────────────────────────────────────────────────
// §5 ★ buildAssets() —— 项目特定：组合原语生成每页的 PNG 图层
// ──────────────────────────────────────────────────────────────────────────────

async function buildAssets() {
  const assets = {};

  // === 第 1 页：Executive Summary ===
  assets.s1_header = await pngFromSvg("page1_01_header_rule.png", primHeader());
  assets.s1_diagnostic = await pngFromSvg("page1_02_diagnostic_strip.png", primDiagnosticStrip());
  assets.s1_kpis = await pngFromSvg(
    "page1_03_kpi_system.png",
    primKpiTiles({ count: 3, colors: [C.blue, C.red, C.green] }) + primDecisionPanel(),
  );
  assets.s1_waterfall = await pngFromSvg(
    "page1_04_value_waterfall.png",
    primWaterfall({ heights: [85, 125, 150, 110, 190], highlightIdx: 2 }),
  );

  // === 第 2 页：Market Landscape ===
  assets.s2_grid = await pngFromSvg(
    "page2_01_landscape_grid.png",
    primMatrix2x2() + primBubbles([
      { cx: 420, cy: 365, r: 68, fill: "#E8EEF5", stroke: C.blue },
      { cx: 1115, cy: 350, r: 92, fill: "#F8E9E9" },
      { cx: 475, cy: 615, r: 80, fill: "#EEF5F0", stroke: C.green },
      { cx: 1045, cy: 615, r: 58, fill: "#F8F0DF", stroke: C.amber },
    ], 1)  // 第 2 个气泡（B 类高潜客户）标红
    + line(420, 365, 1115, 350, C.line, 3)
    + line(475, 615, 1045, 615, C.line, 3),
  );
  assets.s2_bars = await pngFromSvg(
    "page2_02_benchmark_bars.png",
    primBenchmarkBars({ widths: [305, 250, 355, 180] }),
  );

  // === 第 3 页：Implementation Roadmap ===
  assets.s3_roadmap = await pngFromSvg(
    "page3_01_roadmap_tracks.png",
    primRoadmap({
      blocks: [
        { lane: 0, period: 0, color: C.blue },
        { lane: 1, period: 1, color: C.red },
        { lane: 2, period: 2, color: C.green },
      ],
    }),
  );
  assets.s3_scorecard = await pngFromSvg("page3_02_scorecard.png", primScorecard({ rows: 4 }));

  return assets;
}

// ──────────────────────────────────────────────────────────────────────────────
// §6 ★ addSlideN(pptx, assets) —— 项目特定：每页 = addImg 图层 + addText 文本框
//   addImg 顺序 = z-index（先调先底层）
//   所有文字必须用 addText（独立可编辑），不要写进 SVG
// ──────────────────────────────────────────────────────────────────────────────

function addSlide1(pptx, assets) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };
  slideCommon(pptx, slide, 1, "EXECUTIVE SUMMARY");

  // 图层（按 z-index 顺序）
  addImg(slide, assets.s1_header, 0, 0, W, H);
  addImg(slide, assets.s1_diagnostic, 0, 0, W, H);
  addImg(slide, assets.s1_kpis, 0, 0, W, H);
  addImg(slide, assets.s1_waterfall, 0, 0, W, H);

  // 文字（所有可编辑文本框）
  addText(slide, "三项动作可在12个月内释放 18-24% EBITDA 改善空间", 105, 72, 1030, 62, { fontSize: 24, bold: true });
  addText(slide, "基于标杆差距、价格纪律与组织效率的综合测算；优先级按价值密度与落地难度排序。", 105, 148, 930, 34, { fontSize: 10, color: C.muted });
  addText(slide, "测试版 | McKinsey-style", 1235, 84, 185, 20, { fontSize: 8, color: C.muted, align: "center" });

  // diagnostic strip 标签
  addText(slide, "价值诊断链路", 120, 274, 120, 18, { fontSize: 9, bold: true });
  ["基线", "价盘", "客户", "渠道", "交付", "组织", "看板"].forEach((v, i) =>
    addText(slide, v, 142 + i * 196, 304, 72, 18, { fontSize: 8, color: C.muted, align: "center" }),
  );

  // 3 张 KPI tile 内容
  const kpis = [
    ["18-24%", "EBITDA提升空间", "由价格纪律、组合优化和交付效率共同驱动", C.blue],
    ["3.8x", "价值/复杂度排序", "Top 3 动作贡献超过 70% 的可捕获价值", C.red],
    ["90天", "首轮试点周期", "先跑通一个区域、两条产品线和核心客户群", C.green],
  ];
  kpis.forEach(([num, label, note, color], i) => {
    const x = 125 + i * 330;
    addText(slide, num, x, 428, 190, 42, { fontSize: 25, bold: true, color });
    addText(slide, label, x, 482, 210, 22, { fontSize: 11, bold: true });
    addText(slide, note, x, 513, 235, 36, { fontSize: 8, color: C.muted });
  });

  // 决策含义面板
  addText(slide, "决策含义", 1170, 330, 120, 20, { fontSize: 12, bold: true });
  addText(slide, "先收敛到少数高确定性动作", 1170, 378, 235, 18, { fontSize: 9 });
  addText(slide, "建立周度价值追踪机制", 1170, 416, 220, 18, { fontSize: 9 });

  // waterfall 标签
  ["当前基线", "价格纪律", "客户组合", "交付效率", "目标状态"].forEach((v, i) =>
    addText(slide, v, 135 + i * 275, 755, 150, 18, { fontSize: 8, color: C.muted, align: "center" }),
  );
  ["100", "+6", "+8", "+5", "119"].forEach((v, i) =>
    addText(slide, v, 165 + i * 275, [635, 595, 570, 610, 530][i], 100, 24, {
      fontSize: 12, bold: true, color: i === 2 ? C.red : C.ink, align: "center",
    }),
  );
  addText(slide, "价值瀑布：三项动作构成主要改善来源", 105, 560, 650, 24, { fontSize: 12, bold: true });
}

// 第 2、3 页参考第 1 页的写法：先 addImg 叠图层，再 addText 写文字
// 原始 v2 实现见 ~/dev/ppt/v2_image2_workflow/make_mckinsey_v2.js 的 addSlide2/3
// 新项目按内容重写这两个函数即可

function addSlide2(pptx, assets) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };
  slideCommon(pptx, slide, 2, "MARKET LANDSCAPE");
  addImg(slide, assets.s2_grid, 0, 0, W, H);
  addImg(slide, assets.s2_bars, 0, 0, W, H);

  addText(slide, "增长瓶颈不在需求端，而在细分市场选择和商业动作一致性", 105, 70, 1120, 52, { fontSize: 23, bold: true });
  addText(slide, "四象限拆解显示，最大利润池集中在两个高确定性客群，但当前资源仍分散在低回报场景。", 105, 140, 950, 32, { fontSize: 10, color: C.muted });
  addText(slide, "利润池吸引力", 380, 234, 180, 18, { fontSize: 9, bold: true, align: "center" });
  addText(slide, "商业可达性", 840, 744, 190, 18, { fontSize: 9, bold: true, align: "center" });
  addText(slide, "A类核心客户", 342, 356, 156, 18, { fontSize: 10, bold: true, align: "center" });
  addText(slide, "B类高潜客户", 1030, 336, 172, 18, { fontSize: 10, bold: true, color: C.red, align: "center" });
  addText(slide, "C类稳定场景", 405, 608, 150, 18, { fontSize: 10, bold: true, align: "center" });
  addText(slide, "D类机会型项目", 960, 608, 170, 18, { fontSize: 10, bold: true, align: "center" });
  addText(slide, "标杆差距", 1010, 278, 130, 20, { fontSize: 12, bold: true });
  ["价格纪律", "客户组合", "渠道覆盖", "交付效率"].forEach((v, i) =>
    addText(slide, v, 1010, 330 + i * 72, 110, 18, { fontSize: 8, color: C.muted }),
  );
  ["86", "71", "100", "52"].forEach((v, i) =>
    addText(slide, v, 1375, 329 + i * 72, 55, 18, { fontSize: 8, bold: true, align: "right" }),
  );
  addText(slide, "管理启示：资源应从平均覆盖转向“高潜客群 + 标准化动作包”的组合打法。", 105, 738, 1080, 24, { fontSize: 11, bold: true });
}

function addSlide3(pptx, assets) {
  const slide = pptx.addSlide();
  slide.background = { color: "FFFFFF" };
  slideCommon(pptx, slide, 3, "IMPLEMENTATION ROADMAP");
  addImg(slide, assets.s3_roadmap, 0, 0, W, H);
  addImg(slide, assets.s3_scorecard, 0, 0, W, H);

  addText(slide, "建议以 3 条工作流推进：先锁定价值，再建立节奏，最后固化能力", 105, 70, 1120, 52, { fontSize: 23, bold: true });
  addText(slide, "每条工作流均设置可量化里程碑，避免停留在方案层面；第 4 周即可形成第一轮经营看板。", 105, 140, 980, 32, { fontSize: 10, color: C.muted });
  ["W1-2", "W3-4", "W5-8", "W9-12"].forEach((v, i) =>
    addText(slide, v, 225 + i * 325, 230, 90, 18, { fontSize: 9, bold: true, color: C.muted, align: "center" }),
  );
  addText(slide, "1 价值锁定", 260, 282, 210, 22, { fontSize: 12, bold: true, color: C.white });
  addText(slide, "清理价格例外、客户分层与Top机会清单", 260, 316, 260, 22, { fontSize: 8, color: C.white });
  addText(slide, "2 节奏建立", 600, 477, 210, 22, { fontSize: 12, bold: true, color: C.white });
  addText(slide, "周度经营会、红黄绿预警与行动闭环", 600, 511, 260, 22, { fontSize: 8, color: C.white });
  addText(slide, "3 能力固化", 965, 672, 210, 22, { fontSize: 12, bold: true, color: C.white });
  addText(slide, "形成模板、看板与一线销售动作手册", 965, 706, 260, 22, { fontSize: 8, color: C.white });
  addText(slide, "执行看板", 1035, 283, 140, 18, { fontSize: 12, bold: true });
  [
    ["价格例外率", "<5%"],
    ["高潜客户覆盖", "85%"],
    ["行动闭环周期", "7天"],
    ["试点毛利提升", "+6pt"],
  ].forEach(([k, v], i) => {
    addText(slide, k, 1035, 360 + i * 64, 160, 18, { fontSize: 8, color: C.muted });
    addText(slide, v, 1230, 360 + i * 64, 90, 18, { fontSize: 9, bold: true, align: "right" });
  });
  addText(slide, "下一步：用两周完成数据校验与试点市场选择，随后进入 90 天价值冲刺。", 105, 810, 1030, 24, { fontSize: 11, bold: true });
}

// ──────────────────────────────────────────────────────────────────────────────
// §7 main
// ──────────────────────────────────────────────────────────────────────────────

async function main() {
  const assets = await buildAssets();

  const pptx = new pptxgen();
  pptx.author = PROJECT.author;
  pptx.subject = PROJECT.subject;
  pptx.title = PROJECT.title;
  pptx.company = PROJECT.company;
  pptx.lang = PROJECT.lang;
  pptx.theme = { headFontFace: "Arial", bodyFontFace: "Arial", lang: PROJECT.lang };
  pptx.defineLayout({ name: "CUSTOM_WIDE", width: 13.333, height: 7.5 });
  pptx.layout = "CUSTOM_WIDE";

  addSlide1(pptx, assets);
  addSlide2(pptx, assets);
  addSlide3(pptx, assets);

  const out = path.join(ROOT, `mckinsey_style_${PROJECT.name}_editable.pptx`);
  await pptx.writeFile({ fileName: out });
  console.log(out);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
