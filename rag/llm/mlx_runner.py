from __future__ import annotations

from dataclasses import dataclass


@dataclass
class MLXConfig:
    model_id: str = 'gemma4-e2b'
    max_tokens: int = 1600
    temperature: float = 0.2


class MLXRunner:
    """Thin mlx-lm wrapper for local Apple Silicon synthesis.

    This intentionally stays optional: GitHub Pages can build the static poster
    without MLX installed. Run this locally or on a self-hosted macOS runner.
    """

    def __init__(self, config: MLXConfig | None = None):
        self.config = config or MLXConfig()
        self.model = None
        self.tokenizer = None

    def load(self) -> None:
        try:
            from mlx_lm import load
        except ImportError as exc:
            raise RuntimeError('Install MLX dependencies with: pip install -e .[mlx]') from exc
        self.model, self.tokenizer = load(self.config.model_id)

    def generate(self, prompt: str) -> str:
        try:
            from mlx_lm import generate
        except ImportError as exc:
            raise RuntimeError('Install MLX dependencies with: pip install -e .[mlx]') from exc
        if self.model is None or self.tokenizer is None:
            self.load()
        return generate(
            self.model,
            self.tokenizer,
            prompt=prompt,
            max_tokens=self.config.max_tokens,
            temp=self.config.temperature,
        )
