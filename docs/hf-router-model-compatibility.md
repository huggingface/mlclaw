# Hugging Face Router Model Compatibility

Date: 2026-06-12

This document records a live compatibility probe against the shared Hugging Face
Router chat-completions endpoint:

```text
https://router.huggingface.co/v1/chat/completions
```

The goal is to identify current Gemma and Qwen models that can be used by
OpenClaw through the Hugging Face router. For OpenClaw, use the `huggingface/`
prefix shown in the tables below. The direct router request uses the Hub model
ID without that prefix.

Candidate selection was intentionally focused on current official
instruction/chat-style Gemma and Qwen models relevant to OpenClaw. The probe
excluded GGUF repos, mobile/LiteRT exports, QAT-only artifacts, embeddings,
rerankers, ASR/TTS models, image-generation models, tokenizer repos, and
scope/interpretability repos. Base checkpoints from the latest Gemma 4 and Qwen
3.5 families were included where useful to confirm router rejection behavior.

Raw probe data is checked in at:

```text
docs/hf-router-model-probe-2026-06-12.json
```

## Probe Method

Each model was called with a tiny OpenAI-compatible chat-completions request:

```json
{
  "messages": [{ "role": "user", "content": "Reply exactly: ok" }],
  "max_tokens": 12,
  "temperature": 0
}
```

A model is marked as working when the router returned HTTP 200 from
`/v1/chat/completions`. A model is marked rejected when the router returned
`400 model_not_supported`, usually with a message like:

```text
The requested model '<model>' is not a chat model.
```

That error means the shared router does not currently expose that Hub model as
an OpenAI-compatible chat-completion model. It does not prove the weights cannot
be served through a dedicated TGI or vLLM endpoint.

## Summary

Probe totals:

| Family | Tested | Working | Rejected or unstable |
| --- | ---: | ---: | ---: |
| Gemma | 22 | 4 | 18 |
| Qwen | 36 | 13 | 23 |
| Total | 58 | 17 | 41 |

Best current OpenClaw choices from this run:

```text
huggingface/google/gemma-4-26B-A4B-it
huggingface/google/gemma-4-31B-it
huggingface/Qwen/Qwen3-Coder-30B-A3B-Instruct
huggingface/Qwen/Qwen3-VL-8B-Instruct
huggingface/Qwen/Qwen3-8B
huggingface/Qwen/Qwen3-14B
huggingface/Qwen/Qwen3-32B
```

`huggingface/google/gemma-4-26B-A4B-it` is the important Gemma correction from
the earlier 12B investigation: Gemma 4 12B was rejected by the router, but Gemma
4 26B-A4B-it works.

## Gemma Models That Worked

| Hub model | OpenClaw model | Router model | Notes |
| --- | --- | --- | --- |
| `google/gemma-4-26B-A4B-it` | `huggingface/google/gemma-4-26B-A4B-it` | `google/gemma-4-26b-a4b-it` | returned 200 |
| `google/gemma-4-31B-it` | `huggingface/google/gemma-4-31B-it` | `google/gemma-4-31b-it` | returned 200 |
| `google/gemma-3n-E4B-it` | `huggingface/google/gemma-3n-E4B-it` | `google/gemma-3n-E4B-it` | returned 200 |
| `google/gemma-3-27b-it` | `huggingface/google/gemma-3-27b-it` | `gemma-3-27b-it` | returned 200 |

## Gemma Models Rejected By The Router

| Hub model | Result |
| --- | --- |
| `google/gemma-4-E2B` | 400 `model_not_supported` |
| `google/gemma-4-E2B-it` | 400 `model_not_supported` |
| `google/gemma-4-E2B-it-assistant` | 400 `model_not_supported` |
| `google/gemma-4-E4B` | 400 `model_not_supported` |
| `google/gemma-4-E4B-it` | 400 `model_not_supported` |
| `google/gemma-4-E4B-it-assistant` | 400 `model_not_supported` |
| `google/gemma-4-12B` | 400 `model_not_supported` |
| `google/gemma-4-12B-it` | 400 `model_not_supported` |
| `google/gemma-4-12B-it-assistant` | 400 `model_not_supported` |
| `google/gemma-4-26B-A4B` | 400 `model_not_supported` |
| `google/gemma-4-26B-A4B-it-assistant` | 400 `model_not_supported` |
| `google/gemma-4-31B` | 400 `model_not_supported` |
| `google/gemma-4-31B-it-assistant` | 400 `model_not_supported` |
| `google/gemma-3n-E2B-it` | 400 `model_not_supported` |
| `google/gemma-3-270m-it` | 400 `model_not_supported` |
| `google/gemma-3-1b-it` | 400 `model_not_supported` |
| `google/gemma-3-4b-it` | 400 `model_not_supported` |
| `google/gemma-3-12b-it` | 400 `model_not_supported` |

## Qwen Models That Worked

| Hub model | OpenClaw model | Router model | Notes |
| --- | --- | --- | --- |
| `Qwen/Qwen3.5-9B` | `huggingface/Qwen/Qwen3.5-9B` | `Qwen/Qwen3.5-9B` | returned 200 |
| `Qwen/Qwen3-Coder-Next` | `huggingface/Qwen/Qwen3-Coder-Next` | `qwen/qwen3-coder-next` | returned 200 |
| `Qwen/Qwen3-Coder-30B-A3B-Instruct` | `huggingface/Qwen/Qwen3-Coder-30B-A3B-Instruct` | `qwen3-coder-30b-a3b-instruct` | returned 200 |
| `Qwen/Qwen3-Next-80B-A3B-Thinking` | `huggingface/Qwen/Qwen3-Next-80B-A3B-Thinking` | `qwen/qwen3-next-80b-a3b-thinking` | returns `reasoning_content` |
| `Qwen/Qwen3-VL-8B-Instruct` | `huggingface/Qwen/Qwen3-VL-8B-Instruct` | `qwen/qwen3-vl-8b-instruct` | returned 200 |
| `Qwen/Qwen3-VL-30B-A3B-Instruct` | `huggingface/Qwen/Qwen3-VL-30B-A3B-Instruct` | `qwen/qwen3-vl-30b-a3b-instruct` | returned 200 |
| `Qwen/Qwen3-VL-235B-A22B-Instruct` | `huggingface/Qwen/Qwen3-VL-235B-A22B-Instruct` | `qwen/qwen3-vl-235b-a22b-instruct` | returned 200 |
| `Qwen/Qwen3-VL-30B-A3B-Thinking` | `huggingface/Qwen/Qwen3-VL-30B-A3B-Thinking` | `qwen/qwen3-vl-30b-a3b-thinking` | returns `reasoning_content` |
| `Qwen/Qwen3-VL-235B-A22B-Thinking` | `huggingface/Qwen/Qwen3-VL-235B-A22B-Thinking` | `qwen/qwen3-vl-235b-a22b-thinking` | returns `reasoning_content` |
| `Qwen/Qwen3-8B` | `huggingface/Qwen/Qwen3-8B` | `Qwen/Qwen3-8B` | returns `reasoning_content`; content was null in the tiny probe |
| `Qwen/Qwen3-14B` | `huggingface/Qwen/Qwen3-14B` | `Qwen/Qwen3-14B` | returns `reasoning_content`; content was null in the tiny probe |
| `Qwen/Qwen3-32B` | `huggingface/Qwen/Qwen3-32B` | `qwen/qwen3-32b` | emitted `<think>` in `content` |
| `Qwen/Qwen3-235B-A22B` | `huggingface/Qwen/Qwen3-235B-A22B` | `qwen/qwen3-235b-a22b-fp8` | first attempt returned 500; retry returned 200 |

## Qwen Models Rejected By The Router

| Hub model | Result |
| --- | --- |
| `Qwen/Qwen3.5-0.8B` | 400 `model_not_supported` |
| `Qwen/Qwen3.5-2B` | 400 `model_not_supported` |
| `Qwen/Qwen3.5-4B` | 400 `model_not_supported` |
| `Qwen/Qwen3.5-0.8B-Base` | 400 `model_not_supported` |
| `Qwen/Qwen3.5-2B-Base` | 400 `model_not_supported` |
| `Qwen/Qwen3.5-4B-Base` | 400 `model_not_supported` |
| `Qwen/Qwen3-Coder-30B-A3B-Instruct-FP8` | 400 `model_not_supported` |
| `Qwen/Qwen3-Next-80B-A3B-Instruct` | 400 `model_not_supported` |
| `Qwen/Qwen3-Next-80B-A3B-Instruct-FP8` | 400 `model_not_supported` |
| `Qwen/Qwen3-Next-80B-A3B-Thinking-FP8` | 400 `model_not_supported` |
| `Qwen/Qwen3-Omni-30B-A3B-Instruct` | 400 `model_not_supported` |
| `Qwen/Qwen3-Omni-30B-A3B-Thinking` | 400 `model_not_supported` |
| `Qwen/Qwen3-VL-2B-Instruct` | 400 `model_not_supported` |
| `Qwen/Qwen3-VL-4B-Instruct` | 400 `model_not_supported` |
| `Qwen/Qwen3-VL-32B-Instruct` | 400 `model_not_supported` |
| `Qwen/Qwen3-VL-2B-Thinking` | 400 `model_not_supported` |
| `Qwen/Qwen3-VL-4B-Thinking` | 400 `model_not_supported` |
| `Qwen/Qwen3-VL-8B-Thinking` | 400 `model_not_supported` |
| `Qwen/Qwen3-VL-32B-Thinking` | 400 `model_not_supported` |
| `Qwen/Qwen3-0.6B` | 400 `model_not_supported` |
| `Qwen/Qwen3-1.7B` | 400 `model_not_supported` |
| `Qwen/Qwen3-4B` | 400 `model_not_supported` |
| `Qwen/Qwen3-30B-A3B` | 400 `model_not_supported` |

## Operational Notes

- Router compatibility is not the same as model quality. It only means the
  shared HF router currently accepts the model through `/v1/chat/completions`.
- Router availability can change without a HuggingClaw release. Re-run the
  probe before changing defaults or recommending paid usage.
- Qwen thinking models may return `reasoning_content`, `content: null`, or
  `<think>` blocks depending on the router provider. OpenClaw integrations
  should preserve or normalize that output deliberately.
- Models rejected as `model_not_supported` may still work through a dedicated
  Hugging Face Inference Endpoint if served by TGI or vLLM with an
  OpenAI-compatible chat API.
- A known working Gemma 4 OpenClaw setting from this probe is:

```text
OPENCLAW_MODEL=huggingface/google/gemma-4-26B-A4B-it
```
