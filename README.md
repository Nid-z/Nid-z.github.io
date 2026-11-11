# Jirah T. Nidoy | Portfolio

A static portfolio site (plain HTML, CSS, JavaScript, no build step) made for GitHub Pages.

## Deploy on GitHub Pages
1. Create a new repository on GitHub named **`Nid-z.github.io`**. That gives you the address
   `https://nid-z.github.io`. Any other repo name gives `https://nid-z.github.io/<repo-name>`.
2. Upload everything in this folder (keep the folder structure), either drag-and-drop on github.com
   ("Add file → Upload files") or:
   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/Nid-z/Nid-z.github.io.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
4. Wait a minute or two, then open the address shown on the Pages settings screen.

## Editing
- To change your photo, replace `assets/profile.jpg` (square, about 600×600).
- Text for every section is in `index.html`.
- Certificates are listed at the top of `js/main.js` (images live in `assets/certs/`).
- Colors and fonts are the variables at the top of `css/style.css`.
- `.nojekyll` tells GitHub Pages to serve the files as-is.
