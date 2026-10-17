/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        verdant: {
          bg: '#0A0E0A',
          card: 'rgba(255, 255, 255, 0.04)',
          'card-hover': 'rgba(255, 255, 255, 0.07)',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-strong': 'rgba(255, 255, 255, 0.16)',
          lime: '#C6F24E',
          'lime-hover': '#D4F76E',
          'lime-muted': 'rgba(198, 242, 78, 0.12)',
          'lime-glow': 'rgba(198, 242, 78, 0.35)',
          text: '#F4F6F2',
          muted: '#9AA39B',
          dark: '#070A07',
          success: '#4ADE80',
          warning: '#FBBF24',
          danger: '#F87171',
        },
        canvas: '#0A0E0A',
        surface: 'rgba(255, 255, 255, 0.04)',
        'surface-sub': 'rgba(255, 255, 255, 0.02)',
        'surface-card': 'rgba(255, 255, 255, 0.04)',
        'on-surface': '#F4F6F2',
        'on-surface-variant': '#9AA39B',
        primary: '#C6F24E',
        'primary-glow': 'rgba(198, 242, 78, 0.3)',
        'on-primary': '#0A0E0A',
        secondary: '#A3E635',
        border: 'rgba(255, 255, 255, 0.08)',
        success: '#4ADE80',
        warning: '#FBBF24',
        error: '#F87171',
      },
      fontFamily: {
        ui: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Instrument Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'lime-glow': '0 0 35px -5px rgba(198, 242, 78, 0.3)',
        'lime-glow-lg': '0 0 60px -10px rgba(198, 242, 78, 0.45)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        'pill': '9999px',
      },
      backdropBlur: {
        'xl': '20px',
      }
    },
  },
  plugins: [],
}
