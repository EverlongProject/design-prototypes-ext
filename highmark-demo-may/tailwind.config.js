/** @type {import('tailwindcss').Config} */
// Tokens pulled directly from the Highmark Figma (node 1:3660).
// Naming mirrors the Figma variable groups so we can reconcile easily
// (Interactive/*, Decorative/*, Surface/*, On Surface/*, etc.).
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Highmark brand
        highmark: {
          // Interactive / Action Primary + Decorative/Brand Primary/Default
          primary: '#0066B1',
          // Decorative/Brand Primary Default + Illustrations/Primary 1
          'primary-bright': '#008DD1',
          // Decorative/Brand Primary Dark
          'primary-dark': '#046B9A',
          // Decorative/Brand Primary/Dark (deepest)
          'primary-deepest': '#003963',
          // Illustrations/Brand Primary 2
          'primary-mid': '#005984',
          // Decorative/Brand Primary Pastel + Surface/Background Secondary + Highlight/Background Subdued
          'primary-pastel': '#EAF5FD',
          'primary-pastel-light': '#ECF8FD',
          // Decorative/Brand Secondary (teal)
          secondary: '#0FB5AE',
          'secondary-bright': '#57CBC6',
          'secondary-dark': '#0C918B',
          // Illustrations/Brand Primary 3 (green accent)
          'accent-green': '#6CC199',
          // Tertiary/Text Default
          'link': '#0074C9'
        },
        // Surfaces
        surface: {
          primary: '#FFFFFF',
          secondary: '#EAF5FD',
          card: '#FFFFFF'
        },
        // Text / ink
        ink: {
          DEFAULT: '#00223C',
          subdued: '#495055',
          reversed: '#FFFFFF'
        },
        // Borders
        border: {
          DEFAULT: '#E0E2E4',
          subdued: '#E0E2E4',
          card: '#E0E2E4'
        },
        // Status
        success: {
          DEFAULT: '#0A884B',
          bg: '#E3F7F0'
        },
        warning: {
          DEFAULT: '#FCCA46'
        },
        // Neutrals
        neutral: {
          low: '#FFFFFF',
          medium: '#EBEDEF',
          high: '#13181B',
          disabled: '#949494',
          'input-disabled': '#E8EAED'
        }
      },
      fontFamily: {
        // Headings
        heading: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
        // Inter is used for H2 + Body One per Figma
        display: ['Inter', 'Poppins', 'system-ui', 'sans-serif'],
        // Body / buttons
        sans: ['Roboto', 'Inter', 'system-ui', 'sans-serif']
      },
      fontSize: {
        // From Figma Heading/Body/Subtitle/etc. tokens
        'heading-2': ['24px', { lineHeight: '32px', letterSpacing: '-1px', fontWeight: '600' }],
        'heading-3': ['18px', { lineHeight: '26px', letterSpacing: '0.25px', fontWeight: '600' }],
        'heading-4': ['18px', { lineHeight: '1.6', letterSpacing: '0.25px', fontWeight: '600' }],
        'body-1': ['16px', { lineHeight: '24px', letterSpacing: '-0.2px', fontWeight: '400' }],
        'body-2': ['14px', { lineHeight: '20px', letterSpacing: '0', fontWeight: '400' }],
        'subtitle-1': ['15px', { lineHeight: '24px', letterSpacing: '-0.2px', fontWeight: '600' }],
        'subtitle-2': ['14px', { lineHeight: '1.6', letterSpacing: '-0.2px', fontWeight: '600' }],
        'caption': ['12px', { lineHeight: '16px', letterSpacing: '0', fontWeight: '400' }],
        'overline': ['12px', { lineHeight: '16px', letterSpacing: '0.6px', fontWeight: '700' }],
        'button-1': ['15px', { lineHeight: '24px', letterSpacing: '-0.2px', fontWeight: '600' }],
        'button-2': ['14px', { lineHeight: '1.6', letterSpacing: '-0.2px', fontWeight: '600' }]
      },
      boxShadow: {
        // From Figma: card Effect (type: DROP_SHADOW, color: #00000014, offset (0,2), radius 6)
        card: '0 2px 6px rgba(0, 0, 0, 0.08)',
        // Alt card shadow from Figma: #00000017, offset (2,2), radius 7
        'card-alt': '2px 2px 7px rgba(0, 0, 0, 0.09)'
      },
      maxWidth: {
        // Highmark design container width (920px inside a 1440px viewport, 260px gutters)
        highmark: '920px',
        // Full Highmark viewport reference
        'highmark-vw': '1440px'
      }
    }
  },
  plugins: []
}
