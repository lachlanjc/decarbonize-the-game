/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx,mdx}', './components/**/*.{js,ts,tsx,mdx}'],
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
        card: '0 0 0 1px rgb(0 0 0 / 7%), 0 2px 4px rgb(0 0 0 / 5%), 0 12px 24px rgb(0 0 0 / 5%)',
      },
    },
  },
  plugins: [],
}
