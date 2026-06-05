import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/poster.css';
import { sok, bibliography } from './sok-data';

type Surface = typeof sok.leakage_surfaces[number];
type Defense = typeof sok.defenses[number];

function Badge({ children }: { children: React.ReactNode }) {
  return <span className="badge">{children}</span>;
}

function SurfaceCard({ surface }: { surface: Surface }) {
  return (
    <section className="card surface-card">
      <div className="card-topline">
        <h3>{surface.name}</h3>
        <div>{surface.evidence_badges.map((b) => <Badge key={b}>{b}</Badge>)}</div>
      </div>
      <p>{surface.summary}</p>
      <dl>
        <dt>Signals</dt><dd>{surface.signals.join(', ')}</dd>
        <dt>Attacker</dt><dd>{surface.attackers.join(', ')}</dd>
        <dt>Assets</dt><dd>{surface.assets.join(', ')}</dd>
        <dt>Limitations</dt><dd>{surface.limitations.join('; ')}</dd>
      </dl>
    </section>
  );
}

function DefenseCard({ defense }: { defense: Defense }) {
  return (
    <section className="card defense-card">
      <h3>{defense.name}</h3>
      <p><strong>Protects:</strong> {defense.protects.join(', ')}</p>
      <p><strong>Does not cover:</strong> {defense.does_not_cover.join(', ')}</p>
      <p><strong>Residual gap:</strong> {defense.residual_gap}</p>
    </section>
  );
}

function Poster() {
  const badgeKeys = Object.keys(sok.evidence_badges);
  return (
    <main className="poster-page">
      <section className="poster-shell">
        <header className="hero">
          <div>
            <p className="eyebrow">Continuous RAG-updated SoK snapshot system</p>
            <h1>LLM Leakage Observatory</h1>
            <p className="subtitle">Training memory · logits/logprobs · embeddings · hidden states · KV-cache timing · RAG · tools · agents · unlearning residues</p>
          </div>
          <aside className="snapshot-card">
            <span>Snapshot</span>
            <strong>{sok.snapshot_id}</strong>
            <span>{sok.updated_at}</span>
            <span>Corpus N={sok.methodology.included_papers}</span>
          </aside>
        </header>

        <section className="thesis-grid">
          <article className="panel wide">
            <h2>Central finding</h2>
            <p>A refusal is not a privacy guarantee. LLM systems may still leak through likelihoods, embeddings, timing, reasoning traces, retrieval behavior, memory writes, internal agent messages, and tool calls.</p>
          </article>
          <article className="panel"><h2>Runner</h2><p>{sok.llm_runner.engine} · {sok.llm_runner.model}</p></article>
          <article className="panel"><h2>Publication mode</h2><p>Live HTML plus immutable PDF snapshots with manifests and hashes.</p></article>
        </section>

        <section className="grid two">
          <article className="panel">
            <h2>SoK methodology</h2>
            <p><strong>Window:</strong> {sok.methodology.search_window}</p>
            <p><strong>Sources:</strong> {sok.methodology.sources.join(', ')}</p>
            <p><strong>Inclusion:</strong> {sok.methodology.inclusion_rule}</p>
            <p><strong>Exclusion:</strong> {sok.methodology.exclusion_rule}</p>
          </article>
          <article className="panel">
            <h2>Evidence badge legend</h2>
            <div className="legend">{badgeKeys.map((b) => <p key={b}><Badge>{b}</Badge> {sok.evidence_badges[b]}</p>)}</div>
          </article>
        </section>

        <section className="panel">
          <h2>Leakage surface stack</h2>
          <div className="surface-stack">{sok.leakage_surfaces.map((s) => <SurfaceCard key={s.id} surface={s} />)}</div>
        </section>

        <section className="panel">
          <h2>Defense coverage is layered, not universal</h2>
          <div className="defense-grid">{sok.defenses.map((d) => <DefenseCard key={d.name} defense={d} />)}</div>
        </section>

        <section className="grid two bottom">
          <article className="panel"><h2>Open research gaps</h2><ul>{sok.open_gaps.map((g) => <li key={g}>{g}</li>)}</ul></article>
          <article className="panel"><h2>Seed bibliography</h2><ol>{bibliography.map((p) => <li key={p.id}>{p.year}. {p.title}. <em>{p.venue}</em>.</li>)}</ol></article>
        </section>

        <footer>LLM Leakage Observatory · poster v{sok.poster_version} · methodology v{sok.methodology_version} · corpus {sok.corpus_version}</footer>
      </section>
    </main>
  );
}

function Report() {
  return (
    <main className="report-page">
      <h1>LLM Leakage Observatory: SoK Snapshot Report</h1>
      <p><strong>Snapshot:</strong> {sok.snapshot_id} · <strong>Updated:</strong> {sok.updated_at}</p>
      <h2>Abstract</h2>
      <p>LLM privacy leakage is a systems problem spanning training memory, probability interfaces, generated text, reasoning traces, representations, serving infrastructure, retrieval, tools, agents, telemetry, and deletion residues. This report is generated from the same structured snapshot JSON as the HTML5 poster.</p>
      <h2>Methodology</h2>
      <p>{sok.methodology.inclusion_rule}</p>
      <p>{sok.methodology.exclusion_rule}</p>
      <h2>Leakage surfaces</h2>
      {sok.leakage_surfaces.map((s) => <SurfaceCard key={s.id} surface={s} />)}
      <h2>Defense coverage</h2>
      {sok.defenses.map((d) => <DefenseCard key={d.name} defense={d} />)}
      <h2>Claims</h2>
      {sok.claims.map((c) => <section className="card" key={c.id}><p>{c.text}</p><p><strong>Evidence:</strong> {c.evidence_badges.join(', ')}</p><p><strong>Limitations:</strong> {c.limitations.join('; ')}</p></section>)}
      <h2>Bibliography</h2>
      <ol>{bibliography.map((p) => <li key={p.id}>{p.year}. {p.title}. <em>{p.venue}</em>.</li>)}</ol>
    </main>
  );
}

const root = createRoot(document.getElementById('root')!);
const params = new URLSearchParams(window.location.search);
const reportMode = window.location.pathname.includes('report') || window.location.hash.includes('report') || params.has('report');
root.render(reportMode ? <Report /> : <Poster />);
