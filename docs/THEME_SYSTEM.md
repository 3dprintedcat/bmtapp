# Theme System Documentation

## Overview

The BMTAPP theme system provides comprehensive customization with 13 distinct properties, allowing for highly personalized user experiences. Themes are persisted in localStorage and applied dynamically through Ant Design's ConfigProvider.

## Theme Properties

### Color Properties

1. **primaryColor** (`string`)
   - Main brand/accent color
   - Applied to: buttons, links, active states, brand elements
   - Example: `'#4A6FA5'`

2. **baseColor** (`string`)
   - Background color for main UI areas
   - Applied to: page background, card backgrounds, panels
   - Example: `'#1A1F2E'`

3. **textColor** (`string`)
   - Primary text color
   - Applied to: body text, labels, general content
   - Example: `'#E8EEF7'`

4. **accentColor** (`string`)
   - Secondary highlight color
   - Applied to: info badges, active control items, highlights
   - Example: `'#7BA3D4'`

5. **secondaryColor** (`string`)
   - Reserved for future use
   - Can be used for tertiary elements, alternative text colors
   - Example: `'#B0C4DE'`

### Typography Properties

6. **fontFamily** (`string`)
   - Base font for body text and UI elements
   - Available fonts: Inter, Roboto, Montserrat, Raleway, IBM Plex Sans, Rajdhani, Exo 2, Titillium Web, Saira Condensed, Roboto Condensed, Teko, Orbitron, Michroma, Audiowide, Chakra Petch, Jura, Iceland, Play, Tourney, Russo One, IBM Plex Mono, JetBrains Mono, Roboto Mono, Share Tech Mono, Space Mono, Noto Sans Mono
   - Example: `'Rajdhani, sans-serif'`

7. **headingFont** (`string`)
   - Font for headings (h1-h6)
   - Can match or contrast with body font
   - Example: `'Audiowide, sans-serif'`

8. **fontSize** (`number`)
   - Base font size in pixels
   - Typical range: 12-16px
   - Heading scales: h1=2.5x, h2=2x, h3=1.5x
   - Example: `14`

### Layout Properties

9. **borderRadius** (`number`)
   - Corner radius for general UI elements
   - Applied to: cards, panels, inputs
   - Range: 0-16px
   - Example: `2`

10. **buttonRadius** (`number`)
    - Corner radius specifically for buttons
    - Allows buttons to have different style than other elements
    - Range: 0-16px
    - Example: `0` (sharp military style) or `16` (soft luxury style)

### Visual Effects

11. **cardOpacity** (`number`)
    - Transparency level for cards and panels
    - Range: 0.0 (invisible) to 1.0 (fully opaque)
    - Converted to hex alpha channel for rendering
    - Example: `0.95` (slightly transparent) or `1` (completely solid)

12. **boxShadow** (`string`)
    - Shadow style for depth and elevation
    - Options:
      - `'none'`: No shadow (flat design)
      - `'small'`: Subtle shadow (default, `0 1px 2px rgba(0,0,0,0.1)`)
      - `'large'`: Prominent shadow (dramatic depth, `0 6px 16px rgba(0,0,0,0.15)`)
      - `'glow'`: Colored glow effect (uses primaryColor at 40% opacity)
    - Example: `'glow'` for high-tech themes, `'none'` for minimalist

## Theme Persistence

Themes are stored in localStorage with the following keys:
- `themeP` - primaryColor
- `themeB` - baseColor
- `themeT` - textColor
- `themeR` - borderRadius
- `themeF` - fontFamily
- `themeHF` - headingFont
- `themeFSize` - fontSize
- `themeA` - accentColor
- `themeS` - secondaryColor
- `themeCO` - cardOpacity
- `themeBS` - boxShadow
- `themeBtnR` - buttonRadius

## CSS Variables

The theme system sets these CSS variables on the root element:
- `--primaryColor`
- `--baseColor`
- `--textColor`
- `--borderRadius`
- `--fontFamily`
- `--headingFont`
- `--fontSize`
- `--accentColor`
- `--secondaryColor`
- `--cardOpacity`

## Ant Design Token Mapping

```javascript
{
  colorPrimary: primaryColor,
  colorBgBase: baseColor,
  borderRadius: borderRadius,
  colorTextBase: textColor,
  colorText: textColor,
  colorTextHeading: textColor,
  fontFamily: fontFamily,
  fontSize: fontSize,
  fontSizeHeading1: fontSize * 2.5,
  fontSizeHeading2: fontSize * 2,
  fontSizeHeading3: fontSize * 1.5,
  colorInfo: accentColor,
  controlItemBgActive: accentColor,
  borderRadiusLG: buttonRadius,
  boxShadow: [calculated dynamically]
}
```

## Component Overrides

### Typography
- `fontFamily`: Uses `headingFont` for all headings (h1-h6)

### Card
- `colorBgContainer`: Uses `baseColor` with `cardOpacity` applied via hex alpha

## Preset Themes

The system includes 33 Star Citizen-themed presets organized by category:

### Ship Manufacturers (12 themes)
- Aegis Dynamics (military precision)
- Anvil Aerospace (military ruggedness)
- ARGO Astronautics (industrial utility)
- Consolidated Outland (exploration)
- Crusader Industries (luxury)
- Drake Interplanetary (function over form)
- Esperia (alien reproductions)
- Kruger Intergalactic (German engineering)
- MISC (versatile workhorses)
- Origin Jumpworks (luxury elegance)
- RSI Roberts Space (classic UEE)
- Tumbril Land Systems (ground vehicles)

### Alien Races (4 themes)
- Vanduul Clans (aggressive red/black)
- Banu Souli (merchant gold/brown)
- Xi'an Empire (ancient green)
- Tevarin Remnant (honorable purple)

### Corporations (4 themes)
- ArcCorp (industrial orange)
- Hurston Dynamics (weapons brown)
- microTech (tech blue)
- Crusader Planet (gas giant orange)

### Factions (5 themes)
- UEE Navy (military blue)
- UEE Advocacy (law enforcement dark blue)
- Nine Tails (pirate red)
- Xenothreat (supremacist dark red)
- Crusader Security (security amber)

### Locations (8 themes)
- Stanton System (corporate yellow)
- Terra (cultural teal)
- Orison (floating blue)
- Lorville (industrial brown)
- Area18 (urban orange)
- New Babbage (arctic blue)
- GrimHEX (outlaw red/black)
- Port Olisar (legacy blue)

## Usage Example

```javascript
// Apply a theme
import { ThemeGrid } from './components/themeSets';

// In a settings page
<ThemeGrid />

// Themes are applied on click and persist across sessions
```

## Theme Design Guidelines

When creating new themes:

1. **Contrast**: Ensure text color contrasts well with base color (WCAG AA minimum 4.5:1)
2. **Harmony**: Choose accent/secondary colors that complement primary
3. **Font Pairing**: Pair heading/body fonts thoughtfully (e.g., display + sans-serif)
4. **Opacity**: Use lower opacity (0.85-0.95) for "tech" themes, higher (0.95-1.0) for "solid" themes
5. **Shadows**: 
   - `none` for minimalist/flat designs
   - `small` for general use (default)
   - `large` for dramatic/luxury themes
   - `glow` for high-tech/sci-fi themes
6. **Border Radius**:
   - 0-2px for military/industrial themes
   - 4-8px for balanced/tech themes
   - 12-16px for luxury/friendly themes
7. **Font Size**: 
   - 13px for dense UIs or small fonts
   - 14px standard (default)
   - 15-16px for comfortable reading

## Future Enhancements

Potential additions to the theme system:

- **Theme Editor UI**: Visual controls for creating custom themes
- **Import/Export**: Share themes as JSON
- **Per-Widget Overrides**: Different themes for different dashboard areas
- **Dark/Light Variants**: Auto-generate variants from single theme
- **Animation Speed**: Control transition/animation durations
- **Sound Effects**: Audio feedback tied to theme aesthetic
- **Seasonal Themes**: Limited-time event themes
- **User-Submitted Themes**: Community marketplace
