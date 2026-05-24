# alanppt · Alan's PPT skill

> Alan Lee's personal PPT generation skill covering 4 output paths. See [`SKILL.md`](./SKILL.md) for the full workflow; this README is a quick reference.

## Four output paths

| Path | Output | When |
|---|---|---|
| **A · Magazine web deck** | Single HTML file | Industry observation / humanities / business launch / talk |
| **B · Swiss-style web deck** | Single HTML file | Data / tech / AI product / annual report |
| **C · McKinsey editable pptx** | .pptx | Client consulting / exec presentation / needs PowerPoint edit |
| **D · Multi-platform cover** | Single image (21:9 / 1:1 / 3:4 / 16:9 / 9:16) | WeChat header / share card / Xiaohongshu / video platform / vertical |

## Trigger keywords

- "make a deck" / "create slides" / "build a presentation"
- "magazine style" / "Monocle look"
- "Swiss style" / "Helvetica" / "International Typographic"
- "McKinsey deck" / "BCG style" / "editable pptx" / "client deck"
- "make a cover" / "WeChat header" / "Xiaohongshu cover"

## Repo layout

```
alanppt/
├── SKILL.md                  ← main doc (4-path workflow + Alan layer)
├── README.md / README.en.md
├── LICENSE                   ← MIT
├── assets/
│   ├── template.html         ← A · magazine template
│   ├── template-swiss.html   ← B · Swiss template
│   ├── motion.min.js         ← Motion One offline copy
│   ├── screenshot-backgrounds/ ← screenshot framing backgrounds
│   └── mckinsey-pptx/        ← C · self-contained pptx generator
├── scripts/
│   └── validate-swiss-deck.mjs ← B path static validator
└── references/
    ├── layouts.md / layouts-swiss.md
    ├── swiss-layout-lock.md / swiss-map-component.md
    ├── themes.md / themes-swiss.md
    ├── components.md
    ├── image-prompts.md / screenshot-framing.md
    ├── cover-specs.md            ← D path specs
    ├── mckinsey-pptx.md          ← C path workflow
    ├── checklist.md              ← A/B QA
    └── checklist-mckinsey.md     ← C QA
```

## Deployment

This skill lives in `~/dev/alanppt/` (git-tracked) and is symlinked into `~/.claude/skills/alanppt` so Claude Code picks it up automatically.

```bash
ls -la ~/.claude/skills/alanppt
# should point to → /Users/limingxuan/dev/alanppt
```

Edit in `~/dev/alanppt/`, commit with git — no copy step needed.

## Design principles

- **Restraint over flash**: animated backgrounds only show through on hero slides
- **Structure over decoration**: hierarchy comes from type scale + grid space, not shadows or floating cards
- **Image is a first-class citizen**: fix ratio + height, don't let images break the layout
- **One deck, one path**: A/B/C/D never mix; if you need two outputs, make two decks
- **Locked color palettes**: every path uses presets, no arbitrary hex
- **No stock business photos**: real or generated, never "handshake / team meeting" stock — instant downgrade
- **No marketing voice**: avoid "revolutionary / disruptive / unleash"; use concrete verbs and numbers

## License

MIT — see [LICENSE](./LICENSE) for full copyright and third-party acknowledgments.
