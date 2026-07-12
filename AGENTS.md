# AGENTS.md

These instructions apply to this repository.

## Quality Gates

This repository follows the TypeScript standards enforced by Slophammer.
Before finishing a change, run formatting, lint, typecheck, tests, coverage,
build, secret scanning, package validation, and both Slophammer checks.

Do not run mutation testing during ordinary implementation work. Keep its
configuration and CI declaration current so a dedicated mutation run can be
performed separately.

## Runtime Boundary

- Treat the OpenClaw process and agent account as untrusted.
- Keep Hugging Face, broker operator, OAuth, session, and encryption secrets in
  the trusted backend only.
- Browser routes may call only fixed typed broker operations.
- Do not add arbitrary HTTP forwarding to broker, Hub, or operator APIs.
- Validate unknown file, network, OAuth, and broker payloads at their boundary.
- Generated runtime bundles and control UI assets must match their source.
- Until BrokerKit's first public release, consume only its version 1 wire APIs,
  persisted state formats, plan schemas, manifests, and protocols. Do not
  synthesize broker-owned state files or add v0/v2 compatibility behavior;
  let each broker initialize its own v1 state after a coordinated cutover.

## TypeScript

- Keep strict compiler settings enabled.
- Do not add explicit `any` or unsafe type operations.
- Keep functions below the configured complexity limit.
- Add focused tests for every security or lifecycle behavior change.
