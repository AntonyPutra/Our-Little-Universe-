#!/bin/bash
set -e

echo "=================================================="
echo "🚀 STARTING TEMPORARY PREVIEW DEPLOYMENT"
echo "=================================================="

PROJECT_DIR="/home/repo/our-little-universe"
BACKUP_DIR="/home/repo/backups/our-little-universe_$(date +%Y%m%d_%H%M%S)"

# 1. Backup Existing
if [ -d "$PROJECT_DIR" ]; then
    echo "📦 Backing up existing deployment to $BACKUP_DIR..."
    mkdir -p "/home/repo/backups"
    cp -r "$PROJECT_DIR" "$BACKUP_DIR"
else
    echo "⚠️ No existing deployment found at $PROJECT_DIR. Creating new..."
    mkdir -p "$PROJECT_DIR"
fi

cd "$PROJECT_DIR"

# 2. Pull latest code
echo "⬇️ Pulling latest code..."
if [ ! -d ".git" ]; then
    git clone https://github.com/AntonyPutra/Our-Little-Universe-.git .
else
    git fetch origin main
    git reset --hard origin/main
fi

# 3. Setup Laravel Backend
echo "⚙️ Setting up Laravel Backend..."
cd backend
composer install --no-interaction --prefer-dist --optimize-autoloader

# Check if .env exists, if not copy example
if [ ! -f ".env" ]; then
    cp .env.example .env
    php artisan key:generate
    echo "⚠️ PLEASE CONFIGURE YOUR .env IN backend/.env NOW (DB, Passcode, etc)"
    # Give user a moment to realize they need to configure env if it's new
fi

# Link storage
php artisan storage:link || true

# Run Migrations and Seed
echo "🗄️ Running Migrations and Seeding safely..."
php artisan migrate --force
php artisan db:seed --force

# Optimize Laravel
php artisan optimize:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

cd ..

# 4. Setup Next.js Frontend
echo "⚙️ Setting up Next.js Frontend..."
npm install

# Check if Next.js .env exists
if [ ! -f ".env" ]; then
    cp .env.example .env
    echo "⚠️ PLEASE CONFIGURE YOUR .env IN THE ROOT DIR NOW"
fi

# Build Next.js
echo "🏗️ Building Next.js..."
npm run build

echo "=================================================="
echo "✅ DEPLOYMENT SCRIPT COMPLETED"
echo "=================================================="
echo "To restart your services, please restart your PM2/Supervisor or Docker containers depending on your server setup."
