#!/bin/bash
set -e

# Configuration
BACKUP_DIR="./data/backups"
TIMESTAMP=$(date +"%Y-%m-%d_%H%M%S")
BACKUP_PATH="$BACKUP_DIR/$TIMESTAMP"

DB_CONTAINER="our-universe-db"
DB_USER="our_universe"
DB_NAME="our_universe"

echo "==================================="
echo " Starting Our Little Universe Backup"
echo " Time: $TIMESTAMP"
echo "==================================="

# Create backup directory
mkdir -p "$BACKUP_PATH"

# 1. Backup PostgreSQL Database
echo "--> Backing up PostgreSQL database..."
if docker exec "$DB_CONTAINER" pg_dump -U "$DB_USER" -Fc "$DB_NAME" > "$BACKUP_PATH/database.dump"; then
    echo "    Database backup successful."
else
    echo "    Error: Database backup failed!"
    exit 1
fi

# 2. Backup Uploaded Media
echo "--> Backing up uploaded media..."
if tar -czf "$BACKUP_PATH/uploads.tar.gz" -C ./data uploads; then
    echo "    Uploads backup successful."
else
    echo "    Error: Uploads backup failed!"
    exit 1
fi

echo "==================================="
echo " Backup completed successfully!"
echo " Location: $BACKUP_PATH"
echo "==================================="
