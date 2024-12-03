#!/bin/bash

######Start Backend Server#######

echo "Starting Backend Server"
cd /d/BrightSpace/WebDevProject/EGEN52006/assignment_4/Backend
npm run start &


echo "Starting Frontend Server"
cd /d/BrightSpace/WebDevProject/EGEN52006/assignment_4/frontend
pnpm run dev --port "3001" &

wait
