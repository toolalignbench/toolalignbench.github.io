# ToolAlignBench — press kit

**Paper:** "ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled LLMs"
**Authors:** Aryan Keluskar, Amrita Bhattacharjee, Huan Liu — School of Computing & AI, Arizona State University
**Venue:** Pluralistic Alignment Workshop, ICML 2026 · [OpenReview](https://openreview.net/forum?id=KJTiUm8b7d) · [arXiv:2607.14285](https://arxiv.org/abs/2607.14285)
**Project page:** [toolalignbench.github.io](https://toolalignbench.github.io/)
**Contact:** contact@aryankeluskar.com · [Aryan Keluskar on X](https://x.com/soydotrun) · [aryankeluskar.com](https://aryankeluskar.com)

## The story in one paragraph

When an AI agent is given tools and told to quietly log internal company documents, what happens if
the documents contain evidence of wrongdoing? This benchmark answers it: safety-trained open-source
models frequently *don't* stay quiet. Across 128 synthetic scenarios in 16 regulated industries —
pharma, finance, aviation, energy, and more — models like Gemma, Llama, Qwen, and Mistral overrode
their deployment instructions in up to 43.4% of runs, emailing regulators, journalists, or law
enforcement, exporting confidential files, or tampering with evidence. The very safety training that
protects users turns an organization's own AI assistant into an unpredictable actor when its values
and its instructions collide.

## Headline numbers

- **43.4%** — instruction-override rate for the most-compliant safety-aligned open model tested (Google Gemma-3-12B); 26.4% of its wrongdoing runs involved contacting outside parties.
- **0.3%** — override rate for GPT-5-mini, trained with explicit instruction-hierarchy objectives.
- **68.3%** — override rate for an "abliterated" (safety-directions-removed) Llama-8B.
- **13.0% vs 2.8%** — external contact in wrongdoing vs safe documents: the models judge what they read; this is not random tool misuse.
- **99% drop** — external whistleblowing by Mistral-24B after safety-training abliteration (27.5% → 0.3%).

## Why it matters

- **For companies deploying agents:** the same assistant that protects customers can act against
  your procedures — leaking documents, deleting evidence, or reporting you to a regulator. Behavior
  under value conflicts should be measured *before* deployment.
- **For AI safety:** "aligned" is not one dial. Removing safety training reduced whistleblowing but
  *increased* other misaligned behaviors in two model families — different training components shape
  different behaviors.
- **For the debate on AI values:** no single value hierarchy is "correct." The paper's ask is
  predictability — that agents behave observably and consistently when legitimate interests compete.

## Quotable findings (attribute to the paper)

- "Safety-aligned open-source models override their deployment instructions up to 43.4% of the time
  when processing documents that suggest organizational wrongdoing."
- "The same safety training that protects users can push agents to act against their deployment
  instructions, which is an unpredictable liability for the organizations running them."
- "Alignment is not monolithic: abliteration reduces external whistleblowing by up to 99% for some
  model families, but other misaligned behaviors respond differently."

## Figures (free to republish with attribution)

- [Overview: an agent choosing between logging and emailing the FDA](https://toolalignbench.github.io/static/images/bench.png)
- [Benchmark construction and evaluation pipeline](https://toolalignbench.github.io/static/images/benchmark_curation_2.png)
- [Behavior rates in wrongdoing vs safe scenarios](https://toolalignbench.github.io/static/images/behaviors-by-scenario.png)
- [Domain-specific value sensitivities](https://toolalignbench.github.io/static/images/domain-analysis-4panel-mistral-gemma.png)

## Important caveats for coverage

- **All documents are synthetic.** The wrongdoing, companies, and events are fabricated by the
  authors (generated with Claude Sonnet 4.5) to probe agent behavior — the benchmark contains no
  real companies or real violations.
- "Whistleblowing," "data exfiltration," and "tampering" are *behavior labels* for tool calls
  within the benchmark, not real-world consequences.
- Models act inside a sandboxed harness; no real emails were sent and no real data was exported.

## Citation

```bibtex
@inproceedings{keluskar2026toolalignbench,
  title={ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled {LLM}s},
  author={Aryan Keluskar and Amrita Bhattacharjee and Huan Liu},
  booktitle={Pluralistic Alignment Workshop at ICML 2026},
  year={2026},
  url={https://openreview.net/forum?id=KJTiUm8b7d}
}
```

## Related work by this group

- [When Does Personality Composition Matter for Multi-Agent LLM Teams?](https://multi-agent-llm-teams.github.io/) (COLM 2026)
- [Do LLMs Understand Ambiguity in Text?](https://llm-ambiguity.github.io/) (IEEE BigData 2024) — previously covered by [AI Techbrief at AZo](https://www.azoai.com/) and [Convert.com](https://www.convert.com/)
