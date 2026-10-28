# CHRONICLE

**History in the making.** CHRONICLE is a local, AI-assisted documentary studio producing cinematic history Shorts for **Forged Past**.

[Visit the Production Observatory](https://andreatsilva.github.io/chronicle/)

The observatory offers a public, view-only look at the production floor: the current story, real rendered scene previews, scene progress, production counts and recent films. Its dark studio layout follows the research → script → imagery → render → assembly → release workflow.

## What CHRONICLE does

- Discovers historical topics and drafts research and narration using a local language model.
- Plans documentary scenes and retrieves licensed historical artwork, with attribution and rights checks.
- Animates historical images with cinematic camera motion, or renders original 3D scenes.
- Produces local synthetic narration, subtitles, music and the final vertical film.
- Performs technical quality checks and publishes through the owner's authorized YouTube workflow.

AI-generated historical drafts are not independently verified facts. Historical images can be contextual or later depictions. Production status and technical quality checks do not certify historical accuracy.

## This repository

Only the public presentation is published here:

| File | Purpose |
| --- | --- |
| `index.html` | Accessible, responsive observatory layout |
| `style.css` | Studio styling |
| `app.js` | View-only feed display and freshness indicators |
| `.nojekyll` | Static GitHub Pages delivery |
| `README.md` | Project introduction |

The separate `live` branch holds only a sanitized `snapshot.json` and small rendered JPEG previews. The local engine, models, scripts, databases, credentials, production controls and full video files are excluded.

## How the public feed works

A separate exporter on the owner's computer reads the running studio's existing local GET endpoints. It selects public display fields and exports small frame previews approximately once a minute. The site refreshes its view every 20 seconds; GitHub caching and publication latency can delay updates. This is a periodically refreshed production-frame feed, not a continuous video livestream.

The exporter does not stop or restart CHRONICLE. Visitors cannot start, pause, stop, approve, retry, upload or modify production. Their browser reads public static GitHub files and never contacts the owner's computer. No local port or control endpoint is exposed.

To avoid GitHub's cached branch URLs mixing an old snapshot with newer frames, the browser resolves the current public feed commit at most once per 90 seconds, then reads immutable files from that commit. This uses unauthenticated GitHub API reads (subject to its shared per-IP limit); if unavailable, cached data remains visible with freshness labeling. Normal updates can lag production by roughly one to three minutes.

When the computer or exporter is offline, the last snapshot remains visible and becomes marked as delayed. Counts reflect actual production records; completed and published are distinct states. Failed or unpublished local work is not automatically presented as a public video.

The `live` branch is owned exclusively by the exporter and keeps a single rolling snapshot commit to avoid retaining every preview in branch history. It should not be used for manual development. Unreachable Git objects may remain temporarily in GitHub storage.

## Hosting

GitHub Pages serves the `main` branch root. No application server or build framework is required. To preview the layout locally, serve this directory with any static HTTP server. Feed polling requires internet access.

The exporter runs privately alongside the installed CHRONICLE application and uses the owner's existing GitHub CLI authentication. Its local source and startup instructions are kept with that installation, outside this public repository.
