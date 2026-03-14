# MyCOO Deployment Guide

## Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables

Copy `.env.local.example` to `.env.local`:
```bash
cp .env.local.example .env.local
```

Then fill in the values:
- `NEXTAUTH_URL`: For local dev, keep as `http://localhost:3000`
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`
- `GITHUB_ID` & `GITHUB_SECRET`: From https://github.com/settings/developers
- `GOOGLE_ID` & `GOOGLE_SECRET`: From https://console.cloud.google.com
- `DATABASE_URL`: Your PostgreSQL connection string (optional for local testing)

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Vercel Deployment

### 1. Connect GitHub Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Vercel will auto-detect Next.js framework

### 2. Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables, add:

```
NEXTAUTH_URL=https://mycoo-web.vercel.app
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
GITHUB_ID=<your-github-oauth-id>
GITHUB_SECRET=<your-github-oauth-secret>
GOOGLE_ID=<your-google-oauth-id>
GOOGLE_SECRET=<your-google-oauth-secret>
DATABASE_URL=<your-postgresql-url>
```

**Important**: Replace `mycoo-web.vercel.app` with your actual Vercel domain!

### 3. Deploy
Push to `main` branch:
```bash
git push origin main
```

Vercel will automatically build and deploy.

---

## OAuth Setup

### GitHub OAuth
1. Go to [GitHub Settings → Developer Settings → OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - Application name: `MyCOO`
   - Homepage URL: `https://mycoo-web.vercel.app` (or local dev: `http://localhost:3000`)
   - Authorization callback URL: `https://mycoo-web.vercel.app/api/auth/callback/github`
4. Copy the Client ID and Secret into Vercel environment variables

### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Go to APIs & Services → Credentials
4. Create OAuth 2.0 Client ID (Web application)
5. Add authorized redirect URI: `https://mycoo-web.vercel.app/api/auth/callback/google`
6. Copy the Client ID and Secret into Vercel environment variables

---

## Troubleshooting

### NextAuth CLIENT_FETCH_ERROR
This error means environment variables are not properly configured. Verify:
- `NEXTAUTH_URL` matches your deployment URL
- `NEXTAUTH_SECRET` is set
- OAuth credentials (GITHUB_ID/SECRET, GOOGLE_ID/SECRET) are correct
- All variables are set in Vercel (not just locally)

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Tailwind CSS Not Compiling
Clear Next.js cache:
```bash
rm -rf .next
npm run build
```

---

## Production Checklist

- [ ] Environment variables set on Vercel
- [ ] OAuth apps created and configured
- [ ] Database connection string configured
- [ ] `NEXTAUTH_URL` matches Vercel domain
- [ ] Test OAuth login flow
- [ ] Test dashboard access
- [ ] Verify all API routes working

---

## API Routes

- `POST /api/auth/signin` - Sign in with OAuth
- `GET /api/auth/session` - Get current session
- `POST /api/auth/signout` - Sign out

See [NextAuth.js docs](https://next-auth.js.org/) for more.
