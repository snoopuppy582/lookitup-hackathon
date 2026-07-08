export type StatusType = "evidence" | "mismatch" | "not-found" | "grouped";

export type SourcePack = {
  id: string;
  name: string;
  description: string;
  sources: string[];
  status: string;
};

export type EvidenceCard = {
  id: string;
  source: string;
  sourceType: string;
  date: string;
  quote: string;
  url: string;
  score: number;
  stance: "supports" | "contradicts" | "context";
  tags: string[];
};

export type SearchResult = {
  status: StatusType;
  title: string;
  line: string;
  decision: string;
  risk: "Low" | "Review" | "High";
  cards: EvidenceCard[];
  timeline: string[];
};

export const sourcePacks: SourcePack[] = [
  {
    id: "breaking-factcheck",
    name: "Breaking News + Fact-Check Pack",
    description: "Fact-check articles, wire samples, and local fallback text for fast visual-claim checks.",
    sources: ["OhmyNews Fact Check", "AFP Fact Check", "Reuters sample", "BBC sample"],
    status: "Selected for demo"
  },
  {
    id: "france-official",
    name: "France Official Sources Pack",
    description: "Official French government sources and wire samples for person/title checks.",
    sources: ["Elysee sample", "Reuters sample", "AFP sample"],
    status: "Backup demo"
  },
  {
    id: "international-wire",
    name: "International Wire Pack",
    description: "Wire and broadcaster samples for grouped breaking-news evidence.",
    sources: ["Reuters sample", "BBC sample", "Official statement sample"],
    status: "Future workflow"
  },
  {
    id: "local-authorities",
    name: "Local Authorities Pack",
    description: "Police, government, and emergency pages for local incident verification.",
    sources: ["Police sample", "City office sample", "Emergency office sample"],
    status: "Template"
  }
];

const kamchatkaCards: EvidenceCard[] = [
  {
    id: "kamchatka-ohmyfact",
    source: "OhmyNews Fact Check",
    sourceType: "Fact-check",
    date: "Jan. 22, 2026",
    quote:
      "Korean media reported AI-manipulated Kamchatka snow visuals as real; the fact-check marked the claim false.",
    url: "https://www.ohmynews.com/NWS_Web/OhmyFact/at_pg.aspx?CNTN_CD=A0003200915",
    score: 0.94,
    stance: "contradicts",
    tags: ["AI visual", "Korean media", "false claim"]
  },
  {
    id: "kamchatka-ohmyfollow",
    source: "OhmyNews Follow-up",
    sourceType: "Media follow-up",
    date: "Jan. 23, 2026",
    quote:
      "KBS and MBC later deleted related AI snow videos after verification problems were raised.",
    url: "https://www.ohmynews.com/NWS_Web/View/at_pg.aspx?CNTN_CD=A0003201244",
    score: 0.89,
    stance: "context",
    tags: ["correction", "broadcast", "after publication"]
  },
  {
    id: "kamchatka-afp",
    source: "AFP Fact Check",
    sourceType: "Global fact-check",
    date: "Jan. 29, 2026",
    quote:
      "Massive Kamchatka snow footage circulating online was AI-generated and spread across several languages.",
    url: "https://factcheck.afp.com/doc.afp.com.94984G3",
    score: 0.86,
    stance: "contradicts",
    tags: ["cross-border", "AI-generated", "fact-check"]
  }
];

const macronCards: EvidenceCard[] = [
  {
    id: "macron-elysee",
    source: "Elysee sample",
    sourceType: "Official source",
    date: "Live sample",
    quote: "Emmanuel Macron is President of the French Republic.",
    url: "https://www.elysee.fr/en/emmanuel-macron",
    score: 0.93,
    stance: "contradicts",
    tags: ["person", "title", "official"]
  },
  {
    id: "macron-reuters",
    source: "Reuters sample",
    sourceType: "Wire sample",
    date: "Local fallback",
    quote: "French President Emmanuel Macron met officials in Paris.",
    url: "https://www.reuters.com/",
    score: 0.82,
    stance: "contradicts",
    tags: ["wire", "title", "France"]
  }
];

const iranCards: EvidenceCard[] = [
  {
    id: "iran-reuters",
    source: "Reuters sample",
    sourceType: "Wire sample",
    date: "2024-04-13 22:45 UTC",
    quote: "Iran launched drones and missiles toward Israel.",
    url: "https://www.reuters.com/",
    score: 0.91,
    stance: "context",
    tags: ["Iran", "Israel", "missiles"]
  },
  {
    id: "iran-bbc",
    source: "BBC sample",
    sourceType: "Broadcaster sample",
    date: "2024-04-13 23:10 UTC",
    quote: "Israel said most incoming projectiles were intercepted.",
    url: "https://www.bbc.com/news",
    score: 0.85,
    stance: "context",
    tags: ["Israel", "intercepted", "timeline"]
  },
  {
    id: "iran-official",
    source: "Official statement sample",
    sourceType: "Official source",
    date: "2024-04-14 00:30 UTC",
    quote: "The attack was launched in response to an earlier strike.",
    url: "https://www.gov.il/en",
    score: 0.78,
    stance: "context",
    tags: ["official", "response", "timeline"]
  }
];

export const sampleClaims = [
  "Kamchatka snow reached the height of a 10-story apartment building.",
  "Emmanuel Macron is the Vice President of France.",
  "Iran Israel missiles",
  "Samsung acquired OpenAI in 2025."
];

export function searchEvidence(query: string): SearchResult {
  const normalized = query.toLowerCase();

  if (
    normalized.includes("kamchatka") ||
    normalized.includes("snow") ||
    normalized.includes("10-story") ||
    normalized.includes("apartment")
  ) {
    return {
      status: "mismatch",
      title: "Mismatch",
      line:
        "Trusted sources say: AI-generated visuals spread online. Claim says: 10-story snow was real.",
      decision: "Hold before publishing",
      risk: "High",
      cards: kamchatkaCards,
      timeline: [
        "Social visual spreads",
        "Korean media reports claim",
        "Fact-check traces AI visuals",
        "Evidence Cards show contradiction"
      ]
    };
  }

  if (normalized.includes("macron") || normalized.includes("vice president")) {
    return {
      status: "mismatch",
      title: "Mismatch",
      line: "Trusted sources say: President. Claim says: Vice President.",
      decision: "Rewrite before publishing",
      risk: "High",
      cards: macronCards,
      timeline: ["Claim entered", "Official source matched", "Title mismatch surfaced"]
    };
  }

  if (normalized.includes("iran") || normalized.includes("israel") || normalized.includes("missile")) {
    return {
      status: "grouped",
      title: "Grouped evidence",
      line: "Evidence grouped by source and time.",
      decision: "Use as reporting context",
      risk: "Review",
      cards: iranCards,
      timeline: ["Reuters sample", "BBC sample", "Official statement sample"]
    };
  }

  return {
    status: "not-found",
    title: "Not found",
    line: "Not found in trusted sources.",
    decision: "Keep reporting",
    risk: "Review",
    cards: [],
    timeline: ["Claim entered", "Selected pack searched", "No trusted evidence found"]
  };
}
