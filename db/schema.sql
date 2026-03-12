-- NextAuth.js Tables
CREATE TABLE IF NOT EXISTS "user" (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  "emailVerified" TIMESTAMP,
  image TEXT
);

CREATE TABLE IF NOT EXISTS "account" (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  type TEXT NOT NULL,
  provider TEXT NOT NULL,
  "providerAccountId" TEXT NOT NULL,
  refresh_token TEXT,
  access_token TEXT,
  expires_at INTEGER,
  token_type TEXT,
  scope TEXT,
  id_token TEXT,
  session_state TEXT,
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
  UNIQUE(provider, "providerAccountId")
);

CREATE TABLE IF NOT EXISTS "session" (
  id TEXT PRIMARY KEY,
  "sessionToken" TEXT UNIQUE NOT NULL,
  "userId" TEXT NOT NULL,
  expires TIMESTAMP NOT NULL,
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "verification_token" (
  identifier TEXT,
  token TEXT,
  expires TIMESTAMP,
  PRIMARY KEY(identifier, token)
);

-- MyCOO Custom Tables
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'active',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
  UNIQUE(id, "userId")
);

CREATE TABLE IF NOT EXISTS actions (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  data JSONB,
  result JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "completedAt" TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("projectId") REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS metrics (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  key TEXT NOT NULL,
  value NUMERIC,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("projectId") REFERENCES projects(id) ON DELETE CASCADE,
  UNIQUE(key, "projectId")
);

CREATE TABLE IF NOT EXISTS decisions_log (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "projectId" TEXT NOT NULL,
  decision_type TEXT NOT NULL,
  context JSONB,
  recommendation TEXT,
  status TEXT DEFAULT 'pending',
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "executedAt" TIMESTAMP,
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("projectId") REFERENCES projects(id) ON DELETE CASCADE
);

-- SYNTA-IQ Specific Tables
CREATE TABLE IF NOT EXISTS campaigns (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  name TEXT NOT NULL,
  "lemlistCampaignId" TEXT,
  status TEXT DEFAULT 'draft',
  "prospectCount" INTEGER DEFAULT 0,
  "emailCount" INTEGER DEFAULT 0,
  "startDate" TIMESTAMP,
  "endDate" TIMESTAMP,
  config JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS prospects (
  id TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "campaignId" TEXT,
  email TEXT NOT NULL,
  "firstName" TEXT,
  "lastName" TEXT,
  "fundName" TEXT,
  location TEXT,
  segment TEXT,
  title TEXT,
  linkedin TEXT,
  status TEXT DEFAULT 'new',
  "sentAt" TIMESTAMP,
  "openedAt" TIMESTAMP,
  "clickedAt" TIMESTAMP,
  "repliedAt" TIMESTAMP,
  "openCount" INTEGER DEFAULT 0,
  "clickCount" INTEGER DEFAULT 0,
  notes TEXT,
  "createdAt" TIMESTAMP DEFAULT NOW(),
  "updatedAt" TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY ("userId") REFERENCES "user"(id) ON DELETE CASCADE,
  FOREIGN KEY ("campaignId") REFERENCES campaigns(id) ON DELETE SET NULL,
  UNIQUE(email, "campaignId")
);

CREATE TABLE IF NOT EXISTS prospect_interactions (
  id TEXT PRIMARY KEY,
  "prospectId" TEXT NOT NULL,
  type TEXT NOT NULL,
  "timestamp" TIMESTAMP DEFAULT NOW(),
  metadata JSONB,
  FOREIGN KEY ("prospectId") REFERENCES prospects(id) ON DELETE CASCADE
);

-- Indexes for performance
CREATE INDEX idx_projects_user ON projects("userId");
CREATE INDEX idx_actions_user ON actions("userId");
CREATE INDEX idx_actions_project ON actions("projectId");
CREATE INDEX idx_actions_status ON actions(status);
CREATE INDEX idx_metrics_project ON metrics("projectId");
CREATE INDEX idx_decisions_project ON decisions_log("projectId");
CREATE INDEX idx_campaigns_user ON campaigns("userId");
CREATE INDEX idx_prospects_campaign ON prospects("campaignId");
CREATE INDEX idx_prospects_email ON prospects(email);
CREATE INDEX idx_prospects_status ON prospects(status);
CREATE INDEX idx_interactions_prospect ON prospect_interactions("prospectId");
