# CryptoCoach

A members-only AI agent that teaches crypto basics to beginners in plain English. Built with Next.js, Supabase (registration/login), and the Google Gemini API (free tier — no credit card needed).

**Pages:**
- `/` — public landing page with sign-up call to action
- `/register` — create an account
- `/login` — log in
- `/chat` — members-only AI chat (redirects to login if not signed in)

---

## Setup (about 15 minutes, no coding required)

### Step 1 — Create your Supabase project (handles registration/login)

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Click **New Project**, give it a name (e.g. "cryptocoach"), set a database password, and create it
3. When it's ready, go to **Project Settings → API**
4. Copy two values:
   - **Project URL** (looks like `https://abcdefg.supabase.co`)
   - **anon public key** (a long string)
5. Optional but recommended for a smooth pilot: go to **Authentication → Providers → Email** and turn **off** "Confirm email." This lets people sign up and start chatting immediately without an email verification step. (Turn it back on later for a public launch.)

### Step 2 — Get your free Gemini API key (powers the AI)

1. Go to [aistudio.google.com/apikey](https://aistudio.google.com/apikey)
2. Sign in with your Google account
3. Click **Create API Key**
4. Select a Google Cloud project (or let it create one for you)
5. Copy the API key

That's it — no credit card, no billing setup. The free tier gives you 1,500 requests per day, which is plenty for a community pilot.

### Step 3 — Deploy on Netlify

**Option A — Via GitHub (recommended):**

1. Create a free account at [github.com](https://github.com) if you don't have one
2. Create a **New repository** (private is fine), name it `cryptocoach`
3. Upload this project's files (drag the contents of the unzipped folder into the GitHub upload area)
4. Go to [netlify.com](https://netlify.com), sign up with your GitHub account
5. Click **Add new site → Import an existing project → GitHub**
6. Select your `cryptocoach` repository
7. Netlify will auto-detect Next.js. Before clicking Deploy, add these three **environment variables**:

   | Name | Value |
   |------|-------|
   | `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon public key |
   | `GEMINI_API_KEY` | your Gemini API key |

8. Click **Deploy site**. In about 2 minutes you'll get a live URL
9. Visit the URL, create a test account, and ask the agent a question 🎉

**Option B — Netlify CLI (no GitHub needed):**

1. Install Node.js from [nodejs.org](https://nodejs.org)
2. Unzip the folder on your computer, open a terminal, navigate to it
3. Run:
   ```
   npm install
   npx netlify-cli login
   npx netlify-cli env:set NEXT_PUBLIC_SUPABASE_URL "https://your-project.supabase.co"
   npx netlify-cli env:set NEXT_PUBLIC_SUPABASE_ANON_KEY "your-anon-key"
   npx netlify-cli env:set GEMINI_API_KEY "your-gemini-key"
   npx netlify-cli deploy --build --prod
   ```

**Custom domain:** in Netlify, go to **Site settings → Domain management → Add custom domain**.

---

## Customizing your agent

### Edit the agent's brain
Open `lib/systemPrompt.js`. This file contains everything about how the agent behaves:
- The name (Minas Bot) and community (Minas Community) are already set
- **Most important:** review the five frameworks (The Steady Drip, Protection First, The Vault System, The 8-Basket Rule, The Sacred Rule) and adjust the wording to match your teaching style

### Edit the branding
- Site name and colors: search for "CryptoCoach" in `app/page.js`, `app/login/page.js`, `app/register/page.js`, `app/chat/page.js`, and `app/layout.js`
- Colors and fonts: the design tokens at the top of `app/globals.css`

### Change the AI model
Set the `GEMINI_MODEL` environment variable in Netlify. Defaults to `gemini-2.5-flash` (recommended — fast, capable, and free).

---

## Costs

| Service | Pilot cost |
|---------|-----------|
| Netlify | Free tier is plenty |
| Supabase | Free tier is plenty (up to 50,000 monthly active users) |
| Gemini API | **Free** — 1,500 requests/day, no credit card required |
| **Total** | **$0/month** |

---

## Important notes

- **Keys stay secret.** The Gemini API key lives only on the server (in the `/api/chat` route); it is never exposed to the browser. Never put it in a `NEXT_PUBLIC_` variable.
- **Disclaimer:** the app displays "educational only — not financial advice" on the landing page and inside the chat. Keep this visible.
- **Free tier data note:** on Gemini's free tier, Google may use prompts for model improvement. For a community pilot this is fine, but be aware if users share sensitive information. Upgrading to a paid tier disables this.
- **Local development (optional):** `npm install`, copy `.env.example` to `.env.local` and fill it in, then `npm run dev` and open http://localhost:3000

## Troubleshooting

- **"Registration isn't configured yet"** — the Supabase environment variables are missing or misspelled. Check them in Netlify's Site settings → Environment variables and redeploy.
- **"The AI service is not configured yet"** — the `GEMINI_API_KEY` variable is missing. Add it in Netlify and redeploy.
- **"The assistant had trouble answering"** — check your Gemini API key is valid at [aistudio.google.com/apikey](https://aistudio.google.com/apikey). Also check Netlify's deploy logs (Deploys → click latest deploy → scroll to function logs) for details.
- **"The assistant is getting a lot of questions right now"** — you've hit the free tier rate limit (15 requests/minute). Wait a minute and try again. This is normal during heavy testing.
- **Sign-up says "check your email" but no email arrives** — either disable "Confirm email" in Supabase (Authentication → Providers → Email) for the pilot, or configure a custom SMTP sender in Supabase for reliable delivery.
