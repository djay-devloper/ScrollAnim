# Scroll-Driven Hero Animation

A responsive React hero page with a scroll-controlled car animation built using GSAP and ScrollTrigger. The hero pins while scrolling; the car and progress trail move across the track based on scroll progress.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal.

## Build for production

```bash
npm run build
npm run preview
```

The production-ready files are generated in `dist/`.

## Deploy to GitHub Pages

Deploy the production build to the `gh-pages` branch:

```bash
npm run deploy
```

The Vite base path is configured for this repository (`/ScrollAnim/`). In the repository's **Settings → Pages**, select the `gh-pages` branch and `/ (root)` as the deployment source. The published site will be available at `https://djay-devloper.github.io/ScrollAnim/`.

## Animation overview

- The headline fades in and rises slightly on page load.
- The four statistic cards appear in a staggered sequence.
- Scrolling pins the hero section and scrubs the car across the track with a matching progress trail.
- GSAP animations are scoped and cleaned up when the component unmounts.
- The car artwork is an embedded SVG, so no external image download is required.

The main page component is [`src/App.jsx`](./src/App.jsx); Tailwind CSS is set up through the Vite plugin and [`src/index.css`](./src/index.css).
