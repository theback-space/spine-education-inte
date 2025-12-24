# Chiropractic Spine Chart Interactive Tool

An interactive web application that helps chiropractors visually explain spinal subluxations and nervous system functions to clients through an engaging, clickable anatomical spine chart.

**Experience Qualities**:
1. **Educational** - Transforms complex anatomy into accessible, client-friendly explanations that build understanding
2. **Professional** - Conveys medical expertise through clean design and accurate anatomical representations
3. **Interactive** - Engages clients through direct manipulation of the spine visualization, making consultations memorable

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-page interactive tool with clickable elements, persistent state for selected vertebra, and data display. It has moderate interactivity but doesn't require complex routing or backend integration.

## Essential Features

### Clickable Spine Visualization
- **Functionality**: Full anatomical spine chart (C1-Coccyx) with individually clickable vertebrae, using an SVG-based representation inspired by "Your Subluxation Pattern" chart from THE-BACK.SPACE
- **Purpose**: Allows chiropractors to guide clients through specific problem areas with precision
- **Trigger**: User taps/clicks any vertebra on the spine chart
- **Progression**: Idle state → Hover shows vertebra label → Click highlights vertebra → Info panel displays below chart → Panel persists until new selection
- **Success criteria**: Each vertebra responds to interaction, visual feedback is immediate, correct anatomical data displays with "Possible Symptoms When Subluxated" terminology

### Persistent Information Panel
- **Functionality**: Displays vertebra name, associated nerves, organs, and possible symptoms when subluxated in client-friendly language
- **Purpose**: Educates clients about the connection between spine health and body functions
- **Trigger**: Clicking any vertebra on the chart
- **Progression**: Panel hidden → Vertebra clicked → Panel slides/fades in below chart → Content updates → Remains visible until new vertebra selected
- **Success criteria**: Panel content is accurate, readable, uses "Possible Symptoms When Subluxated" terminology, and maintains visibility during consultation

### View Toggle (Front/Side)
- **Functionality**: Switch between anterior and lateral spine views
- **Purpose**: Provides different anatomical perspectives for comprehensive understanding
- **Trigger**: Clicking view toggle buttons
- **Progression**: Front view active → Click "Side View" button → Chart transitions to side view → Click "Front View" → Returns to front view
- **Success criteria**: Both views load properly, vertebrae remain clickable, selected state transfers between views

### Reset Functionality
- **Functionality**: Clear selected vertebra and hide info panel
- **Purpose**: Allows starting fresh during client consultations
- **Trigger**: Clicking "Reset View" button
- **Progression**: Vertebra selected and panel visible → Click reset → Highlight clears → Panel fades out → Returns to default state
- **Success criteria**: All highlights removed, panel hidden, app returns to initial state

### Export Options
- **Functionality**: Download selected vertebra information as PDF or share via email
- **Purpose**: Provides clients with take-home educational materials
- **Trigger**: Clicking "Download PDF" or "Email" buttons when vertebra is selected
- **Progression**: Vertebra selected → Click export button → Format confirmation → Download/email initiated
- **Success criteria**: Generated PDF contains vertebra info, email functionality works on mobile devices

## Edge Case Handling
- **No Selection State**: Info panel hidden, export buttons disabled until vertebra is clicked
- **Rapid Clicking**: Debounce mechanism prevents UI flicker when quickly switching between vertebrae
- **Mobile Touch**: Large touch targets (minimum 44x44px) prevent mis-taps on small vertebrae
- **Missing Data**: Graceful fallback text if vertebra data is incomplete
- **Offline Use**: All assets embedded, no external dependencies for core functionality

## Design Direction
The design should evoke **trust, clarity, and professionalism** - like a modern medical office. It should feel scientifically accurate yet approachable, avoiding intimidating medical jargon while maintaining anatomical precision. The interface should fade into the background, letting the spine visualization be the hero element.

## Color Selection
A medical-professional palette with calming blues and clinical whites, accented with warm therapeutic tones.

- **Primary Color**: Deep Medical Blue `oklch(0.45 0.15 250)` - Communicates trust, medical expertise, and stability
- **Secondary Colors**: 
  - Cool Gray `oklch(0.55 0.01 240)` - Professional neutrality for backgrounds and borders
  - Soft White `oklch(0.98 0.005 240)` - Clean clinical feel for cards and panels
- **Accent Color**: Therapeutic Teal `oklch(0.65 0.12 200)` - Highlights interactive elements and selected states, suggests healing
- **Foreground/Background Pairings**:
  - Primary (Deep Medical Blue `oklch(0.45 0.15 250)`): White text `oklch(1 0 0)` - Ratio 8.2:1 ✓
  - Accent (Therapeutic Teal `oklch(0.65 0.12 200)`): White text `oklch(1 0 0)` - Ratio 4.9:1 ✓
  - Background (Soft White `oklch(0.98 0.005 240)`): Dark text `oklch(0.25 0.01 240)` - Ratio 14.1:1 ✓
  - Muted (Cool Gray `oklch(0.55 0.01 240)`): White text `oklch(1 0 0)` - Ratio 5.1:1 ✓

## Font Selection
Typography should balance medical professionalism with modern accessibility - precise enough for anatomical labels, warm enough for client-facing content.

- **Primary Font**: **IBM Plex Sans** - Technical clarity with humanist warmth, perfect for medical applications
- **Accent Font**: **Space Grotesk** - For vertebra labels and headings, adds geometric precision

- **Typographic Hierarchy**:
  - H1 (App Title): Space Grotesk SemiBold / 32px / tight letter-spacing (-0.02em)
  - H2 (Vertebra Label): Space Grotesk Bold / 28px / normal
  - H3 (Section Headers): IBM Plex Sans SemiBold / 20px / normal
  - Body (Info Content): IBM Plex Sans Regular / 16px / relaxed line-height (1.6)
  - Small (Attribution): IBM Plex Sans Regular / 13px / normal

## Animations
Animations should feel clinical and precise - quick, purposeful movements that guide attention without distraction. Use subtle transitions for state changes and smooth highlights for selections.

- Vertebra highlight: 200ms ease-out color transition
- Info panel: 300ms slide-up with ease-out-cubic for professional reveal
- Hover effects: 150ms ease for immediate feedback
- View transitions: 400ms crossfade between front/side views

## Component Selection

- **Components**:
  - `Card` - For info panel container with shadow and border
  - `Button` - For view toggle, reset, and export actions (variant="outline" for secondary, variant="default" for primary)
  - `Separator` - To divide panel sections (vertebra info vs. symptoms)
  - `Badge` - To display vertebra labels and nerve tags
  - `ScrollArea` - For info panel content if symptom lists are long
  - `Tooltip` - For quick vertebra name on hover before click

- **Customizations**:
  - Custom SVG spine chart component with clickable paths for each vertebra
  - Highlighted vertebra state with accent color fill and shadow
  - Info panel with gradient background for depth
  - Interactive vertebra paths with cursor pointer and hover states

- **States**:
  - Buttons: Default (outline), Hover (filled), Active (pressed with scale), Disabled (muted)
  - Vertebrae: Default (neutral), Hover (highlighted border + tooltip), Selected (filled with accent color + glow)
  - Panel: Hidden (opacity 0, translateY 20px), Visible (opacity 1, translateY 0)

- **Icon Selection**:
  - `ArrowsClockwise` - Reset view button
  - `DownloadSimple` - PDF export
  - `EnvelopeSimple` - Email share
  - `Eye` - View toggle icons
  - `Spine` - App header icon

- **Spacing**:
  - Container padding: px-6 md:px-8 (24px/32px)
  - Panel padding: p-6 (24px)
  - Card gaps: gap-4 (16px between elements)
  - Button spacing: gap-2 (8px between icon and text)
  - Section margins: mb-6 (24px between major sections)

- **Mobile**:
  - Stack view toggle buttons vertically on mobile (<768px)
  - Info panel becomes full-width with bottom sheet behavior
  - Spine chart scales proportionally with viewport
  - Touch targets minimum 44x44px for all vertebrae
  - Collapse export options into menu on small screens
  - Single column layout with spine above panel
