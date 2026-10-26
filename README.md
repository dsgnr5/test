# Solopreneur Portfolio

A fast, dependency-free personal website for a one-person business. It's plain HTML, CSS and JS, with no build step.

```
index.html   page content
style.css    design (colors and fonts live in the :root tokens at the top)
main.js      theme toggle, sticky nav, scroll-reveal animations
```

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Make it yours

1. **Name and brand:** search `index.html` for "Nikita" and the "N" logo mark and favicon.
2. **Accent color:** change `--accent` and `--accent-2` (gradient) in `style.css`, in both the light and dark theme blocks.
3. **What I'm Working On / Tools I Love / Find Me:** each section is a plain `<ul class="list">`. Edit the items in place.
4. **Links:** replace every `href="#"` (project links, Twitter, LinkedIn, GitHub, and the header/footer icons) with real URLs.

> ⚠️ **The project names and descriptions are placeholders.** Replace them with your real work before you publish.

## Deploy (free)

- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repo, then turn on Pages under Settings → Pages.
- **Vercel:** `npx vercel` in this folder.
