/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        accent: 'var(--color-accent)',
        'accent-dim': 'var(--color-accent-dim)',
        'surface-glass': 'var(--color-surface-glass)',
      },
      backdropBlur: {
        glass: 'var(--blur-glass)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
