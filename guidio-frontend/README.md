# Guidio AI: frontend

React 19 + Vite + Tailwind CSS 4 frontend for Guidio AI.

The full documentation (setup on Windows 11, environment variables, LAN access, deployment, troubleshooting) is in the [root README](../README.md).

## Quick start

```bash
npm install
cp .env.example .env.local   # on Windows: copy .env.example .env.local
npm run dev
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server on port 5173 (also reachable on your LAN) |
| `npm run build` | Production build into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint |

Requires Node.js 22.22 or newer.