/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx,mdx}', './components/**/*.{js,ts,tsx,mdx}'],
  darkMode: 'media',
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontFamily: {
      sans: [
        'var(--font-relative-pro)',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Helvetica',
        'sans-serif',
      ],
      mono: [
        'var(--font-relative-mono)',
        'ui-monospace',
        'Menlo',
        'monospaced',
      ],
    },
    extend: {
      boxShadow: {
        dock: '0 0 0 1px rgb(0 0 0 / 10%), 0 25px 50px -12px rgb(0 0 0 / 0.25)',
        card: '0 0 0 1px rgb(0 0 0 / 10%), 0 2px 4px rgb(0 0 0 / 5%), 0 12px 24px rgb(0 0 0 / 5%)',
      },
    },
  },
  plugins: [],
}
