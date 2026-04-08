# Design — Variant

## Aesthetic
Neumorphic, tactile, soft productivity interface. Raised and sunken surfaces create 3D depth without borders. Clean, focused. No dark mode.

## Palette
| Token | Value | Role |
|-------|-------|------|
| Background | #F0F2F5 | All surfaces, main canvas |
| Card | #F0F2F5 | Raised containers, variant cards |
| Light Shadow | #FFFFFF | Top-left shadow on raised elements |
| Dark Shadow | #BABECC | Bottom-right shadow on raised elements |
| Primary | #2DB2ED | Active buttons, correct answers, accent states |
| Text Primary | #303030 | Body text, labels, interactive elements |
| Text Secondary | #8A8A8A | Inactive icons, hints, secondary text |
| Border | #D1D5DB | Dashed border on sunken inputs |
| Success/Accent | #2DB2ED | Sky blue — active pills, active nav, badges |
| Warning | #F59E0B | Low-confidence alert flags |

## Typography
- **Display / Body**: DM Sans (400, 700)
- **Mono**: JetBrains Mono (400, 700)
- **Scale**: 12px (caption), 14px (small), 16px (body), 20px (subtitle), 24px (heading)

## Shadows & Depth
| Effect | CSS |
|--------|-----|
| Raised Card | -5px -5px 10px #ffffff, 5px 5px 10px #babecc |
| Sunken Input | inset -5px -5px 10px #ffffff, inset 3px 3px 8px #babecc |
| Button Glow | inset 0 1px 3px rgba(255, 255, 255, 0.4) |

## Shape Language
- **Cards**: 20px border-radius (raised, stacked, variant containers)
- **Pills**: 14px border-radius (toggle buttons, answer options, badges)
- **Circles**: 50% border-radius (quantity selector, icon containers)
- **Sharp**: 0px (inputs, special cases)

## Spacing
- **Gap**: 16px (cards, sections)
- **Padding**: 24px (containers), 12px (pill buttons), 8px (icon buttons)
- **Margin**: 20px (card stack), 16px (form groups)

## Structural Zones
| Zone | Treatment | Example |
|------|-----------|---------|
| Header | Raised neumorphic, centered logo, hamburger left, bell right in bubbled circle | #F0F2F5 bg, #2DB2ED active icon |
| Input Section | Sunken textarea with dashed border, pill toggles below (active = sky blue), quantity circles (1–5) | Variant card container |
| Controls | Wide sky blue Generate button with inner-glow effect, slider for difficulty | Single button, dominant action |
| Output | Stacked raised cards, each showing question variant, 4 answer pills (correct = sky blue), confidence badge, warning flag if <60% | Variant result cards |
| Bottom Nav | Floating raised bar with 4 rounded-square icons, active = sky blue, inactive = #8A8A8A | Dashboard, Drill, Saved, Profile |

## Component Patterns
- **Active Button State**: Solid #2DB2ED fill, white text, raised neumorphic shadow
- **Inactive Button State**: Raised grey neumorphic (#F0F2F5 bg), #8A8A8A text or icon
- **Answer Pills**: Correct = solid #2DB2ED with white text; Wrong = raised neumorphic grey
- **Confidence Badge**: Sky blue pill, percentage text, centered on variant card top-right
- **Warning Flag**: Orange/yellow icon (#F59E0B) for confidence < 60%, card-level alert
- **Copy + Save Icons**: Dark grey (#303030), same size/weight, top-right corner of each variant card

## Interaction
- **Transition**: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- **Button Press**: Sunken shadow (inset) replaces raised shadow on active/focus
- **Toggle Active**: Instant fill change to #2DB2ED
- **Slider Thumb**: Round, blue, popped-out from track

## Responsive
Mobile-first design. Cards stack vertically on all breakpoints. Floating nav stays bottom-center. No horizontal scrolling.

## Constraints
- No dark mode
- No gradients (neumorphic depth via shadows only)
- No borders on raised elements (depth via shadow)
- Dashed border only on sunken inputs
- All text uses semantic tokens (#303030, #8A8A8A)
- No arbitrary Tailwind colors; use design tokens exclusively
