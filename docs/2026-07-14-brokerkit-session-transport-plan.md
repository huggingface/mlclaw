# BrokerKit Delegated Session Transport Implementation Plan

Date: 2026-07-14

Status: ready to implement

## Target Request

MLClaw's trusted browser boundary accepts BrokerKit delegated sessions through
one dedicated HTTP field:

```http
GET /mlclaw/api/brokerkit/snapshot HTTP/1.1
Origin: null
BrokerKit-Session: eyJ2ZXJzaW9uIjoxLCJhdWRpZW5jZSI6Ii4uLiJ9.signature
Accept: application/json
```

`BrokerKit-Session` contains the raw opaque session token. It has no `Bearer`
prefix. MLClaw does not accept a delegated token from `Authorization`, a
cookie, a query parameter, or a request body.

This replaces the current pre-release behavior in place. MLClaw and its pinned
BrokerKit plugin use only the resulting version 1 contract. Do not add fallback
parsing, dual-header support, compatibility aliases, a second format version,
or migration code.

## Objective

Adopt BrokerKit's host-neutral delegated-web session transport at the MLClaw
trusted boundary, rebuild the pinned runtime, and prove that approvals work
from both ordinary Hugging Face authentication and signed Space chat links.

The implementation must preserve MLClaw's security model:

- the OpenClaw process remains untrusted;
- broker operator credentials stay only in the trusted backend;
- the browser receives only a short-lived scoped delegated session;
- the sandboxed popover cannot send MLClaw cookies to approval APIs;
- every browser route remains fixed and typed; and
- each broker remains authoritative for its own requests and decisions.

## Confirmed Failure

The exact signed `osolmaz/mlclaw-test` chat link reproduced this browser state:

```text
Approvals
0 pending across 0 sources
Approvals are unavailable
```

The same deployment's authenticated backend reported a healthy HF Broker and
a pending repo-create request. A clean top-level BrokerKit UI using a separate
Hugging Face credential rendered that request correctly.

In the signed chat context, the isolated popover resource records showed:

```text
/plugins/brokerkit/ui/                  200
/mlclaw/api/brokerkit/snapshot          404
/mlclaw/api/brokerkit/snapshot          404
```

The packaged delegated client sends `Authorization: Bearer <delegated-token>`.
Hugging Face owns `Authorization` at the Space edge and rejects that value as
an invalid Hugging Face credential before the request reaches MLClaw. MLClaw
cannot repair the request in its proxy because its application handler never
sees it.

## Ownership

BrokerKit owns the fixed `BrokerKit-Session` delegated-web contract and the
packaged browser client. Its companion plan is
`osolmaz/brokerkit:docs/2026-07-14-browser-session-transport-plan.md`.

MLClaw owns:

- serving protected BrokerKit UI HTML and immutable packaged assets;
- issuing and verifying delegated sessions;
- enforcing the opaque-origin CORS boundary;
- aggregating configured Operator V1 sources;
- translating browser handles and decisions to the selected broker;
- pinning an immutable compatible BrokerKit revision;
- building the combined runtime image; and
- exercising the real Hugging Face signed-link path.

No OpenClaw core, HF Broker, GH Broker, Sudo Broker, Telegram, Discord, or
provider-specific policy change belongs in this implementation.

## MLClaw HTTP Contract

### Accepted credential

All protected routes under `/mlclaw/api/brokerkit` authenticate the delegated
browser with exactly one `BrokerKit-Session` field. Header names are
case-insensitive, but tests and documentation use that canonical spelling.

The backend:

- reads one raw value with a maximum length of 4096 bytes;
- rejects missing, empty, repeated/combined, whitespace-bearing, malformed,
  expired, incorrectly signed, or wrong-audience tokens;
- preserves the existing `read` and `decide` access checks;
- preserves current issue time, expiry, nonce, subject, and audience checks;
- never logs, persists, reflects, or forwards the token;
- never treats it as an Operator V1 credential; and
- ignores no alternative location because alternatives are invalid.

`Authorization` is left entirely to the hosting edge. MLClaw does not inspect
it for delegated-web authentication and does not emit it from the packaged
delegated client.

### Route behavior

Apply the credential rule to:

| Method | Path                                             | Required access                                    |
| ------ | ------------------------------------------------ | -------------------------------------------------- |
| `POST` | `/mlclaw/api/brokerkit/session`                  | current `read` or `decide`; preserve it on renewal |
| `GET`  | `/mlclaw/api/brokerkit/snapshot`                 | `read` or `decide`                                 |
| `GET`  | `/mlclaw/api/brokerkit/events`                   | `read` or `decide`                                 |
| `GET`  | `/mlclaw/api/brokerkit/requests/:handle`         | `read` or `decide`                                 |
| `POST` | `/mlclaw/api/brokerkit/requests/:handle/approve` | `decide`                                           |
| `POST` | `/mlclaw/api/brokerkit/requests/:handle/deny`    | `decide`                                           |
| `POST` | `/mlclaw/api/brokerkit/requests/:handle/revoke`  | `decide`                                           |

The summary and summary-event routes remain authenticated by the ordinary
MLClaw administrator session because they are called by the trusted parent
page, not the opaque BrokerKit frame.

### CORS and cookie behavior

Delegated requests originate from the scripts-only sandbox and therefore send
`Origin: null`. The MLClaw response boundary:

- requires the exact opaque origin;
- returns `Access-Control-Allow-Origin: null`;
- returns `Access-Control-Allow-Headers: brokerkit-session, content-type` on
  preflight;
- allows only `GET`, `POST`, and `OPTIONS`;
- returns `Cache-Control: no-store`, `Vary: Origin`, and
  `X-Content-Type-Options: nosniff`;
- removes `Access-Control-Allow-Credentials: true`; and
- never requires or reads the MLClaw session cookie on delegated routes.

The protected HTML request still requires an authenticated MLClaw admin and
may rely on Hugging Face OAuth, the Space's signed-link access, and the MLClaw
session cookie as appropriate. That request issues the short-lived delegated
session. Subsequent iframe API calls use only `BrokerKit-Session` for MLClaw's
delegated authorization while the Hugging Face edge remains free to process
its own authentication state.

## Source Changes

### Trusted route boundary

Update `src/mlclaw-space-runtime/app.ts`:

- define one canonical delegated session field constant;
- make `delegatedIdentity` read only that field;
- keep access enforcement centralized in `delegatedIdentity` and route-level
  `read`/`decide` checks;
- update `delegatedPreflight` to allow the new field and remove
  `authorization`;
- remove credentialed-CORS response behavior;
- preserve fixed typed routes, bounded bodies, opaque handles, optimistic
  revisions, idempotent decisions, and safe error envelopes; and
- add secret-safe diagnostics that identify route/status/error class without
  including token, request body, canonical broker request ID, or operator
  credential.

Delete the delegated `cancel` decision route while touching this boundary.
Operator V1 permits approve, deny, and revoke; requesters cancel their own
pending work through the Agent API. Do not retain the pre-release host route as
an alias.

Do not rewrite the standard request `Authorization` field, forward arbitrary
headers, or add a general reverse proxy. The browser API remains an explicit
adapter over `DelegatedBrokerKit`.

### Delegated session implementation

Keep `src/mlclaw-space-runtime/delegated-brokerkit.ts` responsible for token
issue and validation. No token schema version change is required. Tighten its
public entry point if needed so the app passes one already-bounded raw field
value and validation still fails closed for duplicated or combined input.

Preserve:

- four-minute token lifetime;
- `brokerkit-delegated-web` audience binding;
- exact closed token payload fields;
- `read` and `decide` access;
- per-token nonce/session identity;
- signature and expiry verification; and
- deterministic server-side decision idempotency.

### Documentation

Update `docs/operator-brokers-config.md` to replace bearer wording with the
fixed field contract, explain the hosting-edge collision, and document
credential-free CORS. Update any architecture or runtime documentation that
claims the current delegated token uses standard bearer authentication.

Do not describe the change as Hugging Face-specific. Hugging Face supplied the
reproduction, while the corrected boundary is intentionally portable across
identity-aware proxies.

## BrokerKit Pin And Runtime Image

After the BrokerKit implementation is reviewed and green:

- replace `brokerkitVersion` in `package.json` with the exact implementing
  commit;
- keep `brokerkitPluginVersion` at its pre-publication package value unless the
  package build itself requires a coordinated package-version change;
- regenerate `dist/mlclaw-space-runtime.js` and all other tracked bundles from
  source;
- build the runtime image from the immutable MLClaw commit and immutable
  BrokerKit commit;
- verify the installed tarball contains the matching `dist/ui` assets; and
- record both revisions in the runtime metadata used by doctor/status.

Do not consume a branch, moving tag, uncommitted checkout, or locally modified
plugin artifact.

## Automated Verification

### Runtime tests

Extend `test/mlclaw.space-runtime.test.ts` to cover the complete HTTP boundary:

- an embedded popover receives a `read` session;
- a trusted top-level view receives a `decide` session;
- `BrokerKit-Session` authenticates snapshot, events, detail, renewal, approve,
  deny, and revoke;
- the removed delegated cancel route returns `404`;
- delegated `Authorization` is rejected even when it contains a valid token;
- missing, duplicated/combined, malformed, expired, wrong-audience, and
  wrong-access values fail safely;
- preflight allows only the new field and content type;
- delegated responses do not allow credentials;
- cookies are neither required nor sufficient on delegated endpoints;
- summary routes still require the MLClaw administrator session;
- no token appears in response errors, captured logs, redirects, or URLs; and
- CSP, frame ancestry, sandbox, immutable assets, and top-level navigation
  behavior remain intact.

Extend `test/mlclaw.delegated-brokerkit.test.ts` only where token validation or
access behavior needs focused coverage. Preserve the existing multi-source,
bounded pagination, revision, decision, and error-isolation tests.

### Hosting-edge regression fixture

Add a deterministic integration fixture in front of the MLClaw test app that
behaves like an identity-aware hosting edge:

- the outer document is admitted by simulated host authentication;
- a request carrying delegated `Authorization` is intercepted and returned as
  `404` before the app;
- an otherwise identical request carrying `BrokerKit-Session` reaches MLClaw;
- the opaque-origin preflight succeeds; and
- a pending fake Operator V1 request renders and can be decided.

This fixture proves the architecture without depending on live Hugging Face
availability in CI.

### Repository quality gates

Run the repository-required checks, including:

```sh
npm run format
npm run lint
npm run typecheck
npm test
npm run coverage
npm run build
npm run check:secrets
npm run pack:check
npm run dry
npm run slophammer
```

The generated runtime bundle and packaged UI assets must match their source.
Do not run mutation testing during this implementation.

## Live Signed-Link Verification

Deploy only after BrokerKit and MLClaw checks pass and the candidate runtime
image is available. Use `osolmaz/mlclaw-test`; do not change another deployment
or its bucket.

Verify in fresh browser contexts:

1. open the ordinary authenticated Space chat URL;
2. create a private test repo request through the HF Broker MCP tool;
3. observe the notification badge update without refreshing;
4. open the popover and confirm the source and request render;
5. deny the disposable request or approve only a uniquely named disposable
   target, then verify terminal state;
6. open a newly generated Hugging Face signed chat URL for the same test Space;
7. repeat request creation and confirm the signed context renders it;
8. inspect resource records and prove snapshot/events return `200`;
9. prove no delegated request contains standard `Authorization`;
10. prove the custom field is absent from URLs, DOM after bootstrap, storage,
    console output, and application logs; and
11. wait through an unchanged long poll and one transient injected failure,
    then confirm the UI recovers without iframe reload or a stale availability
    banner.

Run `mlclaw doctor osolmaz/mlclaw-test` after deployment and confirm the Space,
runtime image, mounted bucket, OAuth, OpenClaw Gateway, BrokerKit plugin, HF
Broker agent listener, and HF Broker operator listener are healthy.

## Coordinated Commit And Cutover

Complete the change as one coordinated pre-release cutover:

1. merge the BrokerKit contract and packaged UI implementation;
2. implement MLClaw against that exact reviewed commit;
3. advance the immutable BrokerKit pin;
4. rebuild and publish the MLClaw runtime image;
5. update only `osolmaz/mlclaw-test`;
6. run ordinary and signed-link end-to-end verification; and
7. publish no package release until all acceptance criteria pass.

There is no supported mixed pairing. A runtime with the new MLClaw adapter and
an old BrokerKit UI, or a new BrokerKit UI and an old MLClaw adapter, is invalid
and must fail the build or deployment verification.

## Acceptance Criteria

- The exact signed-link reproduction no longer displays `0 sources` or
  `Approvals are unavailable` while a healthy source exists.
- Every delegated browser route accepts only `BrokerKit-Session`.
- MLClaw never reads a delegated credential from standard `Authorization`.
- Hugging Face remains free to own standard authorization at the Space edge.
- The opaque iframe sends no cookies and receives no credentialed-CORS grant.
- Read-only popover and decision-capable top-level sessions retain their
  current access boundaries.
- Broker operator credentials remain server-only and never enter browser
  responses or OpenClaw state.
- Pending requests stream into the mounted popover without page or iframe
  refresh.
- A recovered connection clears its availability banner.
- Unit, integration, coverage, build, package, secret, and Slophammer checks
  pass.
- The runtime pins the exact compatible BrokerKit revision.
- `mlclaw doctor` is clean after deployment.
- Ordinary OAuth and signed Space chat URLs both render and decide a disposable
  approval end to end.
