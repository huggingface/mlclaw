# Router Model Settings Plan

Date: 2026-07-09

## Goal

ML Claw settings should dynamically load Hugging Face Router models and let the
Space admin choose exact model/provider combinations. Selected combinations
must be written into OpenClaw config so they appear in OpenClaw's model picker.

## Desired User Flow

1. Open `/mlclaw/settings`.
2. Search the Hugging Face Router catalog.
3. Check one or more model/provider rows to add them to the deployment.
4. Pick one checked row as the active model.
5. Save.
6. ML Claw writes Space variables, updates the generated OpenClaw config, and
   requests a Space restart.

## Router Source

Use the official Router model list endpoint:

```text
https://router.huggingface.co/v1/models
```

Do not scrape `https://huggingface.co/inference/models`. That page embeds the
table in Svelte hydration HTML and is not a stable integration boundary.

## Config Model

The Space runtime owns:

```text
OPENCLAW_MODEL
MLCLAW_MODEL_CHOICES
```

`OPENCLAW_MODEL` stores the active provider-pinned model reference:

```text
huggingface/Qwen/Qwen3.6-27B:deepinfra
```

`MLCLAW_MODEL_CHOICES` stores JSON for the checked model/provider rows,
including price, context window, tool support, structured-output support,
latency, and throughput when available.

## Presets

Presets are always available even if the Router catalog cannot be fetched:

- `huggingface/google/gemma-4-26B-A4B-it:deepinfra`
- `huggingface/Qwen/Qwen3.6-27B:deepinfra`

Post-merge validation on 2026-07-09 found that the earlier planned
`Qwen/Qwen3.6-35B-A3B:deepinfra` route was no longer present in the live Router
catalog. The Qwen preset was corrected to the live DeepInfra Qwen 3.6 27B row.

The Qwen preset should show:

```text
Qwen/Qwen3.6-27B
deepinfra
$0.32 input / $3.20 output
262,144 context
0.35s first-token latency
39 tokens/sec throughput
tools: yes
structured output: yes
```

## OpenClaw Config Writes

When settings are saved, ML Claw rewrites:

```text
agents.defaults.model.primary
agents.defaults.models
models.providers.huggingface
```

The Hugging Face provider points at:

```text
https://router.huggingface.co/v1
```

Each selected model/provider row becomes an explicit
`models.providers.huggingface.models[]` entry, using the provider-pinned Router
model id such as:

```text
Qwen/Qwen3.6-27B:deepinfra
```

This is what makes selected rows visible in OpenClaw's model selector.

## Validation

- Build the React control UI and bundled CLIs.
- Typecheck the TypeScript code.
- Test Router catalog parsing, settings save behavior, and generated OpenClaw
  config.
- Run the normal package and secret checks.
- Run Codex review against `main` until there are no P0/P1 findings.
