-- ============================================================
-- Scraply Auto — Database Schema
-- PostgreSQL
-- ============================================================

-- Users (admin accounts)
CREATE TABLE IF NOT EXISTS users (
  id          SERIAL PRIMARY KEY,
  email       VARCHAR(255) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  name        VARCHAR(100),
  role        VARCHAR(20) NOT NULL DEFAULT 'admin',
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Leads (vehicle quote requests from the public form)
CREATE TABLE IF NOT EXISTS leads (
  id              SERIAL PRIMARY KEY,
  first_name      VARCHAR(100) NOT NULL,
  phone           VARCHAR(20)  NOT NULL,
  email           VARCHAR(255),
  city            VARCHAR(100) NOT NULL,
  vehicle_year    INTEGER,
  vehicle_make    VARCHAR(100),
  vehicle_model   VARCHAR(100),
  mileage         VARCHAR(50),
  condition       VARCHAR(60),
  is_running      BOOLEAN,
  message         TEXT,

  -- Internal tracking
  status          VARCHAR(30) NOT NULL DEFAULT 'new',
  -- values: new | contacted | quoted | accepted | rejected | completed
  offered_price   NUMERIC(10, 2),
  internal_notes  TEXT,

  created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Lead photos (Cloudinary URLs, up to 4 per lead)
CREATE TABLE IF NOT EXISTS lead_photos (
  id            SERIAL PRIMARY KEY,
  lead_id       INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  position      VARCHAR(20) NOT NULL,
  -- values: front | rear | interior | engine
  cloudinary_url  TEXT NOT NULL,
  public_id       VARCHAR(255),
  created_at    TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Service areas (cities the business operates in)
CREATE TABLE IF NOT EXISTS service_areas (
  id          SERIAL PRIMARY KEY,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  name        VARCHAR(100) NOT NULL,
  province    VARCHAR(10)  NOT NULL DEFAULT 'ON',
  is_active   BOOLEAN      NOT NULL DEFAULT TRUE,
  meta_title  VARCHAR(255),
  meta_desc   TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Contact messages (from the /contact page)
CREATE TABLE IF NOT EXISTS contact_messages (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(255) NOT NULL,
  phone       VARCHAR(20),
  message     TEXT NOT NULL,
  is_read     BOOLEAN NOT NULL DEFAULT FALSE,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Lead status history (audit trail of status changes)
CREATE TABLE IF NOT EXISTS lead_status_history (
  id          SERIAL PRIMARY KEY,
  lead_id     INTEGER NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  old_status  VARCHAR(30),
  new_status  VARCHAR(30) NOT NULL,
  changed_by  INTEGER REFERENCES users(id),
  note        TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT NOW()
);

-- ============================================================
-- Indexes
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_leads_status      ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_city        ON leads(city);
CREATE INDEX IF NOT EXISTS idx_leads_created_at  ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_photos_lead  ON lead_photos(lead_id);

-- ============================================================
-- Seed: service areas
-- ============================================================

INSERT INTO service_areas (slug, name, province) VALUES
  ('ottawa',         'Ottawa',         'ON'),
  ('gatineau',       'Gatineau',       'QC'),
  ('rockland',       'Rockland',       'ON'),
  ('embrun',         'Embrun',         'ON'),
  ('carleton-place', 'Carleton Place', 'ON'),
  ('kemptville',     'Kemptville',     'ON'),
  ('smiths-falls',   'Smiths Falls',   'ON'),
  ('almonte',        'Almonte',        'ON'),
  ('arnprior',       'Arnprior',       'ON'),
  ('perth',          'Perth',          'ON'),
  ('renfrew',        'Renfrew',        'ON'),
  ('hawkesbury',     'Hawkesbury',     'ON')
ON CONFLICT (slug) DO NOTHING;
