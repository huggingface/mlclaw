#!/usr/bin/env bash
set -euo pipefail

LIVE_DIR="${OPENCLAW_LIVE_DIR:-/home/node/.local/share/mlclaw/live}"
OPENCLAW_UID="${MLCLAW_OPENCLAW_UID:-1000}"
OPENCLAW_GID="${MLCLAW_OPENCLAW_GID:-1000}"
OPENCLAW_IDENTITY="${OPENCLAW_UID}:${OPENCLAW_GID}"
export MLCLAW_OPENCLAW_UID="$OPENCLAW_UID"
export MLCLAW_OPENCLAW_GID="$OPENCLAW_GID"
HF_BROKER_ENABLED=0
HF_BROKER_RUN_DIR="/run/mlclaw-hf-broker"
HF_BROKER_POLICY_DIR="$HF_BROKER_RUN_DIR/policy"
HF_BROKER_SCOPE_FILE="$HF_BROKER_POLICY_DIR/scope.json"
STATE_HF_TOKEN=""
RESTORED_PROTECTED_STATE_DIR="$LIVE_DIR/.mlclaw-protected"
PROTECTED_STATE_DIR="/var/lib/mlclaw-protected"
HF_BROKER_STATE_DIR="$PROTECTED_STATE_DIR/unyolo/hf-broker"
HF_BROKER_STATE_CONTRACT="unyolo-state-v1-grant-uses"
HF_BROKER_STATE_CONTRACT_FILE="$PROTECTED_STATE_DIR/control/hf-broker-state-contract"
TELEGRAM_BOT_MUX_ENABLED=0
TELEGRAM_BOT_MUX_RUN_DIR="/run/mlclaw-telegram-bot-mux"
TELEGRAM_BOT_MUX_CONFIG_FILE="$TELEGRAM_BOT_MUX_RUN_DIR/config.json"
TELEGRAM_BOT_MUX_PHYSICAL_TOKEN_FILE="$TELEGRAM_BOT_MUX_RUN_DIR/telegram-token"
TELEGRAM_BOT_MUX_OPENCLAW_TOKEN_FILE="$TELEGRAM_BOT_MUX_RUN_DIR/openclaw-token"
TELEGRAM_BOT_MUX_UNYOLO_TOKEN_FILE="$TELEGRAM_BOT_MUX_RUN_DIR/unyolo-token"
TELEGRAM_BOT_MUX_STATE_DIR="$PROTECTED_STATE_DIR/telegram-bot-mux"
TELEGRAM_BOT_MUX_DATABASE="$TELEGRAM_BOT_MUX_STATE_DIR/state.db"
TELEGRAM_BOT_MUX_OPENCLAW_BASE="http://127.0.0.1:7865/client/openclaw"
TELEGRAM_BOT_MUX_UNYOLO_BASE="http://127.0.0.1:7865/client/unyolo"
UNYOLO_TELEGRAM_ENABLED=0
UNYOLO_TELEGRAM_RUN_DIR="/run/mlclaw-unyolo-telegram"
UNYOLO_TELEGRAM_TOKEN_FILE="$UNYOLO_TELEGRAM_RUN_DIR/bot-token"
UNYOLO_TELEGRAM_CONFIG_FILE="$UNYOLO_TELEGRAM_RUN_DIR/config.json"
UNYOLO_TELEGRAM_STATE_DIR="$PROTECTED_STATE_DIR/unyolo/telegram"
UNYOLO_TELEGRAM_INBOX_FILE="$UNYOLO_TELEGRAM_STATE_DIR/callbacks.db"
UNYOLO_TELEGRAM_INBOX_KEY_FILE="$PROTECTED_STATE_DIR/control/unyolo-telegram-inbox-key"

prepare_hf_broker() {
  local broker_token="${MLCLAW_BROKER_HF_TOKEN:-}"
  if [ -z "$broker_token" ]; then
    echo "[hf-broker] MLCLAW_BROKER_HF_TOKEN is not configured; broker disabled"
    return
  fi

  local token_file="$HF_BROKER_RUN_DIR/hf-token"
  local agent_secret_file="$HF_BROKER_RUN_DIR/agent-secret"
  local operator_secret_file="$HF_BROKER_RUN_DIR/operator-secret"
  local broker_agent_secrets="$HF_BROKER_RUN_DIR/agent-secrets.conf"
  local broker_operator_secrets="$HF_BROKER_RUN_DIR/operator-secrets.conf"
  local operator_brokers_file="$HF_BROKER_RUN_DIR/operator-brokers.json"
  local agent_secret operator_secret

  # OpenClaw may traverse this directory only to its own 0600 credential file.
  # It cannot list the directory or read any broker-owned credential.
  install -d -m 0711 -o root -g hf-broker "$HF_BROKER_RUN_DIR"
  agent_secret="$(od -An -N48 -tx1 /dev/urandom | tr -d ' \n')"
  operator_secret="$(od -An -N48 -tx1 /dev/urandom | tr -d ' \n')"
  printf '%s\n' "$broker_token" > "$token_file"
  printf '%s\n' "$agent_secret" > "$agent_secret_file"
  printf '%s\n' "$operator_secret" > "$operator_secret_file"
  printf 'default = %s\n' "$agent_secret" > "$broker_agent_secrets"
  printf 'mlclaw-control = %s\n' "$operator_secret" > "$broker_operator_secrets"
  printf '{"version":1,"brokers":[{"id":"hf-broker","label":"Hugging Face","url":"http://127.0.0.1:7864","token_file":"%s"}]}\n' "$operator_secret_file" > "$operator_brokers_file"
  chown hf-broker:hf-broker "$token_file" "$broker_agent_secrets" "$broker_operator_secrets"
  chown "$OPENCLAW_IDENTITY" "$agent_secret_file"
  chmod 0600 "$token_file" "$agent_secret_file" "$operator_secret_file" "$broker_agent_secrets" "$broker_operator_secrets" "$operator_brokers_file"

  if [ -z "${MLCLAW_STATE_MOUNT_DIR:-}" ]; then
    STATE_HF_TOKEN="$broker_token"
  fi

  export MLCLAW_HF_BROKER_URL="http://127.0.0.1:7863"
  export MLCLAW_HF_BROKER_AGENT_SECRET_FILE="$agent_secret_file"
  export HF_BROKER_AGENT_ENDPOINT="tcp://127.0.0.1:7863"
  export HF_BROKER_SHARED_SECRET_FILE="$agent_secret_file"
  if [ "${MLCLAW_GATEWAY_LOCATION:-}" = "local" ]; then
    export MLCLAW_TRUSTED_HF_TOKEN_FILE="$token_file"
  fi
  if [ -z "${MLCLAW_OPERATOR_BROKERS_FILE:-}" ]; then
    export MLCLAW_OPERATOR_BROKERS_FILE="$operator_brokers_file"
  fi
  HF_BROKER_ENABLED=1
}

prepare_telegram_bot_mux_secrets() {
  local physical_token="$1"

  install -d -m 0710 -o root -g mlclaw-protected "$TELEGRAM_BOT_MUX_RUN_DIR"
  rm -f -- "$TELEGRAM_BOT_MUX_OPENCLAW_TOKEN_FILE" "$TELEGRAM_BOT_MUX_UNYOLO_TOKEN_FILE"
  install -m 0600 -o telegram-bot-mux -g telegram-bot-mux /dev/null "$TELEGRAM_BOT_MUX_PHYSICAL_TOKEN_FILE"
  printf '%s\n' "$physical_token" > "$TELEGRAM_BOT_MUX_PHYSICAL_TOKEN_FILE"
  /usr/local/bin/telegram-bot-mux generate-client-token --out "$TELEGRAM_BOT_MUX_OPENCLAW_TOKEN_FILE"
  /usr/local/bin/telegram-bot-mux generate-client-token --out "$TELEGRAM_BOT_MUX_UNYOLO_TOKEN_FILE"
  chown root:mlclaw-protected "$TELEGRAM_BOT_MUX_OPENCLAW_TOKEN_FILE" "$TELEGRAM_BOT_MUX_UNYOLO_TOKEN_FILE"
  chmod 0600 "$TELEGRAM_BOT_MUX_PHYSICAL_TOKEN_FILE"
  chmod 0640 "$TELEGRAM_BOT_MUX_OPENCLAW_TOKEN_FILE" "$TELEGRAM_BOT_MUX_UNYOLO_TOKEN_FILE"
  cat > "$TELEGRAM_BOT_MUX_CONFIG_FILE" <<EOF
{"version":1,"listen":"127.0.0.1:7865","database":"$TELEGRAM_BOT_MUX_DATABASE","telegram":{"token_file":"$TELEGRAM_BOT_MUX_PHYSICAL_TOKEN_FILE","allowed_updates":["message","edited_message","channel_post","edited_channel_post","callback_query","my_chat_member"]},"clients":[{"id":"openclaw","token_file":"$TELEGRAM_BOT_MUX_OPENCLAW_TOKEN_FILE"},{"id":"unyolo","token_file":"$TELEGRAM_BOT_MUX_UNYOLO_TOKEN_FILE"}],"routing":{"mode":"exclusive","rules":[{"clients":["unyolo"],"update_types":["callback_query"],"callback_data_prefixes":["bk:"]}],"fallback_clients":["openclaw"]}}
EOF
  chown telegram-bot-mux:telegram-bot-mux "$TELEGRAM_BOT_MUX_CONFIG_FILE"
  chmod 0600 "$TELEGRAM_BOT_MUX_CONFIG_FILE"
  export TELEGRAM_BOT_TOKEN="$(cat "$TELEGRAM_BOT_MUX_OPENCLAW_TOKEN_FILE")"
  export TELEGRAM_API_ROOT="$TELEGRAM_BOT_MUX_OPENCLAW_BASE"
  export MLCLAW_TELEGRAM_BOT_MUX_CONFIG_PATH="$TELEGRAM_BOT_MUX_CONFIG_FILE"
  TELEGRAM_BOT_MUX_ENABLED=1
}

prepare_unyolo_telegram_secret() {
  local approval_token="${MLCLAW_UNYOLO_TELEGRAM_BOT_TOKEN:-}"
  local conversation_token="${TELEGRAM_BOT_TOKEN:-}"
  local chat_id="${TELEGRAM_ALLOWED_USERS:-}"

  if [ -z "$conversation_token" ]; then
    if [ -n "$approval_token" ]; then
      echo "[unyolo-telegram] approval bot requires the ML Claw Telegram channel" >&2
      return 1
    fi
    return
  fi
  if [ -n "${TELEGRAM_PROXY:-}" ] || [ -n "${TELEGRAM_API_ROOT:-}" ]; then
    echo "[unyolo-telegram] Telegram transport is managed by ML Claw" >&2
    return 1
  fi
  if [[ ! "$chat_id" =~ ^[1-9][0-9]*$ ]]; then
    echo "[unyolo-telegram] TELEGRAM_ALLOWED_USERS must be one positive private-chat user ID" >&2
    return 1
  fi

  install -d -m 0710 -o root -g mlclaw-protected "$UNYOLO_TELEGRAM_RUN_DIR"
  if [ -z "$approval_token" ]; then
    prepare_telegram_bot_mux_secrets "$conversation_token"
    UNYOLO_TELEGRAM_TOKEN_FILE="$TELEGRAM_BOT_MUX_UNYOLO_TOKEN_FILE"
  else
    if [ "$approval_token" = "$conversation_token" ]; then
      echo "[unyolo-telegram] omit MLCLAW_UNYOLO_TELEGRAM_BOT_TOKEN to share the conversation bot" >&2
      return 1
    fi
    printf '%s\n' "$approval_token" > "$UNYOLO_TELEGRAM_TOKEN_FILE"
    chown unyolo-telegram:mlclaw-protected "$UNYOLO_TELEGRAM_TOKEN_FILE"
    chmod 0640 "$UNYOLO_TELEGRAM_TOKEN_FILE"
  fi
  export MLCLAW_UNYOLO_TELEGRAM_CONFIG_PATH="$UNYOLO_TELEGRAM_CONFIG_FILE"
  UNYOLO_TELEGRAM_ENABLED=1
}

restore_protected_state() {
  install -d -m 0710 -o root -g mlclaw-protected "$PROTECTED_STATE_DIR"
  if [ -d "$RESTORED_PROTECTED_STATE_DIR" ]; then
    find "$PROTECTED_STATE_DIR" -mindepth 1 -maxdepth 1 -exec rm -rf -- {} +
    cp -a "$RESTORED_PROTECTED_STATE_DIR/." "$PROTECTED_STATE_DIR/"
    rm -rf "$RESTORED_PROTECTED_STATE_DIR"
  fi
  # unYOLO replaces incompatible pre-release state contracts in place. Reset
  # the broker state once for this contract, then preserve the new state across
  # restarts. Superseded state is removed instead of imported.
  rm -rf "$PROTECTED_STATE_DIR/hf-broker"
  install -d -m 0710 -o root -g mlclaw-protected "$PROTECTED_STATE_DIR/control"
  install -d -m 0710 -o root -g mlclaw-protected "$PROTECTED_STATE_DIR/unyolo"
  if [ ! -f "$HF_BROKER_STATE_CONTRACT_FILE" ] || [ -L "$HF_BROKER_STATE_CONTRACT_FILE" ] || \
    [ "$(cat "$HF_BROKER_STATE_CONTRACT_FILE" 2>/dev/null || true)" != "$HF_BROKER_STATE_CONTRACT" ]; then
    rm -rf "$HF_BROKER_STATE_DIR"
    rm -f "$HF_BROKER_STATE_CONTRACT_FILE"
    printf '%s\n' "$HF_BROKER_STATE_CONTRACT" > "$HF_BROKER_STATE_CONTRACT_FILE"
  fi
  chown root:root "$HF_BROKER_STATE_CONTRACT_FILE"
  chmod 0600 "$HF_BROKER_STATE_CONTRACT_FILE"
  install -d -m 0700 -o hf-broker -g hf-broker "$HF_BROKER_STATE_DIR"
  rm -rf -- \
    "$HF_BROKER_STATE_DIR/grants" \
    "$HF_BROKER_STATE_DIR/operations" \
    "$HF_BROKER_STATE_DIR/plans"
  rm -f -- \
    "$HF_BROKER_STATE_DIR/grants.json" \
    "$HF_BROKER_STATE_DIR/operations.json"
  chown -R root:root "$PROTECTED_STATE_DIR/control"
  chown -R hf-broker:hf-broker "$HF_BROKER_STATE_DIR"
  chown root:mlclaw-protected "$PROTECTED_STATE_DIR" "$PROTECTED_STATE_DIR/control" "$PROTECTED_STATE_DIR/unyolo"
  chmod 0710 "$PROTECTED_STATE_DIR" "$PROTECTED_STATE_DIR/control" "$PROTECTED_STATE_DIR/unyolo"
  chmod 0700 "$HF_BROKER_STATE_DIR"
}

prepare_telegram_bot_mux_state() {
  if [ "$TELEGRAM_BOT_MUX_ENABLED" != "1" ]; then
    return
  fi
  install -d -m 0700 -o telegram-bot-mux -g telegram-bot-mux "$TELEGRAM_BOT_MUX_STATE_DIR"
  chown -R telegram-bot-mux:telegram-bot-mux "$TELEGRAM_BOT_MUX_STATE_DIR"
  chmod 0700 "$TELEGRAM_BOT_MUX_STATE_DIR"
}

prepare_unyolo_telegram_state() {
  if [ "$UNYOLO_TELEGRAM_ENABLED" != "1" ]; then
    return
  fi
  if [ "$HF_BROKER_ENABLED" != "1" ]; then
    echo "[unyolo-telegram] approval ingress requires HF Broker" >&2
    return 1
  fi

  install -d -m 0700 -o unyolo-telegram -g unyolo-telegram "$UNYOLO_TELEGRAM_STATE_DIR"
  chown -R unyolo-telegram:unyolo-telegram "$UNYOLO_TELEGRAM_STATE_DIR"
  chmod 0700 "$UNYOLO_TELEGRAM_STATE_DIR"
  if [ -L "$UNYOLO_TELEGRAM_INBOX_KEY_FILE" ]; then
    echo "[unyolo-telegram] inbox key must not be a symlink" >&2
    return 1
  fi
  if [ ! -e "$UNYOLO_TELEGRAM_INBOX_KEY_FILE" ]; then
    od -An -N32 -tx1 /dev/urandom | tr -d ' \n' > "$UNYOLO_TELEGRAM_INBOX_KEY_FILE"
  fi
  if [ ! -f "$UNYOLO_TELEGRAM_INBOX_KEY_FILE" ] || \
    ! grep -Eq '^[0-9a-f]{64}$' "$UNYOLO_TELEGRAM_INBOX_KEY_FILE"; then
    echo "[unyolo-telegram] inbox key is invalid" >&2
    return 1
  fi
  chown unyolo-telegram:unyolo-telegram "$UNYOLO_TELEGRAM_INBOX_KEY_FILE"
  chmod 0600 "$UNYOLO_TELEGRAM_INBOX_KEY_FILE"

  chown root:unyolo-telegram "$HF_BROKER_RUN_DIR/operator-secret"
  chmod 0640 "$HF_BROKER_RUN_DIR/operator-secret"
  local telegram_api_base_json=""
  if [ "$TELEGRAM_BOT_MUX_ENABLED" = "1" ]; then
    telegram_api_base_json=",\"telegram_api_base\":\"$TELEGRAM_BOT_MUX_UNYOLO_BASE\""
  fi
  printf '{"telegram_bot_token_file":"%s"%s,"telegram_chat_id":%s,"inbox_path":"%s","inbox_key_file":"%s","routes":{"h":{"operator_endpoint":"http://127.0.0.1:7864","operator_token_file":"%s"}}}\n' \
    "$UNYOLO_TELEGRAM_TOKEN_FILE" \
    "$telegram_api_base_json" \
    "$TELEGRAM_ALLOWED_USERS" \
    "$UNYOLO_TELEGRAM_INBOX_FILE" \
    "$UNYOLO_TELEGRAM_INBOX_KEY_FILE" \
    "$HF_BROKER_RUN_DIR/operator-secret" > "$UNYOLO_TELEGRAM_CONFIG_FILE"
  chown unyolo-telegram:unyolo-telegram "$UNYOLO_TELEGRAM_CONFIG_FILE"
  chmod 0600 "$UNYOLO_TELEGRAM_CONFIG_FILE"
}

render_hf_broker_policy() {
  if [ "$HF_BROKER_ENABLED" != "1" ]; then
    return
  fi

  local state_bucket="${OPENCLAW_HF_STATE_BUCKET:-}"
  local protected_target=()
  if [ -n "$state_bucket" ]; then
    protected_target=(--protect-bucket "$state_bucket")
  fi

  install -d -m 0700 -o hf-broker -g hf-broker "$HF_BROKER_POLICY_DIR"
  gosu hf-broker:hf-broker /usr/local/bin/hf-broker policy render \
    --preset request-all-agent-operations \
    --client default \
    --profile-out "$HF_BROKER_POLICY_DIR/profile.json" \
    --output "$HF_BROKER_SCOPE_FILE" \
    --manifest-out "$HF_BROKER_POLICY_DIR/manifest.json" \
    --replace \
    "${protected_target[@]}"
  gosu hf-broker:hf-broker /usr/local/bin/hf-broker doctor policy \
    --profile "$HF_BROKER_POLICY_DIR/profile.json" \
    --scope "$HF_BROKER_SCOPE_FILE" \
    --manifest "$HF_BROKER_POLICY_DIR/manifest.json"
}

start_hf_broker() {
  if [ "$HF_BROKER_ENABLED" != "1" ]; then
    return
  fi

  install -d -m 0700 -o hf-broker -g hf-broker "$HF_BROKER_STATE_DIR"
  chown -R hf-broker:hf-broker "$HF_BROKER_STATE_DIR"
  chmod 0700 "$HF_BROKER_STATE_DIR"
  local telegram_env=()
  if [ "$UNYOLO_TELEGRAM_ENABLED" = "1" ]; then
    telegram_env=(
      "HF_BROKER_TELEGRAM_BOT_TOKEN_FILE=$UNYOLO_TELEGRAM_TOKEN_FILE"
      "HF_BROKER_TELEGRAM_CHAT_ID=$TELEGRAM_ALLOWED_USERS"
    )
    if [ "$TELEGRAM_BOT_MUX_ENABLED" = "1" ]; then
      telegram_env+=("HF_BROKER_TELEGRAM_API_BASE=$TELEGRAM_BOT_MUX_UNYOLO_BASE")
    fi
  fi

  env \
    -u TELEGRAM_BOT_TOKEN \
    -u TELEGRAM_ALLOWED_USERS \
    -u TELEGRAM_PROXY \
    -u TELEGRAM_API_ROOT \
    HF_BROKER_HF_TOKEN_FILE="$HF_BROKER_RUN_DIR/hf-token" \
    HF_BROKER_SECRETS_FILE="$HF_BROKER_RUN_DIR/agent-secrets.conf" \
    HF_BROKER_OPERATOR_SECRETS_FILE="$HF_BROKER_RUN_DIR/operator-secrets.conf" \
    HF_BROKER_AGENT_ENDPOINT=tcp://127.0.0.1:7863 \
    HF_BROKER_OPERATOR_ENDPOINT=tcp://127.0.0.1:7864 \
    HF_BROKER_SCOPE_FILE="$HF_BROKER_SCOPE_FILE" \
    HF_BROKER_XET_PYTHON=/usr/bin/python3 \
    HF_BROKER_STATE_DIR="$HF_BROKER_STATE_DIR" \
    "${telegram_env[@]}" \
    gosu hf-broker /usr/local/bin/hf-broker &
  HF_BROKER_PID=$!

  for _ in $(seq 1 50); do
    if ! kill -0 "$HF_BROKER_PID" 2>/dev/null; then
      echo "[hf-broker] process exited during startup" >&2
      wait "$HF_BROKER_PID"
      return 1
    fi
    if node -e "fetch('http://127.0.0.1:7863/healthz').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"; then
      echo "[hf-broker] agent and operator listeners ready"
      return
    fi
    sleep 0.1
  done
  echo "[hf-broker] startup timed out" >&2
  kill "$HF_BROKER_PID" 2>/dev/null || true
  return 1
}

chown_openclaw_live() {
  chown "$OPENCLAW_IDENTITY" "$LIVE_DIR"
  find "$LIVE_DIR" -mindepth 1 -maxdepth 1 ! -name .mlclaw-protected -exec chown -R "$OPENCLAW_IDENTITY" {} +
}

if [ "${MLCLAW_GATEWAY_DISABLED:-0}" = "1" ]; then
  echo "[mlclaw] gateway disabled"
  exit 0
fi

prepare_hf_broker
prepare_unyolo_telegram_secret
export MLCLAW_PROTECTED_STATE_DIR="$PROTECTED_STATE_DIR"
export MLCLAW_OPENAI_CREDENTIAL_STORE_FILE="$PROTECTED_STATE_DIR/control/openai-api-key.enc"
# The broker token and legacy token variables must not enter the control plane
# or OpenClaw. The broker token is already in its owned runtime file before the
# environment is scrubbed; local bucket state sync receives a dedicated copy
# only around trusted restore and supervisor execution.
unset MLCLAW_BROKER_HF_TOKEN MLCLAW_UNYOLO_TELEGRAM_BOT_TOKEN MLCLAW_ROUTER_TOKEN HF_ROUTER_TOKEN HF_TOKEN HUGGINGFACE_HUB_TOKEN

# State, workspace, and config paths are ALWAYS derived from the live dir,
# never inherited: older deployments set OPENCLAW_STATE_DIR=/data/... as Space
# variables, and any state written outside the live dir would be invisible to
# snapshot/restore — the bucket would back up an empty tree.
export OPENCLAW_STATE_DIR="$LIVE_DIR/.openclaw"
export OPENCLAW_WORKSPACE_DIR="$LIVE_DIR/workspace"
export OPENCLAW_CONFIG_PATH="$LIVE_DIR/.openclaw/openclaw.json"
export OPENCLAW_GATEWAY_PORT="${MLCLAW_OPENCLAW_PORT:-7861}"
STATE_DIR="$OPENCLAW_STATE_DIR"
WORKSPACE_DIR="$OPENCLAW_WORKSPACE_DIR"
CONFIG_PATH="$OPENCLAW_CONFIG_PATH"

# Restore durable state from the bucket BEFORE creating any live dirs: the
# restore target is the live dir itself and must not exist yet. Fails the boot
# if the bucket has state but its manifest or every snapshot is corrupt (never
# silently start fresh then snapshot over a bucket that still holds data).
echo "[hf-state-sync] starting restore"
RESTORE_TIMEOUT_SECONDS="${MLCLAW_RESTORE_TIMEOUT_SECONDS:-180}"
env MLCLAW_STATE_HF_TOKEN="$STATE_HF_TOKEN" node /app/hf-state-sync.js prepare-restore
if command -v timeout >/dev/null 2>&1; then
  env MLCLAW_STATE_HF_TOKEN="$STATE_HF_TOKEN" timeout "${RESTORE_TIMEOUT_SECONDS}s" gosu "$OPENCLAW_IDENTITY" node /app/hf-state-sync.js restore
else
  env MLCLAW_STATE_HF_TOKEN="$STATE_HF_TOKEN" gosu "$OPENCLAW_IDENTITY" node /app/hf-state-sync.js restore
fi
echo "[hf-state-sync] restore complete"
restore_protected_state

if [ -n "${MLCLAW_STATE_MOUNT_DIR:-}" ]; then
  chown root:root "$MLCLAW_STATE_MOUNT_DIR"
  chmod 0700 "$MLCLAW_STATE_MOUNT_DIR"
fi

mkdir -p "$LIVE_DIR" "$WORKSPACE_DIR" "$STATE_DIR"
chown_openclaw_live
install -d -m 0710 -o root -g mlclaw-protected "$PROTECTED_STATE_DIR"
install -d -m 0710 -o root -g mlclaw-protected "$PROTECTED_STATE_DIR/control"
prepare_telegram_bot_mux_state
prepare_unyolo_telegram_state
render_hf_broker_policy
start_hf_broker

if [ -n "${OPENCLAW_AGENT_NAME:-}" ]; then
  printf "%s\n" "$OPENCLAW_AGENT_NAME" > "$STATE_DIR/agent-name.txt"
fi

if [ ! -f "$CONFIG_PATH" ]; then
  cp /app/openclaw.default.json "$CONFIG_PATH"
fi
chown_openclaw_live

echo "[unyolo] preparing renamed OpenClaw plugin configuration"
env HOME=/home/node USER=node LOGNAME=node \
  gosu "$OPENCLAW_IDENTITY" node /app/mlclaw-space-runtime.js prepare-unyolo-config

# Let OpenClaw create its native workspace files. The ML Claw runtime waits for
# native onboarding to finish before adding workspace tooling; OpenClaw treats
# any preinstalled workspace skills as evidence that onboarding already ran.
echo "[openclaw-setup] initializing baseline workspace"
env \
  -u MLCLAW_CREDENTIAL_KEY \
  -u MLCLAW_SESSION_SECRET \
  -u SESSION_SECRET \
  -u OAUTH_CLIENT_SECRET \
  -u HF_TOKEN \
  -u HUGGINGFACE_HUB_TOKEN \
  HOME=/home/node USER=node LOGNAME=node \
  gosu "$OPENCLAW_IDENTITY" node /app/openclaw.mjs setup --baseline --workspace "$WORKSPACE_DIR"
echo "[openclaw-setup] baseline workspace ready"

if [ -n "${OPENCLAW_MODEL:-}" ]; then
  echo "[huggingface-config] configuring selected Hugging Face model"
  gosu "$OPENCLAW_IDENTITY" node /app/scripts/configure-huggingface-model.mjs "$CONFIG_PATH"
  echo "[huggingface-config] Hugging Face model configured"
fi

if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ -n "${TELEGRAM_ALLOWED_USERS:-}" ]; then
  echo "[telegram-config] configuring Telegram channel"
  gosu "$OPENCLAW_IDENTITY" node /app/scripts/configure-telegram.mjs "$CONFIG_PATH" "$TELEGRAM_ALLOWED_USERS"
  echo "[telegram-config] Telegram channel configured"
fi

if [ -n "${TELEGRAM_BOT_TOKEN:-}" ] && [ "$TELEGRAM_BOT_MUX_ENABLED" != "1" ] && [ "${OPENCLAW_TELEGRAM_CONNECTIVITY_PROBE:-0}" = "1" ]; then
  if command -v curl >/dev/null 2>&1; then
    PROBE_OUT="/tmp/openclaw-telegram-probe.json"
    if curl -fsS --connect-timeout 20 --max-time 30 \
      "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/getMe" \
      -o "$PROBE_OUT"; then
      gosu "$OPENCLAW_IDENTITY" node /app/scripts/report-telegram-probe.mjs "$PROBE_OUT" || true
    else
      echo "[telegram-probe] curl getMe failed"
    fi
    rm -f "$PROBE_OUT"
  else
    echo "[telegram-probe] curl is unavailable; skipping"
  fi
fi

chown_openclaw_live
# The wrapper remains the trusted root supervisor so its OAuth credentials and
# process environment are not readable by the unprivileged OpenClaw child. The
# state supervisor stages live files in a separate secret-free node process;
# only the trusted parent uploads the resulting archive.
if [ -n "$STATE_HF_TOKEN" ]; then
  export MLCLAW_STATE_HF_TOKEN="$STATE_HF_TOKEN"
fi
exec node /app/hf-state-sync.js supervise -- node /app/mlclaw-space-runtime.js
