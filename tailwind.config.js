/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#070b14',
        panel: '#0f1623',
        card: '#161e2e',
        border: '#1e293b',
        accent: '#38bdf8',
        warning: '#f59e0b',
        success: '#10b981',
        text: '#e2e8f0',
        subtext: '#64748b',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
};
