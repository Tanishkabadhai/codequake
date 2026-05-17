# Codequake Visual Redesign Implementation Guide

## Overview

This document describes the complete visual redesign of Codequake using cinematic, image-driven backgrounds for each major application state while maintaining unified thematic coherence.

## Architecture

### Screen-to-Image Mapping

1. **Landing Screen** → `landing-hero.jpg`
   - Source: Fluid backgrounds collage (most visually striking)
   - Purpose: Establish immediate brand impact
   - Treatment: Dark gradient overlay (75-65% opacity)
   - Blur: None (keep sharp for maximum impact)

2. **Input Screen** → `input-calm.jpg`
   - Source: Holographic chains (calmer, preparatory)
   - Purpose: Provide focused data entry environment
   - Treatment: Dark gradient overlay (85-75% opacity)
   - Blur: 12px gaussian for calm atmosphere

3. **Reasoning Screen** → `reasoning-energy.jpg`
   - Source: Purple energy vortex (intense, computational)
   - Purpose: Convey active analysis and processing power
   - Treatment: Radial gradient overlay (70-85% opacity)
   - Blur: 6px to maintain energy while ensuring legibility

4. **Results Screen** → `results-crystal.jpg`
   - Source: Iridescent holographic fluid (supports data viz)
   - Purpose: Maintain immersion while supporting readability
   - Treatment: Multi-stop gradient overlay (80-75-80% opacity)
   - Blur: 10px for optimal data visualization support

### Color Palette

Extracted from reference images and defined in CSS variables:

```css
--color-cyan: #00f0ff      /* Primary brand, holographic elements */
--color-magenta: #ec4899   /* Vibrant accents, fluid gradients */
--color-purple: #a855f7    /* Deep energy, vortex elements */
--color-blue: #3b82f6      /* Rich technical, light rays */
--color-pink: #f472b6      /* Soft iridescent surfaces */
--color-orange: #fb923c    /* Warm fluid backgrounds */
--color-yellow: #fbbf24    /* Golden starburst accents */
--color-teal: #14b8a6      /* Holographic chains */
--color-lavender: #c084fc  /* Purple vortex highlights */
--color-rose: #fb7185      /* Gradient transitions */
```

## Implementation Details

### 1. CSS Architecture (`app/globals.css`)

#### Screen-Specific Classes

Each screen has a dedicated class that applies:
- Full-screen background image (fixed attachment)
- Screen-specific overlay gradient
- Backdrop blur for legibility
- Z-index layering for proper stacking

```css
.screen-landing {
  background-image: url('/theme/landing-hero.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.screen-landing::before {
  content: "";
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, rgba(10, 10, 15, 0.75) 0%, rgba(30, 20, 40, 0.65) 100%);
  pointer-events: none;
  z-index: 1;
}
```

#### Atmospheric Layers

1. **Background Image** (z-index: 0) - Full-screen cinematic foundation
2. **Screen Overlay** (z-index: 1) - Dark gradient for legibility
3. **Aurora Effect** (z-index: 2) - Animated color overlay
4. **Grid Pattern** (z-index: 3) - Subtle technical aesthetic
5. **Content** (z-index: 10) - All UI elements

### 2. Component Integration (`components/RiskDashboard.tsx`)

Dynamic class application based on current step:

```typescript
const screenClass = 
  step === "landing" ? "screen-landing" :
  step === "input" ? "screen-input" :
  step === "reasoning" ? "screen-reasoning" :
  step === "results" ? "screen-results" : "";

return (
  <main className={`codequake-shell ${screenClass} ...`}>
    {/* Content */}
  </main>
);
```

### 3. Theme Configuration (`lib/theme-config.ts`)

Centralized configuration for:
- Image paths and mappings
- Color palette definitions
- Overlay specifications
- Animation parameters

### 4. Tailwind Extensions (`tailwind.config.ts`)

Extended with:
- New color palette as `theme.*` colors
- Glow shadow utilities
- Animation keyframes

## Image Requirements

### Technical Specifications

- **Format**: JPG for photographs, PNG for transparency
- **Resolution**: Minimum 1920x1080, recommended 2560x1440
- **Quality**: 85-90% JPEG compression
- **File Size**: Target <500KB per image
- **Color Space**: sRGB

### Required Files

Place in `public/theme/` directory:

1. `landing-hero.jpg` - Most vibrant/striking image
2. `input-calm.jpg` - Calmer, focused atmosphere
3. `reasoning-energy.jpg` - Intense, computational energy
4. `results-crystal.jpg` - Supports data visualization
5. `accent-starburst.jpg` - Optional accent element
6. `accent-lightbeams.jpg` - Optional atmospheric overlay
7. `accent-anime.jpg` - Optional brand element

## Legibility Enhancements

### Text Contrast

All text maintains WCAG AA compliance through:
- Dark gradient overlays (70-85% opacity)
- Backdrop blur on backgrounds
- Text shadows where needed
- High-contrast color choices

### Interactive Elements

Enhanced with:
- Glow effects on focus/hover
- Smooth transitions (0.3s ease)
- Clear visual feedback
- Accessible color contrast

### Data Visualization

Results screen optimized for:
- Chart readability (10px blur + 75-80% overlay)
- Panel contrast (glass morphism with strong backdrop)
- Color-coded elements using palette
- Clear information hierarchy

## Animation System

### Subtle Atmospheric Animations

1. **Aurora Shift** (20s loop)
   - Gentle position and rotation changes
   - Opacity pulsing (40-60%)
   - Screen blend mode for integration

2. **Hero Pulse** (8s loop)
   - Subtle opacity variation (85-100%)
   - Maintains visual interest without distraction

3. **Orbit Rotate** (30s loop)
   - Slow rotation of glass orbit elements
   - Creates depth and dimensionality

## Fallback Strategy

If images fail to load:
- Graceful degradation to gradient backgrounds
- Maintains color palette consistency
- Preserves layout and functionality
- No broken image indicators

```css
.codequake-shell:not([class*="screen-"]) {
  background: radial-gradient(...); /* Fallback gradient */
}
```

## Performance Considerations

### Optimization Techniques

1. **Fixed Attachment**: Reduces repaints during scroll
2. **CSS Backgrounds**: Better performance than `<img>` tags
3. **Backdrop Blur**: Hardware-accelerated where supported
4. **Image Compression**: Balanced quality/size ratio
5. **Lazy Loading**: Images load as needed per screen

### Browser Compatibility

- Modern browsers: Full experience with all effects
- Older browsers: Graceful degradation to gradients
- Mobile: Optimized blur values for performance
- Reduced motion: Respects user preferences

## Testing Checklist

- [ ] All screens display correct background images
- [ ] Text remains readable across all backgrounds
- [ ] Interactive elements have clear focus states
- [ ] Animations run smoothly (60fps target)
- [ ] Images load efficiently (<3s on 3G)
- [ ] Fallbacks work when images unavailable
- [ ] Color palette applied consistently
- [ ] Build completes without errors
- [ ] Mobile responsive on all screen sizes
- [ ] Accessibility standards maintained

## Deployment Notes

### Pre-Deployment

1. Optimize all images using ImageOptim/TinyJPG
2. Test on multiple browsers and devices
3. Verify build process: `npm run build`
4. Check bundle size impact
5. Test with slow network conditions

### Post-Deployment

1. Monitor Core Web Vitals (LCP, CLS, FID)
2. Verify CDN caching for images
3. Check error logs for missing assets
4. Gather user feedback on visual experience
5. A/B test if needed for conversion impact

## Maintenance

### Adding New Screens

1. Add image to `public/theme/`
2. Create screen class in `globals.css`
3. Update `RiskDashboard.tsx` screen mapping
4. Add to `theme-config.ts`
5. Test thoroughly

### Updating Colors

1. Modify CSS variables in `:root`
2. Update `theme-config.ts` palette
3. Update `tailwind.config.ts` theme colors
4. Rebuild and test all components

## Future Enhancements

- [ ] Add parallax scrolling effects
- [ ] Implement theme switcher (light/dark/custom)
- [ ] Add particle effects for reasoning screen
- [ ] Create animated transitions between screens
- [ ] Add optional video backgrounds
- [ ] Implement custom cursor effects
- [ ] Add sound effects (optional)
- [ ] Create loading screen with brand animation

## References

- Design System: `lib/theme-config.ts`
- Color Palette: `app/globals.css` `:root`
- Component Integration: `components/RiskDashboard.tsx`
- Image Specifications: `public/theme/README.md`