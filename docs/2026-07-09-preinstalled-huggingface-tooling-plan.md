# Preinstalled Hugging Face Tooling Plan

Status: implemented

## Goal

Every fresh ML Claw deployment should start as a Hugging Face-ready OpenClaw
environment.

This is not a settings UI feature and not a separate required setup step. A
user who creates a Space and bucket with `mlclaw bootstrap` should be able to
open the agent for the first time and already have the core Hugging Face tools
available.

The baseline includes:

- Hugging Face CLI (`hf`) installed on `PATH`;
- `hf-discover` installed on `PATH`;
- `uv` installed on `PATH` for isolated Python tool execution and `uvx`
  helpers;
- lightweight Hugging Face Python libraries available for agent-written
  scripts;
- an HF MCP configuration stub for future MCP-capable runtimes;
- HF-ready workspace templates and examples;
- official Hugging Face Agent Skills preinstalled in the OpenClaw workspace;
- runtime environment variables wired so those tools authenticate through the
  deployment's existing `HF_TOKEN`.

## Required Tooling

### Hugging Face CLI

The `hf` CLI must be available in both local gateway and Space gateway
deployments.

Expected commands:

```bash
hf auth whoami
hf repos list
hf buckets list
hf upload --help
hf spaces --help
```

Authentication should not assume a broad Hub token exists inside app Spaces:

```text
HF_TOKEN=<optional narrow token only>
HUGGINGFACE_HUB_TOKEN=<optional narrow token only>
```

Do not ask the user to run `hf auth login` inside the Space. The default Space
gateway path keeps the user's broad Hugging Face token on the local machine;
state sync uses the mounted bucket volume instead of Hub API credentials.

### hf-discover

Install `hf-discover` from:

```text
https://github.com/huggingface/hf-discover
```

`hf-discover` is the Agent Resource Discovery client/server project for
searching and navigating ARD-compatible registries. Its README documents both:

```bash
hf discover "help me train a model" --json
hf-discover search "generate image" --kind skill --json
```

ML Claw should make the client path available to the agent. The minimum
acceptance target is:

```bash
hf-discover --version
hf-discover search "train a model" --kind skill --json
```

If the installed Hugging Face CLI exposes the `hf discover` command, verify
that too:

```bash
hf discover "help me train a model" --json
```

### Python SDK And Lightweight Libraries

The default runtime should include lightweight Hugging Face Python libraries
that agents commonly use for Hub automation and dataset work:

```text
huggingface_hub
datasets
safetensors
```

Expected smoke checks:

```bash
python -c "from huggingface_hub import HfApi; print(HfApi().whoami())"
python -c "import datasets, safetensors"
```

`huggingface_hub` provides the Python API for Hub resources and includes the
`hf` CLI. `datasets` makes dataset inspection and publishing practical without
manual setup. `safetensors` is lightweight and useful for inspecting model
artifacts and checkpoints.

The default runtime should also include `uv` so agents can run isolated Python
tools without mutating the base environment. This is required by skills such as
`hf-mem`, which runs through `uvx`.

Expected smoke checks:

```bash
uv --version
uvx --help
```

Do not include heavy training libraries in the default baseline.

Specifically, these should be optional packs, not default installs:

```text
torch
transformers
accelerate
trl
peft
diffusers
sentence-transformers
bitsandbytes
evaluate
lighteval
inspect-ai
```

### HF MCP Configuration Stub

Ship a ready-to-use MCP configuration stub for the official Hugging Face MCP
Server, but do not require the MCP server to be active for the default
OpenClaw gateway path.

The stub should live in the workspace so future MCP-capable OpenClaw runtimes
or compatible agents can enable it without rediscovering the config:

```text
workspace/.agents/mcp/huggingface.json
```

It should reference the official Hugging Face MCP endpoint and use environment
authentication, not embedded tokens.

### Workspace Templates

Seed HF-oriented workspace examples and notes:

```text
workspace/examples/huggingface/
workspace/.env.example
```

Useful examples:

- create or update a dataset repository;
- upload files to a dataset/model/Space;
- sync files to a Storage Bucket;
- run a basic `hf-discover` search;
- inspect the configured model/provider.

These are examples for the agent to read or reuse. They must not contain
secrets.

### Hugging Face Agent Skills

Use the official Hugging Face skills repository:

```text
https://github.com/huggingface/skills
```

Initial baseline skills:

```text
hf-cli
huggingface-spaces
huggingface-datasets
huggingface-local-models
huggingface-best
hf-mem
huggingface-tool-builder
huggingface-papers
huggingface-gradio
huggingface-zerogpu
```

These cover the default ML Claw use case: Hub CLI operations, Spaces, datasets,
buckets, local model discovery, model selection, memory sizing, reusable Hub
API scripts, paper lookup, Gradio demos, and ZeroGPU-aware Space development.

These skills are instructions and examples. Including them in the default
workspace must not imply that heavy runtime packages such as `torch`,
`transformers`, `diffusers`, or `trl` are installed by default.

Do not include these specialized skills in the default baseline:

```text
hf-cloud-aws-context-discovery
hf-cloud-python-env-setup
hf-cloud-sagemaker-deployment-planner
hf-cloud-sagemaker-iam-preflight
hf-cloud-sagemaker-production-defaults
hf-cloud-serving-image-selection
huggingface-community-evals
huggingface-llm-trainer
huggingface-lora-space-builder
huggingface-paper-publisher
huggingface-trackio
huggingface-vision-trainer
train-sentence-transformers
transformers-js
trl-training
```

Those belong to explicit optional packs because they either assume AWS,
training/evaluation dependencies, JavaScript inference dependencies, or a more
specialized publishing/demo workflow.

## Workspace Layout

Seed Agent Skills into the OpenClaw workspace:

```text
workspace/.agents/skills/<skill-name>/SKILL.md
workspace/.agents/skills/<skill-name>/...
```

Also mirror the same baseline skills into OpenClaw's canonical workspace skill
directory:

```text
workspace/skills/<skill-name>/SKILL.md
workspace/skills/<skill-name>/...
```

This is intentional duplication. `.agents/skills` preserves the Agent Skills
layout used by Codex/Claude-style agents. `skills` is OpenClaw's most direct
workspace skill root and makes the skills show up in OpenClaw's skill snapshot
without relying on an agent knowing the `.agents` convention.

The runtime config must pin OpenClaw's default workspace to the live ML Claw
workspace:

```json
{
  "agents": {
    "defaults": {
      "workspace": "${OPENCLAW_WORKSPACE_DIR}"
    }
  }
}
```

Seed a managed context block into:

```text
workspace/AGENTS.md
```

The managed block tells the agent that Hugging Face tooling is already
available, names the preinstalled skills, and points to the skill roots. The
block is bracketed by ML Claw HTML comments and may be replaced on future
runtime starts, but user-authored content outside the block is preserved.

Record the pinned source revision and installed tooling:

```text
workspace/.agents/.mlclaw-hf-tooling.json
```

Manifest shape:

```json
{
  "schemaVersion": 1,
  "installedAt": "2026-07-09T00:00:00.000Z",
  "tools": {
    "hf": {
      "package": "huggingface_hub",
      "version": "<version>"
    },
    "hfDiscover": {
      "package": "hf-discover",
      "version": "<version>",
      "source": "https://github.com/huggingface/hf-discover",
      "revision": "<git-sha-or-package-version>"
    }
  },
  "python": {
    "packages": {
      "huggingface_hub": "<version>",
      "datasets": "<version>",
      "safetensors": "<version>"
    }
  },
  "skills": {
    "source": "https://github.com/huggingface/skills",
    "revision": "<git-sha>",
    "installed": [
      "hf-cli",
      "huggingface-spaces",
      "huggingface-datasets",
      "huggingface-local-models",
      "huggingface-best",
      "hf-mem",
      "huggingface-tool-builder",
      "huggingface-papers",
      "huggingface-gradio",
      "huggingface-zerogpu"
    ]
  },
  "templates": {
    "mcpConfig": "workspace/.agents/mcp/huggingface.json",
    "examples": "workspace/examples/huggingface"
  }
}
```

## Optional Tooling Packs

Optional packs can be added later, but they should not ship in the default
gateway runtime until users explicitly request them.

### Training Pack

For model fine-tuning and RLHF-style work:

Skills:

```text
huggingface-llm-trainer
trl-training
train-sentence-transformers
huggingface-trackio
```

Packages:

```text
transformers
datasets
accelerate
trl
peft
safetensors
evaluate
```

CUDA-specific variants may also include:

```text
bitsandbytes
```

### Vision Pack

For image classification, object detection, segmentation, and model demos:

Skills:

```text
huggingface-vision-trainer
```

Packages:

```text
transformers
datasets
timm
pillow
opencv-python-headless
```

### Diffusion Pack

For image generation and diffusion workflows:

Skills:

```text
huggingface-lora-space-builder
```

Packages:

```text
diffusers
transformers
accelerate
safetensors
pillow
```

### Evaluation Pack

For model and agent evaluation:

Skills:

```text
huggingface-community-evals
```

Packages:

```text
lighteval
inspect-ai
evaluate
```

### Research Publishing Pack

For publishing and managing paper pages around models, datasets, and research
artifacts:

```text
huggingface-paper-publisher
```

This should stay optional because publishing workflows can mutate public Hub
metadata and are less central than reading/searching papers.

### JavaScript Inference Pack

For browser or Node.js inference with Transformers.js:

Skills:

```text
transformers-js
```

Packages:

```text
@huggingface/transformers
```

### AWS SageMaker Pack

For users who explicitly want AWS or SageMaker deployment help:

```text
hf-cloud-aws-context-discovery
hf-cloud-python-env-setup
hf-cloud-sagemaker-deployment-planner
hf-cloud-sagemaker-iam-preflight
hf-cloud-sagemaker-production-defaults
hf-cloud-serving-image-selection
```

This pack must never be installed by default. It assumes AWS credentials,
regions, IAM roles, quotas, and cloud billing outside Hugging Face.

Pack selection can later be exposed through CLI flags or settings:

```bash
mlclaw bootstrap --pack training
mlclaw tooling install-pack training
```

The default plan intentionally excludes these packs to keep Space builds
smaller, startup faster, and gateway deployments focused.

## Installation Strategy

ML Claw should not fetch arbitrary unpinned content at Space boot.

Preferred implementation:

- build or vendor a pinned Hugging Face tooling bundle during ML Claw release;
- include baseline Agent Skills in the npm package and generated Space runtime
  files;
- install Python CLI tooling and `uv` into the runtime image or a deterministic
  runtime tool environment;
- write the tooling manifest into the workspace before OpenClaw starts.

For Space deployments, the strongest long-term option is to include `hf` and
`hf-discover` in the ML Claw runtime image or generated Docker build, not to
install them dynamically at each boot.

For local gateway deployments, the Docker image should already contain the same
tools so local and Space behavior match.

If the baseline bundle is refreshed, that should be a normal ML Claw code
change with review, tests, and a new release.

## Bootstrap Behavior

For a new deployment:

1. create or verify the private Storage Bucket;
2. ensure `hf` and `hf-discover` are available in the gateway runtime;
3. ensure default Python packages are importable;
4. seed the baseline Hugging Face Agent Skills into the OpenClaw workspace
   before the first gateway start;
5. mirror the baseline Hugging Face Agent Skills into both `.agents/skills`
   and `skills`;
6. seed the HF MCP config stub, workspace examples, and managed `AGENTS.md`
   context block;
7. write `.agents/.mlclaw-hf-tooling.json`;
8. start the local or Space gateway;
9. let the first state snapshot persist `.agents/skills`, `skills`,
   `AGENTS.md`, templates, examples, and the tooling manifest to the bucket.

For local gateway mode, seed into the local live workspace before Docker start.

For Space gateway mode, seed inside the Space live workspace before launching
OpenClaw.

For existing buckets or existing local deployments:

- do not overwrite user-modified skill folders during normal bootstrap;
- add missing baseline skill folders only when the target folder is absent;
- update the tooling manifest only when ML Claw changes the baseline tooling.

## Runtime Contract

Inside an ML Claw gateway runtime:

```bash
which hf
which hf-discover
which uv
hf auth whoami
hf-discover --version
uv --version
python -c "import datasets, safetensors; from huggingface_hub import HfApi"
```

should work without extra user setup.

Environment:

```text
HF_TOKEN=<Space/local secret>
HUGGINGFACE_HUB_TOKEN=<same value>
```

The agent should be able to use `hf`, `hf-discover`, the Python SDK, and the
seeded examples in normal OpenClaw tool execution paths. These tools are part
of the agent environment, not the ML Claw settings UI.

## Update Behavior

`mlclaw update <owner/space>` updates generated Space runtime files. It should
not mutate bucket workspace skills unless the user explicitly asks for a
baseline tooling repair.

`mlclaw doctor --fix` may restore missing baseline tooling when:

- the deployment is recognized as ML Claw;
- the workspace is accessible;
- the target skill folder is absent;
- existing skill folders are not overwritten;
- the runtime image/build declares support for the required CLI tools.

Future explicit commands can manage the baseline:

```bash
mlclaw tooling status <agent>
mlclaw tooling restore-baseline <agent>
```

Do not make users run those commands for the default path.

## Tests

Unit tests:

- baseline bundle contains every required skill;
- baseline bundle excludes optional pack-only skills;
- every bundled skill has `SKILL.md`;
- seed function creates `.agents/skills/<skill-name>`;
- seed function creates `skills/<skill-name>`;
- seed function creates or updates the managed ML Claw block in `AGENTS.md`;
- seed function creates `.agents/mcp/huggingface.json`;
- seed function creates `examples/huggingface/`;
- seed function writes `.agents/.mlclaw-hf-tooling.json`;
- seed function does not overwrite an existing skill folder;
- seed function does not delete user-authored `AGENTS.md` content;
- local bootstrap calls the seed function before gateway start;
- Space runtime seeds before launching OpenClaw;
- archive/snapshot tests preserve `.agents/skills`, `skills`, `AGENTS.md`,
  and the tooling manifest.

Runtime tests:

- container image or generated Space build exposes `hf`;
- container image or generated Space build exposes `hf-discover`;
- runtime imports `huggingface_hub`, `datasets`, and `safetensors`;
- `uv --version` succeeds;
- `hf auth whoami` uses `HF_TOKEN`;
- `hf-discover --version` succeeds;
- `hf-discover search "train a model" --kind skill --json` succeeds or fails
  with a clear network/service error, not a missing-command error;
- `hf discover ...` is probed when available.

Package tests:

- npm package includes the baseline skill bundle;
- generated Space files include the baseline skill bundle or runtime code
  needed to seed it;
- generated Docker/runtime files install or provide `hf` and `hf-discover`.
- generated Docker/runtime files install default Python packages without
  installing optional training packs.

Live test:

1. create `mlclaw-test`;
2. wait for the Space gateway to boot;
3. verify the OpenClaw workspace contains `.agents/skills/hf-cli/SKILL.md`;
4. verify the OpenClaw workspace contains `skills/hf-cli/SKILL.md`;
5. verify `AGENTS.md` names the Hugging Face skills and their locations;
6. verify `.agents/.mlclaw-hf-tooling.json` records the installed baseline;
7. run `hf auth whoami` inside the runtime;
8. run `hf-discover --version` inside the runtime;
9. run `python -c "import datasets, safetensors; from huggingface_hub import HfApi"`;
10. verify `.agents/mcp/huggingface.json` and `examples/huggingface/` exist;
11. restart the Space;
12. verify skills, templates, examples, `AGENTS.md`, and tooling manifest are
    restored from the bucket snapshot.

## Acceptance Criteria

- Fresh ML Claw deployments start with Hugging Face CLI installed.
- Fresh ML Claw deployments start with `hf-discover` installed.
- Fresh ML Claw deployments start with `uv` installed.
- Fresh ML Claw deployments start with `huggingface_hub`, `datasets`, and
  `safetensors` importable.
- Fresh ML Claw deployments start with baseline Hugging Face Agent Skills
  installed.
- Fresh ML Claw deployments include an HF MCP config stub and HF examples.
- The user does not need to run a separate tool or skill installation command.
- The default baseline does not install heavy training packages such as `trl`
  and does not install training, evaluation, JavaScript inference, or AWS
  SageMaker skills; those belong to optional packs.
- The first durable bucket snapshot preserves the preinstalled workspace skills,
  examples, MCP stub, and tooling manifest.
- Existing user-modified skill folders are not overwritten.
- Tooling and skill bundle contents are pinned and reproducible.
