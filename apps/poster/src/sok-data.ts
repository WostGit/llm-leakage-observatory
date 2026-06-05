export const bibliography = [
  { id: 'seed-carlini-2021', year: 2021, title: 'Extracting Training Data from Large Language Models', venue: 'USENIX Security' },
  { id: 'seed-privacy-paradox', year: 2025, title: 'The Privacy Paradox in Large Language Models', venue: 'AsiaCCS / SoK seed' },
  { id: 'seed-embedding-inversion', year: 2024, title: 'Embedding Inversion and Vector Database Privacy', venue: 'arXiv seed' },
  { id: 'seed-kv-cache', year: 2025, title: 'Prompt Caching and KV-Cache Timing Leakage', venue: 'arXiv seed' },
  { id: 'seed-agent-leak', year: 2026, title: 'Agent Internal-Channel and Tool-Call Leakage', venue: 'arXiv seed' },
  { id: 'seed-rag-privacy', year: 2025, title: 'RAG Privacy, Membership, and Knowledge-Base Extraction', venue: 'arXiv seed' }
];

export const sok = {
  project: 'LLM Leakage Observatory',
  snapshot_id: '2026-06-05-seed',
  updated_at: '2026-06-05',
  poster_version: '0.1.0',
  methodology_version: '0.1.0',
  corpus_version: '2026.06.05-seed',
  llm_runner: { engine: 'MLX', model: 'gemma4-e2b', temperature: 0.2, max_tokens: 1600 },
  methodology: {
    search_window: '2020-01-01 to 2026-06-05',
    sources: ['arXiv', 'OpenAlex', 'manual seed list'],
    included_papers: 6,
    excluded_papers: 0,
    query_families: ['LLM memorization', 'membership inference LLM', 'logprob leakage', 'embedding inversion', 'KV cache side channel', 'RAG privacy leakage', 'agent memory leakage', 'tool-call exfiltration', 'LLM unlearning'],
    inclusion_rule: 'Include work that demonstrates, defends against, benchmarks, or audits leakage in LLMs or LLM applications.',
    exclusion_rule: 'Exclude generic jailbreak or safety work unless it causes privacy leakage, hidden context disclosure, system-prompt exposure, memory disclosure, or retrieval/tool leakage.'
  },
  evidence_badges: {
    P: 'production/API observed', M: 'multi-model empirical', R: 'independently reproduced', B: 'benchmark-only', S: 'synthetic canaries or artificial secrets', W: 'white-box or privileged access required', L: 'lab-only demonstration', A: 'adaptive attacker considered', C: 'cost/performance measured', '?': 'single preprint or not replicated'
  } as Record<string, string>,
  leakage_surfaces: [
    { id: 'training-memory', name: 'Training Memory Leakage', origin: 'pretraining / fine-tuning', signals: ['generated text', 'perplexity', 'memorized spans'], attackers: ['black-box user', 'API auditor', 'white-box auditor'], assets: ['verbatim training text', 'membership', 'PII'], evidence_badges: ['M', 'L', 'S'], claim_strength: 'strong but setup-dependent', summary: 'Models can reveal training examples or membership signals, especially for rare, duplicated, or canary-like data.', limitations: ['often duplication-sensitive', 'query budget matters', 'frontier deployments may hide scores or filter outputs'] },
    { id: 'likelihood-surface', name: 'Likelihood-Surface Leakage', origin: 'inference API', signals: ['logits', 'logprobs', 'perplexity', 'top-k probabilities'], attackers: ['API user with score access'], assets: ['membership', 'memorized spans', 'model familiarity'], evidence_badges: ['M', 'B'], claim_strength: 'conditional-strong', summary: 'Token probabilities expose the model belief distribution even when text output is filtered.', limitations: ['requires score access', 'candidate examples may be needed', 'API rounding/noising changes attack power'] },
    { id: 'representation-leakage', name: 'Representation Leakage', origin: 'embeddings / hidden states', signals: ['embeddings', 'hidden states', 'activations'], attackers: ['embedding DB insider', 'split-inference participant', 'model host'], assets: ['source text', 'semantic attributes', 'prompt content'], evidence_badges: ['M', 'L', 'W'], claim_strength: 'strong under vector or activation access', summary: 'Dense vectors and activations can preserve reconstructable private information.', limitations: ['requires vector or intermediate access', 'utility/privacy tradeoffs dominate defenses'] },
    { id: 'serving-side', name: 'Serving-Side Leakage', origin: 'LLM serving infrastructure', signals: ['latency', 'KV-cache reuse', 'prompt cache hits', 'token counts'], attackers: ['co-tenant', 'API timing observer'], assets: ['prompt prefix', 'cache membership', 'deployment behavior'], evidence_badges: ['P', 'L', 'A', '?'], claim_strength: 'emerging and deployment-relevant', summary: 'Prompt caching and KV reuse can create data-dependent timing side channels.', limitations: ['provider-specific', 'network noise matters', 'mitigations trade privacy for latency'] },
    { id: 'rag-memory', name: 'RAG and Memory Leakage', origin: 'retrieval / memory layer', signals: ['retrieved snippets', 'retrieval scores', 'citations', 'stored summaries'], attackers: ['RAG user', 'plugin', 'memory store insider'], assets: ['private documents', 'source identity', 'user profile'], evidence_badges: ['M', 'B', 'L', '?'], claim_strength: 'high priority, mixed evidence maturity', summary: 'Retrieval and memory systems can leak private corpora and persistent user state outside the base model.', limitations: ['access control assumptions vary', 'benchmarks often omit tool and memory write paths'] },
    { id: 'agent-tool', name: 'Agent and Tool-Call Leakage', origin: 'agent orchestration', signals: ['tool arguments', 'internal messages', 'multi-agent scratchpads', 'API calls'], attackers: ['malicious tool', 'orchestrator', 'prompt-injection source'], assets: ['secrets', 'memory', 'hidden instructions', 'private documents'], evidence_badges: ['B', 'L', '?'], claim_strength: 'emerging', summary: 'Agents may leak data through internal channels or legitimate-looking tool calls even when final answers are clean.', limitations: ['early benchmarks', 'application-specific', 'requires realistic orchestration traces'] },
    { id: 'reasoning-trace', name: 'Reasoning Trace Leakage', origin: 'reasoning interface', signals: ['chain-of-thought', 'scratchpads', 'deliberation traces'], attackers: ['API user with trace access', 'model auditor'], assets: ['PII', 'membership', 'latent familiarity'], evidence_badges: ['B', 'L', '?'], claim_strength: 'emerging', summary: 'Exposed reasoning can leak familiarity or private details not visible in final answers.', limitations: ['model/API-specific', 'trace access policy determines risk'] },
    { id: 'unlearning-residue', name: 'Deletion and Unlearning Residue', origin: 'post-training governance', signals: ['erased knowledge responses', 'membership tests', 'behavioral traces'], attackers: ['auditor', 'adversarial prompter', 'white-box evaluator'], assets: ['supposedly deleted data', 'residual facts'], evidence_badges: ['B', 'L', '?'], claim_strength: 'mixed and benchmark-sensitive', summary: 'Output suppression is not the same as verifiable forgetting.', limitations: ['benchmarks differ', 'formal verification remains hard', 'may require white-box access'] }
  ],
  defenses: [
    { name: 'Differential privacy training', protects: ['training membership'], does_not_cover: ['prompt cache timing', 'RAG leakage', 'tool-call exfiltration', 'embeddings after deployment'], residual_gap: 'Utility and scale costs; does not compose automatically with application-layer leakage.' },
    { name: 'Logprob suppression or rounding', protects: ['likelihood probing'], does_not_cover: ['text output', 'timing', 'embedding inversion', 'RAG retrieval'], residual_gap: 'Reduces debugging and auditing utility; side channels remain.' },
    { name: 'Cache isolation / selective KV sharing', protects: ['KV-cache timing', 'prompt cache reuse leakage'], does_not_cover: ['text leakage', 'RAG leakage', 'tool exfiltration'], residual_gap: 'Performance/privacy tradeoff and sensitivity detector trust.' },
    { name: 'RAG access control and retrieval redaction', protects: ['private document retrieval'], does_not_cover: ['embedding inversion', 'query rewriting leakage', 'tool exfiltration'], residual_gap: 'Policy drift and retrieval-score leakage remain.' },
    { name: 'Memory governance', protects: ['persistent user state', 'agent memory write paths'], does_not_cover: ['current context leakage', 'model memorization', 'host access'], residual_gap: 'Requires auditable write filters, expiry, and deletion semantics.' }
  ],
  claims: [
    { id: 'claim-refusal-not-privacy', text: 'A refusal is not a privacy guarantee: non-text signals such as likelihoods, embeddings, timing, traces, retrieval behavior, and tool calls may still leak.', supporting_papers: ['seed-carlini-2021', 'seed-embedding-inversion', 'seed-kv-cache', 'seed-agent-leak'], evidence_badges: ['M', 'L', 'B'], limitations: ['Different channels require different attacker access.'] },
    { id: 'claim-compositional-privacy', text: 'LLM privacy is compositional: defenses that protect one signal often leave adjacent signals exposed.', supporting_papers: ['seed-privacy-paradox', 'seed-kv-cache', 'seed-rag-privacy'], evidence_badges: ['M', 'B', '?'], limitations: ['Needs more standardized cross-layer benchmarks.'] }
  ],
  open_gaps: ['Likelihood-safe API design for logprobs, top-k, and perplexity access.', 'Private vector memory with utility-preserving inversion resistance.', 'Cache privacy without latency collapse.', 'Internal-channel auditing for multi-agent systems.', 'Tool-call DLP for agents that can write to external systems.', 'Verifiable unlearning and memory deletion across model, RAG, and agent layers.', 'Benchmark anti-Goodharting for privacy evaluations.']
};
