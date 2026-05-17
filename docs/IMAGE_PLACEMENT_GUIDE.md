# Image Placement Quick Reference

## Step-by-Step Instructions

### 1. Save Reference Images

From the provided attachments, save each image with the following names:

#### Primary Backgrounds (Required)

**Image 1: Fluid Backgrounds Collage**
- Filename: `landing-hero.jpg`
- Location: `public/theme/landing-hero.jpg`
- Description: Grid of 6 colorful fluid designs with purple, pink, orange, and blue gradients
- Usage: Landing screen hero background
- Recommended: Use the top-center purple/pink gradient section or create a composite

**Image 2: Holographic Chains**
- Filename: `input-calm.jpg`
- Location: `public/theme/input-calm.jpg`
- Description: Silver/chrome interlocking chains with iridescent rainbow reflections
- Usage: Input screen background
- Processing: Apply 8-12px gaussian blur for calmer atmosphere

**Image 3: Purple Energy Vortex**
- Filename: `reasoning-energy.jpg`
- Location: `public/theme/reasoning-energy.jpg`
- Description: Swirling purple abstract with flowing ribbons and depth
- Usage: Bob reasoning screen background
- Processing: Keep sharp to convey computational intensity

**Image 4: Iridescent Holographic Fluid**
- Filename: `results-crystal.jpg`
- Location: `public/theme/results-crystal.jpg`
- Description: Pastel rainbow liquid with smooth flowing gradients
- Usage: Results dashboard background
- Processing: Apply 10px blur to support data visualization readability

#### Accent Elements (Optional)

**Image 5: Crystal Starburst**
- Filename: `accent-starburst.jpg`
- Location: `public/theme/accent-starburst.jpg`
- Description: Radial light burst with crystalline center
- Usage: Section backgrounds, panel textures, transitional elements
- Processing: Use as overlay with blend modes (screen/lighten)

**Image 6: Blue Light Rays**
- Filename: `accent-lightbeams.jpg`
- Location: `public/theme/accent-lightbeams.jpg`
- Description: Dark background with blue light streaks and motion blur
- Usage: Atmospheric overlays, subtle backgrounds
- Processing: Low opacity (20-40%) overlay

**Image 7: Anime Character (Optional)**
- Filename: `accent-anime.jpg`
- Location: `public/theme/accent-anime.jpg`
- Description: Character with cosmic/celestial background
- Usage: Optional brand element, easter egg, or Bob avatar
- Processing: Can be used as decorative element or omitted

### 2. Image Optimization

Before placing images, optimize them:

#### Using Online Tools
1. Go to [TinyJPG](https://tinyjpg.com/) or [Squoosh](https://squoosh.app/)
2. Upload each image
3. Adjust quality to 85-90%
4. Download optimized version
5. Rename according to the mapping above

#### Using Command Line (if ImageMagick installed)
```bash
# Resize and optimize
magick input.jpg -resize 1920x1080^ -gravity center -extent 1920x1080 -quality 85 output.jpg

# Apply blur (for input-calm.jpg)
magick input-calm.jpg -blur 0x12 input-calm.jpg
```

#### Using Node.js (Sharp)
```javascript
const sharp = require('sharp');

// Optimize image
await sharp('original.jpg')
  .resize(1920, 1080, { fit: 'cover' })
  .jpeg({ quality: 85 })
  .toFile('public/theme/landing-hero.jpg');

// With blur
await sharp('original.jpg')
  .resize(1920, 1080, { fit: 'cover' })
  .blur(12)
  .jpeg({ quality: 85 })
  .toFile('public/theme/input-calm.jpg');
```

### 3. Verify Placement

After placing images, verify the structure:

```
public/
└── theme/
    ├── README.md
    ├── .gitkeep
    ├── landing-hero.jpg      ✓ Required
    ├── input-calm.jpg         ✓ Required
    ├── reasoning-energy.jpg   ✓ Required
    ├── results-crystal.jpg    ✓ Required
    ├── accent-starburst.jpg   ○ Optional
    ├── accent-lightbeams.jpg  ○ Optional
    └── accent-anime.jpg       ○ Optional
```

### 4. Test the Application

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Navigate through all screens to verify:
- ✓ Landing screen shows fluid backgrounds
- ✓ Input screen shows holographic chains (blurred)
- ✓ Reasoning screen shows purple energy vortex
- ✓ Results screen shows iridescent fluid
- ✓ Text remains readable on all backgrounds
- ✓ No broken image warnings in console

### 5. Troubleshooting

#### Images Not Showing
- Check file names match exactly (case-sensitive)
- Verify files are in `public/theme/` directory
- Clear browser cache (Ctrl+Shift+R)
- Check browser console for 404 errors
- Ensure images are valid JPG format

#### Performance Issues
- Reduce image file sizes (<500KB each)
- Lower JPEG quality to 80%
- Reduce resolution to 1920x1080
- Check browser DevTools Performance tab

#### Text Not Readable
- Increase overlay opacity in `globals.css`
- Adjust backdrop-blur values
- Modify gradient darkness
- Test on different screen sizes

## Quick Command Reference

```bash
# Create theme directory (if needed)
mkdir -p public/theme

# Copy images (example)
cp ~/Downloads/fluid-backgrounds.jpg public/theme/landing-hero.jpg
cp ~/Downloads/holographic-chains.jpg public/theme/input-calm.jpg
cp ~/Downloads/purple-vortex.jpg public/theme/reasoning-energy.jpg
cp ~/Downloads/iridescent-fluid.jpg public/theme/results-crystal.jpg

# Verify files exist
ls -lh public/theme/

# Start development server
npm run dev
```

## Image Specifications Summary

| Filename | Min Resolution | Max Size | Blur | Overlay Opacity |
|----------|---------------|----------|------|-----------------|
| landing-hero.jpg | 1920x1080 | 500KB | None | 65-75% |
| input-calm.jpg | 1920x1080 | 500KB | 12px | 75-85% |
| reasoning-energy.jpg | 1920x1080 | 500KB | 6px | 70-85% |
| results-crystal.jpg | 1920x1080 | 500KB | 10px | 75-80% |
| accent-starburst.jpg | 1024x1024 | 300KB | Varies | 20-60% |
| accent-lightbeams.jpg | 1920x1080 | 400KB | None | 20-40% |
| accent-anime.jpg | 1024x1024 | 300KB | None | Varies |

## Color Extraction Reference

When selecting/editing images, maintain these color ranges:

- **Cyan/Teal**: #00f0ff, #14b8a6 (holographic highlights)
- **Magenta/Pink**: #ec4899, #f472b6 (vibrant accents)
- **Purple/Lavender**: #a855f7, #c084fc (energy, depth)
- **Blue**: #3b82f6 (technical, professional)
- **Orange/Yellow**: #fb923c, #fbbf24 (warmth, energy)
- **Rose**: #fb7185 (transitions, softness)

## Support

For issues or questions:
1. Check `docs/VISUAL_REDESIGN_IMPLEMENTATION.md` for detailed documentation
2. Review `lib/theme-config.ts` for configuration options
3. Inspect `app/globals.css` for styling details
4. Test with fallback gradients if images unavailable