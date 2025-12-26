# 🦴 Interactive Spine Chart - Chiropractic Client Education Tool

> **A professional web application for chiropractors to create personalized subluxation pattern reports and care plans for clients.**

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-spark-url-here)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📖 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Deployment Options](#deployment-options)
- [Usage Guide](#usage-guide)
- [Customization](#customization)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

This interactive spine chart application helps chiropractors:
- **Educate clients** about spinal subluxations and nervous system function
- **Create personalized reports** showing individual subluxation patterns
- **Share care plans** with detailed treatment phases
- **Generate professional PDFs** for client take-home materials

Perfect for post-examination client education sessions and treatment planning.

---

## ✨ Features

### 🖱️ Interactive Spine Visualization
- Full anatomical spine (C1-Coccyx) with color-coded regions
- Anatomically accurate vertebra shapes
- Multi-select capability - click to select/deselect
- Hover effects with instant vertebra identification
- Mobile-optimized touch targets

### 📊 Subluxation Pattern Analysis
- Select multiple vertebrae to build custom patterns
- View combined nerve supply and organ associations
- See comprehensive list of possible symptoms when subluxated
- Real-time pattern summary updates

### 🖨️ Professional PDF Reports
- Preview before downloading
- Includes client name, email, and provider name
- Custom branding with practice name and logo
- Date-stamped reports
- Visual spine diagram with highlighted subluxations
- Compact single-page format

### 🗓️ Care Journey Planning
- Three-phase treatment framework:
  - **Phase 1**: Palliative care for symptom reduction
  - **Phase 2**: Supportive care for natural healing
  - **Phase 3**: Preventative wellness care
- Customizable session frequency and duration
- Detailed patient expectations for each phase
- Included in PDF exports

### 🎨 Custom Branding
- Add your practice name
- Upload custom logo images
- Choose from Google Fonts for brand consistency
- All branding appears on charts and PDFs

### 💾 Persistent Storage
- All settings saved automatically
- Client data persists between sessions
- Care plans and branding preferences retained
- Each user's data is private to their browser

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- **No installation required** - runs entirely in the browser

### Quick Start

#### Option 1: Use the Published App (Recommended)
1. Navigate to the live URL: `[Your Published Spark URL]`
2. Start selecting vertebrae immediately
3. Customize your practice branding
4. Generate your first report

#### Option 2: Run Locally for Development
```bash
# Clone the repository
git clone https://github.com/your-username/spine-chart-app.git
cd spine-chart-app

# Install dependencies
npm install

# Start the development server
npm run dev

# Open http://localhost:5173 in your browser
```

---

## 🌐 Deployment Options

This app can be deployed to multiple platforms. Here are the recommended options:

### 1️⃣ GitHub Pages (Static Hosting)

**Best for:** Free hosting with custom domain support

```bash
# Build the production version
npm run build

# Deploy to GitHub Pages
# Option A: Use the GitHub Pages settings in your repository
# - Go to Settings → Pages
# - Set source to "GitHub Actions" or "Deploy from a branch"
# - Select the branch with your dist folder

# Option B: Use gh-pages package
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "vite build && gh-pages -d dist"
npm run deploy
```

**Your app will be live at:** `https://your-username.github.io/spine-chart-app/`

### 2️⃣ Spark Platform (GitHub's Spark)

**Best for:** Seamless integration with GitHub Spark ecosystem

1. Open your project in GitHub Spark
2. Click the **"Publish"** button
3. Your app is instantly live with a Spark URL
4. Updates are automatic when you republish

**Your app will be live at:** `https://your-username.spark.github.com/your-app`

### 3️⃣ Netlify (One-Click Deploy)

**Best for:** Easy deployment with preview URLs and automatic deployments

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy)

1. Click the button above or drag your `dist` folder to [Netlify Drop](https://app.netlify.com/drop)
2. Connect your GitHub repository for automatic deployments
3. Configure build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

**Your app will be live at:** `https://your-app-name.netlify.app`

### 4️⃣ Vercel (Zero-Config Deployment)

**Best for:** Fast global CDN with automatic HTTPS

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Or use Vercel's GitHub integration
# - Import your repository at vercel.com
# - Auto-detected settings work out of the box
```

**Your app will be live at:** `https://your-app-name.vercel.app`

### 5️⃣ Custom Server / VPS

**Best for:** Full control over hosting environment

```bash
# Build the app
npm run build

# Serve the dist folder with any static server
# Example with a simple HTTP server:
npx serve dist -p 3000
```

---

## 📱 Sharing with Non-GitHub Users

**Anyone can use your app - no GitHub account required!**

### For Peer Testing:

#### Quick Share (Temporary)
1. Run `npm run dev` in your development environment
2. In VS Code, go to **Ports** tab → make port 5173 **Public**
3. Share the forwarded URL (e.g., `https://xxx.app.github.dev`)
4. ⚠️ URL is temporary and requires your Codespace to be running

#### Permanent Share (Recommended)
1. Deploy to any platform above (GitHub Pages, Netlify, Vercel, etc.)
2. Share the permanent URL
3. ✅ Works 24/7 without your computer running
4. ✅ Users can bookmark and return anytime

### Generate QR Codes for Mobile:
1. Get your deployed URL
2. Use a QR code generator ([qr-code-generator.com](https://www.qr-code-generator.com))
3. Print and display in your office
4. Clients scan → instant access!

---

## 📘 Usage Guide

### Creating a Subluxation Report

1. **Enter Client Information**
   - Client name (optional but recommended)
   - Client email (for records)
   - Provider name
   - Report date

2. **Select Vertebrae**
   - Click on vertebrae to select (turns red)
   - Click again to deselect
   - Multiple vertebrae can be selected
   - View combined information in the panel below

3. **Customize Care Journey** (Optional)
   - Click "Customize Plan" in Care Journey section
   - Adjust session frequency and duration for each phase
   - Add phase descriptions
   - Explain what clients can expect

4. **Preview & Download PDF**
   - Click "Preview & Download PDF"
   - Review the formatted report
   - Click "Download PDF" to save
   - Or click "Email Client" to share via email

5. **Reset for Next Client**
   - Click "Clear Selection" to start fresh

---

## 🎨 Customization

### Branding Settings

1. **Practice Name**
   - Click "Branding Settings"
   - Enter your practice name
   - Appears on spine chart and PDFs

2. **Custom Logo**
   - Click "Upload Logo" in branding settings
   - Select an image file (PNG, JPG, SVG)
   - Logo appears in PDF header

3. **Brand Font**
   - Choose from curated Google Fonts
   - Applied to practice name throughout app

### Care Journey Templates

Customize the three-phase care model:
- Edit phase names and descriptions
- Adjust recommended session frequencies
- Add custom phases
- Describe expected outcomes for clients

---

## 🛠️ Development

### Tech Stack
- **Framework:** React 19 + TypeScript
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui (Radix UI primitives)
- **Animations:** Framer Motion
- **PDF Generation:** jsPDF
- **State Management:** React hooks + Spark KV (persistent storage)
- **Build Tool:** Vite
- **Icons:** Phosphor Icons

### Project Structure
```
spine-chart-app/
├── src/
│   ├── components/
│   │   ├── SpineChart.tsx          # Main interactive spine visualization
│   │   ├── InfoPanel.tsx           # Subluxation info display
│   │   ├── CareJourney.tsx         # Treatment phase planner
│   │   ├── PDFPreview.tsx          # PDF preview & generation
│   │   ├── BrandingSettings.tsx    # Practice customization
│   │   └── ui/                     # shadcn components
│   ├── lib/
│   │   ├── spineData.ts            # Vertebra anatomical data
│   │   └── utils.ts                # Helper functions
│   ├── App.tsx                     # Main application
│   ├── index.css                   # Global styles & theme
│   └── main.tsx                    # React entry point
├── index.html
├── package.json
└── vite.config.ts
```

### Running Locally
```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

### Making Changes

**The app auto-saves all user data using Spark KV.**

When updating code:
1. Make changes in your editor
2. Test in dev mode (`npm run dev`)
3. Build and deploy when ready
4. User data persists across updates

---

## 🔄 Updating Your Published App

### With Spark:
1. Make code changes in your editor
2. Test locally
3. Click "Publish" or "Update" in Spark interface
4. Changes go live instantly
5. URL remains the same

### With GitHub Pages:
1. Make changes and commit to your repository
2. Push to GitHub
3. GitHub Actions automatically rebuilds and deploys
4. Changes live in ~2-5 minutes

### With Netlify/Vercel:
1. Push changes to your connected GitHub repository
2. Automatic deployment triggered
3. Preview deployments for every pull request
4. Production deploys from main branch

---

## 🤝 Contributing

Contributions are welcome! Here's how to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit with clear messages (`git commit -m 'Add amazing feature'`)
5. Push to your branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Follow the existing code style
- Test on mobile devices
- Ensure accessibility (WCAG AA)
- Update documentation for new features

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.

---

## 🙏 Acknowledgments

- Anatomical data compiled from standard chiropractic reference materials
- Built with [GitHub Spark](https://githubnext.com/projects/spark)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Phosphor Icons](https://phosphoricons.com)

---

## 📞 Support

For issues, questions, or feature requests:
- Open an issue on GitHub
- Check existing documentation in `/docs`
- Review the [PRD.md](PRD.md) for design decisions

---

**Made with ❤️ for chiropractors who care about client education**
