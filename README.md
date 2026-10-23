# Solopreneur Portfolio

A fast, dependency-free personal website for a one-person business. It's plain HTML, CSS and JS, with no build step.

```
index.html   page content
style.css    design (colors and fonts live in the :root tokens at the top)
main.js      theme toggle, mobile menu, animations, project filter, contact form
```

## Preview locally

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

## Make it yours

1. **Name and brand:** search `index.html` for "Jordan" and "J" (logo mark and favicon) and replace them.
2. **Email:** replace `hello@example.com` in both `index.html` and `main.js` (`CONTACT_EMAIL`).
3. **Accent color:** change `--accent` in `style.css` (it's set in both the light and dark theme blocks).
4. **Services, process, pricing and FAQ:** edit the text in place.
5. **Projects:** each `.project` uses `data-cat` (`brand`, `web`, `product`) for filtering. To use a screenshot instead of a gradient, put an `<img>` inside `.project__img`.
6. **Social links:** fill in the `href="#"` links in the About section.
7. **Availability:** update the "Booking projects for…" badge and the matching FAQ answer.

> ⚠️ **The client names, logos, stats and testimonials are placeholders.** Replace them with your real clients and real quotes (with permission) before you publish, or remove those sections.

## Contact form

By default, the form opens the visitor's email app with the message pre-filled. To receive submissions directly, use one of these:
- **Formspree:** add `action="https://formspree.io/f/<your-id>" method="POST"` to the form and delete the submit handler in `main.js`.
- **Netlify Forms:** add `data-netlify="true"` and `name="contact"` to the form when you host on Netlify.

## Deploy (free)

- **Netlify Drop:** drag this folder onto https://app.netlify.com/drop
- **GitHub Pages:** push the folder to a repo, then turn on Pages under Settings → Pages.
- **Vercel:** `npx vercel` in this folder.
