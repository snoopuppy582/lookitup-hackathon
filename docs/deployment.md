# Deployment

## Current Status

GitHub CLI is authenticated as `snoopuppy582`.

Repository:

```txt
https://github.com/snoopuppy582/lookitup-hackathon
```

Vercel CLI is installed. Login is missing in this environment.

## Local Verification

```bash
npm install
npm run typecheck
npm run build
```

## GitHub

Repository:

```txt
https://github.com/snoopuppy582/lookitup-hackathon
```

The first commit has already been pushed.

Future push:

```bash
git add .
git commit -m "Update Lookitup prototype"
git push
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

Import from GitHub:

```txt
https://vercel.com/new/clone?repository-url=https://github.com/snoopuppy582/lookitup-hackathon
```

Token-based deploy:

```bash
vercel --prod --token <VERCEL_TOKEN>
```

Do not paste tokens into chat. Set them locally or use the browser login flow.
