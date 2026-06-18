<div align="center">

# alanppt

**四种顶级视觉身份的 PPT 生成 Skill**

*Design Read 前门 · 四身份按场景选 · 呼吸优先 · 换眼视觉 QA*

[![License: CC BY-SA 4.0](https://img.shields.io/badge/License-CC%20BY--SA%204.0-1E2761.svg)](./LICENSE)
[![Identities](https://img.shields.io/badge/视觉身份-4%20种-17365D.svg)](./references/design-identities.md)
[![Author](https://img.shields.io/badge/原创-Alan%20Lee%20(BitmanAlan)-C62828.svg)](#署名与二次开发)

> 不是一种风格打天下——**先读场景，再选身份**。咨询、发布会、杂志、科技四套自洽的设计系统，按客户需求一键切换。
> 完整工作流见 [`SKILL.md`](./SKILL.md)；四身份配方见 [`references/design-identities.md`](./references/design-identities.md)。

</div>

---

## ✨ 四种视觉身份

| | 身份 | 适用场景 | 气质 | 灵感源 |
|---|---|---|---|---|
| **A** | 咨询风 Consulting | 客户汇报 / 尽调 / 董事会 / IPO | 克制、无装饰、结论先行、网格至上 | McKinsey / BCG / Bain |
| **B** | Keynote 发布会风 | 产品发布 / 路演 / Demo Day / 主题演讲 | 深色、超大字、macro 留白、柔光 | Apple Keynote |
| **C** | Editorial 杂志风 | 品牌故事 / 观点内容 / 行业报告 | 衬线大标、暖调、颗粒、编辑式排版 | Editorial Luxury |
| **D** | Dark-tech 玻璃风 | AI / 科技产品 / 技术发布 | OLED 黑、网格渐变、玻璃质感、几何 Grotesk | Linear / Vercel |

> 选错风格比做得糙更致命。开工前先用一行 **Design Read** 声明身份（默认 A 最稳），四身份**互不混搭**——咨询风的克制绝不掺玻璃渐变，发布会风的留白绝不塞咨询密度。

## 🎯 三种输出格式

| 格式 | 输出 | 何时用 |
|---|---|---|
| **HTML 网页 deck** | 单文件 HTML（横向翻页，四身份均可） | 内部分享 / 发链接预览 / Demo Day / 演讲 |
| **可编辑 pptx** | .pptx（PowerPoint 二次编辑） | 客户咨询交付 / 高管展示 / 对方要继续改 |
| **多平台封面** | 单张图片（21:9 / 1:1 / 3:4 / 16:9 / 9:16） | 公众号 / 朋友圈 / 小红书 / 视频号 / 短视频 |

## 🫁 两条贯穿四身份的质量铁律

- **呼吸优先**：留白是默认不是浪费——每页保留 ≥30% 负空间，论点是上限不是目标，正文不顶版边，宁可拆页也不挤满。
- **换眼视觉 QA**：自己写的版面有"预期盲区"，看不出自己挤了。交付前**必须**渲染成图、派一个全新子 agent 用挑刺视角找问题（重点查呼吸/溢出/重叠），修完重验才算完成。见 [`references/visual-qa.md`](./references/visual-qa.md)。

## 🚀 快速使用

对 Claude 说：「做个 PPT」/「做发布会 keynote」/「做个科技产品介绍 deck」/「咨询汇报」/「做封面」——
skill 会先做 Design Read（判断该用哪个身份），套对应模板，按身份配方填充，守呼吸，交付前换眼 QA。

## 🗂 仓库结构

```
alanppt/
├── SKILL.md                      ← 主文档（Design Read 前门 + 四身份 + 工作流）
├── LICENSE                       ← CC BY-SA 4.0
├── NOTICE                        ← 原创归属 + 二次开发须知（fork 必须保留）
├── assets/
│   ├── template-consulting.html  ← 身份 A · 咨询风
│   ├── template-keynote.html     ← 身份 B · Keynote 发布会风
│   ├── template-editorial.html   ← 身份 C · Editorial 杂志风
│   ├── template-darktech.html    ← 身份 D · Dark-tech 玻璃风
│   └── mckinsey-pptx/            ← 可编辑 pptx 工作目录
└── references/
    ├── design-identities.md      ← ★ 四身份配方手册（各自宪法）
    ├── layouts-consulting.md     ← 身份 A · 10 种 layout 骨架
    ├── visual-qa.md              ← ★ 渲染 + 换眼视觉 QA 回环
    ├── mckinsey-pptx.md          ← pptx 完整工作流
    ├── checklist-mckinsey.md     ← pptx 自检清单（含呼吸量化项）
    └── cover-specs.md            ← 多平台封面规格
```

## 📜 署名与二次开发

本 skill 由 **Alan Lee (BitmanAlan)** 原创，© 2026，以 **[CC BY-SA 4.0](./LICENSE)** 开源。

**你可以**：自由使用、修改、fork、二次开发（含商用）。

**但你必须**（缺一即侵权、授权自动终止）：

1. **署名**原作者 Alan Lee (BitmanAlan)，保留 [`LICENSE`](./LICENSE) 与 [`NOTICE`](./NOTICE) 文件、以及 `SKILL.md` 顶部署名声明，并注明你的改动；
2. 衍生版**同样以 CC BY-SA 4.0 开源**，不得闭源化 / 改用更严格的私有许可；
3. **不得把本作品或其衍生版宣称为你自己的原创**。

> 即：你能站在它肩膀上继续做，但不能抹掉作者、不能拿去说是你从零做的、不能闭源圈起来卖。

---

<div align="center">
<sub>© 2026 Alan Lee (BitmanAlan) · CC BY-SA 4.0 · 原创署名不可移除</sub>
</div>
