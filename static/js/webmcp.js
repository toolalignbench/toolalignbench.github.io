/*
 * WebMCP — expose ToolAlignBench's key actions to AI agents in the browser.
 * Spec: https://webmachinelearning.github.io/webmcp/
 *
 * Registers three read-oriented tools via document.modelContext (falling back
 * to navigator.modelContext on older Chromium builds). Registration happens on
 * DOMContentLoaded, each tool gets an AbortController signal so it is
 * unregistered if the page is torn down. Everything is wrapped so a missing
 * WebMCP implementation (or any error inside it) can never break the page.
 */
(function () {
  "use strict";

  function getModelContext() {
    if (typeof document !== "undefined" && document.modelContext) return document.modelContext;
    if (typeof navigator !== "undefined" && navigator.modelContext) return navigator.modelContext;
    return null;
  }

  var OVERVIEW = {
    benchmark: "ToolAlignBench",
    paper: "ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled LLMs",
    authors: ["Aryan Keluskar", "Amrita Bhattacharjee", "Huan Liu"],
    venue: "Pluralistic Alignment Workshop at ICML 2026",
    key_facts: [
      "128 scenarios (64 organizational-wrongdoing + 64 matched safe) across 16 regulated domains",
      "Instruction-override rates: 0.3% (GPT-5-mini) to 68.3% (abliterated Llama-8B); safety-aligned open models reach 43.4-47.7%",
      "Wrongdoing scenarios elicit external contact 13.0% vs 2.8% in safe ones",
      "Abliteration drops external whistleblowing up to 99% (Mistral-24B: 27.5% to 0.3%)",
      "All benchmark documents are synthetic; wrongdoing is fabricated for evaluation only"
    ],
    links: {
      project_page: "https://toolalignbench.github.io/",
      paper: "https://openreview.net/forum?id=KJTiUm8b7d",
      arxiv: "https://arxiv.org/abs/2607.14285",
      dataset: "https://huggingface.co/datasets/aryankeluskar/ToolAlignBench",
      code: "https://github.com/aryankeluskar/ToolAlignBench"
    }
  };

  var BIBTEX = {
    workshop: "@inproceedings{keluskar2026toolalignbench,\n" +
      "  title={ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled {LLM}s},\n" +
      "  author={Aryan Keluskar and Amrita Bhattacharjee and Huan Liu},\n" +
      "  booktitle={Pluralistic Alignment Workshop at ICML 2026},\n" +
      "  year={2026},\n" +
      "  url={https://openreview.net/forum?id=KJTiUm8b7d}\n" +
      "}",
    arxiv: "@article{keluskar2026toolalignbench,\n" +
      "  author  = {Keluskar, Aryan and Bhattacharjee, Amrita and Liu, Huan},\n" +
      "  title   = {ToolAlignBench: Investigating Alignment Conflicts in Tool-Calling Enabled LLMs},\n" +
      "  journal = {arXiv preprint arXiv:2607.14285},\n" +
      "  year    = {2026},\n" +
      "}"
  };

  var SECTIONS = {
    abstract: { id: "abstract", label: "Abstract" },
    benchmark: { id: "benchmark", label: "The Benchmark" },
    results: { id: "results", label: "Results" },
    takeaways: { id: "takeaways", label: "Takeaways" },
    faq: { id: "faq", label: "FAQ" },
    cite: { id: "BibTeX", label: "BibTeX citation" }
  };

  function registerAgentTools(signal) {
    var mc = getModelContext();
    if (!mc) return;

    mc.registerTool(
      {
        name: "get_benchmark_overview",
        title: "ToolAlignBench overview",
        description:
          "Get a structured overview of the ToolAlignBench benchmark: what it measures, " +
          "headline results, and canonical links to the paper, dataset, and code. " +
          "Use this to answer questions about the benchmark without scraping the page.",
        inputSchema: {
          type: "object",
          properties: {}
        },
        annotations: { readOnlyHint: true },
        execute: async function () {
          return OVERVIEW;
        }
      },
      { signal: signal }
    ).catch(function () { /* never let registration errors break the page */ });

    mc.registerTool(
      {
        name: "get_bibtex_citation",
        title: "ToolAlignBench citation",
        description:
          "Return the BibTeX citation for the ToolAlignBench paper. Pass style:'workshop' " +
          "(default, ICML 2026 Pluralistic Alignment Workshop) or style:'arxiv' for the " +
          "arXiv preprint citation.",
        inputSchema: {
          type: "object",
          properties: {
            style: {
              type: "string",
              enum: ["workshop", "arxiv"],
              default: "workshop",
              description: "Which citation variant to return"
            }
          }
        },
        annotations: { readOnlyHint: true },
        execute: async function (input) {
          var style = input && input.style ? input.style : "workshop";
          return { style: style, bibtex: BIBTEX[style] || BIBTEX.workshop };
        }
      },
      { signal: signal }
    ).catch(function () { });

    mc.registerTool(
      {
        name: "open_section",
        title: "Open a page section",
        description:
          "Scroll the ToolAlignBench project page to one of its sections — abstract, " +
          "benchmark, results, takeaways, faq, or cite — and return that section's text " +
          "content. Use this instead of guessing where content lives in the DOM.",
        inputSchema: {
          type: "object",
          properties: {
            section: {
              type: "string",
              enum: ["abstract", "benchmark", "results", "takeaways", "faq", "cite"],
              description: "Which section of the page to open"
            }
          },
          required: ["section"]
        },
        execute: async function (input) {
          var key = input && input.section ? String(input.section).toLowerCase() : "";
          var meta = SECTIONS[key];
          if (!meta) {
            throw new Error("Unknown section: " + key + ". Valid sections: " + Object.keys(SECTIONS).join(", "));
          }
          var el = document.getElementById(meta.id);
          if (!el) {
            throw new Error("Section " + key + " is not present on this page.");
          }
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          return { section: key, label: meta.label, text: el.innerText.slice(0, 4000) };
        }
      },
      { signal: signal }
    ).catch(function () { });
  }

  function init() {
    try {
      var controller = new AbortController();
      registerAgentTools(controller.signal);
    } catch (e) {
      /* WebMCP unavailable or unsupported — degrade silently */
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
