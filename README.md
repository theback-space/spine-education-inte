# Interactive Spine Chart - Chiropractic Client Education Tool

An interactive web application that helps chiropractors create personalized subluxation pattern reports for clients.

## 🚀 What's Inside?
- Interactive spine visualization (C1-Coccyx) with anatomically accurate vertebra shapes
- Multi-select vertebrae to build custom subluxation patterns
- Client name input for personalized reports
- PDF export with professional formatting
- Care journey planner with customizable treatment phases
- Persistent storage - your settings and selections are saved between sessions

## 📋 Features
- **Client Name Input**: Enter client names that appear on charts and PDF reports
- **Interactive Spine Chart**: Click vertebrae to select/deselect, hover for quick info
- **Subluxation Info**: View detailed nerve supply, organs, and possible symptoms
- **PDF Reports**: Generate professional take-home educational materials
- **Care Journey**: Customize treatment phases and share with clients
- **Branding**: Add your practice name, logo, and custom fonts

## 🌐 Sharing Your App with Non-GitHub Users

**Your app can be shared with ANYONE - no GitHub account required!**

### How to Share for Testing:

#### Option 1: Share Your Published Spark URL (Recommended)
1. **Publish Your App**: Click the "Publish" button in the Spark interface
2. **Get Your URL**: After publishing, you'll receive a unique URL (e.g., `https://your-username.spark.github.com/your-app`)
3. **Share the Link**: Send this URL to anyone via:
   - Email
   - Text message
   - Slack/Teams
   - QR code (generate from the URL)
4. **They Can Use It**: Anyone with the link can access and use your app - no login needed!

#### Option 2: Share Your Development Preview (For Quick Testing)
1. **Start Your App**: In your Codespace, the app runs on a local development server
2. **Make It Public**: 
   - In VS Code, go to the "Ports" tab (bottom panel)
   - Find the port your app is running on (usually 5173)
   - Right-click and select "Port Visibility" → "Public"
3. **Get the URL**: The forwarded address will be shown (e.g., `https://xxx.preview.app.github.dev`)
4. **Share for Testing**: Send this URL to testers
5. **Note**: This URL is temporary and only works while your Codespace is running

### Best Practices for Testing:

**For Peer Testing:**
- ✅ Use Option 1 (Published URL) for stable, long-term testing
- ✅ Share with colleagues, staff, or beta users
- ✅ No GitHub account needed for testers
- ✅ Works on all devices (mobile, tablet, desktop)

**For Quick Feedback:**
- ✅ Use Option 2 (Dev Preview) for quick "check this out" moments
- ⚠️ Remember to keep your Codespace running while others test
- ⚠️ URL changes if you restart the Codespace

### What Testers Will Experience:
- Full app functionality (selecting vertebrae, generating PDFs, etc.)
- Their data is saved to their browser (via `useKV`)
- Each tester has their own data (not shared between users)
- Mobile-friendly responsive design
- No installation or account creation needed

### Creating a QR Code for Easy Mobile Testing:
1. Get your published URL
2. Use a free QR code generator (qr-code-generator.com, qrcode.com, etc.)
3. Paste your app URL
4. Download and share the QR code
5. Testers scan with their phone camera → instant access!

## 🔄 Can I Update This App After Publishing?

**Yes!** Here's how updates work with Spark:

### How to Update Your Published App:
1. **Make Changes**: Edit your code in this Codespace (the same way you're working now)
2. **Test Locally**: Preview your changes to make sure everything works
3. **Publish Again**: Click the "Publish" or "Update" button in the Spark interface
4. **Changes Go Live**: Your published app will automatically update with the new code
5. **URL Stays the Same**: Your testers can keep using the same link!

### What Gets Updated:
- ✅ All code changes (new features, bug fixes, UI improvements)
- ✅ New components and functionality
- ✅ Styling and design updates
- ✅ Configuration changes

### What Stays the Same:
- ✅ Your app's URL stays the same
- ✅ User data persists (client names, selections, care plans saved with `useKV`)
- ✅ No need to republish to a new location
- ✅ Testers don't need new links

### Best Practices for Updates:
- **Test First**: Always test changes in your development environment before publishing
- **Incremental Updates**: Make small, focused changes rather than massive overhauls
- **Backup Data**: Important customizations (practice name, logo, care plans) are stored with `useKV` and will persist
- **Version Notes**: Keep track of what you change so you can roll back if needed
- **Notify Testers**: Let testers know when you've pushed updates

### Example Update Workflow:
```
1. Open your Spark Codespace
2. Make your changes (e.g., improve vertebra shapes, add new features)
3. Test in the preview
4. Click "Publish" when ready
5. Your live app updates automatically!
6. Testers refresh their browser to see updates
```

## 🛠️ Development
This app uses:
- React + TypeScript
- Tailwind CSS for styling
- shadcn/ui components
- Framer Motion for animations
- jsPDF for report generation
- Spark KV for persistent storage

## 📄 License
The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
