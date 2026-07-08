import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const outDir = join(process.cwd(), "assets", "figures");
mkdirSync(outDir, { recursive: true });

const W = 1600;
const H = 900;
const palette = {
  canvas: "#f4f6f8",
  surface: "#ffffff",
  ink: "#0d1117",
  muted: "#5b6472",
  faint: "#8b95a5",
  border: "#d8dee8",
  blue: "#1557ff",
  blueSoft: "#edf3ff",
  red: "#d92d20",
  redSoft: "#fff1f0",
  amber: "#b7791f",
  amberSoft: "#fff7e6",
  green: "#067647",
  greenSoft: "#e9f8ef"
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function textBlock(text, x, y, width, size = 28, weight = 700, fill = palette.ink, lineHeight = 1.18) {
  const lines = wrapLines(text, width, size);
  const tspans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : size * lineHeight;
      return `<tspan x="${x}" dy="${index === 0 ? 0 : dy}">${esc(line)}</tspan>`;
    })
    .join("");
  return `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${fill}" font-family="Arial, Helvetica, sans-serif">${tspans}</text>`;
}

function wrapLines(text, width, size = 28) {
  const maxChars = Math.max(8, Math.floor(width / (size * 0.54)));
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = "";
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxChars && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function pill(text, x, y, fill, color, width = 190) {
  return `
    <rect x="${x}" y="${y}" width="${width}" height="44" rx="22" fill="${fill}" />
    <text x="${x + 18}" y="${y + 29}" font-size="18" font-weight="800" fill="${color}" font-family="Arial, Helvetica, sans-serif">${esc(text)}</text>
  `;
}

function card(x, y, w, h, title, body, accent = palette.blue, bodySize = 24) {
  const titleSize = 30;
  const titleLines = wrapLines(title, w - 54, titleSize).length;
  const bodyY = y + 56 + Math.max(1, titleLines - 1) * titleSize * 1.18 + 56;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="18" fill="${palette.surface}" stroke="${palette.border}" filter="url(#shadow)" />
    <rect x="${x}" y="${y}" width="8" height="${h}" rx="4" fill="${accent}" />
    ${textBlock(title, x + 28, y + 56, w - 54, titleSize, 900)}
    ${textBlock(body, x + 28, bodyY, w - 54, bodySize, 700, palette.muted, 1.25)}
  `;
}

function arrow(x1, y1, x2, y2, color = palette.blue) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${color}" stroke-width="5" stroke-linecap="round" marker-end="url(#arrow)" />`;
}

function base(title, subtitle, figureNo, body) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="18" flood-color="#0d1117" flood-opacity="0.08"/>
    </filter>
    <marker id="arrow" markerWidth="14" markerHeight="14" refX="10" refY="5" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L10,5 L0,10 Z" fill="${palette.blue}" />
    </marker>
  </defs>
  <rect width="${W}" height="${H}" fill="${palette.canvas}" />
  <rect x="54" y="42" width="1492" height="88" rx="18" fill="${palette.surface}" stroke="${palette.border}" />
  <text x="86" y="82" font-size="18" font-weight="900" fill="${palette.blue}" font-family="Arial, Helvetica, sans-serif">LOOKITUP FIGURE ${figureNo}</text>
  <text x="86" y="111" font-size="28" font-weight="900" fill="${palette.ink}" font-family="Arial, Helvetica, sans-serif">${esc(title)}</text>
  <text x="1040" y="95" font-size="20" font-weight="800" fill="${palette.muted}" font-family="Arial, Helvetica, sans-serif">${esc(subtitle)}</text>
  ${body}
</svg>`;
}

const figures = [
  {
    id: "figure-01-cross-border-fake-visual",
    no: "01",
    title: "Cross-border fake visual flow",
    deck: "Slide 1 cold open",
    caption: "A claim reached publication before the evidence caught up.",
    note: "This is the failure Lookitup targets: the story moved from social media to public news before the evidence trail was visible.",
    svg: () => base(
      "Fake visual becomes news",
      "Problem case",
      "01",
      `
      ${card(90, 230, 300, 300, "Social post", "AI-generated snow visual spreads online.", palette.red, 22)}
      ${card(450, 230, 300, 300, "Korean media", "Public news repeats the visual claim before source evidence.", palette.amber, 22)}
      ${card(810, 230, 300, 300, "Fact-check correction", "OhmyNews and AFP identify the visual as AI-generated.", palette.blue, 22)}
      ${card(1170, 230, 300, 300, "Before publication", "Lookitup brings source-bound Evidence Cards before publishing.", palette.green, 22)}
      ${arrow(402, 380, 438, 380)}
      ${arrow(762, 380, 798, 380)}
      ${arrow(1122, 380, 1158, 380)}
      <rect x="140" y="610" width="1320" height="138" rx="18" fill="${palette.redSoft}" stroke="#ffd4d1" />
      ${textBlock("Publication-before-evidence failure", 178, 660, 980, 34, 900, palette.red)}
      ${textBlock("The newsroom sees the claim after it has already moved across platforms, languages, and outlets.", 178, 715, 1120, 24, 800, palette.muted)}
    `)
  },
  {
    id: "figure-02-panel-pressure",
    no: "02",
    title: "Panel pressure",
    deck: "Slide 2 problem definition",
    caption: "The deadline is five minutes. The standard is 100%.",
    note: "The panel gave the newsroom equation: speed in minutes, trust at 100%, and no room for unsupported claims.",
    svg: () => base(
      "The deadline is five minutes. The standard is 100%.",
      "Helena Pilar Gisbert, AFP",
      "02",
      `
      ${card(90, 250, 320, 300, "maximum five minutes", "Breaking-news alerts move in minutes.", palette.red, 26)}
      ${card(455, 250, 320, 300, "15 minutes", "An article may follow almost immediately.", palette.amber, 26)}
      ${card(820, 250, 320, 300, "100% correct", "Agency copy must be truthful before it moves.", palette.blue, 26)}
      ${card(1185, 250, 320, 300, "clients trust us", "Clients do not waste time checking agency copy again.", palette.green, 26)}
      <rect x="180" y="640" width="1240" height="92" rx="18" fill="${palette.blueSoft}" stroke="#c9d9ff" />
      ${textBlock("Lookitup answers this pressure with source-bound evidence before publication.", 230, 696, 1100, 32, 900, palette.ink)}
    `)
  },
  {
    id: "figure-03-source-boundary",
    no: "03",
    title: "Source boundary",
    deck: "Slide 3 global source gap",
    caption: "The source boundary is the product.",
    note: "Google is broad, chatbots are fluent, and Lookitup is source-bound evidence search before publication.",
    svg: () => base(
      "The source boundary is the product",
      "Global source gap",
      "03",
      `
      <rect x="90" y="230" width="420" height="420" rx="20" fill="${palette.surface}" stroke="${palette.border}" filter="url(#shadow)" />
      ${textBlock("Whole web", 126, 288, 340, 34, 900)}
      ${textBlock("Many links. No source boundary. The journalist filters noise manually.", 126, 348, 330, 24, 800, palette.muted)}
      <circle cx="170" cy="510" r="12" fill="${palette.red}" /><circle cx="236" cy="470" r="9" fill="${palette.faint}" /><circle cx="320" cy="532" r="11" fill="${palette.faint}" /><circle cx="410" cy="488" r="10" fill="${palette.red}" />

      <rect x="590" y="230" width="420" height="420" rx="20" fill="${palette.surface}" stroke="${palette.border}" filter="url(#shadow)" />
      ${textBlock("Generated answer", 626, 288, 340, 34, 900)}
      ${textBlock("Fluent text still needs source checking before publication.", 626, 348, 330, 24, 800, palette.muted)}
      <rect x="636" y="472" width="310" height="88" rx="18" fill="${palette.amberSoft}" stroke="#ffe0a3" />
      ${textBlock("Answer first", 666, 526, 250, 28, 900, palette.amber)}

      <rect x="1090" y="230" width="420" height="420" rx="20" fill="${palette.blueSoft}" stroke="#c9d9ff" filter="url(#shadow)" />
      ${textBlock("Trusted sources", 1126, 288, 340, 34, 900, palette.blue)}
      ${textBlock("Selected sources feed visible Evidence Cards.", 1126, 348, 330, 24, 800, palette.muted)}
      <rect x="1140" y="468" width="145" height="92" rx="12" fill="${palette.surface}" stroke="${palette.border}" />
      <rect x="1308" y="468" width="145" height="92" rx="12" fill="${palette.surface}" stroke="${palette.border}" />
      ${textBlock("Evidence", 1162, 522, 110, 22, 900, palette.blue)}
      ${textBlock("Cards", 1338, 522, 90, 22, 900, palette.blue)}
    `)
  },
  {
    id: "figure-04-core-loop",
    no: "04",
    title: "Core loop",
    deck: "Slide 4 solution",
    caption: "One source pack. One claim. Visible evidence.",
    note: "This is the whole MVP. The team should show this loop clearly before adding any future workflow.",
    svg: () => base(
      "One source pack. One claim. Visible evidence.",
      "MVP loop",
      "04",
      `
      ${card(110, 250, 300, 270, "1. Select Source Pack", "Breaking News + Fact-Check Pack", palette.blue)}
      ${card(470, 250, 300, 270, "2. Search Claim", "Kamchatka snow reached the height of a 10-story apartment building.", palette.blue)}
      ${card(830, 250, 300, 270, "3. Evidence Cards", "Quote, source, date, URL, ranking score.", palette.green)}
      ${card(1190, 250, 300, 270, "4. Publish Decision", "Hold, rewrite, or continue reporting.", palette.amber)}
      ${arrow(422, 385, 455, 385)}
      ${arrow(782, 385, 815, 385)}
      ${arrow(1142, 385, 1175, 385)}
      ${pill("Evidence found", 330, 645, palette.blueSoft, palette.blue, 220)}
      ${pill("Mismatch", 680, 645, palette.redSoft, palette.red, 160)}
      ${pill("Not found", 970, 645, "#eef0f4", palette.muted, 170)}
    `)
  },
  {
    id: "figure-05-newsroom-workflow",
    no: "05",
    title: "Newsroom workflow vision",
    deck: "Slide 7 product vision",
    caption: "The prototype is search. The product is an evidence workspace.",
    note: "This figure lets the team show ambition without pretending every workflow is implemented in the 48-hour build.",
    svg: () => base(
      "Newsroom evidence workspace",
      "Product vision",
      "05",
      `
      ${card(90, 260, 250, 260, "Draft Claim", "A doubtful sentence is attached to the article draft.", palette.red, 22)}
      ${card(380, 260, 250, 260, "Evidence Cards", "Source quotes stay visible beside the claim.", palette.blue, 22)}
      ${card(670, 260, 250, 260, "Cited Summary", "Summary uses only retrieved Evidence Cards.", palette.green, 22)}
      ${card(960, 260, 250, 260, "Editor Review", "Desk approval happens with evidence attached.", palette.amber, 22)}
      ${card(1250, 260, 250, 260, "Evidence Pack Export", "The source trail can be saved after publication.", palette.blue, 22)}
      ${arrow(350, 390, 370, 390)}
      ${arrow(640, 390, 660, 390)}
      ${arrow(930, 390, 950, 390)}
      ${arrow(1220, 390, 1240, 390)}
      <rect x="220" y="640" width="1160" height="112" rx="18" fill="${palette.greenSoft}" stroke="#bfe8d0" />
      ${textBlock("Search becomes a newsroom memory: claim, evidence, editor decision, export.", 270, 692, 1050, 30, 900, palette.ink)}
    `)
  },
  {
    id: "figure-06-controlled-retrieval",
    no: "06",
    title: "Controlled retrieval architecture",
    deck: "Slide 8 technical core",
    caption: "Search only inside the selected source pack.",
    note: "This is the technical flex. The product is a constrained retrieval pipeline built for publication decisions.",
    svg: () => base(
      "Search only inside the selected source pack",
      "Technical core",
      "06",
      `
      ${card(80, 250, 220, 260, "Trusted Source Pack", "Newsroom-defined boundary", palette.blue, 22)}
      ${card(330, 250, 220, 260, "Local Corpus", "Reliable demo data", palette.blue, 22)}
      ${card(580, 250, 220, 260, "Search Index", "Fast retrieval layer", palette.green, 22)}
      ${card(830, 250, 220, 260, "Claim Search", "One doubtful sentence", palette.amber, 22)}
      ${card(1080, 250, 220, 260, "Evidence Ranking", "Best matching quotes", palette.blue, 22)}
      ${card(1330, 250, 220, 260, "Visible Evidence", "Cards before publication", palette.green, 22)}
      ${arrow(305, 380, 325, 380)}
      ${arrow(555, 380, 575, 380)}
      ${arrow(805, 380, 825, 380)}
      ${arrow(1055, 380, 1075, 380)}
      ${arrow(1305, 380, 1325, 380)}
      <rect x="190" y="640" width="1220" height="112" rx="18" fill="${palette.blueSoft}" stroke="#c9d9ff" />
      ${textBlock("P0 works without generation. Future AI summaries must cite retrieved Evidence Cards.", 242, 692, 1120, 30, 900, palette.ink)}
    `)
  }
];

for (const figure of figures) {
  const svg = figure.svg();
  writeFileSync(join(outDir, `${figure.id}.svg`), svg, "utf8");
  writeFileSync(
    join(outDir, `${figure.id}.txt`),
    [
      `Figure: ${figure.title}`,
      `File: ${figure.id}.png`,
      `Use in deck: ${figure.deck}`,
      `One-sentence explanation: ${figure.caption}`,
      `Caption: ${figure.caption}`,
      `Speaking note: ${figure.note}`,
      "",
      "Regeneration method:",
      "Deterministic SVG figure rendered to PNG with Chrome headless.",
      "",
      "Visual system:",
      "16:9 landscape, white cards on #f4f6f8 canvas, #0d1117 text, #1557ff evidence blue, #d92d20 mismatch red, #b7791f review amber, #067647 verified green, #d8dee8 borders, one consistent soft shadow.",
      "",
      "Reason:",
      "Text-heavy pitch figures need exact wording and consistent colors. SVG-to-PNG rendering keeps typography, spacing, and shading aligned across the full figure set."
    ].join("\n"),
    "utf8"
  );
}

console.log(`Generated ${figures.length} SVG figures and metadata files in ${outDir}`);
