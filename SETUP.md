# MyCOO Quick Start Guide

## Phase 1: Foundation — Setup Instructions

### Step 1: Prerequisites

You'll need:
- Node.js 18+ installed
- PostgreSQL database (or create one on Render.com for free)
- GitHub account (for OAuth)
- Google account (for OAuth)

### Step 2: GitHub OAuth Setup

1. Go to https://github.com/settings/developers → OAuth Apps → New OAuth App
2. Fill in:
   - **Application name**: MyCOO
   - **Homepage URL**: http://localhost:3000 (for development)
   - **Authorization callback URL**: http://localhost:3000/api/auth/callback/github
3. Copy `Client ID` and `Client Secret`

For production (after Vercel deployment):
- Update URLs to your Vercel domain: https://mycoo-xxx.vercel.app

### Step 3: Google OAuth Setup

1. Go to https://console.cloud.google.com
2. Create a new project named "MyCOO"
3. Enable Google+ API
4. Go to Credentials → Create OAuth 2.0 Client ID (Web application)
5. Add authorized redirect URIs:
   - http://localhost:3000/api/auth/callback/google
   - https://mycoo-xxx.vercel.app/api/auth/callback/google (after deployment)
6. Copy `Client ID` and `Client Secret`

### Step 4: PostgreSQL Setup

**Option A: Local PostgreSQL**
```bash
# Create database
createdb mycoo_db

# Get connection string
# postgresql://username:password@localhost:5432/mycoo_db
```

**Option B: Render.com (Recommended)**
1. Go to https://render.com
2. Create new PostgreSQL database
3. Copy connection string

### Step 5: Environment Variables

1. Copy template:
   ```bash
   cd mycoo-web
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` with your values:
   ```
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=<run: openssl rand -base64 32>

   GITHUB_ID=<from GitHub OAuth>
   GITHUB_SECRET=<from GitHub OAuth>

   GOOGLE_ID=<from Google OAuth>
   GOOGLE_SECRET=<from Google OAuth>

   DATABASE_URL=<from PostgreSQL>
   ```

### Step 6: Install & Migrate

```bash
# Install dependencies
npm install

# Run database migrations
npm run db:migrate

# You should see: "✅ Database schema created successfully!"
```

### Step 7: Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000 in browser
# Click "Sign in with GitHub" or "Sign in with Google"
```

### Step 8: Verify

You should see:
- ✅ Sign-in page with GitHub/Google buttons
- ✅ After sign-in: Dashboard with 7 project cards
- ✅ Click @synta-iq to see project details
- ✅ Click on other projects to see template pages

## Deployment to Vercel

### Step 1: Push to Git

```bash
git init
git add .
git commit -m "Initial MyCOO commit"
git remote add origin https://github.com/yourusername/mycoo.git
git push -u origin main
```

### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

During setup:
- Choose "Next.js" framework
- Production branch: main
- Root directory: ./

### Step 3: Environment Variables in Vercel

Go to Vercel dashboard → Settings → Environment Variables

Add all from `.env.local`:
- NEXTAUTH_URL=https://mycoo-xxx.vercel.app
- NEXTAUTH_SECRET=<your secret>
- GITHUB_ID, GITHUB_SECRET
- GOOGLE_ID, GOOGLE_SECRET
- DATABASE_URL

### Step 4: Update OAuth Callbacks

**GitHub**: https://github.com/settings/developers → OAuth Apps → Edit
- Authorization callback URL: https://mycoo-xxx.vercel.app/api/auth/callback/github

**Google**: https://console.cloud.google.com → Credentials
- Add authorized redirect URI: https://mycoo-xxx.vercel.app/api/auth/callback/google

### Step 5: Verify Deployment

- Visit https://mycoo-xxx.vercel.app
- Test sign-in with GitHub/Google
- Verify database connection works

## Troubleshooting

### "Database connection failed"
- Check DATABASE_URL is correct
- Verify PostgreSQL is running
- Run migrations: `npm run db:migrate`

### "OAuth callback failed"
- Verify callback URLs match exactly in GitHub/Google settings
- Check GITHUB_ID, GITHUB_SECRET, GOOGLE_ID, GOOGLE_SECRET are set
- Clear browser cookies and try again

### "NEXTAUTH_SECRET not set"
- Generate: `openssl rand -base64 32`
- Add to `.env.local` and Vercel environment variables

### "Cannot find module @/lib/auth"
- Run `npm install`
- Check tsconfig.json paths are correct

## Next Steps

Once Phase 1 is complete:

1. **Phase 2: SYNTA-IQ Integration** (Week 2)
   - Build campaign manager
   - Add prospect CSV import
   - Integrate Lemlist API
   - Create analytics dashboard

2. **Phase 3: Intelligence Layer** (Week 3)
   - Setup Claude Code webhooks
   - Implement AI suggestions
   - Auto-execution of decisions

3. **Phase 4: Scale** (Week 4+)
   - Add 6 remaining projects
   - Cross-project synergy analysis

## Support

For issues:
1. Check the errors in console (npm run dev)
2. Check browser DevTools (F12) for network errors
3. Check .env.local variables
4. Review OAuth settings in GitHub/Google

---

**Status**: Phase 1 complete. Ready for Phase 2! 🚀
