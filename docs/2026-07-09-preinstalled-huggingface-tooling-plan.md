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
  "skills": {
    "source": "https://github.com/huggingface/skills",
    "revision": "<git-sha>",
    "installed": [
      "hf-cli",
      "huggingface-spaces",
      "huggingface-datasets",
      "huggingface-local-models"
    ]
  }
}
```

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
3. seed the baseline Hugging Face Agent Skills into the OpenClaw workspace
   before the first gateway start;
4. write `.agents/.mlclaw-hf-tooling.json`;
5. start the local or Space gateway;
6. let the first state snapshot persist `.agents/skills` and the tooling
   manifest to the bucket.

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
```

should work without extra user setup.

Environment:

```text
HF_TOKEN=<Space/local secret>
HUGGINGFACE_HUB_TOKEN=<same value>
```

The agent should be able to use `hf` and `hf-discover` in normal OpenClaw tool
execution paths. These tools are part of the agent environment, not the ML Claw
settings UI.

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
- seed function writes `.agents/.mlclaw-hf-tooling.json`;
- seed function does not overwrite an existing skill folder;
- local bootstrap calls the seed function before gateway start;
- Space runtime seeds before launching OpenClaw;
- archive/snapshot tests preserve `.agents/skills` and the tooling manifest.

Runtime tests:

- container image or generated Space build exposes `hf`;
- container image or generated Space build exposes `hf-discover`;
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

Live test:

1. create `mlclaw-test`;
2. wait for the Space gateway to boot;
3. verify the OpenClaw workspace contains `.agents/skills/hf-cli/SKILL.md`;
4. verify `.agents/.mlclaw-hf-tooling.json` records the installed baseline;
5. run `hf auth whoami` inside the runtime;
6. run `hf-discover --version` inside the runtime;
7. restart the Space;
8. verify skills and tooling manifest are restored from the bucket snapshot.

## Acceptance Criteria

- Fresh ML Claw deployments start with Hugging Face CLI installed.
- Fresh ML Claw deployments start with `hf-discover` installed.
- Fresh ML Claw deployments start with baseline Hugging Face Agent Skills
  installed.
- The user does not need to run a separate tool or skill installation command.
- The first durable bucket snapshot preserves the preinstalled workspace skills
  and tooling manifest.
- Existing user-modified skill folders are not overwritten.
- Tooling and skill bundle contents are pinned and reproducible.
