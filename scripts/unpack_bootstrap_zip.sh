#!/usr/bin/env bash
set -euo pipefail

SOURCE="${1:-_bootstrap/llm-leakage-observatory.zip.b64}"
TARGET="${2:-.}"
TMP_DIR="$(mktemp -d)"

if [[ ! -f "$SOURCE" ]]; then
  echo "Missing bootstrap archive: $SOURCE" >&2
  echo "Create it with:" >&2
  echo "  mkdir -p _bootstrap" >&2
  echo "  base64 /path/to/llm-leakage-observatory.zip > _bootstrap/llm-leakage-observatory.zip.b64" >&2
  exit 1
fi

base64 -d "$SOURCE" > "$TMP_DIR/source.zip"
unzip -q "$TMP_DIR/source.zip" -d "$TMP_DIR/unpacked"

if [[ -d "$TMP_DIR/unpacked/llm-leakage-observatory" ]]; then
  ROOT="$TMP_DIR/unpacked/llm-leakage-observatory"
else
  ROOT="$TMP_DIR/unpacked"
fi

rsync -a --exclude '.git' "$ROOT/" "$TARGET/"

echo "Unpacked bootstrap repo into $TARGET"
echo "Next steps:"
echo "  git add -A"
echo "  git commit -m 'Unpack bootstrap repo zip'"
echo "  git push"
