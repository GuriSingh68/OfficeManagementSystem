#!/bin/bash

# Get the current directory
SCRIPT_DIR=$(pwd)

####Startting Backend Server####
echo "Starting Backend Server"
cd "$SCRIPT_DIR/Backend" || exit
npm run start &

####Starting frontend Server####

echo "Starting Frontend Server"
cd "$SCRIPT_DIR/frontend" || exit
pnpm run dev --port "3001" &

wait
