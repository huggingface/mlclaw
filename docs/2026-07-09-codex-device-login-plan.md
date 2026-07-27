# OpenAI Device Login and Native Provider Plan

Date: 2026-07-09

Status: device login and encrypted credential staging are implemented; direct native OpenAI profile integration is planned

## Goal

ML Claw lets an administrator connect a ChatGPT account to one deployment through OpenAI's device-code flow. MLClaw then imports that credential into OpenClaw's native private `openai` OAuth profile so OpenClaw can discover account models, call OpenAI directly, refresh credentials, and use ordinary `openai/*` model references.

The target design has no custom `mlclaw-codex` provider and no MLClaw proxy for model discovery or inference. It requires no OpenClaw source changes.

## Device Login

ML Claw implements the device-code protocol directly over HTTPS:

1. Request a device and user code from `https://auth.openai.com/api/accounts/deviceauth/usercode`.
2. Show `https://auth.openai.com/codex/device` and the one-time user code.
3. Poll `https://auth.openai.com/api/accounts/deviceauth/token` until approval or the 15-minute deadline.
4. Exchange the returned authorization code and verifier at `https://auth.openai.com/oauth/token`.
5. Validate that the access-token JWT contains a ChatGPT account id and expiry.
6. Encrypt the normalized OAuth credential into the selected deployment's private bucket as staging data.
7. Restart the deployment runtime so it can import the credential into OpenClaw's native auth store.

The implementation follows the OpenAI OAuth flow in Pi's MIT-licensed `packages/ai/src/auth/oauth/openai-codex.ts`. ML Claw owns the small protocol implementation locally, so installing ML Claw does not pull in Pi or Codex.

## Commands

```bash
mlclaw credentials codex login <agent>
mlclaw credentials codex status <agent>
mlclaw credentials codex logout <agent>
```

`login` prints only the verification URL, one-time user code, progress, and completion status. It never prints access or refresh tokens.

`status` reports whether the deployment has the managed native OpenAI OAuth profile or a pending encrypted credential import. It does not return account tokens.

`logout` writes an authoritative revocation marker, removes pending encrypted credentials and the managed OpenClaw OAuth profile, and restarts the deployment. It must not affect unrelated OpenAI API-key or OAuth profiles.

## Credential Ownership and Migration

The encrypted credential object currently lives at:

```text
<state-prefix>/.mlclaw/codex-auth.enc
```

Logout first writes:

```text
<state-prefix>/.mlclaw/codex-auth.revoked
```

On startup, MLClaw validates and imports the encrypted deployment credential into a managed native OpenClaw OAuth profile such as `openai:mlclaw`. OpenClaw's private auth profile becomes the canonical runtime credential and owns refresh-token rotation. The encrypted object remains the deployment control record used by CLI status, logout, bucket adoption, and recovery; startup never overwrites a newer matching native profile with an older encrypted record.

Migration must:

- preserve unrelated auth profiles and profile ordering;
- atomically write the managed profile with restrictive permissions and the OpenClaw runtime uid/gid;
- refuse to overwrite a newer valid native profile with an older staged credential;
- keep the encrypted control record out of the runtime request path after import;
- keep the revocation marker authoritative if logout races with import;
- import `goept`'s existing encrypted credential without requiring another login;
- preserve deployment and bucket adoption behavior.

The native OpenClaw auth store is an explicitly accepted trust boundary for this direct design. OAuth credentials must still never appear in browser responses, logs, repositories, Space variables, model configuration, or workspace files.

## Native OpenAI Provider

When the managed OAuth profile exists, MLClaw configures only OpenClaw's native `openai` provider and native `openai/*` model references. OpenClaw owns account model discovery, model metadata, parsing, the ChatGPT Responses transport, authentication, and refresh.

MLClaw must:

- remove the custom `mlclaw-codex` provider and hardcoded GPT-5.4 model definition;
- remove internal Codex JWTs, random capabilities, SecretRefs, proxy routes, and upstream forwarding;
- remove `/backend-api/codex/models` and `/backend-api/codex/responses`;
- rewrite generated and persisted `mlclaw-codex/gpt-5.4` references to `openai/gpt-5.4`;
- populate model selection from OpenClaw's native account catalog rather than maintaining a second catalog;
- preserve an independent normal OpenAI API-key profile when configured;
- send all OpenAI model discovery and inference traffic directly from OpenClaw to OpenAI.

No OpenClaw fork, patch, issue, or pull request is part of this design.

## Security Requirements

- Validate every OpenAI device-login response before using it.
- Enforce the 15-minute login deadline and OpenAI's polling interval.
- Never convert ChatGPT OAuth into `OPENAI_API_KEY`.
- Never import a user's global Pi or Codex auth file automatically.
- Never install or execute `@openai/codex`.
- Keep credentials scoped to one canonical deployment identity.
- Write native auth profiles atomically with restrictive ownership and permissions.
- Preserve unrelated OpenClaw auth profiles.
- Make logout authoritative over pending import work.
- Never log profile contents, access tokens, refresh tokens, account ids, or encryption keys.

## Tests

Coverage must verify:

- device-code request, polling, slow-down handling, token exchange, timeout, cancellation, malformed payloads, and bounded errors;
- account-id and expiry extraction from access-token JWTs;
- no Codex binary or npm package dependency;
- atomic native profile import, permissions, unrelated-profile preservation, and failed-import recovery;
- migration from the encrypted staging object without another login;
- logout/import races and authoritative revocation;
- bucket migration and cleanup;
- hard removal of the custom provider and every proxy route or capability;
- native `openai/*` model selection and persisted-session migration;
- coexistence of ChatGPT OAuth and normal OpenAI API-key profiles;
- login/logout runtime restart behavior;
- generated Dockerfiles and release metadata contain no Codex installation.

Live acceptance requires:

1. Upgrade a deployment that already has an encrypted MLClaw OpenAI credential.
2. Confirm the credential imports into the native OpenClaw profile without another login.
3. Confirm OpenClaw contacts OpenAI directly and does not send Codex traffic to MLClaw loopback routes.
4. Confirm every account-visible `openai/*` model appears, including `openai/gpt-5.6-sol` when entitled.
5. Complete real responses with GPT-5.6 Sol and at least one additional discovered model.
6. Verify an independent OpenAI API-key profile still uses the Platform route.
7. Exercise OAuth refresh, restart the Space, and repeat discovery and inference.
8. Logout and confirm the managed OAuth profile disappears without affecting API-key profiles.
9. Scan logs and persisted files for credential leakage.

## Non-Goals

- Modifying OpenClaw source code.
- Running an MLClaw proxy for OpenAI model discovery or inference.
- Installing or wrapping the Codex CLI.
- Running a Codex subprocess or app server.
- Treating ChatGPT OAuth as an OpenAI API key.
- Keeping a compatibility `mlclaw-codex` provider or alias.
- Enabling OpenAI embeddings; ChatGPT subscription OAuth covers model responses, not embeddings.
- Shipping the future browser account UI in this phase.
