# Manulife CEO Demo Prototype

Stage 1 of an iPhone-installable PWA demo for the Manulife CEO dinner on Wednesday April 22, 2026.

## Quick start

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Deploy to GitHub Pages

1. Create a new GitHub repo (suggested name: `manulife-demo-prototype`)
2. In `vite.config.js`, update `base` to match your repo name: `/your-repo-name/`
3. Push this folder to that repo:

```bash
git init
git add .
git commit -m "Initial scaffold"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

4. In the repo's GitHub settings: **Settings → Pages → Source → GitHub Actions**
5. GitHub Actions will auto-build and deploy on every push to `main`
6. Live URL: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

## Install on iPhone

1. Open the live URL in Safari on the iPhone
2. Tap Share → Add to Home Screen
3. Name it something short (e.g., "Jenn Demo")
4. Tap the home screen icon to launch in standalone mode
5. Once loaded, works offline

## Next

Open this folder in Claude Code. The full build brief is in `CLAUDE.md`.
