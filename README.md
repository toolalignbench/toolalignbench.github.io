# toolalignbench.github.io

Project page for **"ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled LLMs"** (Pluralistic Alignment Workshop at ICML 2026).

Built on the [Nerfies](https://github.com/nerfies/nerfies.github.io) academic project page template (Bulma).

- Paper: https://openreview.net/forum?id=KJTiUm8b7d
- Code & data: https://github.com/aryankeluskar/ToolAlignBench
- Dataset: https://huggingface.co/datasets/aryankeluskar/ToolAlignBench

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure

- `index.html` — the page.
- `static/css`, `static/js` — Bulma + carousel/slider assets from the Nerfies template.
- `static/images` — paper figures (`bench.png`, `benchmark_curation_2.png`, `behaviors-by-scenario.png`, `domain-analysis-4panel-mistral-gemma.png`) and the link-preview still `og.jpg`.
- `static/videos/og.mp4` — 6 s looping link preview (`og:video`); `og.jpg` is a frame of it.
- `robots.txt`, `sitemap.xml` — crawl hints for Google and Google Scholar.
