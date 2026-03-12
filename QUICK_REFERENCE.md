# MyCOO Quick Reference Card

## Getting Started (Copy & Paste)

### First Time Setup
```bash
# 1. Navigate to project
cd ~/mycoo-web

# 2. Copy environment template
cp .env.local.example .env.local

# 3. Edit .env.local with your OAuth credentials
# (See SETUP.md for detailed instructions)

# 4. Install dependencies
npm install

# 5. Setup database
npm run db:migrate

# 6. Start dev server
npm run dev

# 7. Open browser to http://localhost:3000
```

### Daily Development
```bash
# Start dev server
npm run dev

# Run type checking
npm run build

# Database queries (if you need direct access)
psql $DATABASE_URL
```

---

## OAuth Setup (Quick)

### GitHub
1. https://github.com/settings/developers
2. New OAuth App
3. Copy ID & Secret to `.env.local`

### Google
1. https://console.cloud.google.com
2. New Project → Enable Google+ API → OAuth Credentials
3. Copy ID & Secret to `.env.local`

---

## Environment Variables Needed

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
DATABASE_URL=postgresql://user:pass@localhost:5432/mycoo_db
GITHUB_ID=<your github app id>
GITHUB_SECRET=<your github app secret>
GOOGLE_ID=<your google app id>
GOOGLE_SECRET=<your google app secret>
```

---

## Database

### Create Local Database
```bash
# If using local PostgreSQL
createdb mycoo_db

# Connection string
postgresql://postgres:password@localhost:5432/mycoo_db
```

### See What's in Database
```bash
# Open psql prompt
psql $DATABASE_URL

# List all tables
\dt

# Query a table
SELECT * FROM projects LIMIT 5;

# Exit
\q
```

### Reset Database
```bash
# Drop and recreate
npm run db:migrate  # Runs schema.sql
```

---

## Project Structure Reference

```
pages/
├── dashboard.tsx          → Main UI (7 projects)
├── projects/[id]/         → Project detail pages
└── api/
    ├── projects.ts        → Project CRUD
    └── health.ts          → Status check

lib/
├── auth.ts                → OAuth config
├── db.ts                  → Database helpers
└── types.ts               → TypeScript types

db/
└── schema.sql             → Database tables

components/
└── Navbar.tsx             → Navigation
```

---

## Common Tasks

### Add a New Page
```bash
# Create file
touch pages/new-page.tsx

# Basic template
import { useSession } from 'next-auth/react'

export default function NewPage() {
  const { data: session } = useSession()

  if (!session) return <p>Not authenticated</p>

  return <div>Your page here</div>
}
```

### Add an API Endpoint
```bash
# Create file
touch pages/api/new-endpoint.ts

# Basic template
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)
  if (!session) return res.status(401).json({ error: 'Unauthorized' })

  if (req.method === 'GET') {
    // Handle GET
    return res.status(200).json({ data: 'response' })
  }

  res.status(405).json({ error: 'Method not allowed' })
}
```

### Add a Database Table
```sql
-- Edit db/schema.sql
CREATE TABLE IF NOT EXISTS new_table (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  name TEXT,
  createdAt TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (userId) REFERENCES "user"(id)
);

-- Run migrations
npm run db:migrate
```

### Query Database from API
```typescript
import { query } from '@/lib/db'

// In your API endpoint:
const result = await query(
  'SELECT * FROM projects WHERE "userId" = $1',
  [userId]
)

const projects = result.rows
```

---

## Deployment Quick Steps

```bash
# 1. Push to GitHub
git add . && git commit -m "Your message"
git push origin main

# 2. Go to vercel.com
# → New Project → Select your GitHub repo
# → Configure (should auto-detect Next.js)
# → Deploy

# 3. After deployment, set environment variables
# Vercel Dashboard → Settings → Environment Variables
# Add all variables from .env.local

# 4. Update OAuth callbacks
# GitHub: Settings → Add https://your-domain.vercel.app/api/auth/callback/github
# Google: Console → Add same URL

# 5. Done! Your app is live
```

---

## Debugging

### Check Logs
```bash
# Development
npm run dev

# See all console logs and errors there
```

### Check Database
```bash
# Is it connected?
curl http://localhost:3000/api/health

# Should see: {"success": true, "database": "connected"}
```

### Check OAuth
```
If sign-in fails:
1. Check .env.local has correct ID/Secret
2. Check callback URLs match GitHub/Google settings
3. Clear browser cookies
4. Try again
```

### Clear Everything
```bash
# Delete installed packages
rm -rf node_modules

# Reinstall
npm install

# Recreate database
npm run db:migrate
```

---

## File Sizes

| File | Size | Type |
|------|------|------|
| pages/dashboard.tsx | ~2.5KB | UI |
| lib/auth.ts | ~1.5KB | Config |
| db/schema.sql | ~3.5KB | Database |
| lib/db.ts | ~2KB | Utilities |
| pages/_app.tsx | ~0.5KB | Wrapper |

All files are small and maintainable.

---

## Useful Commands

```bash
npm install                 # Install dependencies
npm run dev                 # Start dev server
npm run build               # Check for TypeScript errors
npm run db:migrate          # Setup/reset database
npm run lint                # Check code quality

# Git
git status                  # See changes
git add .                   # Stage all changes
git commit -m "message"     # Create commit
git push origin main        # Push to GitHub
```

---

## Resources

- **Next.js**: https://nextjs.org/docs
- **NextAuth.js**: https://next-auth.js.org
- **Tailwind CSS**: https://tailwindcss.com/docs
- **PostgreSQL**: https://www.postgresql.org/docs
- **Vercel**: https://vercel.com/docs
- **TypeScript**: https://www.typescriptlang.org/docs

---

## Support

1. **Check docs first**:
   - SETUP.md (local setup)
   - DEPLOYMENT_CHECKLIST.md (deployment)
   - README.md (overview)
   - PHASE1_SUMMARY.md (technical details)

2. **Check code**:
   - Read comments in source files
   - Review PHASE1_SUMMARY.md for architecture

3. **Check error message**:
   - Google the error
   - Check Node.js / Next.js docs

---

## Next: Phase 2

When ready for SYNTA-IQ integration:

1. Create `/projects/synta-iq/campaigns.tsx`
2. Create `/api/synta-iq/campaigns.ts`
3. Add campaign management UI
4. Add CSV import functionality
5. Add Lemlist integration

See `PHASE1_SUMMARY.md` section "Phase 2: SYNTA-IQ Integration" for details.

---

**You're ready! 🚀 Start with: `npm install && npm run db:migrate && npm run dev`**
