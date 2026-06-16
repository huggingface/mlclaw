# Messaging Egress Notes

Last updated: 2026-06-16

This document records the practical networking conclusion from testing Hugging
Claw with Telegram and Discord from Hugging Face Spaces.

## Finding

Free Hugging Face Spaces intentionally block outbound TLS connections to some
messaging and social APIs, including Telegram and Discord, because those APIs
are commonly abused for spam and botting from free compute.

The early failures looked like Telegram or Discord might be blocking AWS data
center IPs. That was not the root cause. The issue was on the Hugging Face
Spaces side: an egress filter applies to free Spaces. During testing, the
connection behavior looked flaky because enforcement was temporarily
inconsistent; the intended behavior is that those outbound connections are
blocked on free Spaces.

## What Works

| Mode | Telegram/Discord connectivity | Cost implication | Notes |
| --- | --- | --- | --- |
| Free `cpu-basic` Space | Not reliable / expected blocked | Free | Fine for build checks and non-messaging demos |
| Paid upgraded Space | Expected to work | Starts at `cpu-upgrade` pricing | Use for fully hosted Telegram mode |
| Local gateway on user's machine | Expected to work | No paid Space required for messaging | Good first-launch path for cost-sensitive users |
| Third-party Telegram proxy | Technically possible | Proxy operator cost/trust burden | Avoid as the default; users may not trust it |

## Product Implication

There are two distinct deployment stories:

1. Fully hosted Hugging Face deployment.
   The Space runs the gateway and talks to Telegram by long polling. This needs
   paid upgraded Space hardware today.

2. Local gateway deployment.
   The user's machine talks to Telegram. Hugging Face still provides durable
   storage, traces, and backup/sync, but the messaging gateway is not hosted in
   a free Space.

For launch messaging, do not imply that a Telegram bot can be fully hosted on a
free Space. It currently cannot.

## Private Spaces And Webhooks

Private Spaces should use Telegram long polling, not Telegram webhooks.

Telegram cannot call a private Space webhook because Hugging Face authentication
sits in front of the app. This is separate from the free-Space egress filter:

- webhook problem: inbound request cannot reach a private Space;
- egress problem: free Space cannot reliably call Telegram/Discord outbound.

Long polling solves the private-Space inbound problem. It does not bypass the
free-Space egress filter.

## Documentation Wording

Recommended user-facing wording:

```text
Telegram/Discord bots require either a paid Hugging Face Space or a local
gateway. Free Spaces currently block outbound connections to common messaging
APIs as an anti-abuse measure, so a fully hosted free Telegram bot is not a
supported target.
```

Avoid wording that says Telegram or Discord are blocking Hugging Face or AWS IPs.
That was an early hypothesis, not the confirmed cause.

## Launch Guidance

For a low-friction launch, lead with the local gateway if it is implemented:

- no surprise $20+/month fixed Space bill;
- no need for a Telegram proxy;
- users can still try Hugging Face buckets, traces, and OpenClaw state sync;
- fully hosted paid Spaces remain available for users who want always-on hosting.

If only the fully hosted Space mode is implemented, the install flow must make
the paid-hardware requirement explicit before creating or upgrading hardware.
