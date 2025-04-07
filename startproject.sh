#!/bin/bash

# Navigate to frontend and start the frontend server
echo "Starting frontend..."
cd frontend || exit
npm run dev &
FRONTEND_PID=$!
cd ..

# Navigate to backend and start the backend server
echo "Starting backend..."
cd backend || exit
./startserver.sh &
BACKEND_PID=$!
cd ..

# Wait for both processes
echo "Frontend PID: $FRONTEND_PID"
echo "Backend PID: $BACKEND_PID"
wait $FRONTEND_PID
wait $BACKEND_PID