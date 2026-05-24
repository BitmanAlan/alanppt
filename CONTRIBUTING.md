# 维护说明

本 skill 是 Alan 的私有维护项目，仓库在 `~/dev/alanppt/`，通过软链挂到 `~/.claude/skills/alanppt`。

## 文件分工

- `SKILL.md` — 整个 skill 的入口和主流程
- `references/*.md` — 工作流细节、layout 手册、自检清单
- `assets/template-consulting.html` — 网页 deck 种子模板，CSS 类名的**唯一来源**
- `assets/mckinsey-pptx/` — 可编辑 pptx self-contained 工作目录

## 修改原则

### 模板（template-consulting.html）

- 增加 layout 用到的新类时，**先在模板的 `<style>` 里补类**，再在 `layouts-consulting.md` 里写骨架；不要让 layouts 引用未定义的类
- 改动前先用 playwright 截图当前 baseline，改完后对比
- 永远保持"无衬线 only + McKinsey 调色板 + 无装饰"硬约束

### Layout 手册（layouts-consulting.md）

- 新增 layout 必须带 Pre-flight 类名清单（顶部清单也要同步加）
- 每个 layout 要包含：用途 / 关键决策 / 完整 HTML 骨架 / 变体说明
- layout 编号是稳定的——只能往后加，不能改前面的

### C 路径（assets/mckinsey-pptx/）

- `make-deck.js` 的咨询图表原语库要保持**项目无关**，新原语写成可参数化函数
- `image2-prompt-template.md` 的 Shared Visual System 段是契约，改它要同步看下游 `make-deck.js` 的配色是否一致
- 路径和命名硬规则在 `references/mckinsey-pptx.md` 的"文件路径约定"段

### 自检清单（checklist-mckinsey.md）

- 踩过的坑及时归到对应 P0/P1/P2/P3 级别
- 描述要带"现象 + 根因 + 做法"，单纯"不要 X"不行

## 提交流程

```bash
cd ~/dev/alanppt
# 改文件
git add -A
git commit -m "<area>: <one-line change> (<why>)"
```

commit subject 用 `<area>: <change>` 格式，例如：
- `template-consulting: tighten cover safe zone (title was clipped on 1366×768)`
- `mckinsey-pptx: add diagnostic strip primitive to make-deck.js`
- `skill: simplify trigger keywords for 3 output formats`

## 不要做的事

- 不要在生成的 PPT / HTML / 封面 / 配图里写入 "alanppt" 或任何品牌名
- 不要加回 A 杂志风 / B 瑞士风 / WebGL 流体 / 点阵装饰这些"非咨询风"元素——它们是 v1 时期试过被否定的方向
- 不要给"专业咨询风"之外的"第二种视觉风格"开门，除非已经在 SKILL.md 里走完一轮决策表更新
- 不要在 checklist 里写"看情况"、"视需要"这种模糊词，要么是硬规则要么不写
- 不要在 D 路径封面里直接截 deck 的某一页——必须按 cover-specs.md 重新构图
