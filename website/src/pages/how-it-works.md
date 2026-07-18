---
layout: ../layouts/DocLayout.astro
title: How it works
description: The architecture of an ML Claw deployment, from browser authentication and durable state to BrokerKit token isolation.
---

An ML Claw deployment is two processes with very different privileges. The trusted ML Claw gateway owns every secret and faces the network, and behind it an unprivileged [OpenClaw](https://github.com/openclaw/openclaw) agent does the actual work. This page describes the boundaries between your browser, the gateway, the agent, and your Hugging Face account.

```text
your browser
     │  Hugging Face OAuth session
     ▼
ML Claw gateway (trusted)
     │  trusted-proxy auth, loopback only
     ▼
OpenClaw agent (untrusted)
     │  scoped agent credential
     ▼
HF Broker (trusted) ──▶ Hugging Face APIs
```

## Browser authentication

The default deployment is a private Docker Space. ML Claw sits in front of OpenClaw as an HTTP and WebSocket proxy, authenticates every request against Hugging Face OAuth, and forwards signed-in traffic to OpenClaw over loopback using OpenClaw's trusted-proxy auth. The browser never receives an OpenClaw gateway token, so there is no long-lived agent credential on any device that could leak.

After signing in, an administrator can authorize the hosted Hugging Face MCP server and Research Agent with the same account. Ordinary users grant only identity scopes, and integration credentials stay in the gateway.

## Durable state

OpenClaw keeps its live state, including SQLite databases, on the container's local disk under `/home/node/.local/share/mlclaw/live`. ML Claw mounts the private Storage Bucket at `/data/mlclaw-state` and uses it only for verified snapshots. SQLite therefore stays off bucket-backed storage, while the agent's memory survives Space rebuilds, container replacement, and migration between local and Space gateways. Snapshots never include the broad Hugging Face token, operator credentials, or rebuildable Git mirrors.

## Token isolation with BrokerKit

The agent is treated as untrusted, so it never holds your Hugging Face token. ML Claw runs the HF Broker from [BrokerKit](https://github.com/osolmaz/brokerkit), a Go toolkit of brokered access-control services, as an isolated process inside the container. The broker owns the real token. It arrives as the `MLCLAW_BROKER_HF_TOKEN` Space secret, is written to a broker-owned `0600` file during startup, and is removed from child-process environments. OpenClaw receives a separate agent credential that can call only the broker's typed routes.

Every agent request follows the same path through the broker. The broker authenticates the client and classifies the request into an operation and a target, then checks the result against a policy file. Anything the policy cannot classify is refused, so the broker fails closed. Operations marked `request` in the policy park until an administrator approves a short-lived grant.

Those approvals happen inside the gateway. OpenClaw's BrokerKit plugin adds an Approvals tab where administrators inspect, approve, deny, cancel, or revoke parked requests. The operator tokens behind those decisions live in backend-only files and are never sent to the browser or to OpenClaw.
