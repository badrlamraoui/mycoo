# MyCOO Deployment Checklist

## Pre-Deployment (Local Testing)

### Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Git installed and configured
- [ ] PostgreSQL installed locally OR Render account ready

### Local Setup
- [ ] Clone/navigate to `mycoo-web` directory
- [ ] Copy `.env.local.example` to `.env.local`
- [ ] Create GitHub OAuth App at https://github.com/settings/developers
  - [ ] Copy Client ID to `GITHUB_ID`
  - [ ] Copy Client Secret to `GITHUB_SECRET`
  - [ ] Set callback URL: `http://localhost:3000/api/auth/callback/github`
- [ ] Create Google OAuth App at https://console.cloud.google.com
  - [ ] Copy Client ID to `GOOGLE_ID`
  - [ ] Copy Client Secret to `GOOGLE_SECRET`
  - [ ] Add URI: `http://localhost:3000/api/auth/callback/google`
- [ ] Create PostgreSQL database locally OR get Render connection string
  - [ ] Set `DATABASE_URL` in `.env.local`
- [ ] Generate NextAuth secret: `openssl rand -base64 32`
  - [ ] Set `NEXTAUTH_SECRET` in `.env.local`

### Installation & Testing
- [ ] Run `npm install` (no errors)
- [ ] Run `npm run db:migrate` (success message)
- [ ] Run `npm run dev` (starts on port 3000)
- [ ] Visit http://localhost:3000 (redirects to signin)
- [ ] Click "Sign in with GitHub"
  - [ ] OAuth popup appears
  - [ ] Redirects to GitHub auth
  - [ ] Returns to dashboard after auth
- [ ] Click "Sign in with Google"
  - [ ] OAuth popup appears
  - [ ] Redirects to Google auth
  - [ ] Returns to dashboard after auth
- [ ] On Dashboard:
  - [ ] See 7 project cards
  - [ ] See @synta-iq card is "active" (green)
  - [ ] See other projects are "awaiting" (gray)
- [ ] Click @synta-iq card
  - [ ] Navigates to project detail page
  - [ ] Shows "Overview", "Current Initiative", etc.
  - [ ] Shows 146 prospects, 4 emails
  - [ ] Shows next steps
- [ ] Click other project cards
  - [ ] Shows template page
  - [ ] Shows "Awaiting Brief" message
- [ ] Navbar shows:
  - [ ] User name/email
  - [ ] Sign Out button
- [ ] Click Sign Out
  - [ ] Logs out
  - [ ] Redirected to signin page

### Final Local Checks
- [ ] All pages load without errors
- [ ] No console errors (F12 → Console)
- [ ] Database connection works (check with psql or Render UI)
- [ ] Responsive design on mobile (F12 → Toggle device toolbar)

---

## Pre-Deployment (Code Preparation)

### Git Setup
- [ ] Initialize git: `git init`
- [ ] Add all files: `git add .`
- [ ] Create initial commit: `git commit -m "Initial MyCOO Phase 1"`
- [ ] Create GitHub repository
- [ ] Add remote: `git remote add origin https://github.com/[username]/mycoo.git`
- [ ] Push to main: `git push -u origin main`

### Code Review
- [ ] No hardcoded passwords or secrets
- [ ] `.env.local` is in `.gitignore` ✅ (already done)
- [ ] `node_modules/` is in `.gitignore` ✅ (already done)
- [ ] All TypeScript types are correct (`npm run build` passes)
- [ ] README is clear and complete ✅ (already done)
- [ ] SETUP.md has all instructions ✅ (already done)

---

## Deployment (Vercel)

### Create Vercel Account
- [ ] Go to https://vercel.com
- [ ] Sign up with GitHub (recommended)
- [ ] Verify email

### Deploy from GitHub
- [ ] In Vercel dashboard: Import Project
- [ ] Select your GitHub mycoo repository
- [ ] Configure project:
  - [ ] Framework Preset: Next.js ✓
  - [ ] Build Command: `next build` ✓ (auto-detected)
  - [ ] Install Command: `npm install` ✓ (auto-detected)
  - [ ] Output Directory: `.next` ✓ (auto-detected)
- [ ] Click "Deploy"
- [ ] Wait for deployment (3-5 minutes)
- [ ] Visit assigned domain (e.g., `mycoo-xxx.vercel.app`)
- [ ] Check for errors in Build Logs if deployment fails

### Environment Variables on Vercel
- [ ] In Vercel dashboard → Settings → Environment Variables
- [ ] Add each variable (click "Add"):

```
NEXTAUTH_URL = https://mycoo-xxx.vercel.app
NEXTAUTH_SECRET = <your generated secret>
DATABASE_URL = <your PostgreSQL connection string>
GITHUB_ID = <your GitHub OAuth ID>
GITHUB_SECRET = <your GitHub OAuth Secret>
GOOGLE_ID = <your Google OAuth ID>
GOOGLE_SECRET = <your Google OAuth Secret>
```

- [ ] After adding all, trigger redeploy:
  - [ ] Go to Deployments tab
  - [ ] Click "..." on latest deployment
  - [ ] Click "Redeploy"

### Update OAuth Callbacks

#### GitHub
- [ ] Go to https://github.com/settings/developers → Your OAuth App
- [ ] Update settings:
  - [ ] Homepage URL: `https://mycoo-xxx.vercel.app`
  - [ ] Authorization callback URL: `https://mycoo-xxx.vercel.app/api/auth/callback/github`
- [ ] Save

#### Google
- [ ] Go to https://console.cloud.google.com
- [ ] Select your "MyCOO" project
- [ ] Go to Credentials
- [ ] Click your OAuth app
- [ ] Update Authorized redirect URIs:
  - [ ] Keep: `http://localhost:3000/api/auth/callback/google`
  - [ ] Add: `https://mycoo-xxx.vercel.app/api/auth/callback/google`
- [ ] Save

### Verify Deployment
- [ ] Visit https://mycoo-xxx.vercel.app
- [ ] Page loads (no Vercel error page)
- [ ] Redirects to signin page
- [ ] Click "Sign in with GitHub"
  - [ ] Successfully authenticates
  - [ ] Shows dashboard
- [ ] Click sign out
- [ ] Click "Sign in with Google"
  - [ ] Successfully authenticates
  - [ ] Shows dashboard
- [ ] Click @synta-iq project
  - [ ] Shows project detail
- [ ] Check API:
  - [ ] Visit `/api/health`
  - [ ] Should show JSON: `{"success": true, "database": "connected", ...}`

### Database Verification
- [ ] If using Render:
  - [ ] Log in to Render.com
  - [ ] Select your PostgreSQL instance
  - [ ] Use "Connect" button to verify connection works
  - [ ] Check tables exist (in Query editor or psql)
- [ ] Alternatively, query database:
  ```bash
  psql $DATABASE_URL -c "\dt"
  ```
  Should show 11 tables including: user, projects, campaigns, prospects

---

## Post-Deployment

### Monitoring
- [ ] Add health check to monitoring (optional):
  - [ ] Set up Vercel alerts for deployment failures
  - [ ] Set up database monitoring on Render
- [ ] Monitor first few hours:
  - [ ] Check Vercel deployment logs
  - [ ] Test sign-in flow multiple times
  - [ ] Verify no errors in Vercel Function Logs

### Backup & Documentation
- [ ] Back up `.env.local` in secure location (1Password, Vault, etc.)
- [ ] Document:
  - [ ] Vercel project URL
  - [ ] Database connection details
  - [ ] OAuth app credentials locations
- [ ] Create password in vault:
  - [ ] NEXTAUTH_SECRET
  - [ ] GitHub OAuth Secret
  - [ ] Google OAuth Secret
  - [ ] Database password

### Analytics Setup (Optional)
- [ ] Vercel Analytics: Dashboard → Settings → Analytics → Enable
- [ ] Web Vitals will show automatically

---

## Troubleshooting During Deployment

### Deployment fails in Vercel
1. Check Build Logs in Vercel dashboard
2. Common issues:
   - [ ] `npm install` failed → Check package.json syntax
   - [ ] `next build` failed → Check for TypeScript errors
   - [ ] Missing environment variable → Add to Vercel
3. If stuck: Click "Redeploy" after fixing

### Sign-in doesn't work
1. Check OAuth callback URLs match EXACTLY:
   - [ ] GitHub: Settings → Compare with Vercel domain
   - [ ] Google: Console → Compare with Vercel domain
2. Verify environment variables in Vercel:
   - [ ] GITHUB_ID, GITHUB_SECRET set
   - [ ] GOOGLE_ID, GOOGLE_SECRET set
3. Clear browser cookies (Ctrl+Shift+Delete) and try again

### Database connection fails
1. Check DATABASE_URL format:
   - [ ] Should be: `postgresql://user:pass@host:5432/dbname`
2. If Render: Check instance is running
3. Test connection:
   ```bash
   psql $DATABASE_URL -c "SELECT version();"
   ```

### Blank page or 500 error
1. Check Vercel Function Logs:
   - [ ] Vercel dashboard → Deployments → Functions
   - [ ] Look for errors
2. Check environment variables again
3. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

---

## Success Checklist ✅

After deployment is complete and working:

- [ ] App loads at Vercel domain
- [ ] Sign-in with GitHub works
- [ ] Sign-in with Google works
- [ ] Dashboard shows 7 projects
- [ ] @synta-iq project details visible
- [ ] Other projects show template
- [ ] Sign-out works
- [ ] No errors in browser console (F12)
- [ ] Health endpoint works (`/api/health`)
- [ ] Database is connected
- [ ] No Vercel deployment errors

## Next Steps

Once deployed:

1. ✅ **Phase 1 Complete** — You have a production MyCOO!
2. 📋 **Phase 2 Ready** — Begin SYNTA-IQ integration
   - Campaign manager UI
   - Prospect CSV upload
   - Lemlist API integration
3. 🧠 **Phase 3** — Add Claude intelligence layer
4. 🚀 **Phase 4** — Scale to 6 projects

---

**Estimated Time**: 30 minutes from start to live deployment

**Support**: Check SETUP.md or README.md for detailed help
