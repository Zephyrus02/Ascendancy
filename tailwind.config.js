/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        },
        shine: {
          '0%': { transform: 'translateX(-200%)' },
          '100%': { transform: 'translateX(200%)' }
        }
      },
      animation: {
        scroll: 'scroll 25s linear infinite',
        shimmer: 'shimmer 2s infinite',
        shine: 'shine 3s linear infinite',
      }
    },
  },
  plugins: [
    import('tailwind-scrollbar-hide')
  ],
};