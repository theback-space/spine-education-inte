# Chiropractic Spine Chart Interactive Tool

An interactive web application that helps chiropractors create personalized subluxation pattern reports for clients. Practitioners can select multiple vertebrae to generate comprehensive PDF summaries that explain how spinal misalignments affect the nervous system and overall health.

**Experience Qualities**:
1. **Educational** - Transforms complex anatomy into accessible, client-friendly explanations that build understanding
2. **Professional** - Conveys medical expertise through clean design and accurate anatomical representations
3. **Clinical** - Functions as a practical end-of-session tool for creating take-home educational materials

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-page interactive tool with multi-select vertebrae, persistent state, data aggregation, and PDF generation. It serves as a marketing and client educational resource that chiropractors can give to clients after their first session.

## Essential Features

### Multi-Select Vertebrae Interaction
- **Functionality**: Full anatomical spine chart (C1-Coccyx) with multi-select capability - click to select, click again to deselect
- **Purpose**: Allows chiropractors to map a client's complete subluxation pattern across multiple vertebrae
- **Trigger**: User taps/clicks vertebrae on the spine chart
- **Progression**: Idle state → Hover shows vertebra label → Click highlights vertebra → Click again deselects → Info panel updates in real-time → Selection persists
- **Success criteria**: Multiple vertebrae can be selected simultaneously, visual feedback is immediate, aggregated data displays with "Possible Symptoms When Subluxated" terminology

### Dynamic Subluxation Pattern Summary
- **Functionality**: Displays aggregated information from all selected vertebrae including combined nerve supply, organs, and symptoms
- **Purpose**: Shows the comprehensive impact of the client's subluxation pattern on their health
- **Trigger**: Selecting one or more vertebrae on the chart
- **Progression**: No selection → Panel hidden → Vertebrae selected → Panel displays combined data → Updates as selections change
- **Success criteria**: Panel aggregates unique symptoms/organs across all selections, maintains readability with many selections, shows count of selected vertebrae

### PDF Report Generation
- **Functionality**: Creates a professional multi-page PDF document with THE-BACK.SPACE branding containing all selected vertebrae information
- **Purpose**: Provides clients with a take-home educational document to reinforce understanding and treatment value
- **Trigger**: Clicking "Download PDF" button when vertebrae are selected
- **Progression**: Vertebrae selected → Click download → PDF generates with proper formatting → File downloads to device
- **Success criteria**: PDF contains all vertebra details, proper page breaks, professional formatting, includes disclaimer, file name includes vertebrae and date

### Reset & Clear Functionality
- **Functionality**: Clear all selected vertebrae and hide info panel
- **Purpose**: Allows starting fresh for each client consultation
- **Trigger**: Clicking "Clear Selection" button
- **Progression**: Vertebrae selected and panel visible → Click clear → All highlights removed → Panel fades out → Returns to default state
- **Success criteria**: All selections cleared, panel hidden, app returns to initial state, persistent storage updated

### Email Sharing
- **Functionality**: Pre-populates email with formatted subluxation pattern information
- **Purpose**: Allows quick sharing of educational content with clients via email
- **Trigger**: Clicking "Email Client" button when vertebrae are selected
- **Progression**: Vertebrae selected → Click email → Default email client opens → Pre-filled subject and body with all vertebra info
- **Success criteria**: Email contains properly formatted text, includes all selected vertebrae, works on mobile and desktop

### Chiropractic Care Journey Planner
- **Functionality**: Customizable care plan with three detailed phases (Palliative, Supportive, Preventative) including frequency, duration, descriptions, and patient expectations
- **Purpose**: Helps practitioners communicate the complete healing journey to clients with clear timelines and what to expect at each stage
- **Trigger**: Care Journey section displays on page load; practitioners click "Customize Plan" to edit
- **Progression**: Default plan displays → Click customize → Edit phase details, timing, and expectations → Save → Updated plan persists → Included in PDF export
- **Success criteria**: Practitioners can adjust session frequency and duration for each phase, add custom phases, edit descriptions of what clients will experience, all changes save to persistent storage and export to PDF

## Edge Case Handling
- **No Selection State**: Info panel hidden, export buttons disabled until vertebrae are selected
- **Single vs. Multiple Selection**: Panel adapts layout - shows full description for single vertebra, compact list view for multiple
- **Rapid Clicking**: Toggle behavior prevents UI conflicts when clicking same vertebra repeatedly
- **Large Selection Sets**: Panel uses scroll area when many vertebrae selected, aggregates unique symptoms to avoid overwhelming lists
- **Mobile Touch**: Large touch targets (minimum 44x44px) prevent mis-taps on small vertebrae
- **PDF Generation**: Handles page breaks intelligently, ensures all content fits properly, includes page numbers
- **Data Aggregation**: Removes duplicate symptoms/organs when multiple vertebrae share common elements
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
  - `Card` - For info panel container and care journey with shadow and border
  - `Button` - For view toggle, reset, export, and edit actions (variant="outline" for secondary, variant="default" for primary)
  - `Separator` - To divide panel sections (vertebra info vs. symptoms)
  - `Badge` - To display vertebra labels, nerve tags, and care phase details
  - `ScrollArea` - For info panel content if symptom lists are long
  - `Tooltip` - For quick vertebra name on hover before click
  - `Input` - For editing phase frequency and duration
  - `Textarea` - For editing longer phase descriptions and expectations
  - `Label` - For form field labels in care journey editor

- **Customizations**:
  - Custom SVG spine chart component with clickable vertebrae using radial gradients for 3D appearance
  - Vertebrae sized proportionally (cervical smaller, lumbar larger) with realistic bone-like coloring
  - Highlighted vertebra state with glowing accent color and drop shadows
  - Info panel with gradient background for depth
  - Interactive vertebra paths with cursor pointer, hover scale, and tap feedback
  - Care journey phases with numbered badges and expandable "What to Expect" sections

- **States**:
  - Buttons: Default (outline), Hover (filled), Active (pressed with scale), Disabled (muted)
  - Vertebrae: Default (neutral with gradient), Hover (highlighted border + scale + tooltip), Selected (teal gradient with glow + larger text)
  - Panel: Hidden (opacity 0, translateY 20px), Visible (opacity 1, translateY 0)
  - Care Journey: Display mode (read-only with badges) vs Edit mode (inputs with save/cancel)

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
