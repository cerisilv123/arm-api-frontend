module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      colors: {
        'blue-theme': '#818cf8', 
        'green-theme': '#4ADE80', 
        'purple-theme': '#A78BFA', 
        'red-theme': '#F87171', 
        'pink-theme': '#F472B6', 
        'orange-theme': '#FB923C',
      },
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
        'blue-theme': '#818cf8', 
        'green-theme': '#4ADE80', 
        'purple-theme': '#A78BFA', 
        'red-theme': '#F87171', 
        'pink-theme': '#F472B6', 
        'orange-theme': '#FB923C',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
      },
      width: {
        400: '400px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern':
          "url('https://cdn.dribbble.com/users/124813/screenshots/15521275/media/4c0db289cb14fcaee044383b35353717.gif')",
      },
    },
  },
  plugins: [
    
  ],
};

