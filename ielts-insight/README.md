# IELTS Insight

An AI-powered IELTS learning platform that helps students analyze articles, build vocabulary, and practice writing.

## Features

- 🧠 **AI-Powered Analysis**: Automatically generates argument maps and mind maps from articles
- 🌐 **Real-time Translation**: Translates articles from English to Chinese using Claude AI
- 📚 **Smart Vocabulary**: Interactive word lookup with contextual examples
- ✍️ **Writing Practice**: Track vocabulary usage while writing essays

## Tech Stack

- React 18
- Vite
- Lucide React (icons)
- Anthropic Claude API

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy!

Or use Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Project Structure

```
ielts-insight/
├── src/
│   ├── App.jsx          # Main application component
│   ├── main.jsx         # React entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
└── vercel.json          # Vercel deployment config
```

## Usage

1. Click "Import Article" to paste an English article
2. AI will analyze the structure and create a mind map
3. Click any word to view its definition
4. Use the Writing tab to practice using new vocabulary

## License

MIT
