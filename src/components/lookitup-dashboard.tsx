"use client";

import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  RotateCcw,
  Search,
  ShieldCheck,
  TimerReset
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";
import { sampleClaims, searchEvidence, sourcePacks, type EvidenceCard, type StatusType } from "@/lib/demo-data";

const mainClaim = sampleClaims[0];
const unsupportedClaim = sampleClaims[3];

const statusLabels: Record<StatusType, string> = {
  evidence: "Evidence found",
  mismatch: "Mismatch found",
  "not-found": "Not found",
  grouped: "Evidence grouped"
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

function EvidenceCardView({ card, index }: { card: EvidenceCard; index: number }) {
  return (
    <article className="evidence-card">
      <div className="card-index">Evidence {index + 1}</div>
      <div className="card-source">
        <FileText size={16} aria-hidden="true" />
        <span>{card.source}</span>
      </div>
      <blockquote>{card.quote}</blockquote>
      <div className="card-meta">
        <span>{card.sourceType}</span>
        <span>{card.date}</span>
        <span>Score {card.score.toFixed(2)}</span>
      </div>
      <div className={`stance stance-${card.stance}`}>{getStanceLabel(card)}</div>
      <a href={card.url} target="_blank" rel="noreferrer" className="open-source">
        Open source
        <ExternalLink size={14} aria-hidden="true" />
      </a>
    </article>
  );
}

export function LookitupDashboard() {
  const sourcePack = sourcePacks[0];
  const [query, setQuery] = useState(mainClaim);
  const [activeQuery, setActiveQuery] = useState(mainClaim);
  const [hasSearched, setHasSearched] = useState(false);

  const result = useMemo(() => searchEvidence(activeQuery), [activeQuery]);

  function runSearch(nextQuery = query) {
    const cleanQuery = nextQuery.trim() || mainClaim;
    setQuery(cleanQuery);
    setActiveQuery(cleanQuery);
    setHasSearched(true);
  }

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runSearch();
  }

  function resetDemo() {
    setQuery(mainClaim);
    setActiveQuery(mainClaim);
    setHasSearched(false);
  }

  return (
    <main className="app-shell">
      <header className="topbar" aria-label="Lookitup product header">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <ShieldCheck size={22} />
          </div>
          <div>
            <p className="eyebrow">Team 6 · Korea + France</p>
            <h1>Lookitup</h1>
          </div>
        </div>
        <div className="tagline">Turn doubt into evidence before publishing.</div>
        <div className="demo-badge">Live demo</div>
      </header>

      <section className="stage-hero" aria-label="Live demo opening">
        <div className="hero-copy">
          <p className="eyebrow">30-second prototype story</p>
          <h2>Before publishing, check the claim against trusted sources.</h2>
          <p>One doubtful claim enters. Source-bound Evidence Cards come out.</p>
        </div>

        <ol className="demo-steps" aria-label="Demo steps">
          <li>
            <span>1</span>
            Select source pack
          </li>
          <li>
            <span>2</span>
            Search claim
          </li>
          <li>
            <span>3</span>
            Read evidence
          </li>
        </ol>
      </section>

      <section className="demo-frame" aria-label="Source-bound claim verification demo">
        <aside className="source-boundary" aria-label="Selected trusted source pack">
          <p className="panel-label">1. Trusted source pack</p>
          <h3>{sourcePack.name}</h3>
          <p className="boundary-copy">The newsroom chooses the search boundary before the deadline.</p>

          <div className="source-list">
            {sourcePack.sources.map((source) => (
              <span key={source}>
                <CheckCircle2 size={15} aria-hidden="true" />
                {source}
              </span>
            ))}
          </div>
        </aside>

        <section className="claim-workbench" aria-label="Claim search and evidence cards">
          <form className="claim-search" onSubmit={handleSearch}>
            <label htmlFor="claim">2. Claim before publication</label>
            <textarea
              id="claim"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              rows={3}
              placeholder="Enter one doubtful claim"
            />
            <div className="action-row">
              <button type="submit" className="primary-action">
                <Search size={18} aria-hidden="true" />
                Search trusted sources
              </button>
              <button type="button" className="secondary-action" onClick={() => runSearch(unsupportedClaim)}>
                Try unsupported claim
              </button>
              <button type="button" className="icon-action" onClick={resetDemo} aria-label="Reset demo">
                <RotateCcw size={17} aria-hidden="true" />
              </button>
            </div>
          </form>

          {!hasSearched ? (
            <div className="ready-state">
              <TimerReset size={32} aria-hidden="true" />
              <h3>Ready for the live search.</h3>
              <p>Click Search trusted sources. The demo should move from claim to evidence in seconds.</p>
            </div>
          ) : (
            <section className="result-zone" aria-label="Search result">
              <div className="result-banner">
                <span className={getStatusClass(result.status)}>{statusLabels[result.status]}</span>
                <h3>{result.line}</h3>
              </div>

              {result.cards.length > 0 ? (
                <div className="evidence-grid" aria-label="Evidence Cards">
                  {result.cards.map((card, index) => (
                    <EvidenceCardView card={card} index={index} key={card.id} />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <AlertTriangle size={30} aria-hidden="true" />
                  <h3>Not found in trusted sources.</h3>
                  <p>The selected source pack currently lacks support for this claim.</p>
                </div>
              )}
            </section>
          )}
        </section>

        <aside className="publication-call" aria-label="Publication decision">
          <p className="panel-label">3. Publication call</p>
          {hasSearched ? (
            <>
              <span className={getRiskClass(result.risk)}>{result.risk}</span>
              <h3>{result.decision}</h3>
              <p>{result.title}</p>
              <div className="trail">
                {result.timeline.map((item, index) => (
                  <div className="trail-row" key={item}>
                    <span>{index + 1}</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <span className="risk risk-review">Ready</span>
              <h3>Wait for evidence.</h3>
              <p>The journalist makes the publication call after the Evidence Cards appear.</p>
            </>
          )}
        </aside>
      </section>

      <section className="stage-line" aria-label="Presenter line">
        <strong>Stage line:</strong>
        <span>Lookitup searches the trusted source pack, returns Evidence Cards, and supports the human publication decision.</span>
      </section>
    </main>
  );
}
