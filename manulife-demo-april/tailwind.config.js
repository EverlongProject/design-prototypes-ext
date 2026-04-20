/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        manulife: {
          green: '#00874E',
          'green-dark': '#006B3E',
          'green-light': '#E6F4EC'
        },
        ink: {
          DEFAULT: '#111827',
          soft: '#4B5563'
        },
        stroke: '#E5E7EB',
        bg: {
          DEFAULT: '#FFFFFF',
          alt: '#F5F5F7'
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(17,24,39,0.06), 0 1px 3px rgba(17,24,39,0.1)'
      }
    }
  },
  plugins: []
}
