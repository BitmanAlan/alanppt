# alanppt · Professional consulting PPT skill

> Alan Lee's personal PPT generation skill. Single visual identity (McKinsey/BCG consulting aesthetic), three output formats. See [`SKILL.md`](./SKILL.md) for the full workflow; this README is a quick reference.

## Design identity

**Professional consulting style** · Conclusion-first · Grid-driven · Restrained palette · High information density · No decoration

Inspiration: McKinsey / BCG / Bain client deck aesthetic.

**Banned**: WebGL fluid backgrounds, dot matrix decoration, serif magazine style, Monocle-style, Swiss colored blocks, stock photos.

## Three output formats

| Format | Output | When |
|---|---|---|
| **HTML web deck** | Single HTML file (horizontal swipe) | Internal sharing / send link to client for preview / Demo Day |
| **Editable pptx** | .pptx (PowerPoint second-edit) | Client consulting deliverable / exec presentation / handover |
| **Multi-platform cover** | Single image (21:9 / 1:1 / 3:4 / 16:9 / 9:16) | WeChat header / share card / Xiaohongshu / video platform / vertical |

All three formats **share one visual system**: same McKinsey palette, same typography, same conclusion-first principle.

## Trigger keywords

- "make a deck" / "create slides" / "build a presentation"
- "McKinsey deck" / "BCG style" / "consulting deck"
- "editable pptx" / "client deck" / "exec presentation"
- "web deck" / "horizontal swipe deck"
- "make a cover" / "WeChat header" / "Xiaohongshu cover"

## Repo layout

```
alanppt/
├── SKILL.md                  ← main doc
├── README.md / README.en.md  ← quick ref
├── LICENSE                   ← MIT
├── assets/
│   ├── template-consulting.html  ← web deck template (10 layouts)
│   └── mckinsey-pptx/            ← editable pptx working dir
│       ├── image2-prompt-template.md
│       ├── decompose-prompt.md
│       ├── rebuild-prompt.md
│       ├── make-deck.js          ← pptxgenjs script (with consulting chart primitive library)
│       └── package.json
└── references/
    ├── layouts-consulting.md     ← 10 layout patterns for web deck
    ├── mckinsey-pptx.md          ← pptx workflow
    ├── cover-specs.md            ← cover specs + prompts
    └── checklist-mckinsey.md     ← QA checklist
```

## Deployment

This skill lives in `~/dev/alanppt/` (git-tracked) and is symlinked into `~/.claude/skills/alanppt` so Claude Code picks it up automatically.

```bash
ls -la ~/.claude/skills/alanppt
# should point to → /Users/limingxuan/dev/alanppt
```

Edit in `~/dev/alanppt/`, commit with git — no copy step needed.

## Core design principles

1. **Conclusion first**: titles state the conclusion ("Action releases 18-24% EBITDA"), not the topic ("EBITDA analysis")
2. **Restrained palette**: navy + 1 red accent + green/amber for status; red appears ≤ 3 times per deck
3. **Grid-driven**: 12-column grid + 1px hairlines + generous whitespace; no rounded corners > 4px, no shadows, no gradients
4. **Sans-serif only**: Inter / Helvetica / PingFang / YaHei; any serif is wrong
5. **High information density**: 3-4 points per page, not "one sentence per page"; but never 8+ points
6. **One deck, one format**: HTML / pptx / cover never mix; if you need two outputs, make two decks
7. **No marketing voice**: avoid "revolutionary / disruptive / unleash"; use concrete verbs and numbers
8. **No stock business photos**: real or generated, never "handshake / team meeting" stock — instant downgrade

## License

MIT — see [LICENSE](./LICENSE)
