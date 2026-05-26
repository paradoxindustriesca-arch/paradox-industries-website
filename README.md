# Paradox Industries Website

Single-page static launch site for `paradoxindustries.ca`.

## Local development

1. Run `npm install`
2. Run `npm run build`

The production-ready files are generated in `dist/`.

## Deployment target

This repository is configured for Vercel static hosting. `vercel.json` points Vercel at the generated `dist` directory.

## Contact form

The contact form posts to FormSubmit and routes submissions to `ima@paradoxindustries.ca`.

Important:

- The first real submission will trigger FormSubmit's activation email.
- After activation, FormSubmit can provide a random endpoint string that hides the plain email address from page source. Replace the current form action with that endpoint when available.
