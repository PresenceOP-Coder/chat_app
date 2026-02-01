#!/bin/bash
set -e

echo "Building frontend..."
cd frontend
npm install
npm run build
cd ..

echo "Building Go backend..."
go build -o go-chat-server ./cmd/server

echo "Build complete!"
