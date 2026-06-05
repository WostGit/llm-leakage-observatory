from __future__ import annotations

import json
import shutil
import hashlib
from datetime import datetime, timezone
from pathlib import Path

import typer

app = typer.Typer(help='LLM Leakage Observatory CLI')
ROOT = Path(__file__).resolve().parents[1]
LIVE = ROOT / 'data' / 'live'


def sha256(path: Path) -> str:
    h = hashlib.sha256()
    with path.open('rb') as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b''):
            h.update(chunk)
    return h.hexdigest()


@app.command()
def validate() -> None:
    data = json.loads((LIVE / 'sok.json').read_text())
    bibliography = {p['id'] for p in json.loads((LIVE / 'bibliography.json').read_text())}
    badges = set(data['evidence_badges'].keys())
    errors: list[str] = []
    for claim in data.get('claims', []):
        if not claim.get('supporting_papers'):
            errors.append(f"Claim {claim['id']} has no supporting papers")
        for pid in claim.get('supporting_papers', []):
            if pid not in bibliography:
                errors.append(f"Claim {claim['id']} references unknown paper {pid}")
        for badge in claim.get('evidence_badges', []):
            if badge not in badges:
                errors.append(f"Claim {claim['id']} uses invalid badge {badge}")
    for surface in data.get('leakage_surfaces', []):
        if not surface.get('limitations'):
            errors.append(f"Surface {surface['id']} lacks limitations")
    if errors:
        for error in errors:
            typer.echo(f'ERROR: {error}')
        raise typer.Exit(1)
    typer.echo('SoK snapshot data is valid.')


@app.command()
def snapshot(label: str = typer.Option(None, help='Snapshot label, defaults to UTC date')) -> None:
    validate()
    if not label:
        label = datetime.now(timezone.utc).strftime('%Y-%m-%d')
    out = ROOT / 'snapshots' / label
    out.mkdir(parents=True, exist_ok=True)
    for name in ['sok.json', 'bibliography.json', 'config.yaml']:
        src = LIVE / name
        if src.exists():
            shutil.copy2(src, out / name)
    manifest = {
        'snapshot_id': label,
        'created_at': datetime.now(timezone.utc).isoformat(),
        'project': 'llm-leakage-observatory',
        'llm_runner': {'engine': 'MLX', 'model': 'gemma4-e2b'},
        'files': {}
    }
    for p in sorted(out.iterdir()):
        if p.is_file() and p.name != 'manifest.json':
            manifest['files'][p.name] = {'sha256': sha256(p), 'bytes': p.stat().st_size}
    (out / 'manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')
    typer.echo(f'Wrote snapshot {out}')


@app.command()
def discover(limit: int = 25) -> None:
    typer.echo(f'Discovery stub: fetch up to {limit} new candidate papers from arXiv/OpenAlex in a future implementation.')


@app.command(name='all')
def all_steps(limit: int = 25) -> None:
    discover(limit=limit)
    validate()
    snapshot()

if __name__ == '__main__':
    app()
