# alanppt · Alan 的 PPT skill

> Alan Lee 的个人 PPT 生成 skill，覆盖 4 条产出路径。详细工作流见 [`SKILL.md`](./SKILL.md)，本 README 只做速查。

## 四条产出路径

| 路径 | 输出 | 何时用 |
|---|---|---|
| **A · 杂志风网页 PPT** | 单文件 HTML | 行业观察 / 人文 / 商业发布 / 演讲 |
| **B · 瑞士风网页 PPT** | 单文件 HTML | 数据 / 技术 / AI 产品 / 年度总结 |
| **C · 麦肯锡可编辑 pptx** | .pptx | 客户咨询 / 高管展示 / 要 PowerPoint 二次编辑 |
| **D · 多平台封面** | 单张图片（21:9 / 1:1 / 3:4 / 16:9 / 9:16） | 公众号头图 / 朋友圈 / 小红书 / 视频号 / 短视频竖封 |

## 触发关键词

- "做 PPT" / "做幻灯片" / "做一份分享"
- "杂志风 PPT" / "Monocle 风"
- "瑞士风 PPT" / "Swiss Style" / "Helvetica" / "极简"
- "麦肯锡 PPT" / "BCG 风" / "可编辑 pptx" / "客户咨询"
- "做封面" / "公众号头图" / "小红书封面" / "视频号封面"

## 仓库结构

```
alanppt/
├── SKILL.md                  ← 主文档（四路径工作流 + Alan 自定义层）
├── README.md                 ← 你正在读
├── LICENSE                   ← MIT
├── assets/
│   ├── template.html         ← A · 杂志风模板
│   ├── template-swiss.html   ← B · 瑞士风模板
│   ├── motion.min.js         ← Motion One 离线副本
│   ├── screenshot-backgrounds/ ← 截图美化背景（A 5 套 / B 4 套）
│   └── mckinsey-pptx/        ← C · 麦肯锡 pptx 生成包（self-contained）
├── scripts/
│   └── validate-swiss-deck.mjs ← B 路径静态校验器
└── references/
    ├── layouts.md            ← A · 10 种页面布局
    ├── layouts-swiss.md      ← B · 22 种锁定版式
    ├── swiss-layout-lock.md  ← B · 版式硬约束
    ├── swiss-map-component.md ← B · S08 地图扩展
    ├── themes.md             ← A · 5 套主题色
    ├── themes-swiss.md       ← B · 4 套锚点色
    ├── components.md         ← A · 组件手册
    ├── image-prompts.md      ← 配图提示词
    ├── screenshot-framing.md ← 截图美化语义
    ├── cover-specs.md        ← D · 多平台封面规格
    ├── mckinsey-pptx.md      ← C · 完整工作流
    ├── checklist.md          ← A/B 自检清单
    └── checklist-mckinsey.md ← C · 自检清单
```

## 部署方式

本 skill 维护在 `~/dev/alanppt/`（git 管理），通过软链接挂载到 `~/.claude/skills/alanppt`，Claude Code 自动识别。

修改完直接 `git commit` 即可，不需要任何复制操作。

```bash
# 验证软链
ls -la ~/.claude/skills/alanppt
# 应该指向 → /Users/limingxuan/dev/alanppt
```

## 核心设计原则

- **克制优于炫技**：背景动效只在 hero 页透出，正文页几乎看不见
- **结构优于装饰**：信息靠字号 + 字体对比 + 网格留白，不用阴影/浮动卡片
- **图片是第一公民**：固定比例 + 高度，不让图撑破版式
- **一份 deck 一条路径**：A/B/C/D 不混用；要两种产物就做两份
- **配色克制**：每条路径都用预设主题，不接受自定义 hex
- **不用商务握手图**：要么真实素材、要么自己生成，stock photo 立刻掉档次
- **避免营销腔**：不用"震撼/颠覆/赋能/重新定义"，用具体动词和数字

## License

MIT — 完整版权与第三方致谢见 [LICENSE](./LICENSE)。
