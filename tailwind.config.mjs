/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#0d1117',
          card: '#161b22',
          border: '#30363d',
          hover: '#1c2128',
          elevated: '#1c2128',
        },
        accent: {
          DEFAULT: '#58a6ff',
          green: '#3fb950',
          orange: '#d29922',
          red: '#f85149',
          purple: '#bc8cff',
          cyan: '#39d2c0',
          pink: '#f778ba',
          blue: '#79c0ff',
        },
        text: {
          DEFAULT: '#e6edf3',
          muted: '#8b949e',
          dim: '#6e7681',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrainsMono Nerd Font', 'SF Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
