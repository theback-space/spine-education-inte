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

## 🔄 Can I Update This App After Publishing?

**Yes!** Here's how updates work with Spark:

### How to Update Your Published App:
1. **Make Changes**: Edit your code in this Codespace (the same way you're working now)
2. **Test Locally**: Preview your changes to make sure everything works
3. **Publish Again**: Click the "Publish" or "Update" button in the Spark interface
4. **Changes Go Live**: Your published app will automatically update with the new code

### What Gets Updated:
- ✅ All code changes (new features, bug fixes, UI improvements)
- ✅ New components and functionality
- ✅ Styling and design updates
- ✅ Configuration changes

### What Stays the Same:
- ✅ Your app's URL stays the same
- ✅ User data persists (client names, selections, care plans saved with `useKV`)
- ✅ No need to republish to a new location

### Best Practices for Updates:
- **Test First**: Always test changes in your development environment before publishing
- **Incremental Updates**: Make small, focused changes rather than massive overhauls
- **Backup Data**: Important customizations (practice name, logo, care plans) are stored with `useKV` and will persist
- **Version Notes**: Keep track of what you change so you can roll back if needed

### Example Update Workflow:
```
1. Open your Spark Codespace
2. Make your changes (e.g., improve vertebra shapes, add new features)
3. Test in the preview
4. Click "Publish" when ready
5. Your live app updates automatically!
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
