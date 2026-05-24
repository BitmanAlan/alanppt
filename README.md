# alanppt · 专业咨询风 PPT skill

> Alan Lee 的个人 PPT 生成 skill，单一视觉身份（McKinsey/BCG 咨询风），覆盖 3 种输出格式。详细工作流见 [`SKILL.md`](./SKILL.md)，本 README 只做速查。

## 设计身份

**专业咨询风** · 结论先行 · 网格至上 · 配色克制 · 信息密度高 · 无装饰

参考锚点：McKinsey / BCG / Bain 客户汇报材料

**禁用**：WebGL 流体背景、点阵装饰、杂志风衬线、Monocle 风、瑞士风彩色块、stock photo

## 三种输出格式

| 格式 | 输出 | 何时用 |
|---|---|---|
| **HTML 网页 deck** | 单文件 HTML（横向翻页） | 内部分享 / 发链接给客户预览 / Demo Day |
| **可编辑 pptx** | .pptx（PowerPoint 二次编辑） | 客户咨询交付 / 高管展示 / 对方要继续改 |
| **多平台封面** | 单张图片（21:9 / 1:1 / 3:4 / 16:9 / 9:16） | 公众号头图 / 朋友圈 / 小红书 / 视频号 / 短视频 |

三种格式**共享一套视觉系统**：同样的 McKinsey 调色板、同样的字体、同样的结论先行原则。

## 触发关键词

- "做 PPT" / "做幻灯片" / "做一份分享"
- "麦肯锡 PPT" / "BCG 风" / "咨询风"
- "可编辑 pptx" / "客户汇报" / "高管展示"
- "网页 deck" / "horizontal swipe deck"
- "做封面" / "公众号头图" / "小红书封面" / "视频号封面"

## 仓库结构

```
alanppt/
├── SKILL.md                  ← 主文档
├── README.md / README.en.md  ← 速查
├── LICENSE                   ← MIT
├── assets/
│   ├── template-consulting.html  ← 网页 deck 模板（10 layout）
│   └── mckinsey-pptx/            ← 可编辑 pptx 工作目录
│       ├── image2-prompt-template.md
│       ├── decompose-prompt.md
│       ├── rebuild-prompt.md
│       ├── make-deck.js          ← pptxgenjs 脚本（含咨询图表原语库）
│       └── package.json
└── references/
    ├── layouts-consulting.md     ← 网页 deck 10 种 layout 骨架
    ├── mckinsey-pptx.md          ← pptx 完整工作流
    ├── cover-specs.md            ← 封面规格 + Prompt 模板
    └── checklist-mckinsey.md     ← 自检清单
```

## 部署方式

本 skill 维护在 `~/dev/alanppt/`（git 管理），通过软链接挂到 `~/.claude/skills/alanppt`，Claude Code 自动识别。

```bash
ls -la ~/.claude/skills/alanppt
# 应该指向 → /Users/limingxuan/dev/alanppt
```

修改完直接 `git commit` 即可，不需要任何复制操作。

## 核心设计原则

1. **结论先行**：标题必须是结论句（"动作可释放 18-24% EBITDA"），不是描述句（"EBITDA 分析"）
2. **配色克制**：navy + 1 红 accent + 绿/黄状态色；红色一份 deck ≤ 3 次
3. **网格至上**：12 列 grid + 1px hairline + 大块留白；禁圆角 > 4px / 阴影 / 渐变
4. **无衬线 only**：Inter / Helvetica / 苹方 / 雅黑；任何衬线都是错的
5. **信息密度高**：一页讲 3-4 个论点，不是"一页一句话"；但不堆 8+ 个
6. **一份 deck 一种输出**：HTML / pptx / 封面 不混用；要两种就做两份
7. **避免营销腔**：不用"震撼/颠覆/赋能/重新定义"，用具体动词和数字
8. **不用商务握手图**：真实素材或自己生成，stock photo 立刻掉档次

## License

MIT — 详见 [LICENSE](./LICENSE)
