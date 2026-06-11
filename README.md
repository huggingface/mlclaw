<p align="center">
  <img src="assets/huggingclaw.svg" alt="Hugging Claw" width="180">
</p>

# Hugging Claw

Deploy a private [OpenClaw](https://openclaw.ai) agent to Hugging Face with one
local command.

Hugging Claw creates a private Hugging Face Docker Space for the agent and a
private Hugging Face Storage Bucket for durable state. The Space can be rebuilt
or restarted; the bucket keeps the agent's snapshots.

## Requirements

- A Hugging Face account.
- The Hugging Face CLI installed as `hf`.
- `hf auth login` completed locally.
- Optional: a Telegram bot token from BotFather.

## Deploy

Run the installer from your own machine:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/osolmaz/huggingclaw/main/hclaw.sh) \
  bootstrap \
  --telegram-token-file ~/secrets/bob_bot.env \
  --telegram-user-id 1234567890
```

The command reads your Hugging Face token from `HF_TOKEN`, `HF_TOKEN_PATH`,
`$HF_HOME/token`, or the normal `hf auth login` cache. It does not ask you to
paste Hugging Face credentials into a hosted app.

If you do not want Telegram yet, omit the Telegram flags:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/osolmaz/huggingclaw/main/hclaw.sh) bootstrap
```

## What It Creates

- A private Hugging Face Docker Space.
- A private Hugging Face Storage Bucket.
- Space variables and write-only Space secrets.
- Generated Space source from this repo.

If Hugging Claw generates an OpenClaw gateway token, it prints that token once.
Save it when you see it. Hugging Face stores Space secrets as write-only values,
so the installer cannot read it back later.

## Commands

Update an existing deployment from the current Hugging Claw source:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/osolmaz/huggingclaw/main/hclaw.sh) \
  update osolmaz/bob
```

Check a deployment:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/osolmaz/huggingclaw/main/hclaw.sh) \
  doctor osolmaz/bob
```

`doctor --fix` only applies safe Space configuration repairs. It does not read
secret values and does not modify bucket objects.

## Telegram Notes

Private Spaces use Telegram long polling, not webhooks. Telegram cannot call a
private Space webhook because Hugging Face requires authentication before the
request reaches the app.

Some Hugging Face Space runtimes may have unreliable outbound access to
`api.telegram.org`. If the Space logs Telegram connection timeouts, keep the
Space private and configure `TELEGRAM_PROXY` or `TELEGRAM_API_ROOT`.

## Development

```bash
npm install
npm run build
npm run typecheck
npm test
npm run check:secrets
```

## License

[MIT](LICENSE)
