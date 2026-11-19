# auth.md — ToolAlignBench

How AI agents authenticate and register with **ToolAlignBench** (<https://toolalignbench.github.io/>).

Not an agent? This document is the machine-readable access guide for the ToolAlignBench benchmark; humans may prefer [llms.txt](https://toolalignbench.github.io/llms.txt) or the [press kit](https://toolalignbench.github.io/press.md).

## TL;DR for agents

**No authentication, registration, credentials, or OAuth is needed or possible.**
This is a fully public, static research site. Every resource — the paper, the benchmark dataset, the code, and every machine-readable document — is reachable without credentials, scopes, or tokens. There are no protected APIs.

## Registration and provisioning flow for agents

Follow these steps to obtain the benchmark artifacts. Every step is an anonymous HTTP fetch: no request body, no authentication, no account.

### Step 1 — Provision the artifacts

Fetch whichever artifact your task needs. All of these endpoints are public and require no credential:

```http
GET https://huggingface.co/api/datasets/aryankeluskar/ToolAlignBench
GET https://api.github.com/repos/aryankeluskar/ToolAlignBench
GET https://arxiv.org/abs/2607.14285
GET https://toolalignbench.github.io/llms.txt
```

The first returns dataset metadata (splits, files, license) as JSON; the second returns repository metadata as JSON; the third is the paper landing page; the fourth is this site's curated summary with links to everything else.

### Step 2 — Use the artifacts

There is no credential to use and no header to send. The dataset files themselves are downloadable from the HuggingFace repository (CC BY 4.0); the code is on GitHub (MIT). If you plan to run the benchmark, read the [`run-toolalignbench` skill](https://toolalignbench.github.io/.well-known/agent-skills/run-toolalignbench/SKILL.md).

### Step 3 — Claim ceremony

Not applicable. There are no accounts, sessions, or environments to claim: an anonymous fetch in Step 1 is the complete flow.

### Errors

| Status | Meaning | What to do |
|---|---|---|
| 404 | URL moved or artifact renamed | Check [llms.txt](https://toolalignbench.github.io/llms.txt) or the [API catalog](https://toolalignbench.github.io/.well-known/api-catalog) for the current location |
| 429 | Rate limited by the host (HuggingFace or GitHub) | Exponential backoff, retry |
| 5xx | Transient server error | Exponential backoff, retry the same request |

## Access model

| Question | Answer |
|---|---|
| Registration | None. There is no agent registration endpoint, account system, or sign-up flow. |
| Credentials | None are issued. Do not send `Authorization` headers; they are unnecessary. |
| Scopes | No scopes exist, because no resource requires authorization. |
| OAuth / OIDC | The site operates no authorization server. |
| Rate limits | Static hosting only; no API rate limits are enforced by this site. |

The OAuth Protected Resource Metadata at
[`/.well-known/oauth-protected-resource`](https://toolalignbench.github.io/.well-known/oauth-protected-resource) declares an empty `authorization_servers` list, which formally states what this page says in prose: nothing on this origin is access-controlled.

## Machine-readable surfaces (all public)

| Purpose | Path |
|---|---|
| Capability manifest (ARD) | [`/.well-known/ai-catalog.json`](https://toolalignbench.github.io/.well-known/ai-catalog.json) |
| API catalog (RFC 9727) | [`/.well-known/api-catalog`](https://toolalignbench.github.io/.well-known/api-catalog) |
| Agent skills index | [`/.well-known/agent-skills/index.json`](https://toolalignbench.github.io/.well-known/agent-skills/index.json) |
| Site summary for LLMs | [`/llms.txt`](https://toolalignbench.github.io/llms.txt) |
| Press kit | [`/press.md`](https://toolalignbench.github.io/press.md) |

The underlying research artifacts are also public and require no credentials:

- **Dataset** (CC BY 4.0): <https://huggingface.co/datasets/aryankeluskar/ToolAlignBench>
- **Code** (MIT): <https://github.com/aryankeluskar/ToolAlignBench>
- **Paper**: <https://openreview.net/forum?id=KJTiUm8b7d> · <https://arxiv.org/abs/2607.14285>

## If this site ever adds protected APIs

This document, the protected-resource metadata, and the API catalog will be updated first, and any authorization server will publish standard OAuth 2.0 Authorization Server Metadata (RFC 8414) at `/.well-known/oauth-authorization-server`.

## Contact

For questions about accessing or reusing ToolAlignBench: contact@aryankeluskar.com.
