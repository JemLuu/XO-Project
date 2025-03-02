/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'xo-pink': '#FF80A0',
        'xo-pink-light': '#FF9EB0',
        'xo-blue': '#A3E4FF',
        'xo-blue-dark': '#90CAF9',
        'xo-cream': '#FAF9F7',
        'xo-gray': '#F2F2F2',
      },
      fontFamily: {
        'handwritten': ['Caveat', 'cursive'],
        'sans': ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'scrapbook-pattern': "url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80')",
      },
    },
  },
  plugins: [],
};