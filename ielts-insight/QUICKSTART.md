# 🎓 IELTS Insight - Quick Start Guide

Welcome! This guide will get you up and running in 5 minutes.

## 📦 What You Have

A complete, production-ready React + Vite project with:
- ✅ AI-powered article analysis (Claude API)
- ✅ Real-time English-to-Chinese translation
- ✅ Interactive mind maps
- ✅ Vocabulary learning tools
- ✅ Writing practice features
- ✅ Fully configured for Vercel deployment

## 🚀 3-Step Deployment

### Step 1: Install Dependencies (1 min)

```bash
cd ielts-insight
npm install
```

### Step 2: Test Locally (1 min)

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### Step 3: Deploy to Vercel (3 min)

**Option A: Using Vercel Dashboard**
1. Push code to GitHub
2. Go to vercel.com
3. Click "New Project"
4. Import your repo
5. Click "Deploy" ✨

**Option B: Using Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Done!** Your app is live 🎉

## 📁 Project Files

```
ielts-insight/
├── src/
│   ├── App.jsx         ⭐ Main application (your IELTS Insight code)
│   ├── main.jsx        🔧 React entry point
│   └── index.css       🎨 Global styles
│
├── public/
│   └── vite.svg        🖼️  Icon
│
├── package.json        📦 Dependencies
├── vite.config.js      ⚙️  Build config
├── vercel.json         🚀 Deployment config
├── index.html          📄 HTML template
│
└── Documentation/
    ├── README.md           📖 Project overview
    ├── DEPLOYMENT.md       🚀 Detailed deployment guide
    ├── PROJECT_STRUCTURE.md 📋 File descriptions
    ├── CHECKLIST.md        ✅ Pre-deployment checklist
    └── setup.sh            🔧 Auto-setup script
```

## 💻 Development Commands

```bash
# Install dependencies
npm install

# Start dev server (localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Key Features

### 1. AI Article Analysis
- Paste any English article
- AI generates mind map automatically
- Shows argument structure with logic roles

### 2. Real-Time Translation
- Click any paragraph
- See Chinese translation instantly
- Toggle show/hide

### 3. Vocabulary Learning
- Click any word in the article
- View definition, examples, usage
- Track learned words

### 4. Writing Practice
- Write essays in the app
- Track vocabulary usage
- Get real-time feedback

## 🔧 Customization

### Change Colors
Edit `src/index.css`:
```css
:root {
  --paper-white: #FDFDFB;
  --ink-black: #2D3436;
  --oxford-blue: #35495E;
  --soft-gray: #F1F1EF;
}
```

### Change Fonts
Edit `index.html` (lines 10-11):
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont&display=swap" rel="stylesheet">
```

### Modify AI Behavior
Edit the `analyzeArticleWithAI` function in `src/App.jsx`

## 🐛 Troubleshooting

### "npm: command not found"
**Solution**: Install Node.js from https://nodejs.org/

### Build fails
**Solution**: 
```bash
rm -rf node_modules
npm install
npm run build
```

### Blank page after deployment
**Solution**: 
- Check browser console for errors
- Verify vercel.json is present
- Check Vercel build logs

### API calls fail
**Solution**:
- The app uses Anthropic Claude API directly
- Check browser network tab
- Verify API is accessible

## 📱 Supported Browsers

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## 📚 Documentation

- **README.md** - Project overview and features
- **DEPLOYMENT.md** - Detailed deployment instructions
- **PROJECT_STRUCTURE.md** - File-by-file explanation
- **CHECKLIST.md** - Pre-deployment checklist

## 💡 Pro Tips

1. **First Deploy**: Use Vercel - it's the easiest
2. **Custom Domain**: Add in Vercel dashboard → Domains
3. **Analytics**: Enable Vercel Analytics for insights
4. **Updates**: Just push to GitHub - auto-deploys!

## 🆘 Need Help?

Common questions:

**Q: How do I update the app?**
A: Edit `src/App.jsx`, push to GitHub, Vercel auto-deploys.

**Q: Can I use my own domain?**
A: Yes! Add it in Vercel dashboard → Settings → Domains.

**Q: How do I add environment variables?**
A: Vercel dashboard → Settings → Environment Variables.

**Q: The AI features don't work**
A: The app uses Anthropic's Claude API. Check network tab in browser DevTools.

## ✨ Quick Commands Reference

```bash
# Setup
npm install              # Install dependencies
bash setup.sh           # Auto-setup with interactive prompts

# Development
npm run dev             # Start dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Deployment
vercel                  # Deploy to Vercel (preview)
vercel --prod          # Deploy to production

# Git
git add .
git commit -m "message"
git push
```

## 🎉 You're All Set!

Your project is ready to deploy. Here's what to do next:

1. ✅ Run `npm install`
2. ✅ Test with `npm run dev`
3. ✅ Push to GitHub
4. ✅ Deploy on Vercel
5. ✅ Share your app!

**Happy deploying!** 🚀

---

*Made with ❤️ for IELTS learners*
