# Codex Device Login Plan

Date: 2026-07-09

Status: implemented for CLI-managed deployment credentials; browser UI and provider use remain future work

## Goal

ML Claw should let an administrator connect a ChatGPT account to one deployment through OpenAI's Codex device-code flow. The user should not need an OpenAI API key, a local Codex installation, or a Codex binary in the runtime image.

This work covers login, encrypted deployment-scoped persistence, status, logout, and state-bucket migration. It does not make Codex a model provider or add a Codex execution tool to OpenClaw.

## Device Flow

ML Claw implements the small device-code protocol directly over HTTPS:

1. Request a device and user code from `https://auth.openai.com/api/accounts/deviceauth/usercode`.
2. Show `https://auth.openai.com/codex/device` and the one-time user code.
3. Poll `https://auth.openai.com/api/accounts/deviceauth/token` until the user approves or the 15-minute deadline expires.
4. Exchange the returned authorization code and verifier at `https://auth.openai.com/oauth/token`.
5. Validate that the access-token JWT contains a ChatGPT account id.
6. Encrypt the normalized OAuth credential into the selected deployment's private bucket.

The implementation follows the OpenAI Codex OAuth flow in Pi's MIT-licensed `packages/ai/src/auth/oauth/openai-codex.ts`. ML Claw owns the small protocol implementation locally so installing ML Claw does not pull in Pi or Codex.

## Commands

```bash
mlclaw credentials codex login <agent>
mlclaw credentials codex status <agent>
mlclaw credentials codex logout <agent>
```

`login` prints only the verification URL, one-time user code, progress, and completion status. It never prints access or refresh tokens.

`status` reports whether the selected deployment has an encrypted credential and when it was updated. It does not return account tokens.

`logout` writes an authoritative revocation marker and deletes the encrypted credential. No runtime restart is needed because this phase does not expose the credential to OpenClaw or a runtime helper.

## Credential Persistence

The encrypted credential object lives at:

```text
<state-prefix>/.mlclaw/codex-auth.enc
```

Logout first writes:

```text
<state-prefix>/.mlclaw/codex-auth.revoked
```

The marker prevents stale concurrent work from restoring a logged-out credential. A successful new login removes the marker only after the new encrypted object has been written.

The encryption key is derived from `MLCLAW_CREDENTIAL_KEY` with provider-specific HKDF context. AES-256-GCM additional authenticated data binds the object to the deployment id, bucket, and state prefix. Moving deployment state to another bucket decrypts and re-encrypts the credential for the new authenticated context before deleting the old copy.

Never store raw OAuth credentials in:

- the Space repository;
- Space variables or secrets;
- the OpenClaw workspace or state snapshots;
- browser responses;
- logs;
- unencrypted bucket objects.

## Security Requirements

- Validate every OpenAI response before using it.
- Bound response sizes and sanitize upstream error text.
- Enforce the 15-minute login deadline and OpenAI's polling interval.
- Support cancellation through an abort signal.
- Never convert ChatGPT OAuth into `OPENAI_API_KEY`.
- Never import a user's global Pi or Codex auth file automatically.
- Never install or execute `@openai/codex` for login.
- Keep credentials scoped to one canonical deployment identity.
- Treat the bucket object and revocation marker as authoritative.

## Browser Follow-up

A future admin-only browser flow may expose structured start, status, cancellation, and logout routes. It should show the verification URL and user code, enforce one active login, require CSRF protection, and never return token material.

## Tests

Unit and integration coverage should verify:

- device-code request, polling, and token exchange;
- pending and slow-down polling responses;
- timeout, cancellation, malformed payloads, and bounded errors;
- account-id extraction from the access-token JWT;
- no Codex binary or npm package dependency;
- encrypted credential round trips;
- revocation marker behavior;
- bucket migration and cleanup;
- status and logout redaction;
- generated Dockerfiles and release metadata contain no Codex installation.

A live acceptance test is one command:

```bash
node dist/mlclaw.mjs credentials codex login <agent>
```

The administrator completes the displayed OpenAI device flow and then checks:

```bash
node dist/mlclaw.mjs credentials codex status <agent>
```

## Non-Goals

- Installing or wrapping the Codex CLI.
- Running a Codex subprocess in the Space runtime.
- Adding `codex_prompt` or another Codex MCP helper.
- Passing OAuth tokens to OpenClaw.
- Treating ChatGPT OAuth as an OpenAI API key.
- Shipping the future browser account UI in this phase.
