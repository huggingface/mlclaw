# Codex Device Login and Provider Plan

Date: 2026-07-09

Status: implemented for CLI-managed deployment credentials and automatic OpenClaw provider activation; browser UI remains future work

## Goal

ML Claw lets an administrator connect a ChatGPT account to one deployment through OpenAI's Codex device-code flow. After login, Codex appears automatically as a selectable OpenClaw provider and survives runtime restarts.

The flow does not require a local Codex installation or a Codex binary in the ML Claw runtime. OpenClaw never receives the OpenAI access token, refresh token, encrypted credential object, or deployment encryption key.

## Device Login

ML Claw implements the device-code protocol directly over HTTPS:

1. Request a device and user code from `https://auth.openai.com/api/accounts/deviceauth/usercode`.
2. Show `https://auth.openai.com/codex/device` and the one-time user code.
3. Poll `https://auth.openai.com/api/accounts/deviceauth/token` until approval or the 15-minute deadline.
4. Exchange the returned authorization code and verifier at `https://auth.openai.com/oauth/token`.
5. Validate that the access-token JWT contains a ChatGPT account id and expiry.
6. Encrypt the normalized OAuth credential into the selected deployment's private bucket.
7. Restart the deployment runtime so the provider appears without manual configuration.

The implementation follows the OpenAI Codex OAuth flow in Pi's MIT-licensed `packages/ai/src/auth/oauth/openai-codex.ts`. ML Claw owns the small protocol implementation locally, so installing ML Claw does not pull in Pi or Codex.

## Commands

```bash
mlclaw credentials codex login <agent>
mlclaw credentials codex status <agent>
mlclaw credentials codex logout <agent>
```

`login` prints only the verification URL, one-time user code, progress, and completion status. It never prints access or refresh tokens.

`status` reports whether the selected deployment has an encrypted credential and when it was updated. It does not return account tokens.

`logout` writes an authoritative revocation marker, deletes the encrypted credential, and restarts the deployment so the provider is removed.

## Credential Persistence

The encrypted credential object lives at:

```text
<state-prefix>/.mlclaw/codex-auth.enc
```

Logout first writes:

```text
<state-prefix>/.mlclaw/codex-auth.revoked
```

The encryption key is derived from `MLCLAW_CREDENTIAL_KEY` with provider-specific HKDF context. AES-256-GCM additional authenticated data binds the object to the deployment id, bucket, and state prefix. Moving deployment state to another bucket decrypts and re-encrypts the credential for the new authenticated context before deleting the old copy.

The runtime refreshes expiring OAuth credentials inside the trusted ML Claw process and writes rotated credentials back to the encrypted object. Refresh persistence uses optimistic comparison so an old runtime cannot overwrite a newer login. The revocation marker remains authoritative if logout races with refresh.

Never store raw OAuth credentials in:

- the Space repository;
- Space variables or secrets;
- OpenClaw config, environment, workspace, or state snapshots;
- browser responses;
- logs;
- unencrypted bucket objects.

## Trusted Provider Boundary

When encrypted credentials are available, ML Claw configures OpenClaw's native `openai` provider with a trusted loopback Codex base URL. OpenClaw retains its own account-filtered catalog parser, `openai/*` model ids, metadata, reasoning controls, and ChatGPT Responses transport.

OpenClaw sends the loopback endpoint an opaque random capability through a managed token profile whose persisted credential is only a SecretRef to `MLCLAW_CODEX_PROXY_TOKEN`. The capability is created once per ML Claw runtime, is never persisted, and is not an OpenAI credential. A separate SecretRef-backed `OPENAI_API_KEY` profile remains available for explicitly selected Platform routes.

The trusted proxy:

- accepts only exact loopback `GET /backend-api/codex/models` and `POST /backend-api/codex/responses` routes;
- authenticates the runtime capability with constant-time comparison;
- forwards the account-filtered model catalog without maintaining a second parser or hardcoded model list;
- forces Responses streaming and `store: false`;
- loads and decrypts the deployment credential in the trusted process;
- refreshes the OAuth credential when needed and persists token rotation;
- adds the real OpenAI bearer token and ChatGPT account id only on the upstream request;
- streams the upstream response back to OpenClaw;
- retries once with a forced refresh after an upstream `401`.

OpenClaw uses its native OpenAI provider with the ordinary OpenClaw agent runtime. No Codex subprocess, app server, shell tool, or workspace access is introduced.

## Security Requirements

- Validate every OpenAI response before using it.
- Bound login and provider request bodies and sanitize upstream errors.
- Enforce the 15-minute login deadline and OpenAI's polling interval.
- Never convert ChatGPT OAuth into `OPENAI_API_KEY`.
- Never import a user's global Pi or Codex auth file automatically.
- Never install or execute `@openai/codex`.
- Keep credentials scoped to one canonical deployment identity.
- Treat the encrypted bucket object and revocation marker as authoritative.
- Give OpenClaw only the narrow loopback provider capability, never OAuth material.
- Remove the provider automatically when credentials are absent or revoked.

## Browser Follow-up

A future admin-only browser flow may expose structured start, status, cancellation, and logout routes. It should show the verification URL and user code, enforce one active login, require CSRF protection, and never return token material.

## Tests

Coverage verifies:

- device-code request, polling, slow-down handling, token exchange, timeout, cancellation, malformed payloads, and bounded errors;
- account-id and expiry extraction from access-token JWTs;
- no Codex binary or npm package dependency;
- encrypted credential round trips, refresh rotation, optimistic refresh races, and revocation;
- bucket migration and cleanup;
- loopback provider authentication, request bounds, account-catalog forwarding, forced `store: false`, streaming, and `401` refresh retry;
- native OpenAI provider routing and removal when Codex credentials are unavailable;
- login/logout runtime restart behavior;
- generated Dockerfiles and release metadata contain no Codex installation.

Live acceptance requires:

1. Login to a deployment.
2. Deploy the updated bundled runtime.
3. Confirm startup reports `Native OpenAI Codex routing enabled`.
4. Confirm all account-visible `openai/*` models appear in OpenClaw's model picker, including `openai/gpt-5.6-sol` when entitled.
5. Select a discovered model and complete a real response.
6. Restart the Space and repeat the response without logging in again.
7. Logout and confirm the provider disappears after restart.

## Non-Goals

- Installing or wrapping the Codex CLI.
- Running a Codex subprocess or app server.
- Passing OAuth tokens to OpenClaw.
- Treating ChatGPT OAuth as an OpenAI API key.
- Enabling OpenAI embeddings; Codex subscription OAuth covers model responses, not embeddings.
- Shipping the future browser account UI in this phase.
