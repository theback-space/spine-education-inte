# Contributing to Interactive Spine Chart

Thank you for your interest in contributing to the Interactive Spine Chart application! This document provides guidelines and instructions for contributing.

---

## 📋 Table of Contents
- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Feature Requests](#feature-requests)
- [Bug Reports](#bug-reports)

---

## 🤝 Code of Conduct

### Our Pledge
We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior
- Use welcoming and inclusive language
- Be respectful of differing viewpoints
- Gracefully accept constructive criticism
- Focus on what's best for the community
- Show empathy towards other community members

### Unacceptable Behavior
- Harassment of any kind
- Trolling or insulting comments
- Publishing others' private information
- Any conduct that could reasonably be considered inappropriate

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Git installed
- A GitHub account
- Basic knowledge of React and TypeScript

### Fork and Clone

1. **Fork the repository**
   - Click "Fork" on GitHub
   - Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/spine-chart-app.git
   cd spine-chart-app
   ```

2. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/ORIGINAL-OWNER/spine-chart-app.git
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

---

## 🔄 Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
# Update main branch
git checkout main
git pull upstream main

# Create feature branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/bug-description
```

### Branch Naming Conventions
- `feature/` - New features (e.g., `feature/add-cervical-region-colors`)
- `fix/` - Bug fixes (e.g., `fix/pdf-generation-error`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/spine-chart-component`)
- `test/` - Test additions/updates (e.g., `test/add-unit-tests`)

### 2. Make Changes

- Write clean, readable code
- Follow existing code style
- Add comments for complex logic
- Test your changes thoroughly

### 3. Commit Changes

Use clear, descriptive commit messages:

```bash
git add .
git commit -m "Add feature: anatomically accurate sacrum shape"

# Or for multiple related changes
git commit -m "Fix: PDF generation issues

- Resolve page break problems
- Fix logo positioning
- Improve table formatting"
```

### Commit Message Guidelines
- Use present tense ("Add feature" not "Added feature")
- Use imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit first line to 72 characters
- Reference issues and pull requests when relevant

### 4. Push Changes

```bash
git push origin feature/your-feature-name
```

### 5. Create Pull Request

1. Go to your fork on GitHub
2. Click "Compare & pull request"
3. Fill out the PR template
4. Submit the pull request

---

## 📝 Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper types (avoid `any`)
- Use interfaces for object shapes
- Leverage type inference where appropriate

```typescript
// ✅ Good
interface VertebraData {
  id: string;
  fullName: string;
  nerveSupply: string[];
}

const getVertebra = (id: string): VertebraData | undefined => {
  // ...
}

// ❌ Avoid
const getVertebra = (id: any): any => {
  // ...
}
```

### React Components
- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use meaningful prop names

```typescript
// ✅ Good
interface SpineChartProps {
  selectedVertebrae: string[];
  onVertebraClick: (id: string) => void;
}

export const SpineChart = ({ selectedVertebrae, onVertebraClick }: SpineChartProps) => {
  // ...
}

// ❌ Avoid
export const SpineChart = (props: any) => {
  // ...
}
```

### State Management
- Use `useKV` for persistent state (saved between sessions)
- Use `useState` for temporary UI state
- Use functional updates when depending on previous state

```typescript
// ✅ Good - functional update
setSelectedVertebrae((current) => [...current, newId]);

// ❌ Avoid - can cause data loss
setSelectedVertebrae([...selectedVertebrae, newId]);
```

### Styling
- Use Tailwind utility classes
- Follow existing spacing patterns
- Ensure mobile responsiveness
- Test on multiple screen sizes

```tsx
// ✅ Good
<div className="flex flex-col gap-4 p-6 md:flex-row md:gap-6 md:p-8">
  {/* content */}
</div>

// ❌ Avoid inline styles
<div style={{ display: 'flex', padding: '24px' }}>
  {/* content */}
</div>
```

### Accessibility
- Use semantic HTML
- Include proper ARIA labels
- Ensure keyboard navigation works
- Maintain color contrast (WCAG AA)

```tsx
// ✅ Good
<button 
  aria-label="Clear all selected vertebrae"
  className="..."
>
  Clear Selection
</button>

// ❌ Avoid
<div onClick={handleClick}>Clear</div>
```

### File Organization
```
src/
├── components/
│   ├── SpineChart.tsx       # One component per file
│   ├── InfoPanel.tsx
│   └── ui/                  # shadcn components
├── lib/
│   ├── spineData.ts         # Data and constants
│   └── utils.ts             # Helper functions
└── hooks/
    └── use-mobile.ts        # Custom hooks
```

---

## 🧪 Testing

### Before Submitting
- [ ] App builds without errors (`npm run build`)
- [ ] No console errors or warnings
- [ ] Code follows style guidelines
- [ ] Mobile layout works correctly
- [ ] All interactive features function
- [ ] PDF generation works
- [ ] Persistent storage (useKV) works

### Manual Testing Checklist
- [ ] Select/deselect vertebrae
- [ ] Generate PDF with client info
- [ ] Customize branding (name, logo, font)
- [ ] Edit care journey phases
- [ ] Email sharing functionality
- [ ] Clear selection button
- [ ] Test on mobile device
- [ ] Test on different browsers

---

## 📤 Submitting Changes

### Pull Request Guidelines

1. **Title**: Clear and descriptive
   - ✅ "Add anatomically accurate lumbar vertebrae shapes"
   - ❌ "Update stuff"

2. **Description**: Explain what and why
   ```markdown
   ## Changes
   - Added more realistic lumbar vertebra SVG shapes
   - Increased vertebra size by 25%
   - Fixed spacing between vertebrae
   
   ## Motivation
   Previous vertebra shapes were too simplified and didn't 
   reflect actual anatomy, making it harder for clients to 
   recognize body parts.
   
   ## Screenshots
   [Include before/after if relevant]
   
   ## Testing
   - [x] Tested on Chrome, Firefox, Safari
   - [x] Verified mobile responsiveness
   - [x] Checked PDF output
   ```

3. **Link Issues**: Reference related issues
   - "Fixes #123"
   - "Relates to #456"

4. **Small PRs**: Keep changes focused
   - One feature or fix per PR
   - Easier to review and merge
   - Reduces merge conflicts

### Review Process

1. **Automated Checks**: 
   - Build must pass
   - Linting must pass
   
2. **Code Review**:
   - Maintainers will review your code
   - Address feedback promptly
   - Make requested changes

3. **Merge**:
   - Once approved, a maintainer will merge
   - Your contribution is live!

---

## 💡 Feature Requests

Have an idea for a new feature?

1. **Check existing issues** to avoid duplicates
2. **Open a new issue** with:
   - Clear title
   - Detailed description
   - Use cases
   - Mockups/examples (if applicable)
3. **Label** as `enhancement`
4. **Discuss** with maintainers before implementing

### Feature Request Template
```markdown
## Feature Description
A clear description of the feature

## Problem It Solves
What pain point does this address?

## Proposed Solution
How should it work?

## Alternatives Considered
What other approaches did you consider?

## Additional Context
Screenshots, mockups, examples
```

---

## 🐛 Bug Reports

Found a bug?

1. **Check existing issues** to see if it's reported
2. **Open a new issue** with:
   - Descriptive title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details
   - Screenshots/videos if helpful
3. **Label** as `bug`

### Bug Report Template
```markdown
## Bug Description
A clear description of the bug

## Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected Behavior
What should happen?

## Actual Behavior
What actually happens?

## Environment
- Browser: Chrome 120
- OS: macOS 14
- Device: Desktop/Mobile
- App Version: 1.0.0

## Screenshots
If applicable, add screenshots

## Additional Context
Any other relevant information
```

---

## 🎨 Design Contributions

### UI/UX Improvements
- Follow the design guidelines in [PRD.md](PRD.md)
- Maintain accessibility standards
- Keep medical/professional aesthetic
- Test on multiple devices

### Color Palette
- Primary: Deep Medical Blue `oklch(0.45 0.15 250)`
- Secondary: Rich Purple `oklch(0.52 0.12 280)`
- Accent: Bright Gold `oklch(0.85 0.15 85)`

### Typography
- Headings: Space Grotesk
- Body: IBM Plex Sans (or custom via branding)

---

## 📚 Documentation Contributions

Documentation improvements are always welcome!

- Fix typos or unclear instructions
- Add examples
- Improve README sections
- Create tutorials or guides
- Add code comments

---

## 🏆 Recognition

Contributors will be:
- Listed in the repository contributors
- Credited in release notes
- Acknowledged in documentation

---

## ❓ Questions?

- Open a [Discussion](https://github.com/your-username/spine-chart-app/discussions)
- Check existing documentation
- Ask in your pull request
- Reach out to maintainers

---

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing! Your efforts help chiropractors better educate their clients. 🦴✨**
