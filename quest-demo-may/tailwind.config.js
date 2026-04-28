/** @type {import('tailwindcss').Config} */
// Quest brand tokens, pulled from Figma nodes 2:7930 (portal) and 15:751 (sidebar).
// Naming mirrors highmark-demo-may/tailwind.config.js so the two prototypes
// remain reconcilable.
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Quest brand — green system from Figma
        quest: {
          // Illustrations/Brand Primary 1 — primary green CTA
          primary: '#00854B',
          // Illustrations/Brand Primary 3 — bright accent
          'primary-bright': '#34F870',
          // Illustrations/Brand Primary 2 + Decorative/Brand Primary/Dark
          'primary-dark': '#034C1F',
          'primary-deepest': '#022912',
          'primary-mid': '#006639',
          // Surface/Background Tertiary — pale green section background
          'primary-pastel': '#E8F8EE',
          'primary-pastel-light': '#F5FBF7',
          // Hero band sage tone (sampled from portal hero)
          sage: '#B8D4BD',
          'sage-deep': '#9CC0A6',
          // Secondary green text (dark)
          secondary: '#034C1F',
          'secondary-bright': '#00854B',
          'secondary-dark': '#022912',
          // Link / accent
          link: '#00854B'
        },
        surface: {
          primary: '#FFFFFF',
          secondary: '#FAFAFA',
          tertiary: '#E8F8EE',
          card: '#FFFFFF'
        },
        ink: {
          DEFAULT: '#00223C',
          subdued: '#646464',
          reversed: '#FFFFFF'
        },
        border: {
          DEFAULT: '#E6E6E6',
          subdued: '#E6E6E6',
          card: '#E6E6E6'
        },
        success: {
          DEFAULT: '#02692B',
          bg: '#E3F7F0'
        },
        warning: {
          DEFAULT: '#FCCA46'
        },
        neutral: {
          low: '#FFFFFF',
          medium: '#E6E6E6',
          high: '#071D0F',
          disabled: '#949494',
          'input-disabled': '#F0F0F0'
        }
      },
      fontFamily: {
        // Headings use Figtree per Figma
        heading: ['Figtree', 'Inter', 'system-ui', 'sans-serif'],
        // Body uses Inter (Body One) and SF Pro Text fallbacks
        display: ['Inter', 'Figtree', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'SF Pro Text', 'system-ui', 'sans-serif']
      },
      fontSize: {
        // Quest type ramp from Figma
        'heading-2': ['24px', { lineHeight: '32px', letterSpacing: '-1px', fontWeight: '600' }],
        'heading-3': ['20px', { lineHeight: '28px', letterSpacing: '0', fontWeight: '600' }],
        'heading-4': ['18px', { lineHeight: '24px', letterSpacing: '0', fontWeight: '600' }],
        'body-1': ['16px', { lineHeight: '24px', letterSpacing: '-0.2px', fontWeight: '400' }],
        'body-2': ['14px', { lineHeight: '20px', letterSpacing: '0', fontWeight: '400' }],
        'subtitle-1': ['16px', { lineHeight: '22px', letterSpacing: '0', fontWeight: '700' }],
        'subtitle-2': ['14px', { lineHeight: '20px', letterSpacing: '0', fontWeight: '700' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0', fontWeight: '400' }],
        'overline': ['12px', { lineHeight: '16px', letterSpacing: '0.6px', fontWeight: '700' }],
        'button-1': ['16px', { lineHeight: '24px', letterSpacing: '-0.2px', fontWeight: '600' }],
        'button-2': ['14px', { lineHeight: '1.6', letterSpacing: '-0.2px', fontWeight: '600' }]
      },
      boxShadow: {
        card: '0 4px 4px -2px rgba(24, 39, 75, 0.06)',
        'card-alt': '2px 2px 7px rgba(0, 0, 0, 0.09)'
      },
      maxWidth: {
        quest: '920px',
        'quest-vw': '1440px'
      }
    }
  },
  plugins: []
}
