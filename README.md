# Paradox Industries Website

Premium single-page Next.js launch site for `paradoxindustries.ca`.

## Local development

1. Run `npm install`
2. Run `npm run dev`
3. Run `npm run build` before deployment

## Deployment target

This repository is configured for Vercel with Next.js. Vercel will run `npm run build` and serve the Next application automatically.

## Contact form

The contact form posts to FormSubmit and routes submissions to `ima@paradoxindustries.ca`.

Important:

- The first real submission will trigger FormSubmit's activation email.
- After activation, FormSubmit can provide a random endpoint string that hides the plain email address from page source. Replace the current form action with that endpoint when available.
