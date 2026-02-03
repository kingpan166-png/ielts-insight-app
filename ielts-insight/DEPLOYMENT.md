# Deployment Guide for IELTS Insight

## Quick Deploy to Vercel

### Method 1: Using Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Done!** Your app will be live at `https://your-app.vercel.app`

### Method 2: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Local Development

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Environment Variables (Optional)

If you need to add environment variables for API keys:

1. Create `.env.local` file:
   ```
   VITE_API_KEY=your_api_key_here
   ```

2. In Vercel Dashboard:
   - Go to Project Settings → Environment Variables
   - Add your variables

3. Access in code:
   ```javascript
   const apiKey = import.meta.env.VITE_API_KEY
   ```

## Troubleshooting

### Build fails on Vercel

- Check Node.js version (should be 18+)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

### App shows blank page

- Check browser console for errors
- Verify index.html is in root directory
- Check that all imports are correct

### API calls fail

- Anthropic API is being called directly from browser
- Ensure you're not hitting rate limits
- Check network tab in browser DevTools

## Project Structure

```
ielts-insight/
├── public/              # Static assets
│   └── vite.svg
├── src/
│   ├── App.jsx         # Main component (IELTS Insight)
│   ├── main.jsx        # React entry point
│   └── index.css       # Global styles
├── index.html          # HTML entry point
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── vercel.json         # Vercel config (optional)
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## Performance Optimization

The current configuration includes:

- Code splitting for React and Lucide icons
- Optimized build output
- Fast refresh in development
- Minification in production

## Custom Domain

1. In Vercel Dashboard → Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Wait for DNS propagation (usually < 1 hour)

## Support

For issues:
- Check Vercel deployment logs
- Review browser console
- Verify API connectivity

Happy deploying! 🚀
