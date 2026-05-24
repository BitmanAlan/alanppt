# 维护说明

本 skill 是 Alan 的私有维护项目，仓库在 `~/dev/alanppt/`，通过软链挂到 `~/.claude/skills/alanppt`。下面是日常修改时的几条硬规则。

## 文件分工

- `SKILL.md` — 整个 skill 的入口和主流程，加新路径或改决策表才动这里
- `references/*.md` — 工作流细节、版式手册、自检清单，按路径分文件
- `assets/template*.html` — A/B 路径的种子模板，CSS 类名的**唯一来源**
- `assets/mckinsey-pptx/` — C 路径的 self-contained 工作目录（拷到项目就能用）
- `scripts/validate-swiss-deck.mjs` — B 路径静态校验器

## 修改原则

### 模板（assets/template*.html）

- 增加 layout 用到的新类时，**先在模板的 `<style>` 里补类**，再在 `layouts*.md` 里写骨架；不要让 layouts 引用未定义的类
- 风格 A 和 B 的类名互不通用（同名语义不同），改一边不要顺手改另一边
- 修改完跑一遍：用 `template-swiss.html` 自己生成一份 7 页测试 deck，浏览器打开过一遍 P0 检查

### 版式手册（layouts*.md）

- 风格 A：可以新增 layout，扩展到 11/12/13 类
- 风格 B：**严守 22 个登记版式**，新增正文页要先评估是不是真的不能用现有 S01-S22 改造
- 新版式必须带 Pre-flight 类名清单

### 校验器（scripts/validate-swiss-deck.mjs）

- 加 B 路径新规则时同步更新校验器
- 校验器是"硬约束的最后一道防线"，不能只靠 checklist 提醒

### C 路径（assets/mckinsey-pptx/）

- `make-deck.js` 的咨询图表原语库要保持**项目无关**，新原语写成可参数化函数
- `image2-prompt-template.md` 的 Shared Visual System 段是契约，改它要同步看下游 `make-deck.js` 的配色是否一致
- 路径和命名硬规则在 `references/mckinsey-pptx.md` 的"文件路径约定"段

### 自检清单（checklist*.md）

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
- `swiss-layouts: tighten S22 hero image safe zone (sub-title was clipped on 1366×768)`
- `mckinsey-pptx: add diagnostic strip primitive to make-deck.js`
- `skill: simplify path D trigger keywords table`

## 不要做的事

- 不要在生成的 PPT / HTML / 封面 / 配图里写入 "alanppt" 或任何第三方品牌名
- 不要把 LICENSE 里的版权声明删掉（MIT 协议硬要求）
- 不要给 A/B/C/D 四条路径之外的"第五条路径"开门，除非已经在 SKILL.md 里走完一轮决策表更新
- 不要在 checklist 里写"看情况"、"视需要"这种模糊词，要么是硬规则要么不写
