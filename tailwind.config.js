/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.jsx",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // colors here
        // Sample: 'custom-green': '#031716',
      },
    },
  },
  plugins: [],
}