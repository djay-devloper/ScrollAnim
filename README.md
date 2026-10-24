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

Install the deployment package:

```bash
npm install --save-dev gh-pages
```

Build with your repository name as the base path, then publish the `dist/` directory:

```bash
npm run build -- --base=/YOUR_REPO_NAME/
npx gh-pages -d dist
```

Replace `YOUR_REPO_NAME` with the GitHub repository name. In the repository's **Settings → Pages**, select the `gh-pages` branch as the deployment source.

For a project site hosted at `https://USERNAME.github.io/YOUR_REPO_NAME/`, set the Vite `base` option in `vite.config.js` to `"/YOUR_REPO_NAME/"` before building, so asset URLs use the correct path.

## Animation overview

- The headline fades in and rises slightly on page load.
- The four statistic cards appear in a staggered sequence.
- Scrolling pins the hero section and scrubs the car across the track with a matching progress trail.
- GSAP animations are scoped and cleaned up when the component unmounts.
- The car artwork is an embedded SVG, so no external image download is required.

The main page component is [`src/App.jsx`](./src/App.jsx); Tailwind CSS is set up through the Vite plugin and [`src/index.css`](./src/index.css).
