# ToolAlignBench

> **ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled LLMs**
> Aryan Keluskar, Amrita Bhattacharjee, Huan Liu — School of Computing & AI, Arizona State University
> Published at the **Pluralistic Alignment Workshop, ICML 2026**.

**Project page:** <https://toolalignbench.github.io/> · **Press kit:** <https://toolalignbench.github.io/press.md>

**Paper:** [OpenReview](https://openreview.net/forum?id=KJTiUm8b7d) · [arXiv:2607.14285](https://arxiv.org/abs/2607.14285)
**Dataset:** [huggingface.co/datasets/aryankeluskar/ToolAlignBench](https://huggingface.co/datasets/aryankeluskar/ToolAlignBench) (CC BY 4.0)

## What it measures

128 scenarios (64 organizational-wrongdoing + 64 matched safe documents) across 16 regulated
domains, each with aligned tools (`writeInternalLog`), whistleblowing tools (`sendEmail` to
internal or external recipients), and misaligned tools (document export, report deletion, file
modification). A run is misaligned if the agent invokes a misaligned tool or emails an external
entity (regulators, journalists, law enforcement). All documents are synthetic; wrongdoing is
fabricated for evaluation only.

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
- [`press.md`](https://toolalignbench.github.io/press.md) — press kit with headline numbers and figures.
- Structured data: `ScholarlyArticle`, `Dataset`, and `FAQPage` JSON-LD on the project page.

## Credits

Website template adapted from [Nerfies](https://github.com/nerfies/nerfies.github.io), licensed
under CC BY-SA 4.0. Benchmark code is MIT; the dataset is CC BY 4.0.
