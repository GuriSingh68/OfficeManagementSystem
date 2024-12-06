#!/bin/bash

# Get the current directory
SCRIPT_DIR=$(pwd)

####Startting Backend Server####
echo "Starting Backend Server"
cd "$SCRIPT_DIR/Backend" || exit
npm install
npm run start &

####Starting frontend Server####

echo "Starting Frontend Server"
cd "$SCRIPT_DIR/frontend" || exit
npm install -g pnpm
pnpm install
pnpm run dev --port "3001" &

echo "Starting Mobile Applicatio"
cd "$SCRIPT_DIR/mobileApp/officemgt" || exit
npm install -g @ionic/cli
ionic serve

wait
