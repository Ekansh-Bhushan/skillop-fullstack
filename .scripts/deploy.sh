#!/bin/bash
set -e

echo "Deployment started..."

git pull github main
echo "New changes copied to server !"

echo "Installing Frontend Dependencies..."
cd frontend
npm install --yes

echo "Creating Production Build for Frontend..."
npm run build

echo "Installing Backend Dependencies..."
cd ../backend
npm install --yes

echo "Deployment Finished!"