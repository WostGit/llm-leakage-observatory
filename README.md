# LLM Leakage Observatory

A continuous RAG-updated HTML5 SoK poster and snapshot publication system for LLM privacy leakage.

- **Local synthesis:** MLX + `gemma4-e2b` on Apple Silicon
- **Frontend:** Vite + React + TypeScript + Tailwind
- **Storage:** JSON snapshots first, DuckDB/LanceDB hooks prepared
- **Publishing:** GitHub Pages first
- **Exports:** A0 poster PDF + A4 SoK report PDF for frozen citable snapshots

## What this repo does

```text
papers + metadata -> RAG/LLM runner -> data/live/sok.json -> poster/report -> PDFs -> GitHub Pages
```

The live HTML poster can update continuously. PDF exports are immutable snapshots: each snapshot contains the exact `sok.json`, bibliography, manifest, poster PDF, report PDF, and hashes for that moment.

## Quick start

```bash
npm install
python -m venv .venv
source .venv/bin/activate
pip install -e .
npm run dev
```

Open the local Vite URL and view the poster.

## Generate a snapshot

```bash
llmo validate
llmo snapshot --label 2026-06-05
npm run export:poster
npm run export:report
```

The snapshot is written to:

```text
snapshots/YYYY-MM-DD/
```

## Local MLX runner

Set the model in `data/live/config.yaml` or pass it by CLI. The default is:

```text
gemma4-e2b
```

You will need MLX-compatible weights available to `mlx-lm` under the configured model id/path.

## Core principle

The LLM never directly edits the poster HTML. It updates structured JSON. The poster and report render deterministically from that JSON.

## Repository layout

```text
apps/poster/        Vite React poster/report app
rag/                Python RAG + MLX runner skeleton
scripts/            export and validation helpers
data/live/          current mutable SoK data
snapshots/          immutable PDF/report snapshots
.github/workflows/  GitHub Pages deployment
```
