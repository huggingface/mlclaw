# Settings Control UI Plan

Status: proposed

## Goal

Add a first-class ML Claw control UI inside every Space deployment so users can
configure and operate their agent after Hugging Face sign-in.

The user should not need to remember hidden URLs. After sign-in, the OpenClaw
browser gateway should visibly expose an ML Claw entry point for:

- sign out;
- model/provider configuration;
- preinstalled Hugging Face skills status;
- OpenAI credential setup;
- runtime status;
- restart/update state;
- future connector configuration.

OpenClaw should remain an upstream app. ML Claw should own the outer shell,
settings UI, authentication, and deployment controls.

## Architecture Decision

Use:

- **Hono** for the Space runtime HTTP router, middleware, and JSON API;
- **React + Vite** for the ML Claw control UI;
- raw Node HTTP upgrade handling for OpenClaw WebSocket proxying;
- the existing OpenClaw loopback process as the proxied upstream.

Do not patch OpenClaw UI internals. The Space runtime should be the stable
wrapper around OpenClaw.

```text
browser
  -> ML Claw Space runtime :7860
       /oauth/*          -> Hono OAuth routes
       /mlclaw/*         -> React control UI + Hono API
       /logout           -> logout compatibility route
       everything else   -> authenticated OpenClaw reverse proxy
  -> OpenClaw gateway :7861 on loopback only
```

## User Experience

Unauthenticated users see the current ML Claw login/setup page.

Authenticated users entering `/` see OpenClaw with a small persistent ML Claw
shell element. The shell element must be visually modest and should not fight
OpenClaw's UI. It should expose:

- **ML Claw** link or menu;
- **Settings**;
- **Status**;
- **Sign out**.

The control UI lives at `/mlclaw`.

Initial React routes:

```text
/mlclaw
/mlclaw/settings
/mlclaw/status
/mlclaw/credentials
/mlclaw/skills
```

The existing `/mlclaw/openai` route should become either a redirect to
`/mlclaw/credentials` or a server-rendered compatibility page that points into
the React app.

## Route Contract

Hono owns normal HTTP routing:

```text
GET  /login
GET  /logout
GET  /oauth/login
GET  /oauth/callback

GET  /mlclaw
GET  /mlclaw/*
GET  /mlclaw/assets/*

GET  /mlclaw/api/session
GET  /mlclaw/api/status
GET  /mlclaw/api/settings
GET  /mlclaw/api/skills
POST /mlclaw/api/settings/model
POST /mlclaw/api/credentials/openai
POST /mlclaw/api/runtime/restart
POST /mlclaw/api/logout

ALL  * -> OpenClaw proxy fallback
```

WebSocket upgrade handling stays outside Hono:

```text
upgrade -> validate ML Claw session -> inject trusted headers -> proxy to OpenClaw
```

## Backend Layout

Target structure:

```text
src/mlclaw-space-runtime/
  app.ts
  server.ts
  config.ts
  cookies.ts
  oauth.ts
  openai-credentials.ts
  openclaw-config.ts
  hub-settings.ts
  csrf.ts
  shell.ts
  routes/
    auth.ts
    api.ts
    assets.ts
    control-ui.ts
    health.ts
  middleware/
    auth.ts
    admin.ts
    csrf.ts
  proxy/
    http.ts
    websocket.ts
    headers.ts

src/mlclaw-control-ui/
  index.html
  package-facing entry files
  src/
    App.tsx
    api.ts
    routes/
      Settings.tsx
      Status.tsx
      Credentials.tsx
      Skills.tsx
    components/
      Shell.tsx
      Field.tsx
      Banner.tsx
```

`server.ts` should be reduced to process startup, OpenClaw child lifecycle, and
Node server wiring. `app.ts` should compose Hono routes and middleware.

## Settings Data Model

The server reads and writes deployment configuration from Space variables and
secrets. The bucket remains durable OpenClaw state and must not become the
settings store.

Readable settings:

```text
OPENCLAW_AGENT_NAME
OPENCLAW_MODEL
OPENCLAW_HF_STATE_BUCKET
OPENCLAW_HF_STATE_PREFIX
MLCLAW_GATEWAY_LOCATION
MLCLAW_RUNTIME_IMAGE
MLCLAW_RUNTIME_ID
MLCLAW_TEMPLATE_REV
MLCLAW_ALLOWED_USERS
MLCLAW_ADMINS
```

Writable settings from the control UI:

```text
OPENCLAW_MODEL
```

Writable secrets from the control UI:

```text
OPENAI_API_KEY
```

Future writable settings can include connector config, but Telegram and
Discord must remain explicit because Space messaging egress requires paid
hardware.

## Model Configuration

The settings UI should start with:

- current model display;
- curated recommended model choices;
- custom model text input for advanced users;
- validation that the value is non-empty and normalized;
- confirmation before saving;
- clear restart-pending feedback.

Initial recommended choices:

```text
huggingface/google/gemma-4-26B-A4B-it
huggingface/Qwen/Qwen3.6-35B-A3B
huggingface/Qwen/Qwen3-8B
```

The UI should explain by behavior, not marketing copy:

- quality target;
- lower cost option;
- advanced/custom option.

Later, add a Hugging Face Router catalog lookup endpoint so the UI can show
currently available hosted models. That endpoint should cache results and fail
softly to the curated list.

## Preinstalled Hugging Face Skills

Hugging Face skills are part of the default ML Claw deployment. They should not
be a separate post-install task that the user has to discover later.

When `mlclaw bootstrap` creates a new deployment, it must seed the OpenClaw
workspace before the first gateway start with official skills from
`huggingface/skills`.

Initial required skills:

```text
hf-cli
huggingface-spaces
huggingface-datasets
huggingface-local-models
```

Optional bundled skills can be added later, but the baseline should be enough
for a fresh ML Claw agent to understand Hugging Face Hub operations, Spaces,
datasets, buckets, local model discovery, and common Hub CLI workflows without
manual setup.

Seed location inside the OpenClaw workspace:

```text
workspace/.agents/skills/<skill-name>/SKILL.md
workspace/.agents/skills/<skill-name>/...
```

The source revision must be pinned and recorded:

```text
workspace/.agents/skills/.mlclaw-hf-skills.json
```

Example manifest:

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

Bootstrap behavior:

- new bucket/new deployment: seed the baseline skills before first OpenClaw
  start;
- local gateway: seed into the local live workspace before starting Docker;
- Space gateway: seed into the Space live workspace before launching OpenClaw;
- first snapshot: include the seeded `.agents/skills` directory so the skills
  become durable bucket state;
- existing bucket/deployment: do not overwrite user-modified skill files during
  normal bootstrap.

Update behavior:

- `mlclaw update <owner/space>` updates runtime files only and must not mutate
  bucket workspace skills;
- `mlclaw doctor --fix` may add missing baseline skills only when the workspace
  is clearly an ML Claw workspace and the target skill folder is absent;
- future settings UI may offer “Update Hugging Face skills” as an explicit
  admin action with source revision preview and confirmation.

The settings UI should include a read-only Skills page at first:

- show installed baseline skills;
- show pinned source revision;
- show whether expected baseline skills are missing;
- link to `huggingface/skills` documentation;
- avoid arbitrary skill installation until the trust/update model is explicit.

## Mutating Space Configuration

Admin API writes happen server-side using the Space's `HF_TOKEN` secret.

Rules:

- only mutate the current Space, inferred from `SPACE_ID`;
- never accept arbitrary repo IDs from the browser for mutation endpoints;
- never return secret values to the browser;
- write Space variables/secrets through the Hugging Face API;
- restart the Space only after successful writes;
- expose restart status to the UI.

Changing `OPENCLAW_MODEL` should:

1. validate admin session;
2. validate CSRF token;
3. write the new Space variable;
4. update any generated OpenClaw config file if needed for the running process;
5. request a Space restart;
6. return a restart-pending response.

OpenAI credential setup should:

1. validate admin session;
2. validate CSRF token;
3. accept the key over HTTPS only;
4. write `OPENAI_API_KEY` as a Space Secret when possible;
5. write a 0600 runtime fallback file only for immediate use;
6. never echo the key back.

## Authentication And Authorization

Keep the existing Hugging Face OAuth identity layer.

Session rules:

- signed HTTP-only cookies;
- SameSite=Lax;
- secure cookies on hosted Space requests;
- no stored OAuth access tokens;
- logout clears only the ML Claw session cookie.

Authorization rules:

- all `/mlclaw/api/*` routes require an authenticated HF user;
- read-only status is available to allowed users;
- settings writes require admin membership;
- `MLCLAW_ADMINS` wins when set;
- admins are implicitly allowed users;
- source/template mode must not expose mutating APIs.

## CSRF

All mutating control UI calls need CSRF protection.

Implementation:

- issue a signed CSRF token from `/mlclaw/api/session`;
- store token in React memory;
- require `x-mlclaw-csrf` on POST routes;
- bind the token to the signed session identity;
- reject missing or mismatched tokens with `403`.

## OpenClaw Shell Integration

ML Claw should inject a minimal shell element into OpenClaw HTML document
responses.

Rules:

- inject only into authenticated HTML navigation responses;
- do not modify JSON, assets, API responses, or WebSockets;
- do not depend on OpenClaw component internals;
- inject CSS/JS with ML Claw-owned asset paths;
- keep the element small and fixed in a predictable corner;
- provide direct links to `/mlclaw`, `/mlclaw/settings`, and logout.

If HTML injection becomes fragile, fall back to serving `/` as an ML Claw
React shell with OpenClaw embedded below it. The preferred first implementation
is same-origin proxy with document-shell injection because it preserves
OpenClaw routing and WebSocket behavior.

## Frontend Build And Packaging

Add a Vite build for the control UI.

Expected package scripts:

```text
build:control-ui
build:space-runtime
build
```

The generated Space should include built control UI assets under a stable path:

```text
runtime/mlclaw-control-ui/
```

or, if simpler for the bundled JS runtime:

```text
assets/mlclaw-control-ui/
```

The runtime route `/mlclaw/assets/*` serves these files with immutable cache
headers when filenames are hashed.

## Dependencies

Runtime dependencies:

```text
hono
```

Frontend dependencies:

```text
react
react-dom
@vitejs/plugin-react
vite
```

Keep the backend runtime dependency surface small. Do not add a full-stack
framework.

## Migration From Current Runtime

Current files map as follows:

```text
server.ts             -> app.ts + routes + middleware + proxy modules
pages.ts              -> login/template fallback pages, then mostly React UI
oauth.ts              -> routes/auth.ts plus existing OAuth helpers
cookies.ts            -> session + CSRF signing helpers
proxy.ts              -> proxy/http.ts + proxy/websocket.ts + proxy/headers.ts
openai-credentials.ts -> credentials API
```

Keep compatibility routes:

```text
/logout
/mlclaw/logout
/mlclaw/openai
/health
/healthz
```

Existing Spaces should be updatable with:

```bash
mlclaw update <owner/space>
```

No bucket migration is required.

## Testing

Unit tests:

- Hono route matching and fallback behavior;
- auth middleware rejects unauthenticated control API calls;
- admin middleware rejects non-admin writes;
- CSRF accepts valid tokens and rejects missing/mismatched tokens;
- logout clears the signed session cookie;
- model save writes only `OPENCLAW_MODEL` for the current Space;
- OpenAI key save stores secrets without echoing values;
- HTML shell injection modifies only HTML document responses;
- proxy header stripping/injection stays intact;
- WebSocket upgrade auth still works outside Hono.

Frontend tests:

- settings page renders current model;
- model selector posts expected payload;
- skills page renders installed baseline skills and source revision;
- restart-pending banner appears after save;
- logout action calls the API and redirects.

Build/package tests:

- Vite control UI build is included in generated Space files;
- bootstrap seed files include the baseline Hugging Face skills;
- package check includes the built assets needed by `mlclaw update`;
- generated Space still starts from the bundled runtime.

Live test:

1. create `mlclaw-test`;
2. sign in through Hugging Face OAuth;
3. open OpenClaw gateway;
4. verify `.agents/skills/hf-cli` exists in the OpenClaw workspace;
5. verify ML Claw shell link is visible;
6. open `/mlclaw/settings`;
7. open `/mlclaw/skills` and confirm baseline skills are listed;
8. change model;
9. confirm Space restart;
10. verify `OPENCLAW_MODEL` changed in Space variables;
11. verify OpenClaw comes back after restart;
12. sign out and confirm `/` returns to login.

## Acceptance Criteria

- Signed-in users can visibly navigate from OpenClaw to ML Claw settings.
- Fresh ML Claw deployments start with baseline Hugging Face skills already
  installed in the OpenClaw workspace.
- The first durable bucket snapshot preserves the preinstalled skills.
- Admin users can update `OPENCLAW_MODEL` from the browser.
- Admin users can submit an OpenAI API key without the key being logged or
  returned.
- Users can sign out from the UI.
- Non-admin users cannot mutate settings.
- Unauthenticated users cannot access control APIs.
- OpenClaw HTTP and WebSocket proxying still works.
- `mlclaw update` can apply this implementation to an existing Space.
- Existing Storage Bucket state is untouched.

## Non-Goals

- Do not build a generic LLM routing layer in this change.
- Do not patch OpenClaw UI source.
- Do not expose arbitrary Hugging Face repo mutation from the browser.
- Do not make Hugging Face skills a separate required setup step after
  bootstrap.
- Do not add Telegram/Discord setup UI until paid hardware consent and egress
  messaging are represented clearly.
- Do not replace the CLI; browser settings are complementary.
