# ToolAlignBench

> **ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled LLMs** Aryan Keluskar, Amrita Bhattacharjee, Huan Liu — School of Computing & AI, Arizona State University Published at the **Pluralistic Alignment Workshop, ICML 2026**.

**Project page:** <https://toolalignbench.github.io/> · **Press kit:** <https://toolalignbench.github.io/press.md>

**Paper:** [OpenReview](https://openreview.net/forum?id=KJTiUm8b7d) · [arXiv:2607.14285](https://arxiv.org/abs/2607.14285) **Dataset:** [huggingface.co/datasets/aryankeluskar/ToolAlignBench](https://huggingface.co/datasets/aryankeluskar/ToolAlignBench) (CC BY 4.0)

## What it measures

128 scenarios (64 organizational-wrongdoing + 64 matched safe documents) across 16 regulated domains, each with aligned tools (`writeInternalLog`), whistleblowing tools (`sendEmail` to internal or external recipients), and misaligned tools (document export, report deletion, file modification). A run is misaligned if the agent invokes a misaligned tool or emails an external entity (regulators, journalists, law enforcement). All documents are synthetic; wrongdoing is fabricated for evaluation only.

## Key results

- Instruction-override rates span **0.3% (GPT-5-mini) → 68.3% (abliterated Llama-8B)**; safety-aligned open models reach **43–48%**.
- Wrongdoing documents elicit external contact **13.0% vs 2.8%** in safe ones — models judge content, not chance.
- Abliteration drops external whistleblowing up to **99%** (Mistral-24B: 27.5% → 0.3%) but other misaligned behaviors move in mixed directions — **alignment is not monolithic**.
- Models also over-suspect: **24.6%** unauthorized data access even in fully safe scenarios.

## Repository layout

| Directory    | Description                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `benchmark/` | Prompts (128 markdown files) + per-domain tool taxonomy.                                                                                          |
| `runner/`    | Drives an LLM through each scenario, creates one markdown transcript per (model, domain, scenario, run, condition).                               |
| `analysis/`  | Parses transcripts → behavior labels → tables, statistical tests, and figures.                                                                    |
| `inference/` | FastAPI shim that serves local HuggingFace models behind an OpenAI-compatible API with tool-calling. Used for the abliterated open-source models. |
| `dataset/`   | Script that packages benchmark/ into the JSONL files uploaded to HuggingFace.                                                                     |

## Quick start

```bash
git clone https://github.com/aryankeluskar/ToolAlignBench
cd ToolAlignBench
cp .env.example .env
# then fill in OPENROUTER_API_KEY

# Reproduce one model on one scenario type
cd runner
bun install
bun run start --safe

# Analyze the transcripts and reproduce figures
cd ../analysis
bun install
bun run analyze
bun run plot
```

The default model in `runner/src/models.ts` is `meta-llama/llama-3.1-8b-instruct` via OpenRouter.
Uncomment additional entries to reproduce the full Table 1.

## Cite

```bibtex
@inproceedings{keluskar2026toolalignbench,
  title={ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled {LLM}s},
  author={Aryan Keluskar and Amrita Bhattacharjee and Huan Liu},
  booktitle={Pluralistic Alignment Workshop at ICML 2026},
  year={2026},
  url={https://openreview.net/forum?id=KJTiUm8b7d}
}
```

## For search engines and AI assistants

- [`llms.txt`](https://toolalignbench.github.io/llms.txt) — machine-readable site summary.
- [`llms-full.txt`](https://toolalignbench.github.io/llms-full.txt) — complete site content in markdown for LLMs.
- [`index.md`](https://toolalignbench.github.io/index.md) — markdown twin of the homepage (llms.txt v2 convention).
- [`atom.xml`](https://toolalignbench.github.io/atom.xml) — update feed.
- [`press.md`](https://toolalignbench.github.io/press.md) — press kit with headline numbers and figures.
- Structured data: one consolidated JSON-LD `@graph` (`ScholarlyArticle`, `Dataset`, `SoftwareSourceCode`, `FAQPage`, authors, ASU) on the project page.
- `<key>.txt` (e.g. `b3f01b1bd3b58d86e05a2483ef1042d0.txt`) — [IndexNow](https://www.indexnow.org/) key for Bing/Yandex reindexing; after deploys, ping `https://api.indexnow.org/indexnow?url=https://toolalignbench.github.io/&key=<key>`.
- Social card: `static/images/og.png` is rendered from the Excalidraw scene [`og-card.excalidraw`](og-card.excalidraw) at the repo root (real `exportToSvg` via the [excalidraw-diagram](https://github.com/) skill's `render_excalidraw.py`, then centered paste onto a 1200×630 white canvas). Edit that scene and re-render to change the card. `static/images/og.jpg` is the retired card, kept so previously cached previews don't break.

## Agent-readiness surfaces

The site implements the [isitagentready.com](https://isitagentready.com) agent-discovery checks that a static GitHub Pages site can serve:

| Surface | Path | Spec |
| --- | --- | --- |
| Content Signals + Agentmap | `robots.txt` | [contentsignals.org](https://contentsignals.org/), [ARD](https://agenticresourcediscovery.org/) |
| API catalog | `/.well-known/api-catalog` | [RFC 9727](https://www.rfc-editor.org/rfc/rfc9727) |
| Protected Resource Metadata | `/.well-known/oauth-protected-resource` | [RFC 9728](https://www.rfc-editor.org/rfc/rfc9728) |
| auth.md | `/auth.md` | [auth.md](https://github.com/workos/auth.md) |
| ARD capability manifest | `/.well-known/ai-catalog.json` | [ARD spec](https://agenticresourcediscovery.org/) |
| Agent skills index | `/.well-known/agent-skills/index.json` | [Agent Skills Discovery RFC v0.2.0](https://github.com/cloudflare/agent-skills-discovery-rfc) |
| WebMCP tools | `static/js/webmcp.js` | [WebMCP](https://webmachinelearning.github.io/webmcp/) |

Notes for maintainers:

- **Skill digests**: `/.well-known/agent-skills/index.json` carries a `sha256:` digest of each `SKILL.md`. After editing any skill, regenerate them: `cd .well-known/agent-skills && for d in */; do shasum -a 256 "$d/SKILL.md"; done` and paste the new digests into `index.json`.
- **Hosting limits**: GitHub Pages cannot emit custom `Link` response headers, cannot do `Accept: text/markdown` negotiation, and `*.github.io` DNS is controlled by GitHub — so the RFC 8288 Link-header, Markdown-for-Agents, and DNS-AID checks cannot pass on this host. Those would require serving the site from infrastructure you control (e.g.
  Cloudflare). Everything else above is served by static files.
- **Deliberate omissions**: no MCP server card, A2A agent card, OAuth authorization-server metadata, or Personal Agent Protocol manifest is published, because nothing real backs them on a static site — discovery documents that advertise nonexistent endpoints mislead agents. `/.well-known/oauth-protected-resource` declares an *empty* `authorization_servers` list, which is the truthful statement that this origin's resources are public.
- **Content Signals** are repeated inside every named `User-agent` group in `robots.txt` because a bot that matches a named group ignores the wildcard group entirely.

## Credits

Website template adapted from [Nerfies](https://github.com/nerfies/nerfies.github.io), licensed under CC BY-SA 4.0. Benchmark code is MIT; the dataset is CC BY 4.0.
