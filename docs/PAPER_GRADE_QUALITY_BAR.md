# Paper-Grade Quality Bar

This project uses two labels:

- **seed snapshot**: validates infrastructure, schema, and rendering.
- **paper-grade SoK snapshot**: suitable to cite as a frozen literature snapshot.

A snapshot is **not** paper-grade just because it renders as a PDF.

## Minimum bar for a 10/10 SoK snapshot

| Area | Gate |
|---|---|
| Corpus size | At least 80 included papers and at least 250 screened candidates. |
| Screening transparency | Retrieval count, duplicate count, title/abstract exclusions, full-text exclusions, and final inclusion count. |
| Claim traceability | Every top-level claim maps to supporting papers, evidence badges, limitations, and leakage surfaces. |
| Evidence grading | Badges must be justified, not merely assigned. |
| Taxonomy coverage | At least 8 leakage origins, 10 observable signal types, 8 attacker classes, and 8 leaked asset classes. |
| Attack critique | Every attack family has threat-model realism, access assumptions, query budget, data realism, and reproducibility notes. |
| Defense critique | Every defense has protected signal, uncovered signal, attacker assumption, utility cost, and residual channel. |
| Reproducibility | Snapshot contains manifest, hashes, corpus data, bibliography, generated PDFs, and git commit. |
| Human audit | Machine-generated classifications must be marked as such until human-reviewed. |

## Required paper sections

A paper-grade report PDF must include:

1. Abstract
2. Contributions
3. Methodology
4. Search strategy
5. Screening flow
6. Inclusion and exclusion criteria
7. Coding schema
8. Leakage taxonomy
9. Threat model matrix
10. Evidence heatmap
11. Claim-support table
12. Defense coverage matrix
13. Attack limitations
14. Open research gaps
15. Threats to validity
16. Bibliography
17. Snapshot manifest

## Prohibited overclaims

Do not write:

- "complete SoK" unless the paper-grade gates pass.
- "production-proven" without production/API evidence.
- "defense fails" unless the relevant attacker and signal are specified.
- "privacy-preserving" without a leakage metric and residual-channel statement.
- "continuous RAG-updated" unless the update runner actually retrieved and coded new literature for the snapshot.

## Preferred labels

For v0.1:

> Seed scaffold for a continuous LLM leakage SoK observatory.

For a validated future release:

> Paper-grade frozen SoK snapshot generated from a coded corpus of N papers.
