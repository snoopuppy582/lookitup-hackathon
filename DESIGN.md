# Lookitup Design Contract

## Product Shape

Lookitup is a pre-publication evidence check.

The first screen must teach one live demo:

> select source pack -> search one claim -> read Evidence Cards -> make the publication call

## Audience

Primary viewer:

- hackathon judge watching a 5-minute presentation

Primary user:

- journalist or editor checking one doubtful claim before publication

## Interface Principle

One claim. One source boundary. Visible evidence.

## Layout

The product screen must show the 30-second demo path.

Required zones:

1. short product header with tagline
2. three visible demo steps
3. selected trusted source pack
4. claim search box
5. Evidence Cards after search
6. publication decision panel

Remove generic dashboard sections from the first screen.

## Visual System

Palette:

- canvas: `#f4f6f8`
- surface: `#ffffff`
- ink: `#0d1117`
- secondary text: `#5b6472`
- border: `#d8dee8`
- evidence blue: `#1557ff`
- mismatch red: `#d92d20`
- review amber: `#b7791f`
- verified green: `#067647`

Typography:

- use system sans-serif
- use large type only for the demo claim and main presentation claim
- keep labels short
- keep all button text action-oriented

Components:

- cards use `8px` radius or less
- icons from lucide-react
- status chips carry meaning by color and text
- no nested decorative cards
- no marketing hero
- no figure package or roadmap text on the product screen

## Copy Rules

Use direct product language:

- "Search trusted sources"
- "Evidence Cards"
- "Mismatch found"
- "Not found in trusted sources"
- "Hold before publishing"
- "Open source"

Avoid:

- "maybe"
- "we think"
- long explanations
- generic AI-product phrases
- build-scope details on the live demo screen

## Demo Defaults

Default source pack:

- `Breaking News + Fact-Check Pack`

Default claim:

- `Kamchatka snow reached the height of a 10-story apartment building.`

Default result:

- `Trusted sources say: AI-generated visuals spread online. Claim says: 10-story snow was real.`

Not-found claim:

- `Samsung acquired OpenAI in 2025.`

## Presentation Deck

The HTML deck and PDF must use the same claim hierarchy:

1. fake visual became news
2. journalists work under five-minute pressure
3. source control is the gap
4. Lookitup creates the source boundary
5. the live demo proves the loop
6. the roadmap grows the loop into a newsroom workspace
