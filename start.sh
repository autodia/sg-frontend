#!/bin/sh

# creates log dir in docker volume
FRONTEND_LOG_DIR="/home/node/frontend/logs"
BACKEND_LOG_DIR="/home/node/backend/logs"

mkdir -p "$FRONTEND_LOG_DIR"
mkdir -p "$BACKEND_LOG_DIR"

# start nginx
nginx -g "daemon off;"
