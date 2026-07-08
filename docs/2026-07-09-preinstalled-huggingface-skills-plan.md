# Preinstalled Hugging Face Skills Plan

Status: proposed

## Goal

Every fresh ML Claw deployment should start with useful Hugging Face skills
already installed in the OpenClaw workspace.

This is not a settings UI feature and not a separate required setup step. A
user who creates a Space and bucket with `mlclaw bootstrap` should be able to
open the agent for the first time and already have Hugging Face skills in
context.

## Source

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

Seed skills into the OpenClaw workspace:

```text
workspace/.agents/skills/<skill-name>/SKILL.md
workspace/.agents/skills/<skill-name>/...
```

Record the pinned source revision:

```text
workspace/.agents/skills/.mlclaw-hf-skills.json
```

Manifest shape:

```json
{
  "schemaVersion": 1,
  "source": "https://github.com/huggingface/skills",
  "revision": "<git-sha>",
  "installedAt": "2026-07-09T00:00:00.000Z",
  "skills": [
    "hf-cli",
    "huggingface-spaces",
    "huggingface-datasets",
    "huggingface-local-models"
  ]
}
```

## Bootstrap Behavior

For a new deployment:

1. create or verify the private Storage Bucket;
2. seed the baseline Hugging Face skills into the OpenClaw workspace before
   the first gateway start;
3. start the local or Space gateway;
4. let the first state snapshot persist `.agents/skills` to the bucket.

For local gateway mode, seed into the local live workspace before Docker start.

For Space gateway mode, seed inside the Space live workspace before launching
OpenClaw.

For existing buckets or existing local deployments, do not overwrite
user-modified skill folders during normal bootstrap. Missing baseline skill
folders may be added only when the target folder does not exist.

## Packaging Strategy

ML Claw should not fetch arbitrary unpinned skill contents at runtime.

Preferred implementation:

- vendor or generate a pinned baseline skill bundle during ML Claw release;
- include the bundle in the npm package and generated Space runtime files;
- write the pinned source revision into the manifest file.

This keeps bootstrap deterministic and avoids network dependence at Space boot.

If the baseline bundle is refreshed, that should be a normal ML Claw code
change with review, tests, and a new release.

## Update Behavior

`mlclaw update <owner/space>` should update generated Space runtime files only.
It must not mutate bucket workspace skills.

`mlclaw doctor --fix` may restore missing baseline skills when:

- the deployment is recognized as ML Claw;
- the workspace is accessible;
- the target skill folder is absent;
- existing skill folders are not overwritten.

Future explicit commands can manage skills:

```bash
mlclaw skills status <agent>
mlclaw skills restore-baseline <agent>
```

Do not make users run those commands for the default path.

## Tests

Unit tests:

- baseline bundle contains every required skill;
- every bundled skill has `SKILL.md`;
- seed function creates `.agents/skills/<skill-name>`;
- seed function writes `.mlclaw-hf-skills.json`;
- seed function does not overwrite an existing skill folder;
- local bootstrap calls the seed function before gateway start;
- Space runtime seeds before launching OpenClaw;
- archive/snapshot tests preserve `.agents/skills`.

Package tests:

- npm package includes the baseline skill bundle;
- generated Space files include the baseline skill bundle or the runtime code
  needed to seed it.

Live test:

1. create `mlclaw-test`;
2. wait for the Space gateway to boot;
3. verify the OpenClaw workspace contains `.agents/skills/hf-cli/SKILL.md`;
4. verify `.mlclaw-hf-skills.json` records the pinned revision;
5. restart the Space;
6. verify skills are restored from the bucket snapshot.

## Acceptance Criteria

- Fresh ML Claw deployments start with baseline Hugging Face skills already
  installed.
- The user does not need to run a separate skill installation command.
- The first durable bucket snapshot preserves the preinstalled skills.
- Existing user-modified skill folders are not overwritten.
- Skill bundle contents are pinned and reproducible.
