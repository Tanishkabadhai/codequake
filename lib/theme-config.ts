/**
 * Codequake Visual Theme Configuration
 * 
 * This configuration maps reference images to specific application screens
 * and defines the unified color palette extracted from the image set.
 * 
 * IMAGE MAPPING:
 * - landing-hero.jpg: Fluid backgrounds collage (most visually striking) - Landing screen hero
 * - input-calm.jpg: Holographic chains (calmer, preparatory) - Input screen background
 * - reasoning-energy.jpg: Purple energy vortex (intense, computational) - Bob reasoning screen
 * - results-crystal.jpg: Iridescent holographic fluid (supports data viz) - Results dashboard
 * - accent-starburst.jpg: Crystal starburst (transitional element) - Section accents
 * - accent-lightbeams.jpg: Blue light rays (atmospheric) - Overlay effects
 * - accent-anime.jpg: Anime character (optional brand element) - Can be used as easter egg
 */

export const themeConfig = {
  // Screen-specific background images
  backgrounds: {
    landing: '/theme/landing-hero.jpg',
    input: '/theme/input-calm.jpg',
    reasoning: '/theme/reasoning-energy.jpg',
    results: '/theme/results-crystal.jpg',
    accentStarburst: '/theme/accent-starburst.jpg',
    accentLightbeams: '/theme/accent-lightbeams.jpg',
    accentAnime: '/theme/accent-anime.jpg',
  },

  // Unified color palette extracted from reference images
  colors: {
    // Primary brand colors (from fluid backgrounds)
    primary: {
      cyan: '#00f0ff',      // Bright cyan from holographic elements
      magenta: '#ec4899',   // Vibrant magenta from fluid gradients
      purple: '#a855f7',    // Deep purple from energy vortex
      blue: '#3b82f6',      // Rich blue from light rays
      pink: '#f472b6',      // Soft pink from iridescent surfaces
    },

    // Accent colors (from various images)
    accent: {
      orange: '#fb923c',    // Warm orange from fluid backgrounds
      yellow: '#fbbf24',    // Golden yellow from starburst
      teal: '#14b8a6',      // Teal from holographic chains
      lavender: '#c084fc', // Lavender from purple vortex
      rose: '#fb7185',      // Rose from gradient transitions
    },

    // Neutral colors (for text and UI elements)
    neutral: {
      white: '#ffffff',
      lightGray: '#f8fafc',
      gray: '#e2e8f0',
      darkGray: '#64748b',
      charcoal: '#1e293b',
      black: '#0a0a0f',
    },

    // Semantic colors
    semantic: {
      success: '#22c55e',
      warning: '#f59e0b',
      danger: '#ef4444',
      info: '#06b6d4',
    },
  },

  // Overlay configurations for text legibility
  overlays: {
    landing: {
      gradient: 'linear-gradient(135deg, rgba(10, 10, 15, 0.75) 0%, rgba(30, 20, 40, 0.65) 100%)',
      blur: '8px',
    },
    input: {
      gradient: 'linear-gradient(180deg, rgba(10, 10, 15, 0.85) 0%, rgba(20, 15, 30, 0.75) 100%)',
      blur: '12px',
    },
    reasoning: {
      gradient: 'radial-gradient(circle at center, rgba(10, 10, 15, 0.7) 0%, rgba(30, 10, 40, 0.85) 100%)',
      blur: '6px',
    },
    results: {
      gradient: 'linear-gradient(135deg, rgba(10, 10, 15, 0.8) 0%, rgba(15, 20, 35, 0.75) 50%, rgba(20, 10, 30, 0.8) 100%)',
      blur: '10px',
    },
  },

  // Animation configurations
  animations: {
    backgroundShift: {
      duration: '20s',
      easing: 'ease-in-out',
    },
    pulseGlow: {
      duration: '3s',
      easing: 'ease-in-out',
    },
  },
};

export type ThemeConfig = typeof themeConfig;

// Made with Bob
