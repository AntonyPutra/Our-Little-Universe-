# Our Little Universe 💜

A premium, interactive, romantic personal website built for Putra and Vell Vell. 
This is a Next.js 15 application utilizing Tailwind CSS v4, Framer Motion, and Prisma 7 ORM with PostgreSQL.

The project features a built-in content management system (CMS) at `/admin` so Putra can add memories, photos, letters, and small romantic surprises dynamically without writing code!

---

## 🛠️ LOCAL DEVELOPMENT — WINDOWS

For local development on Windows, we use a specialized Docker Compose override to avoid filesystem permission issues with PostgreSQL bind mounts.

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Local Environment Variables**
   Make sure your `.env` contains the local database URL pointing to port 5433:
   ```env
   DATABASE_URL="postgresql://our_universe:change_me_super_secret_password@localhost:5433/our_universe"
   ```

3. **Start the Local Database**
   Use the development override to start Postgres in a Docker named volume exposed on port 5433:
   ```bash
   docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d db
   ```

4. **Initialize and Seed the Database**
   Push the latest Prisma schema and seed the initial romantic content:
   ```bash
   npx prisma migrate dev
   node --env-file=.env scripts/seed-db.mjs
   ```

5. **Start Next.js (Local Webpack Server)**
   ```bash
   npm run dev
   ```
   Open your browser and go to `http://localhost:3000`.

---

## 🚀 PRODUCTION DEPLOYMENT — DEBIAN DOCKER SERVER

Production uses a strictly self-hosted architecture on your Debian server. Data persistence is managed via native Linux directory bind mounts in `/home/repo/our-little-universe/data`. The PostgreSQL database port is explicitly hidden from the public host for security.

1. **Clone the Repository**
   ```bash
   git clone <repo-url> /home/repo/our-little-universe
   cd /home/repo/our-little-universe
   ```

2. **Start the Database**
   ```bash
   # Builds the images and starts ONLY the database initially
   docker compose build
   docker compose up -d db
   ```

3. **Apply Database Migrations**
   Production should NEVER use `prisma db push` or `prisma migrate dev`. Use the deploy command:
   ```bash
   docker compose run --rm app npx prisma migrate deploy
   ```

4. **Seed the Database (First time only)**
   ```bash
   docker compose run --rm app node scripts/seed-db.mjs
   ```

5. **Start the Application**
   ```bash
   docker compose up -d
   docker compose ps
   ```

You can now log in at `yourdomain.com/admin` to manage your little universe! 💜

---

## ⚠️ CRITICAL WARNING: PRODUCTION DATA

When managing the production server, **DO NOT** use the following commands unless you intend to completely destroy all production data (database records, memories, uploads):

*   `docker compose down -v` (This deletes volumes)
*   `git clean -fdx` (This deletes untracked files including the `data/` folder)
*   `rm -rf /home/repo/our-little-universe`

**Always** ensure that `/home/repo/our-little-universe/data` is preserved during updates.

---
## 💾 Backups & Restores

Since all your precious memories are stored in the PostgreSQL database and the local `data/uploads` folder, it is critical to back them up regularly.

**To Create a Backup:**
```bash
chmod +x scripts/backup.sh
./scripts/backup.sh
```
This will create a timestamped folder inside `./data/backups/` containing a `database.dump` and `uploads.tar.gz`.

**To Restore from a Backup:**
```bash
chmod +x scripts/restore.sh
./scripts/restore.sh ./data/backups/2026-08-11_150000
```
