# auth.md — ToolAlignBench

How AI agents authenticate and register with **ToolAlignBench** (<https://toolalignbench.github.io/>).

## TL;DR for agents

**No authentication, registration, credentials, or OAuth is needed or possible.**
This is a fully public, static research site. Every resource — the paper, the benchmark dataset, the code, and every machine-readable document — is reachable without credentials, scopes, or tokens. There are no protected APIs.

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
