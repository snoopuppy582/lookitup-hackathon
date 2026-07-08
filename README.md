# Lookitup

Lookitup stops unverified claims before they become published news.

This repository contains the hackathon planning documents, generated figure references, and a Next.js demo prototype for the core workflow:

```txt
select source pack -> search claim -> read Evidence Cards -> decide before publishing
```

## Run Locally

```bash
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Build

```bash
npm run typecheck
npm run build
```

## Source Code

https://github.com/snoopuppy582/lookitup-hackathon

## Deploy

Vercel import:

https://vercel.com/new/clone?repository-url=https://github.com/snoopuppy582/lookitup-hackathon

CLI deploy after login:

```bash
vercel login
vercel --prod
```

## Demo Claims

- `Kamchatka snow reached the height of a 10-story apartment building.`
- `Emmanuel Macron is the Vice President of France.`
- `Iran Israel missiles`
- `Samsung acquired OpenAI in 2025.`

## Build Scope

Built for real:

- source pack selection
- local trusted-source corpus
- claim or subject search
- Evidence Cards
- source links
- not-found state

Mocked in the pitch:

- live URL/RSS ingestion
- cited AI summary
- editor review
- evidence export
- image/video provenance
