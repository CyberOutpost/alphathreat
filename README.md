# Alpha Threat Blog

The Alpha Threat security blog, rebuilt as a static Jekyll site for GitHub Pages.

All 30 posts were recovered from Internet Archive captures of the original
Dotclear blog at `blog.alphathreat.in` and converted to Markdown. The layouts
reuse the real `alphathreat.in` design system (`assets/css/at.css`), so the blog
matches the main site rather than approximating it.

## Before the first push

Set two values in `_config.yml`:

```yaml
url: "https://<your-github-username>.github.io"
baseurl: "/<repo-name>"
```

- Repo named `<username>.github.io` → `baseurl: ""`
- Repo named anything else → `baseurl: "/<repo-name>"`
- Custom domain (`blog.alphathreat.in`) → `baseurl: ""`

Then: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
GitHub builds the Jekyll site itself; there is no Actions workflow to maintain.

## Writing a new post

Create `_posts/YYYY-MM-DD-some-slug.md`. The date in the filename is required —
it sets the publish date and the URL.

```markdown
---
layout: post
title: "Your Post Title"
date: 2026-08-01
categories: ["Pentest Engagement"]
description: "One or two sentences used for the card blurb, <meta> description and social preview."
---

Body in normal Markdown. Fenced code blocks get syntax highlighting via Rouge.
```

Existing categories: `Programming`, `Pentest Engagement`, `Hacking`,
`WiFi Hacking series`, `General Security Awareness`. A new value creates a new
category automatically — it appears in the nav, the filter chips and
`/categories/` with no other change.

Images go in `assets/blog/` and are referenced with the baseurl prefix so they
work both at `/repo-name/` and at a custom domain:

```markdown
![Alt text]({{ site.baseurl }}/assets/blog/folder/image.png)
```

## Local preview

Requires Ruby. From the repo root:

```bash
bundle install && bundle exec jekyll serve
```

Then open <http://localhost:4000>. `jekyll serve` honours `baseurl`, so the
local URL includes it.

## Layout

```
_config.yml          site settings — url and baseurl live here
_includes/           head, nav, footer, icon sprite
_layouts/            default, post, page
_posts/              the 30 recovered articles
assets/css/at.css    copied verbatim from the main site — do not hand-edit
assets/css/blog.css  blog-specific styles layered on top
assets/js/at.js      shared chrome (nav, back-to-top, scroll progress)
assets/js/blog.js    index filtering + in-article table of contents
assets/blog/         post images
index.html           post listing with category filter and title search
archive.html         every post grouped by year
categories.html      every post grouped by category
```

## Known gaps

**34 of 78 post images could not be recovered.** They were never captured by the
Internet Archive and are absent from the FTP mirror. Those spots render a
labelled "Screenshot unavailable" note instead of a broken image. Affected
posts: Netcat, Batch File Programming, OCR/Captchas, DNS Cache Snooping, WiFi
(both), Webify, Kali tools, Finding My Files With Ruby, Learning From
Attackers, Ruby One-Liner Reverse Shell. Drop the originals into
`assets/blog/<folder>/` and replace the note with a normal image tag if you
still have them.

**One post is uncategorised** —
`_posts/2021-01-18-employee-management-security-controls.md`. It had no category
on the original blog. Add a `categories:` line to file it.

**Old Dotclear URLs cannot redirect.** They used query strings
(`index.php?post/2020/12/01/NETCAT-...`), which static hosting cannot match. The
404 page points visitors at the archive instead.
