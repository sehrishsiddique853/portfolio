# Sehrish Siddique — Portfolio

A Vite + React + Tailwind single-page portfolio site.

## Run it locally

You need [Node.js](https://nodejs.org/) 18+ installed.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev
```

Then open the URL Vite prints (usually **http://localhost:5173**).

## Build for production

```bash
npm run build
npm run preview   # preview the production build locally
```

The production files are output to `dist/`, which you can deploy to
any static host (Vercel, Netlify, GitHub Pages, etc.).

## Project structure

```
├── index.html            # HTML entry point
├── src/
│   ├── main.jsx           # React entry point
│   ├── App.jsx            # The full portfolio (all sections + styles)
│   └── index.css          # Tailwind directives
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Notes on styling

All the site's visual design — colors, animations, custom fonts,
gradients, the custom cursor, scroll effects, etc. — lives in the
`<style>{...}</style>` block inside `src/App.jsx`, exactly as it
was originally written. Tailwind utility classes (`flex`, `grid`,
`px-6`, etc.) are also used throughout and are enabled via
`tailwind.config.js` + `src/index.css`. Nothing was rewritten or
simplified — this is just the same component dropped into a
runnable project scaffold.

Icons come from [`lucide-react`](https://lucide.dev/).
