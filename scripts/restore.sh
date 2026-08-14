#!/bin/bash
set -e

if [ -z "$1" ]; then
    echo "Usage: ./scripts/restore.sh <backup_timestamp_folder>"
    echo "Example: ./scripts/restore.sh ./data/backups/2026-08-11_150000"
    exit 1
fi

BACKUP_PATH="$1"

if [ ! -d "$BACKUP_PATH" ]; then
    echo "Error: Backup directory $BACKUP_PATH does not exist!"
    exit 1
fi

DB_CONTAINER="our-universe-db"
DB_USER="our_universe"
DB_NAME="our_universe"

echo "==================================="
echo " Restoring Our Little Universe"
echo " From: $BACKUP_PATH"
echo "==================================="

# 1. Restore PostgreSQL Database
if [ -f "$BACKUP_PATH/database.dump" ]; then
    echo "--> Restoring database..."
    
    # Drop existing connections and database
    docker exec -t "$DB_CONTAINER" psql -U "$DB_USER" -d postgres -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = '$DB_NAME' AND pid <> pg_backend_pid();"
    docker exec -t "$DB_CONTAINER" dropdb -U "$DB_USER" "$DB_NAME" || true
    docker exec -t "$DB_CONTAINER" createdb -U "$DB_USER" "$DB_NAME"
    
    # Restore from dump
    cat "$BACKUP_PATH/database.dump" | docker exec -i "$DB_CONTAINER" pg_restore -U "$DB_USER" -d "$DB_NAME"
    echo "    Database restore successful."
else
    echo "    Warning: database.dump not found in $BACKUP_PATH"
fi

# 2. Restore Uploaded Media
if [ -f "$BACKUP_PATH/uploads.tar.gz" ]; then
    echo "--> Restoring uploaded media..."
    # Clear existing uploads
    rm -rf ./data/uploads/*
    # Extract backup
    tar -xzf "$BACKUP_PATH/uploads.tar.gz" -C ./data
    echo "    Uploads restore successful."
else
    echo "    Warning: uploads.tar.gz not found in $BACKUP_PATH"
fi

echo "==================================="
echo " Restore completed successfully!"
echo " Restarting application container..."
docker-compose restart app
echo "==================================="
