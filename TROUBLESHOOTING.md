# 🔧 GitHub Pages Deployment Troubleshooting Guide

## Quick Fix Steps

If your GitHub Pages deployment is showing a blank page, follow these steps:

### 1. Verify GitHub Pages Settings

1. Go to your repository: `https://github.com/theback-space/spine-education-inte`
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Should be "GitHub Actions"
   - If it says "Deploy from a branch", change it to **GitHub Actions**

### 2. Trigger a New Deployment

Option A - Push a small change:
```bash
git commit --allow-empty -m "Trigger deployment"
git push origin main
```

Option B - Manually trigger workflow:
1. Go to **Actions** tab in your repository
2. Click on "Deploy to GitHub Pages" workflow
3. Click "Run workflow" → "Run workflow"

### 3. Check Build Status

1. Go to **Actions** tab
2. Check if the latest workflow run is ✅ green (success) or ❌ red (failed)
3. Click on the workflow run to see details
4. If it failed, check the error messages

### 4. View Deployment Logs

In the Actions tab, click on the latest "Deploy to GitHub Pages" run:
- Check **build** job for build errors
- Check **deploy** job for deployment errors

### 5. Test Your Site

Your site should be at: `https://theback-space.github.io/spine-education-inte/`

**Important:** Make sure you're visiting the URL with the trailing slash!

## Common Issues & Fixes

### Issue: Blank Page with No Errors

**Solution:** Check browser console (F12 → Console tab)
- Look for 404 errors on JavaScript/CSS files
- Look for CORS errors
- Take a screenshot and share any errors you see

### Issue: 404 on All Assets

**Cause:** Base path mismatch

**Fix:** The `vite.config.ts` already has the correct base path. Try clearing browser cache:
- Chrome: Ctrl+Shift+Delete → Clear cached images and files
- Or try incognito/private browsing mode

### Issue: Build Succeeds But Page is Still Blank

**Solution 1:** Check if JavaScript is enabled in your browser

**Solution 2:** Try a different browser (Chrome, Firefox, Safari)

**Solution 3:** Check if the built files exist:
1. After a successful build, go to the Actions tab
2. Download the "github-pages" artifact
3. Unzip and verify `index.html` and `assets/` folder exist

### Issue: GitHub Actions Workflow Failing

**Check:**
1. Node version compatibility (should be 20)
2. npm install errors
3. TypeScript compilation errors

**Fix:** Check the specific error in the workflow logs and address it

## Debugging Checklist

- [ ] GitHub Pages is set to "GitHub Actions" source
- [ ] Latest workflow run is successful (green checkmark)
- [ ] Visiting the correct URL: `https://theback-space.github.io/spine-education-inte/`
- [ ] Browser JavaScript is enabled
- [ ] Browser cache is cleared
- [ ] Checked browser console for errors

## Alternative: Test Build Locally

To verify the build works correctly before deploying:

```bash
# Build the project
npm run build

# Preview the production build locally
npm run preview
```

Then visit `http://localhost:4173/spine-education-inte/` to test

## Need More Help?

If you're still seeing a blank page:

1. Open browser console (F12)
2. Take a screenshot of any errors
3. Check the Network tab (F12 → Network) and screenshot any red/failed requests
4. Share these with the development team

## Quick Status Check

Current configuration status:
- ✅ Vite base path: `/spine-education-inte/`
- ✅ GitHub Actions workflow exists
- ✅ Build command configured
- ✅ Error boundary in place
- ✅ Console logging added
- ✅ `.nojekyll` file added
- ✅ 404.html fallback created

## Next Steps After Fix

Once the site loads:
1. Test vertebra selection
2. Try generating a PDF
3. Test on mobile device
4. Share URL with colleagues for feedback
