# Codequake Theme Assets

This directory contains the visual assets for Codequake's cinematic multi-screen experience.

## Required Image Files

Please save the reference images with the following names:

### Primary Screen Backgrounds

1. **landing-hero.jpg** (1920x1080 or higher)
   - Source: Fluid backgrounds collage image (the grid of 6 colorful fluid designs)
   - Usage: Landing screen hero background
   - Treatment: Use the most vibrant composite or select the top-center purple/pink gradient
   - Purpose: Establish immediate brand impact with striking visual

2. **input-calm.jpg** (1920x1080 or higher)
   - Source: Holographic chains image (silver/chrome interlocking chains)
   - Usage: Input screen background
   - Treatment: Apply subtle blur (gaussian 8-12px) for calmer atmosphere
   - Purpose: Provide preparatory, focused environment for data entry

3. **reasoning-energy.jpg** (1920x1080 or higher)
   - Source: Purple energy vortex image (swirling purple abstract)
   - Usage: Bob reasoning screen background
   - Treatment: Keep sharp to convey computational intensity
   - Purpose: Visualize active analysis and processing power

4. **results-crystal.jpg** (1920x1080 or higher)
   - Source: Iridescent holographic fluid image (pastel rainbow liquid)
   - Usage: Results dashboard background
   - Treatment: Apply moderate blur (10px) to support data readability
   - Purpose: Maintain immersion while ensuring chart/text legibility

### Accent & Atmospheric Elements

5. **accent-starburst.jpg** (1024x1024 or higher)
   - Source: Crystal starburst image (radial light burst)
   - Usage: Section backgrounds, panel textures, transitional elements
   - Treatment: Use as overlay with blend modes
   - Purpose: Add depth and visual interest to panels

6. **accent-lightbeams.jpg** (1920x1080 or higher)
   - Source: Blue light rays image (dark background with blue streaks)
   - Usage: Atmospheric overlays, subtle backgrounds
   - Treatment: Low opacity (20-40%) overlay
   - Purpose: Create depth and cinematic atmosphere

7. **accent-anime.jpg** (Optional, 1024x1024 or higher)
   - Source: Anime character with cosmic background
   - Usage: Optional brand element, easter egg, or Bob avatar
   - Treatment: Can be used as decorative element
   - Purpose: Add personality (optional implementation)

## Image Optimization Guidelines

- **Format**: Save as JPG for photographs, PNG for graphics with transparency
- **Quality**: 85-90% JPEG quality for optimal balance
- **Resolution**: Minimum 1920x1080 for full-screen backgrounds
- **File Size**: Target <500KB per image after optimization
- **Color Space**: sRGB for web compatibility

## Processing Steps

1. Download/save reference images to this directory
2. Rename according to the mapping above
3. Optimize using tools like:
   - ImageOptim (Mac)
   - TinyPNG/TinyJPG (Web)
   - Squoosh (Web)
   - Sharp (Node.js)

## Color Palette Reference

The unified color palette has been extracted and defined in `lib/theme-config.ts`:

- **Primary**: Cyan (#00f0ff), Magenta (#ec4899), Purple (#a855f7)
- **Accent**: Orange (#fb923c), Yellow (#fbbf24), Teal (#14b8a6)
- **Semantic**: Success (#22c55e), Warning (#f59e0b), Danger (#ef4444)

All UI elements should use these colors for visual cohesion.