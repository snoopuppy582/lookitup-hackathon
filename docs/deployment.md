# Deployment

## Current Status

GitHub CLI is authenticated as `snoopuppy582`.

Vercel CLI is installed. Login is missing in this environment.

## Local Verification

```bash
npm install
npm run typecheck
npm run build
```

## GitHub

Recommended repository name:

```txt
lookitup-hackathon
```

Create and push:

```bash
git init
git add .
git commit -m "Build Lookitup prototype"
gh repo create lookitup-hackathon --public --source=. --remote=origin --push
```

## Vercel

The project is ready for Vercel because it includes:

- `package.json`
- `next.config.ts`
- `vercel.json`

Deploy after Vercel login:

```bash
vercel login
vercel --prod
```

Token-based deploy:

```bash
vercel --prod --token <VERCEL_TOKEN>
```

Do not paste tokens into chat. Set them locally or use the browser login flow.
