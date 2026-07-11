# CryptoCoach

A members-only AI agent that teaches crypto basics to beginners in plain English. Built with Next.js, Supabase (registration/login), and the Claude API.

**Pages:**
- `/` — public landing page with sign-up call to action
- `/register` — create an account
- `/login` — log in
- `/chat` — members-only AI chat (redirects to login if not signed in)

---

## Setup (about 20 minutes, no coding required)

### Step 1 — Create your Supabase project (handles registration/login)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project**, give it a name (e.g. "cryptocoach"), set a database password, and create it
3. When it's ready, go to **Project Settings → API**
4. Copy two values:
   - **Project URL** (looks like `https://abcdefg.supabase.co`)
   - **anon public key** (a long string)
5. Optional but recommended for a smooth pilot: go to **Authentication → Providers → Email** and turn **off** "Confirm email." This lets people sign up and start chatting immediately without an email verification step. (Turn it back on later for a public launch.)

### Step 2 — Get your Anthropic API key (powers the AI)

1. Go to [console.anthropic.com](https://console.anthropic.com) and create an account
2. Add a payment method (usage-based; a pilot with a small community typically costs a few dollars a month)
3. Go to **API Keys → Create Key** and copy it (starts with `sk-ant-`)

### Step 3 — Put the code on GitHub

1. Create a free account at [github.com](https://github.com) if you don't have one
2. Create a **New repository** (private is fine), name it `cryptocoach`
3. Upload this project's files:
   - Easiest no-code way: on your new repo page, click **"uploading an existing file"** and drag all the project files/folders in (don't upload `node_modules` — it isn't included anyway)

### Step 4 — Deploy on Vercel (recommended) 

1. Go to [vercel.com](https://vercel.com) and sign up **with your GitHub account**
2. Click **Add New → Project** and import your `cryptocoach` repository
3. Before clicking Deploy, open **Environment Variables** and add these three:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon public key |
   | `ANTHROPIC_API_KEY` | your Anthropic API key |

4. Click **Deploy**. In about a minute you'll get a live URL like `cryptocoach.vercel.app`
5. Visit the URL, create a test account, and ask the agent a question 🎉

**Custom domain:** in Vercel, go to your project → Settings → Domains to attach one (e.g. `learn.yourbrand.com`).

### Deploying on Netlify instead

1. Go to [netlify.com](https://netlify.com), sign up with GitHub
2. **Add new site → Import an existing project** → choose your repo
3. Netlify auto-detects Next.js. Add the same three environment variables under **Site settings → Environment variables**
4. Deploy

---

## Customizing your agent

### Edit the agent's brain
Open `lib/systemPrompt.js`. This file contains everything about how the agent behaves:
- The name (Minas Bot) and community (Minas Community) are already set
- **Most important:** review the five frameworks (The Steady Drip, Protection First, The Vault System, The 8-Basket Rule, The Sacred Rule) and adjust the wording to match your teaching style
- Commit the change on GitHub (edit the file right in the browser) — Vercel/Netlify redeploys automatically.

### Edit the branding
- Site name and colors: search for "CryptoCoach" in `app/page.js`, `app/login/page.js`, `app/register/page.js`, `app/chat/page.js`, and `app/layout.js`
- Colors and fonts: the design tokens at the top of `app/globals.css`

### Change the AI model
Set the `ANTHROPIC_MODEL` environment variable (defaults to `claude-sonnet-4-6`, a good balance of quality and cost for this use case).

---

## Costs

| Service | Pilot cost |
|---------|-----------|
| Vercel / Netlify | Free tier is plenty |
| Supabase | Free tier is plenty (up to 50,000 monthly active users) |
| Anthropic API | Usage-based — roughly $0.01–0.03 per conversation exchange; a 50-person pilot typically runs a few dollars/month |

---

## Important notes

- **Keys stay secret.** The Anthropic API key lives only on the server (in the `/api/chat` route); it is never exposed to the browser. Never put it in a `NEXT_PUBLIC_` variable.
- **Disclaimer:** the app displays "educational only — not financial advice" on the landing page and inside the chat. Keep this visible.
- **Local development (optional):** `npm install`, copy `.env.example` to `.env.local` and fill it in, then `npm run dev` and open http://localhost:3000

## Troubleshooting

- **"Registration isn't configured yet"** — the Supabase environment variables are missing or misspelled. Check them in Vercel/Netlify settings and redeploy.
- **"The AI service is not configured yet"** — the `ANTHROPIC_API_KEY` variable is missing. Add it and redeploy.
- **Sign-up says "check your email" but no email arrives** — either disable "Confirm email" in Supabase (Authentication → Providers → Email) for the pilot, or configure a custom SMTP sender in Supabase for reliable delivery.
