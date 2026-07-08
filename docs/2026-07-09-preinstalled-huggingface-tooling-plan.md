# Preinstalled Hugging Face Tooling Plan

Status: proposed

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

Authentication should come from the deployment environment:

```text
HF_TOKEN
HUGGINGFACE_HUB_TOKEN
```

Do not ask the user to run `hf auth login` inside the Space. The Space already
has an `HF_TOKEN` secret managed by ML Claw.

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
```

These cover the default ML Claw use case: Hub CLI operations, Spaces, datasets,
buckets, and local model discovery.

## Workspace Layout

Seed Agent Skills into the OpenClaw workspace:

```text
workspace/.agents/skills/<skill-name>/SKILL.md
workspace/.agents/skills/<skill-name>/...
```

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
      "huggingface-local-models"
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

```text
transformers
datasets
timm
pillow
opencv-python-headless
```

### Diffusion Pack

For image generation and diffusion workflows:

```text
diffusers
transformers
accelerate
safetensors
pillow
```

### Evaluation Pack

For model and agent evaluation:

```text
lighteval
inspect-ai
evaluate
```

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
- install Python CLI tooling into the runtime image or a deterministic runtime
  tool environment;
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
5. seed the HF MCP config stub and workspace examples;
6. write `.agents/.mlclaw-hf-tooling.json`;
7. start the local or Space gateway;
8. let the first state snapshot persist `.agents/skills`, templates, examples,
   and the tooling manifest to the bucket.

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
hf auth whoami
hf-discover --version
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
- every bundled skill has `SKILL.md`;
- seed function creates `.agents/skills/<skill-name>`;
- seed function creates `.agents/mcp/huggingface.json`;
- seed function creates `examples/huggingface/`;
- seed function writes `.agents/.mlclaw-hf-tooling.json`;
- seed function does not overwrite an existing skill folder;
- local bootstrap calls the seed function before gateway start;
- Space runtime seeds before launching OpenClaw;
- archive/snapshot tests preserve `.agents/skills` and the tooling manifest.

Runtime tests:

- container image or generated Space build exposes `hf`;
- container image or generated Space build exposes `hf-discover`;
- runtime imports `huggingface_hub`, `datasets`, and `safetensors`;
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
4. verify `.agents/.mlclaw-hf-tooling.json` records the installed baseline;
5. run `hf auth whoami` inside the runtime;
6. run `hf-discover --version` inside the runtime;
7. run `python -c "import datasets, safetensors; from huggingface_hub import HfApi"`;
8. verify `.agents/mcp/huggingface.json` and `examples/huggingface/` exist;
9. restart the Space;
10. verify skills, templates, examples, and tooling manifest are restored from
    the bucket snapshot.

## Acceptance Criteria

- Fresh ML Claw deployments start with Hugging Face CLI installed.
- Fresh ML Claw deployments start with `hf-discover` installed.
- Fresh ML Claw deployments start with `huggingface_hub`, `datasets`, and
  `safetensors` importable.
- Fresh ML Claw deployments start with baseline Hugging Face Agent Skills
  installed.
- Fresh ML Claw deployments include an HF MCP config stub and HF examples.
- The user does not need to run a separate tool or skill installation command.
- The default baseline does not install heavy training packages such as `trl`;
  those belong to optional packs.
- The first durable bucket snapshot preserves the preinstalled workspace skills,
  examples, MCP stub, and tooling manifest.
- Existing user-modified skill folders are not overwritten.
- Tooling and skill bundle contents are pinned and reproducible.
