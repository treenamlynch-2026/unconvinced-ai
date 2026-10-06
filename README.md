# unconvinced.ai

React (Vite + Tailwind v4) served by a Cloudflare Worker with static assets. `/api/contact` stores leads in D1.

## One-time setup
```bash
npm install
npx wrangler login
npx wrangler d1 create unconvinced      # copy database_id into wrangler.jsonc
npm run db:init                          # creates the leads table
```

## Deploy
Wait until Cloudflare shows unconvinced.ai as **Active** (nameservers switched at Porkbun), then:
```bash
npm run deploy
```
`routes` in wrangler.jsonc attaches unconvinced.ai and www automatically.

Auto-deploy on push: Cloudflare dashboard → Workers & Pages → unconvinced-ai → Settings → Builds → connect the GitHub repo. Build command `npm run build`, deploy command `npx wrangler deploy`.

## Local
- `npm run dev`: UI only (contact form will fail; no Worker).
- `npm run preview`: builds and runs the Worker + local D1. Run `npx wrangler d1 execute unconvinced --local --file=schema.sql` once first.

## Content
Markdown in `content/{cases,museum,lab}/<slug>.md`. Set `draft: false` to publish. Routes: `/cases`, `/museum`, `/lab`, and `/<section>/<slug>`.

## Leads
`npm run leads` prints the latest 25 submissions.

## Before launch
- Search the code for `VERIFY`.
- Add images listed in `public/images/README.txt`.
