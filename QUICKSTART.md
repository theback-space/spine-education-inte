# 🚀 Quick Start Guide

Get up and running with the Interactive Spine Chart in under 5 minutes!

---

## ⚡ For Users (No Coding Required)

### Access the App

**Option 1: Use the Live Demo**
1. Visit the published URL: `[YOUR-APP-URL-HERE]`
2. Start selecting vertebrae immediately
3. Your settings and selections save automatically

**Option 2: Scan QR Code**
- Use your phone camera to scan the QR code
- App opens instantly in your browser
- Works offline after first load

---

## 👨‍💼 For Chiropractors

### First-Time Setup (2 minutes)

1. **Add Your Branding**
   - Click "Branding Settings" button
   - Enter your practice name
   - Upload your logo (optional)
   - Choose a brand font

2. **Customize Care Journey** (optional)
   - Scroll to "Your Chiropractic Care Journey"
   - Click "Customize Plan"
   - Adjust session frequencies and durations
   - Add descriptions of what patients can expect

### Creating Your First Report (3 minutes)

1. **Enter Client Info**
   - Client Name: "John Smith"
   - Client Email: "john@email.com"
   - Provider Name: "Dr. Jane Doe"
   - Report Date: (auto-filled with today)

2. **Select Vertebrae**
   - Click on vertebrae in the spine chart
   - Selected vertebrae turn red
   - Click again to deselect

3. **Review Information**
   - Scroll down to see combined pattern summary
   - Review nerve supply, organs, and symptoms

4. **Generate PDF**
   - Click "Preview & Download PDF"
   - Review the formatted report
   - Click "Download PDF" to save
   - Or click "Email Client" to share directly

5. **Reset for Next Client**
   - Click "Clear Selection"
   - Enter new client info
   - Repeat!

---

## 💻 For Developers

### Local Development Setup

**1. Clone the Repository**
```bash
git clone https://github.com/your-username/spine-chart-app.git
cd spine-chart-app
```

**2. Install Dependencies**
```bash
npm install
```

**3. Start Development Server**
```bash
npm run dev
```

**4. Open in Browser**
- Navigate to: `http://localhost:5173`
- App auto-reloads when you make changes

### Making Changes

**Edit Components:**
```bash
# Main app logic
src/App.tsx

# Spine visualization
src/components/SpineChart.tsx

# Info panel
src/components/InfoPanel.tsx

# PDF generation
src/components/PDFPreview.tsx

# Care journey
src/components/CareJourney.tsx

# Branding settings
src/components/BrandingSettings.tsx
```

**Modify Vertebra Data:**
```bash
# Edit anatomical information
src/lib/spineData.ts
```

**Update Styling:**
```bash
# Global styles and theme
src/index.css
```

### Testing Your Changes

```bash
# Build production version
npm run build

# Preview production build
npm run preview

# Check for linting errors
npm run lint
```

---

## 🌐 Deployment Options

### Fastest: GitHub Spark
```bash
# Already in Spark?
1. Make your changes
2. Click "Publish" button
3. Done! ✨
```

### Easy: Netlify
```bash
# Drag & drop
1. Run: npm run build
2. Drag the 'dist' folder to netlify.com/drop
3. Done! ✨
```

### Automated: GitHub Actions
```bash
# One-time setup
1. Push to GitHub
2. Enable GitHub Pages in repo settings
3. Select "GitHub Actions" as source
4. Every push to 'main' auto-deploys ✨
```

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

---

## 🎯 Common Tasks

### Change Practice Name
1. Click "Branding Settings"
2. Update practice name field
3. Auto-saves immediately

### Upload Logo
1. Click "Branding Settings"
2. Click "Upload Logo"
3. Select image file (PNG, JPG, SVG)
4. Logo appears in PDFs

### Customize Colors
1. Open `src/index.css`
2. Modify color values in `:root`:
   ```css
   --primary: oklch(0.45 0.15 250);  /* Deep blue */
   --secondary: oklch(0.52 0.12 280); /* Purple */
   --accent: oklch(0.85 0.15 85);     /* Gold */
   ```
3. Save and see changes instantly

### Add New Symptom Data
1. Open `src/lib/spineData.ts`
2. Find the vertebra (e.g., `C1`)
3. Add to `commonSymptoms` array:
   ```typescript
   commonSymptoms: [
     "Existing symptom",
     "New symptom here"
   ]
   ```
4. Save - updates immediately

### Adjust PDF Layout
1. Open `src/components/PDFPreview.tsx`
2. Modify PDF generation code
3. Test with "Preview & Download PDF"

---

## 🔧 Troubleshooting

### App Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Changes Not Showing
```bash
# Hard refresh browser
# Mac: Cmd + Shift + R
# Windows: Ctrl + Shift + R
```

### PDF Not Generating
- Check browser console for errors (F12)
- Ensure at least one vertebra is selected
- Try clearing browser cache

### Data Not Saving
- Data saves to browser's local storage
- Each browser/device has separate data
- Private browsing may prevent saving

---

## 📱 Mobile Usage

### For Best Results:
1. Add to home screen (iOS/Android)
2. Use in landscape for easier vertebra selection
3. Tap vertebrae - they're optimized for touch
4. PDF generation works on mobile

---

## 🆘 Getting Help

**Documentation:**
- Full README: [README.md](README.md)
- Deployment Guide: [DEPLOYMENT.md](DEPLOYMENT.md)
- Contributing: [CONTRIBUTING.md](CONTRIBUTING.md)
- Product Specs: [PRD.md](PRD.md)

**Issues & Questions:**
- Check [existing issues](https://github.com/your-username/spine-chart-app/issues)
- Open a new issue if needed
- Include screenshots and error messages

**Community:**
- Start a [discussion](https://github.com/your-username/spine-chart-app/discussions)
- Share your use cases
- Request features

---

## 🎓 Learning Resources

**New to React?**
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

**Want to Customize?**
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

**Need Icons?**
- [Phosphor Icons](https://phosphoricons.com)

---

## ✅ Quick Checklist

### First Time Users:
- [ ] Access the app via provided URL
- [ ] Add your practice branding
- [ ] Test vertebra selection
- [ ] Generate a sample PDF
- [ ] Bookmark the app

### Developers:
- [ ] Clone the repository
- [ ] Install dependencies
- [ ] Start dev server
- [ ] Make a test change
- [ ] Build production version

### Ready to Deploy:
- [ ] Test all features locally
- [ ] Choose deployment platform
- [ ] Follow deployment guide
- [ ] Share URL with team
- [ ] Gather feedback

---

**Need help? Don't hesitate to open an issue or discussion! We're here to help. 🤝**
