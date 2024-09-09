#!/bin/bash

# Load .env file
if [ -f .env ]; then
    export $(grep -v '^#' .env | xargs)
else
    echo ".env file not found!"
    exit 1
fi

# Ensure POSTGRES_URL is set
if [ -z "$POSTGRES_URL" ]; then
    echo "POSTGRES_URL is not set in the .env file."
    exit 1
fi

# Parse the POSTGRES_URL into its components using regex
regex="postgresql:\/\/([^:]+):([^@]+)@([^:]+):([0-9]+)\/(.+)"
if [[ $POSTGRES_URL =~ $regex ]]; then
    PG_USER="${BASH_REMATCH[1]}"
    PG_PASSWORD="${BASH_REMATCH[2]}"
    PG_HOST="${BASH_REMATCH[3]}"
    PG_PORT="${BASH_REMATCH[4]}"
    PG_DB="${BASH_REMATCH[5]}"
else
    echo "Failed to parse POSTGRES_URL. Ensure it follows the format: postgresql://user:password@host:port/database"
    exit 1
fi

# Upsert the database
echo "Connecting to PostgreSQL on $PG_HOST:$PG_PORT with user $PG_USER..."

PGPASSWORD=$PG_PASSWORD psql -h "$PG_HOST" -p "$PG_PORT" -U "$PG_USER" -c "SELECT 'CREATE DATABASE $PG_DB' WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = '$PG_DB')" || {
    echo "Failed to create database. It might already exist, or there is a connection issue."
}

echo "Database '$PG_DB' ensured."
