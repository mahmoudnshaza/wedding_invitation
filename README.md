# Mahmoud & Shaza — Wedding Invitation

A luxurious, minimal wedding invitation website built with Next.js 15 (App Router), TypeScript, Tailwind CSS, and Framer Motion. Frontend only — no backend, no database, no forms that submit anywhere.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Replace the placeholder images

Three placeholder images are included so the project runs immediately. Swap them out with your real photos, keeping the same filenames and folder (`/public`):

- `public/groom.jpg` — circular portrait of the groom
- `public/bride.jpg` — circular portrait of the bride
- `public/hall.jpg` — wide venue photo used in the Location section

Square images work best for the portraits; a landscape image (roughly 3:2) works best for the hall photo.

## Project structure

```
app/
  layout.tsx      — fonts (Cormorant Garamond + Poppins), global metadata
  page.tsx         — composes all sections in order
  globals.css      — Tailwind entry + a few global refinements
components/
  Hero.tsx
  InvitationMessage.tsx
  SaveTheDate.tsx
  Location.tsx
  Program.tsx
  Footer.tsx
  SectionTitle.tsx  — reusable eyebrow + title + divider
  Ornaments.tsx      — shared gold line-art motifs (rings, laurel, divider, heart)
public/
  groom.jpg, bride.jpg, hall.jpg
```

## Design notes

- Palette: ivory `#FBF7F0`, cream `#F5EEE1`, soft beige `#EEE3CF`, gold `#C6A15B` (with light/soft/deep/dark shades), warm charcoal `#3A3327` for text.
- Display type: Cormorant Garamond. Body type: Poppins.
- The signature motif is a slim, hand-drawn pair of interlocking gold rings, echoed as a divider flourish and a floating heart throughout the page — used once prominently in the hero, then quietly repeated.
- Motion respects `prefers-reduced-motion`.

## Editing the content

All copy lives directly inside each component under `components/` — update names, date, venue, and program times there.
