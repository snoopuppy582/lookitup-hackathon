"use client";

import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  ExternalLink,
  FileText,
  Globe2,
  Newspaper,
  Search,
  ShieldCheck
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { sampleClaims, searchEvidence, sourcePacks, type EvidenceCard, type StatusType } from "@/lib/demo-data";

const statusLabels: Record<StatusType, string> = {
  evidence: "Evidence found",
  mismatch: "Mismatch",
  "not-found": "Not found",
  grouped: "Grouped evidence"
};

function getStatusClass(status: StatusType) {
  return `status status-${status}`;
}

function getRiskClass(risk: "Low" | "Review" | "High") {
  return `risk risk-${risk.toLowerCase()}`;
}

function getStanceLabel(card: EvidenceCard) {
  if (card.stance === "contradicts") return "Contradicts claim";
  if (card.stance === "supports") return "Supports claim";
  return "Context";
}

export function LookitupDashboard() {
  const [selectedPack, setSelectedPack] = useState(sourcePacks[0].id);
  const [query, setQuery] = useState(sampleClaims[0]);
  const [activeQuery, setActiveQuery] = useState(sampleClaims[0]);

  const currentPack = useMemo(
    () => sourcePacks.find((pack) => pack.id === selectedPack) ?? sourcePacks[0],
    [selectedPack]
  );
  const result = useMemo(() => searchEvidence(activeQuery), [activeQuery]);

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveQuery(query.trim() || sampleClaims[0]);
  }

  return (
    <main className="app-shell">
      <header className="topbar" aria-label="Lookitup overview">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="eyebrow">Team 6 · Korea + France</p>
            <h1>Lookitup</h1>
          </div>
        </div>
        <div className="topbar-copy">
          <strong>Evidence before publication.</strong>
          <span>Trusted-source claim search for journalists.</span>
        </div>
        <div className="topbar-actions">
          <span className="mode-chip">Demo mode</span>
          <a className="source-link" href="#build-boundary">
            Build scope
          </a>
        </div>
      </header>

      <section className="hero-strip" aria-label="Main demo claim">
        <div>
          <p className="eyebrow">Main demo</p>
          <h2>Stop unverified claims before they become news.</h2>
        </div>
        <p>
          A journalist selects a trusted source pack, searches the Kamchatka claim, and sees Evidence Cards before
          publishing.
        </p>
      </section>

      <section className="workspace" aria-label="Lookitup demo workspace">
        <aside className="source-rail" aria-label="Trusted source packs">
          <div className="section-heading">
            <Database size={18} />
            <span>Trusted Source Packs</span>
          </div>

          <div className="pack-list">
            {sourcePacks.map((pack) => (
              <button
                key={pack.id}
                className={`pack-button ${pack.id === selectedPack ? "active" : ""}`}
                onClick={() => setSelectedPack(pack.id)}
                type="button"
              >
                <span className="pack-title">{pack.name}</span>
                <span className="pack-description">{pack.description}</span>
                <span className="pack-status">{pack.status}</span>
              </button>
            ))}
          </div>

          <div className="source-list" aria-label="Sources in selected pack">
            <p className="label">Sources in pack</p>
            {currentPack.sources.map((source) => (
              <span key={source}>
                <CheckCircle2 size={14} />
                {source}
              </span>
            ))}
          </div>
        </aside>

        <section className="search-surface" aria-label="Claim search and evidence cards">
          <form className="claim-search" onSubmit={handleSearch}>
            <label htmlFor="claim">Claim or subject</label>
            <div className="search-row">
              <Search size={20} aria-hidden="true" />
              <textarea
                id="claim"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Enter a claim before publication"
                rows={2}
              />
              <button type="submit">Search</button>
            </div>
          </form>

          <div className="sample-claims" aria-label="Demo claim shortcuts">
            {sampleClaims.map((claim) => (
              <button
                key={claim}
                type="button"
                onClick={() => {
                  setQuery(claim);
                  setActiveQuery(claim);
                }}
              >
                {claim}
              </button>
            ))}
          </div>

          <div className="result-banner">
            <div>
              <span className={getStatusClass(result.status)}>{statusLabels[result.status]}</span>
              <h3>{result.line}</h3>
            </div>
            <div className="score-block">
              <span>Decision</span>
              <strong>{result.decision}</strong>
            </div>
          </div>

          <div className="evidence-grid" aria-label="Evidence Cards">
            {result.cards.length > 0 ? (
              result.cards.map((card) => (
                <article className="evidence-card" key={card.id}>
                  <div className="card-topline">
                    <span className="card-source">
                      <FileText size={16} />
                      {card.source}
                    </span>
                    <span className={`stance stance-${card.stance}`}>{getStanceLabel(card)}</span>
                  </div>
                  <blockquote>{card.quote}</blockquote>
                  <div className="card-meta">
                    <span>{card.sourceType}</span>
                    <span>{card.date}</span>
                    <span>Score {card.score.toFixed(2)}</span>
                  </div>
                  <div className="tag-row">
                    {card.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={card.url} target="_blank" rel="noreferrer" className="open-source">
                    Open source
                    <ExternalLink size={14} />
                  </a>
                </article>
              ))
            ) : (
              <div className="empty-state">
                <AlertTriangle size={28} />
                <h3>Not found in trusted sources.</h3>
                <p>The selected source pack currently lacks support for this claim.</p>
              </div>
            )}
          </div>
        </section>

        <aside className="decision-panel" aria-label="Publication decision">
          <div className="section-heading">
            <Newspaper size={18} />
            <span>Publication Decision</span>
          </div>

          <div className="decision-status">
            <span className={getRiskClass(result.risk)}>{result.risk}</span>
            <h3>{result.decision}</h3>
            <p>{result.title}</p>
          </div>

          <div className="timeline">
            <p className="label">Evidence trail</p>
            {result.timeline.map((item, index) => (
              <div className="timeline-row" key={item}>
                <span>{index + 1}</span>
                <p>{item}</p>
              </div>
            ))}
          </div>

          <div className="demo-script">
            <p className="label">Stage line</p>
            <strong>One source pack. One claim. Visible evidence.</strong>
            <p>Lookitup turns doubt into evidence before publication.</p>
          </div>
        </aside>
      </section>

      <section className="build-boundary" id="build-boundary" aria-label="Build boundary">
        <div>
          <p className="eyebrow">Built for real</p>
          <h3>Source-pack search, Evidence Cards, source links, not-found state.</h3>
        </div>
        <ArrowRight aria-hidden="true" />
        <div>
          <p className="eyebrow">Mocked in pitch</p>
          <h3>Cited summaries, editor review, export packs, image and video provenance.</h3>
        </div>
        <div className="clock-note">
          <Clock3 size={18} />
          <span>Demo must work offline from local data.</span>
        </div>
      </section>

      <section className="reference-strip" aria-label="Figure references">
        <div>
          <Globe2 size={18} />
          <span>Figure package ready</span>
        </div>
        <p>Use generated figures in `assets/figures` as visual anchors for the hand-made pitch deck.</p>
      </section>
    </main>
  );
}
