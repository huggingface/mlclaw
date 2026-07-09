# Control UI Branding Plan

Date: 2026-07-09

Status: implemented

## Goal

ML Claw deployments should not look like a raw OpenClaw gateway in the browser.
Each app Space should be able to present itself as the user's agent while still
running the stock OpenClaw Control UI behind ML Claw's authenticated proxy.

## Implementation

ML Claw owns the browser-facing proxy layer, so branding is applied there:

- app Spaces default the brand name from `OPENCLAW_AGENT_NAME`;
- the canonical template Space keeps the default `ML Claw` brand;
- `MLCLAW_BRAND_NAME` and related variables override the defaults;
- ML Claw serves browser assets for:
  - `/assets/brand/logo`
  - `/favicon.svg`
  - `/favicon-32.png`
  - `/favicon.ico`
  - `/apple-touch-icon.png`
  - `/manifest.webmanifest`
- proxied HTML responses from OpenClaw have their title and app metadata
  rewritten before the ML Claw control link is injected;
- the ML Claw settings UI reads branding from the runtime API.

## Configuration

Supported Space variables:

```text
MLCLAW_BRAND_NAME
MLCLAW_BRAND_SHORT_NAME
MLCLAW_BRAND_THEME_COLOR
MLCLAW_BRAND_LOGO
MLCLAW_BRAND_FAVICON
MLCLAW_BRAND_FAVICON_SVG
MLCLAW_BRAND_FAVICON_32
MLCLAW_BRAND_FAVICON_PNG
MLCLAW_BRAND_FAVICON_ICO
MLCLAW_BRAND_APPLE_TOUCH_ICON
```

Asset paths are relative to the Space `assets/` directory. Paths outside that
directory are rejected.

## Boundary

This is intentionally a proxy-level implementation. It avoids forking or
rewriting OpenClaw's JavaScript bundle. A future upstream OpenClaw
`gateway.controlUi.branding` config would be cleaner for in-app strings that
are currently compiled into the upstream UI.

## Validation

- Runtime config derives brand names from agent names and accepts explicit
  brand variables.
- Runtime serves branded favicon/logo/PWA routes.
- Proxied OpenClaw HTML is rewritten with the configured title and app metadata.
- JSON proxy responses are not rewritten.
