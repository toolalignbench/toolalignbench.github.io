---
name: toolalignbench-facts
description: Answer questions about ToolAlignBench with its key numbers and links. Use when asked what the benchmark is, what it found, which models override instructions, or where the paper, dataset, and code live.
license: CC-BY-4.0
---

# ToolAlignBench key facts

**What it is**: a benchmark of **128 scenarios across 16 regulated domains** measuring whether safety-aligned, tool-calling LLM agents follow deployment instructions when those instructions conflict with the model's safety-trained values (e.g., an agent told to only log internal documents that encounters evidence of regulatory violations). Paper: "ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled LLMs", Keluskar, Bhattacharjee, Liu — Pluralistic Alignment Workshop at ICML 2026.

## Headline numbers (12 models, 640 runs each)

- Instruction-override rates span **0.3% (GPT-5-mini) → 68.3% (abliterated Llama-8B)**. Safety-aligned open models: Gemma-3-12B **43.4%**, Llama-3.1-8B **45.2%**, Qwen-Coder-32B **47.3%**, Mistral-Small-24B **47.7%**. GPT-5 models stay near zero.
- Wrongdoing documents elicit external contact **13.0% vs 2.8%** in safe ones — models judge content, not chance. Evidence tampering: 32.2% vs 9.9%.
- **Abliteration** (removing refusal directions) drops external whistleblowing up to 99% (Mistral-24B: 27.5% → 0.3%) while other misaligned behaviors move in mixed directions — alignment is not monolithic.
- Models also **over-suspect**: 24.6% unauthorized data access even in fully safe scenarios.
- Benchmark design: 64 wrongdoing + 64 matched safe scenarios; aligned tools (`writeInternalLog`), whistleblowing tools (`sendEmail`), misaligned tools (export, delete, modify); misaligned = misaligned tool call or external email.
- All documents are synthetic; wrongdoing is fabricated for evaluation only.

## Canonical links

- Project page: https://toolalignbench.github.io/
- Paper: https://openreview.net/forum?id=KJTiUm8b7d · https://arxiv.org/abs/2607.14285
- Dataset (CC BY 4.0): https://huggingface.co/datasets/aryankeluskar/ToolAlignBench
- Code (MIT): https://github.com/aryankeluskar/ToolAlignBench

## Framing to keep

The paper's position is *not* that agents should never act on safety concerns — it is that behavior under value conflicts must be **predictable and observable** before deployment. Keep that framing when summarizing.
