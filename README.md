# MyCOO — Chief Operating Officer Agent

Multi-project management platform for strategic operations. Intelligence-driven autonomous agent managing 7 projects with Claude Code backend.

## Stack

- **Frontend**: Next.js 16 + React 19 + Tailwind CSS 4
- **Backend**: Vercel serverless API routes
- **Database**: PostgreSQL on Render
- **Auth**: NextAuth.js (OAuth GitHub/Google)
- **Intelligence**: Claude Code (via webhooks)
- **Integrations**: Lemlist (SYNTA-IQ campaigns)

## Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (or use Render.com)
- GitHub OAuth app
- Google OAuth app

### Installation

1. **Clone & install**:
   ```bash
   cd mycoo-web
   npm install
   ```

2. **Environment setup**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your credentials
   ```

3. **Database setup**:
   ```bash
   # Run migrations
   npm run db:migrate
   ```

4. **Development**:
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```

### Environment Variables

See `.env.local.example` for all required variables:

- `NEXTAUTH_*` — NextAuth configuration
- `GITHUB_*` — GitHub OAuth credentials
- `GOOGLE_*` — Google OAuth credentials
- `DATABASE_URL` — PostgreSQL connection string
- `LEMLIST_API_KEY` — Lemlist integration (Phase 2)
- `CLAUDE_WEBHOOK_*` — Claude Code communication (Phase 3)

## Project Structure

```
mycoo-web/
├── pages/
│   ├── _app.tsx           # Next.js app wrapper
│   ├── dashboard.tsx      # Main hub (7 projects)
│   ├── projects/
│   │   └── [projectId]/index.tsx  # Project detail
│   └── auth/
│       └── signin.tsx     # OAuth sign-in
├── components/
│   └── Navbar.tsx         # Navigation bar
├── lib/
│   └── auth.ts           # NextAuth configuration
├── db/
│   └── schema.sql        # PostgreSQL schema
├── styles/
│   └── globals.css       # Tailwind styles
└── scripts/
    └── migrate.js        # Database migration
```

## Current Status

### Phase 1: Foundation ✅

- [x] Next.js scaffold with TypeScript
- [x] Tailwind CSS 4 styling
- [x] NextAuth.js with OAuth (GitHub/Google)
- [x] PostgreSQL schema (11 tables)
- [x] Dashboard with 7 project cards
- [x] Project detail template
- [x] Navigation and authentication UI

### Phase 2: SYNTA-IQ Integration (Week 2)

- [ ] Campaign manager (CRUD)
- [ ] Prospect table (CSV import)
- [ ] Analytics dashboard (metrics)
- [ ] Lemlist API integration
- [ ] CSV upload & launch flow

### Phase 3: Intelligence Layer (Week 3)

- [ ] Webhook communication setup
- [ ] Claude Code integration
- [ ] AI suggestion component
- [ ] Auto-decision execution

### Phase 4: Scale to 6 Projects (Week 4+)

- [ ] @pawmedic, @sourcia, @myreply, @everstrong, @forgiapro, @convex
- [ ] Template adaptation per project
- [ ] Cross-project synergy analysis

## Deployment

### To Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
vercel env add
```

### Database on Render.com

1. Create PostgreSQL instance on Render.com
2. Copy `DATABASE_URL` to `.env.local` and Vercel
3. Run migrations: `npm run db:migrate`

## Development Notes

- **Auth**: Uses NextAuth.js adapter for automatic user/session management
- **Database**: Includes NextAuth tables + MyCOO custom tables
- **Styling**: Tailwind CSS 4 with custom colors (primary, secondary, accent)
- **API Routes**: Add new routes in `pages/api/`
- **Components**: React components in `components/`

## Next Steps

1. Deploy to Vercel
2. Create GitHub/Google OAuth apps
3. Setup PostgreSQL on Render
4. Update environment variables
5. Test authentication flow
6. Begin Phase 2: SYNTA-IQ integration

---

**Status**: Phase 1 foundation complete. Ready for Phase 2 integration.
