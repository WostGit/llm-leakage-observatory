# SoK Methodology Standard

This document defines the publication standard for LLM Leakage Observatory snapshots.

The live site may contain seed/demo material. A PDF may only be labeled **paper-grade SoK snapshot** when it passes the gates below.

## Research questions

- RQ1: Which leakage surfaces exist across modern LLM systems?
- RQ2: Which attacker capabilities are assumed by each attack or audit?
- RQ3: Which observable signals leak: text, logits, logprobs, embeddings, activations, timing, traces, retrieval results, tool calls, internal messages, telemetry, or memory writes?
- RQ4: Which assets are inferred: training membership, verbatim text, PII, system prompts, private documents, user profiles, source identity, erased knowledge, or hidden instructions?
- RQ5: Which defenses protect which signals, and what adjacent channels remain exposed?
- RQ6: Which claims are production-observed, multi-model empirical, independently reproduced, benchmark-only, synthetic, white-box-only, lab-only, adaptive, costed, or unreplicated?

## Corpus construction

The target paper-grade corpus is built from arXiv, OpenAlex, Semantic Scholar, ACL Anthology, USENIX Security, IEEE S&P, ACM CCS, NDSS, NeurIPS, ICML, ICLR, ACL, EMNLP, SaTML, PETS/PoPETs, and AsiaCCS.

### Query families

- `LLM memorization`
- `training data extraction large language models`
- `membership inference large language models`
- `logprob leakage LLM`
- `logits membership inference language model`
- `perplexity privacy leakage language model`
- `embedding inversion text embeddings`
- `vector database privacy LLM`
- `hidden state leakage LLM`
- `split inference privacy LLM`
- `KV cache side channel LLM`
- `prompt caching timing attack LLM`
- `RAG privacy leakage`
- `retrieval augmented generation membership inference`
- `agent memory leakage LLM`
- `tool call exfiltration LLM agent`
- `chain-of-thought privacy leakage`
- `LLM unlearning privacy`
- `machine unlearning large language models`

## Inclusion criteria

Include a work if it demonstrates, defends against, benchmarks, audits, or systematizes leakage in LLMs or LLM applications. LLM applications include serving systems, APIs, RAG, vector databases, tools, agents, memories, multimodal frontends, and model-update pipelines.

## Exclusion criteria

Exclude generic jailbreak, safety, hallucination, copyright, policy, or cybersecurity papers unless they include a technical privacy leakage mechanism, hidden context disclosure, training data extraction, membership inference, prompt/system prompt leakage, memory leakage, RAG leakage, tool exfiltration, or unlearning/deletion failure.

## Screening pipeline

1. Retrieve candidates from query families.
2. Deduplicate arXiv / conference / workshop versions.
3. Screen title and abstract.
4. Full-text screen for leakage mechanism, defense, audit, or benchmark.
5. Snowball from high-impact included works.
6. Code every included work using the schema in `data/schema/paper.schema.json`.
7. Assign evidence badges and limitations.
8. Validate claim-to-paper traceability before PDF export.

## Paper-grade minimums

A snapshot may be called paper-grade only if it satisfies all of these:

- at least 80 included papers
- at least 8 leakage origins represented
- at least 10 observable signal types represented
- every major claim has at least 2 supporting works or is marked `emerging`
- every major claim has limitations
- every evidence badge has justification
- every defense has protected signals, uncovered signals, attacker assumptions, utility cost, and residual gap
- PRISMA-style counts are present
- bibliography includes authors, title, year, venue/source, URL or DOI/arXiv ID, and coded surfaces
- generated PDFs include snapshot ID, methodology version, corpus version, commit SHA, and data hashes

## Current v0.1 status

The current `2026-06-05-seed` snapshot is a seed scaffold, not a paper-grade SoK. It exists to validate the infrastructure and visual schema. It must not be presented as a complete SoK paper.
