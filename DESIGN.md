# Lookitup Design Contract

## Product Shape

Lookitup is a newsroom evidence workspace.

The first screen opens as the product dashboard:

> select source pack -> search claim -> read Evidence Cards -> decide before publishing

## OpenDesign Source

This contract follows the Open Design workflow: a project-local `DESIGN.md` acts as the brand and interface contract for generated or hand-coded artifacts.

Reference checked:

- `nexu-io/open-design`
- Open Design `QUICKSTART.md`
- Open Design web prototype and design-system guidance

## Audience

Primary user:

- journalist or editor checking a doubtful claim before publication

Secondary viewers:

- hackathon judges
- newsroom mentors
- presentation audience

## Interface Principle

Evidence first. Summary second. Human publication decision last.

## Layout

Use a dense but readable newsroom dashboard.

Required zones:

1. left source-pack rail
2. central claim search and Evidence Cards
3. right publication decision panel
4. bottom demo script and build-boundary strip

Do not make a marketing hero.

## Visual System

Palette:

- canvas: `#f5f7fb`
- surface: `#ffffff`
- ink: `#101217`
- secondary text: `#667085`
- border: `#d9dee8`
- cobalt evidence: `#1557ff`
- signal red: `#df2d2d`
- review amber: `#b7791f`
- success green: `#0f8f5f`

Typography:

- use system sans-serif
- keep labels short
- keep body text scannable
- no decorative typography

Components:

- cards use `8px` radius or less
- controls keep stable dimensions
- icons from lucide-react
- status chips carry meaning by color and text
- no nested decorative cards

## Copy Rules

Use short, direct product language:

- "Evidence found"
- "Mismatch"
- "Not found in trusted sources"
- "Hold before publishing"
- "Open source"

Avoid:

- "maybe"
- "we think"
- "this is not"
- long self-explanations
- generic AI-product phrases

## Demo Defaults

Default source pack:

- `Breaking News + Fact-Check Pack`

Default claim:

- `Kamchatka snow reached the height of a 10-story apartment building.`

Default status:

- `Trusted sources say: AI-generated visuals spread online. Claim says: 10-story snow was real.`

Backup claim:

- `Emmanuel Macron is the Vice President of France.`

Not-found claim:

- `Samsung acquired OpenAI in 2025.`
