# Research Astro Template

A minimal Astro template for research project pages with Tailwind styling, a hero teaser, a selector-based video gallery, and an abstract section.

## Current Status

This repo is currently working with:

- `astro@6.3.7`
- `vite@7` via `overrides`
- `tailwindcss@3.4.17`
- `postcss` + `autoprefixer`
- plain `astro.config.mjs` with no extra Vite plugins

Verified working on May 22, 2026:

- `npm run dev`
- `npm run build`
- `http://127.0.0.1:4321`
- direct MP4 responses such as:
  - `/assets/videos/pink/1.mp4`
  - `/assets/videos/blue_short/1.mp4`

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:4321
```

Build:

```bash
npm run build
```

Preview:

```bash
npm run preview
```

## Why This Setup Works

The working scripts are:

```json
"dev": "env -u ELECTRON_RUN_AS_NODE astro dev --host 127.0.0.1 --port 4321 --strictPort",
"build": "astro build",
"preview": "env -u ELECTRON_RUN_AS_NODE astro preview --host 127.0.0.1 --port 4321"
```

Important details:

- `env -u ELECTRON_RUN_AS_NODE` is intentional.
- In this environment, `ELECTRON_RUN_AS_NODE=1` can leak into the shell and interfere with Astro/Vite startup.
- Keeping Astro plain and minimal was more stable than adding wrappers.

## How We Got Astro + Node Working

These were the real issues and fixes:

1. `astro dev` originally hung before opening a port.
   - Root cause: dependency/runtime mismatch and environment issues.

2. Tailwind 4 + `@tailwindcss/vite` was unstable in this repo.
   - The scanner could wander into Desktop-backed files and hang.
   - Fix: revert to classic Tailwind 3 with explicit content scanning.

3. The shell environment had `ELECTRON_RUN_AS_NODE=1`.
   - Fix: unset it inside `dev` and `preview` scripts.

4. Vite needed to stay on the version Astro 6 expects.
   - Fix: use `overrides.vite = "^7.1.7"`.

5. Plain Astro config was the most reliable.
   - Current [astro.config.mjs](/Users/yilong/Desktop/dev/research-astro-template/astro.config.mjs) is intentionally minimal.

## Tailwind Setup

This repo uses Tailwind 3, not Tailwind 4.

Key files:

- [tailwind.config.cjs](/Users/yilong/Desktop/dev/research-astro-template/tailwind.config.cjs)
- [postcss.config.cjs](/Users/yilong/Desktop/dev/research-astro-template/postcss.config.cjs)
- [src/styles/global.css](/Users/yilong/Desktop/dev/research-astro-template/src/styles/global.css)

Why:

- Tailwind 3 with explicit `content` paths was more reliable in this Desktop-based environment.
- It avoided the dev-time hangs we saw with the newer plugin path.

## Media Warning

If the page renders but videos do not load, check whether the files are really local.

This command is the fastest check:

```bash
ls -lO public/assets/videos/pink/1.mp4
```

Bad state:

```text
compressed,dataless
```

That means macOS/iCloud has not fully materialized the video bytes yet, even if Finder shows the file.

Good state:

- no `compressed,dataless` flag
- direct MP4 requests return `200 OK`

Useful checks:

```bash
curl -I http://127.0.0.1:4321/assets/videos/pink/1.mp4
curl -I http://127.0.0.1:4321/assets/videos/blue_short/1.mp4
```

If media is still offloaded:

- wait for Finder download to finish
- or move the repo/media out of Desktop/iCloud-managed storage

## Current Content Structure

Edit content in:

- [src/data/project.js](/Users/yilong/Desktop/dev/research-astro-template/src/data/project.js)

Main page layout:

- [src/pages/index.astro](/Users/yilong/Desktop/dev/research-astro-template/src/pages/index.astro)

Static assets:

- `public/assets/videos`
- `public/assets/images`

## Current Page Behavior

The current page includes:

- hero title / venue / authors / action links
- hero teaser video
- selector-based examples section
- default `pink` video set
- abstract section

The selector-based examples currently read from `videoSets` in `src/data/project.js`.

## Known Notes

- The hero poster reference was removed because `public/assets/posters/teaser.jpg` was missing.
- If you want a poster again, add:
  - `public/assets/posters/teaser.jpg`
  - then restore `poster={hero.teaserPoster}` in `src/pages/index.astro`
- If `astro dev` shows a rare Vite transport timeout, a clean restart usually fixes it:

```bash
pkill -f 'astro dev --host 127.0.0.1 --port 4321 --strictPort'
npm run dev
```
