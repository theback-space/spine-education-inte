# 🚀 Deployment Guide

This guide covers all the ways you can deploy the Interactive Spine Chart application to make it publicly accessible.

---

## 📋 Table of Contents
1. [GitHub Pages (Recommended for GitHub repos)](#github-pages)
2. [Netlify (Easiest for beginners)](#netlify)
3. [Vercel (Best for performance)](#vercel)
4. [GitHub Spark (Integrated solution)](#github-spark)
5. [Custom Server / VPS](#custom-server)
6. [Troubleshooting](#troubleshooting)

---

## 1. GitHub Pages

### Prerequisites
- GitHub account
- Repository pushed to GitHub

### Setup Steps

#### Method A: Using GitHub Actions (Automatic)

1. **Create GitHub Actions Workflow**
   - Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Configure GitHub Pages**
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

3. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

4. **Access Your Site**
   - Visit: `https://your-username.github.io/spine-chart-app/`

#### Method B: Using gh-pages Package (Manual)

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   Add these scripts:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.ts**
   Add base URL:
   ```typescript
   export default defineConfig({
     base: '/spine-chart-app/', // Replace with your repo name
     plugins: [react()]
   })
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Go to **Settings** → **Pages**
   - Select **Deploy from a branch**
   - Choose **gh-pages** branch
   - Click Save

---

## 2. Netlify

### Prerequisites
- Netlify account (free at [netlify.com](https://netlify.com))

### Method A: Drag & Drop (Fastest)

1. **Build Locally**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [Netlify Drop](https://app.netlify.com/drop)
   - Drag your `dist` folder onto the page
   - Your site is live!

### Method B: Git Integration (Best for ongoing updates)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Netlify**
   - Log in to [Netlify](https://app.netlify.com)
   - Click **Add new site** → **Import an existing project**
   - Choose **GitHub** and authorize
   - Select your repository

3. **Configure Build Settings**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 20 (in Environment variables: `NODE_VERSION=20`)

4. **Deploy**
   - Click **Deploy site**
   - Your site will be live at: `https://random-name.netlify.app`

5. **Custom Domain (Optional)**
   - Go to **Site settings** → **Domain management**
   - Add your custom domain

### Method C: Netlify CLI

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   netlify deploy --prod
   ```

3. **Follow Prompts**
   - Authorize Netlify
   - Choose: **Create & configure a new site**
   - Publish directory: `dist`

---

## 3. Vercel

### Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))

### Method A: Vercel CLI (Fastest)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow Prompts**
   - Login to Vercel
   - Confirm project settings
   - Your site deploys automatically!

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

### Method B: Git Integration

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click **Add New Project**
   - Import your GitHub repository

3. **Configure** (Auto-detected for Vite projects)
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Deploy**
   - Click **Deploy**
   - Live at: `https://your-project.vercel.app`

5. **Automatic Deployments**
   - Every push to `main` → production deployment
   - Every pull request → preview deployment

---

## 4. GitHub Spark

### Prerequisites
- Access to GitHub Spark (Codespace environment)

### Deployment Steps

1. **Open in Spark**
   - Your project is already in a Spark Codespace

2. **Test Locally**
   ```bash
   npm run dev
   ```

3. **Publish**
   - Click the **Publish** button in the Spark interface
   - Your app is instantly live!

4. **Get URL**
   - Spark provides a permanent URL: `https://your-username.spark.github.com/your-app`

5. **Update**
   - Make changes to your code
   - Click **Publish** or **Update** again
   - Changes go live immediately
   - URL stays the same

### Advantages
- Zero configuration
- Instant deployment
- Integrated with your development workflow
- Automatic HTTPS
- No build step needed

---

## 5. Custom Server

### Prerequisites
- VPS or dedicated server
- Node.js installed
- Web server (nginx/Apache) or Node HTTP server

### Using a Simple HTTP Server

1. **Build the App**
   ```bash
   npm run build
   ```

2. **Install a Static Server**
   ```bash
   npm install -g serve
   ```

3. **Serve the App**
   ```bash
   serve -s dist -p 3000
   ```

4. **Access**
   - Local: `http://localhost:3000`
   - Server: `http://your-server-ip:3000`

### Using Nginx

1. **Build the App**
   ```bash
   npm run build
   ```

2. **Copy to Web Root**
   ```bash
   sudo cp -r dist/* /var/www/spine-chart/
   ```

3. **Configure Nginx**
   Create `/etc/nginx/sites-available/spine-chart`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       root /var/www/spine-chart;
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

4. **Enable Site**
   ```bash
   sudo ln -s /etc/nginx/sites-available/spine-chart /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```

### Using PM2 (Process Manager)

1. **Install PM2**
   ```bash
   npm install -g pm2
   ```

2. **Create Ecosystem File** (`ecosystem.config.js`):
   ```javascript
   module.exports = {
     apps: [{
       name: 'spine-chart',
       script: 'npx',
       args: 'serve -s dist -p 3000',
       cwd: '/path/to/your/app',
       env: {
         NODE_ENV: 'production'
       }
     }]
   }
   ```

3. **Start with PM2**
   ```bash
   pm2 start ecosystem.config.js
   pm2 save
   pm2 startup
   ```

---

## 🔒 SSL/HTTPS Setup

### For Netlify/Vercel
- Automatic HTTPS included
- Free SSL certificates
- Auto-renewal

### For Custom Server (Let's Encrypt)

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Get Certificate**
   ```bash
   sudo certbot --nginx -d your-domain.com
   ```

3. **Auto-Renewal**
   ```bash
   sudo certbot renew --dry-run
   ```

---

## 🌍 Custom Domain Setup

### Netlify
1. Go to **Site settings** → **Domain management**
2. Click **Add custom domain**
3. Follow DNS configuration instructions
4. Netlify handles SSL automatically

### Vercel
1. Go to **Settings** → **Domains**
2. Add your domain
3. Update DNS records as instructed
4. SSL automatically provisioned

### GitHub Pages
1. Go to **Settings** → **Pages**
2. Enter custom domain
3. Add CNAME record in your DNS:
   ```
   CNAME: www → your-username.github.io
   ```
4. Enable **Enforce HTTPS**

---

## 🧪 Testing Your Deployment

### Pre-Deployment Checklist
- [ ] Test locally with `npm run build && npm run preview`
- [ ] Verify all features work in production build
- [ ] Check mobile responsiveness
- [ ] Test PDF generation
- [ ] Verify persistent storage (useKV)
- [ ] Check all images load correctly
- [ ] Test email sharing functionality

### Post-Deployment Verification
- [ ] Visit your deployed URL
- [ ] Test vertebra selection
- [ ] Generate a PDF report
- [ ] Check branding customization
- [ ] Verify care journey editing
- [ ] Test on mobile device
- [ ] Check browser console for errors

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

### 404 Errors on Refresh
Add to your deployment configuration:
- **Netlify:** Create `_redirects` file in `public/`:
  ```
  /*    /index.html   200
  ```
- **Vercel:** Create `vercel.json`:
  ```json
  {
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
  }
  ```

### Assets Not Loading
- Check `vite.config.ts` base path matches your deployment URL
- Ensure all asset imports use relative paths
- Verify `dist` folder contains all assets after build

### Environment Variables
If you add API keys or secrets:
- **Netlify:** Site settings → Build & deploy → Environment variables
- **Vercel:** Settings → Environment Variables
- Never commit secrets to Git!

### Large Bundle Size
```bash
# Analyze bundle
npm run build -- --mode production
npx vite-bundle-visualizer
```

---

## 📊 Monitoring & Analytics

### Add Google Analytics (Optional)

1. **Install package**
   ```bash
   npm install react-ga4
   ```

2. **Initialize in App.tsx**
   ```typescript
   import ReactGA from 'react-ga4';
   ReactGA.initialize('G-XXXXXXXXXX');
   ```

### Netlify Analytics
- Built-in analytics available in Netlify dashboard
- No code changes required

### Vercel Analytics
- Enable in project settings
- Provides performance insights

---

## 🎯 Recommended Deployment Strategy

**For Individual Practitioners:**
- Use **Netlify** (easiest setup, free tier)
- Connect GitHub repo for automatic deployments
- Add custom domain if desired

**For Development/Testing:**
- Use **GitHub Spark** (fastest for iterations)
- Share Spark URL with peers
- Update with one click

**For Production/Clinics:**
- Use **Vercel** (best performance, global CDN)
- Set up custom domain
- Enable analytics
- Configure automatic deployments from `main` branch

---

## 📞 Need Help?

- Check the [main README](README.md) for general usage
- Review [GitHub Issues](https://github.com/your-username/spine-chart-app/issues)
- Consult platform-specific documentation:
  - [Netlify Docs](https://docs.netlify.com)
  - [Vercel Docs](https://vercel.com/docs)
  - [GitHub Pages Docs](https://docs.github.com/en/pages)

---

**Happy Deploying! 🚀**
