# Storage Bucket Sync

The durable ML Claw state bucket is available as:

```bash
echo "$OPENCLAW_HF_STATE_BUCKET"
```

List buckets:

```bash
hf buckets list
```

Upload a file to an explicit bucket path:

```bash
hf upload "$OPENCLAW_HF_STATE_BUCKET" ./local-file.txt examples/local-file.txt
```
