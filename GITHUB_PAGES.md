# 📱 GitHub Pages - Team Access Instructions

## 🌐 Live Application URL

Your spine education application is now deployed and accessible at:

**https://theback-space.github.io/spine-education-inte/**

## 👥 Sharing with Your Team

Anyone can access this application - **no GitHub account required!**

### For Desktop Users:
1. Share the URL: `https://theback-space.github.io/spine-education-inte/`
2. Team members can bookmark it for quick access
3. Works in all modern browsers (Chrome, Firefox, Safari, Edge)

### For Mobile Users:
1. Share the URL via email or messaging
2. Or create a QR code for easy scanning:
   - Go to [qr-code-generator.com](https://www.qr-code-generator.com)
   - Paste: `https://theback-space.github.io/spine-education-inte/`
   - Download and share the QR code
   - Print it for your office!

## 🔄 How Updates Work

The application automatically redeploys when changes are pushed to the `main` branch:

1. **Make changes** to your code
2. **Commit and push** to the `main` branch
3. **GitHub Actions** automatically builds and deploys (takes ~2-5 minutes)
4. **Team members** just need to refresh their browser to see updates

### Checking Deployment Status:
- Go to: https://github.com/theback-space/spine-education-inte/actions
- Look for the "Deploy to GitHub Pages" workflow
- Green checkmark ✅ = deployment successful
- Red X ❌ = deployment failed (check logs)

## ⚙️ GitHub Pages Settings

If you need to modify GitHub Pages settings:

1. Go to your repository: https://github.com/theback-space/spine-education-inte
2. Click **Settings**
3. Scroll to **Pages** in the left sidebar
4. Current configuration:
   - **Source**: GitHub Actions
   - **Branch**: Deployed from workflow
   - **Custom domain**: Not configured (optional)

## 🎨 Features Available to Your Team

Once your team accesses the application, they can:

- ✅ **Select vertebrae** on the interactive spine chart
- ✅ **View subluxation information** for selected vertebrae
- ✅ **Create personalized reports** with client information
- ✅ **Generate PDF reports** for client take-home materials
- ✅ **Customize branding** with practice name and logo
- ✅ **Plan care journeys** with three-phase treatment framework
- ✅ **Save settings** - all data persists in the browser

## 💾 Data Storage

**Important**: All user data is stored locally in each user's browser:
- Client information
- Branding settings
- Care journey customizations

This means:
- ✅ Data is private to each user
- ✅ No data is sent to servers
- ⚠️ Clearing browser cache will delete saved data
- ⚠️ Different browsers/devices have separate data

## 🔒 Privacy & Security

- **HTTPS enabled**: All traffic is encrypted
- **No authentication required**: Open access for your team
- **Client data stays local**: No server-side storage
- **No tracking**: No analytics or cookies

## 📱 Adding to Home Screen (Mobile)

For quick access on mobile devices:

### iOS (iPhone/iPad):
1. Open the URL in Safari
2. Tap the Share button (square with arrow)
3. Scroll and tap "Add to Home Screen"
4. Name it and tap "Add"

### Android:
1. Open the URL in Chrome
2. Tap the menu (three dots)
3. Tap "Add to Home screen"
4. Name it and tap "Add"

## 🆘 Troubleshooting

### Application Not Loading?
- Clear browser cache and refresh
- Try a different browser
- Check if GitHub Pages is enabled in repository settings
- Verify deployment succeeded in GitHub Actions

### Old Version Showing?
- Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
- Clear browser cache
- Wait a few minutes - deployment might still be in progress

### Features Not Working?
- Ensure JavaScript is enabled in browser
- Check browser console for errors (F12 key)
- Try in incognito/private mode to rule out extensions

## 📞 Support

For issues or questions:
- **Repository**: https://github.com/theback-space/spine-education-inte
- **Issues**: https://github.com/theback-space/spine-education-inte/issues
- **Documentation**: See README.md and DEPLOYMENT.md

## 🎯 Next Steps (Optional)

### Custom Domain
Want to use a custom domain like `spine.yourpractice.com`?

1. Go to repository **Settings** → **Pages**
2. Enter your custom domain
3. Add a CNAME record in your DNS settings:
   ```
   CNAME: spine → theback-space.github.io
   ```
4. Enable "Enforce HTTPS"

### Password Protection
GitHub Pages doesn't support password protection. For private access, consider:
- Deploying to Netlify (supports password protection)
- Using Vercel with authentication
- Self-hosting on a private server

---

**🎉 Your team can now access the spine education tool anytime, anywhere!**
