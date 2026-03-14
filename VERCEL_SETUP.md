# Vercel Environment Variables Setup (Quick Guide)

## Problem
MyCOO is not working on Vercel because environment variables for NextAuth.js and OAuth are not configured.

## Solution: Add Environment Variables to Vercel

### Step 1: Go to Vercel Dashboard
1. Open https://vercel.com/dashboard
2. Select the `mycoo-web` project

### Step 2: Go to Settings → Environment Variables

### Step 3: Add These Variables

Click "Add Environment Variable" for each one:

```
NEXTAUTH_URL = https://mycoo-web.vercel.app

NEXTAUTH_SECRET = (generate: openssl rand -base64 32 in terminal)

GITHUB_ID = (from https://github.com/settings/developers)

GITHUB_SECRET = (from https://github.com/settings/developers)

GOOGLE_ID = (from https://console.cloud.google.com)

GOOGLE_SECRET = (from https://console.cloud.google.com)
```

### Step 4: Redeploy

After adding variables:
1. Go to "Deployments" tab
2. Click the three dots on latest deployment
3. Select "Redeploy"

Wait 2-3 minutes for the redeploy to complete.

---

## Getting OAuth Credentials

### GitHub OAuth ID/Secret
1. Go to https://github.com/settings/developers
2. Click "OAuth Apps" → "New OAuth App"
3. Fill in:
   - **Application name**: MyCOO
   - **Homepage URL**: https://mycoo-web.vercel.app
   - **Authorization callback URL**: https://mycoo-web.vercel.app/api/auth/callback/github
4. Copy Client ID and Client Secret

### Google OAuth ID/Secret
1. Go to https://console.cloud.google.com
2. Create new project (if needed)
3. Go to APIs & Services → Credentials
4. Click "Create Credentials" → "OAuth 2.0 Client ID"
5. Select "Web application"
6. Add authorized redirect URI: https://mycoo-web.vercel.app/api/auth/callback/google
7. Copy Client ID and Client Secret

---

## Test It

After redeploy completes:
1. Visit https://mycoo-web.vercel.app
2. You should see the Sign In page with GitHub and Google buttons
3. Click either button to test OAuth login

---

## Still Not Working?

Check Vercel deployment logs:
1. Go to Deployments tab
2. Click the latest deployment
3. Check "Build Logs" for errors
4. Check "Function Logs" for runtime errors

Common issues:
- `NEXTAUTH_URL` mismatch (make sure it says `https://mycoo-web.vercel.app`, not `http://`)
- Missing OAuth credentials
- Callback URLs not matching in OAuth app settings
