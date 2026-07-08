# OpenDesign Implementation Notes

## What Was Used

Open Design was checked from:

- `https://github.com/nexu-io/open-design`
- `QUICKSTART.md`
- `README.md`
- `skills/web-design-guidelines/SKILL.md`
- `skills/shadcn-ui/SKILL.md`
- `skills/stitch-skill/DESIGN.md`

## Applied Method

Open Design treats `DESIGN.md` as the project design contract. This project now has a root `DESIGN.md` that defines:

- product shape
- layout zones
- visual system
- copy rules
- demo defaults

The implementation follows that contract in `src/components/lookitup-dashboard.tsx` and `src/app/globals.css`.

## Interface Decision

The first screen is the product:

> select source pack -> search claim -> read Evidence Cards -> decide before publishing

The app avoids a marketing landing page because the pitch needs a working newsroom tool.
