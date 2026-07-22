/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './sanity/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#191B1E',
        coal: '#23262A',
        slatefog: '#676D71',
        mist: '#8B9195',
        pine: '#515A55',
        pinedeep: '#2C312E',
        birch: '#E6E8E8',
        parchment: '#EFF0F0',
        gold: '#AAB2B3',
        golddim: '#545C60',
      },
      fontFamily: {
        display: ['var(--font-cinzel)', 'serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-jost)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 30px 80px -40px rgba(20,22,26,0.55)',
        card: '0 20px 50px -30px rgba(20,22,26,0.65)',
      },
      keyframes: {
        drift: {
          '0%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-3%) translateY(-1%)' },
          '100%': { transform: 'translateX(0) translateY(0)' },
        },
      },
      animation: {
        drift: 'drift 26s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
