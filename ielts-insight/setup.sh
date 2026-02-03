#!/bin/bash

# IELTS Insight - Quick Setup Script
# This script helps you get started quickly

echo "🎓 IELTS Insight - Quick Setup"
echo "================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Installation complete!"
    echo ""
    echo "🚀 Available commands:"
    echo "  npm run dev      - Start development server (http://localhost:3000)"
    echo "  npm run build    - Build for production"
    echo "  npm run preview  - Preview production build"
    echo ""
    echo "📚 Documentation:"
    echo "  README.md           - Project overview"
    echo "  DEPLOYMENT.md       - Deployment guide"
    echo "  PROJECT_STRUCTURE.md - File structure"
    echo ""
    echo "Would you like to start the development server? (y/n)"
    read -r response
    
    if [[ "$response" =~ ^[Yy]$ ]]; then
        echo ""
        echo "🚀 Starting development server..."
        npm run dev
    else
        echo ""
        echo "👋 Happy coding! Run 'npm run dev' when ready."
    fi
else
    echo ""
    echo "❌ Installation failed. Please check the error messages above."
    exit 1
fi
