/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: '#722F37',
        'forest-green': '#2D5016',
        'navy-blue': '#1E2A47',
        'warm-brown': '#8B7355',
        parchment: '#F5F1E8',
        'dark-parchment': '#E8E2D1',
      },
      fontFamily: {
        serif: ['Crimson Text', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,%3Csvg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noise\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"1\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100\" height=\"100\" filter=\"url(%23noise)\" opacity=\"0.1\"/%3E%3C/svg%3E')",
        'leather-texture': "url('data:image/svg+xml,%3Csvg width=\"200\" height=\"200\" viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"grain\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.6\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"200\" height=\"200\" filter=\"url(%23grain)\" opacity=\"0.05\"/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}