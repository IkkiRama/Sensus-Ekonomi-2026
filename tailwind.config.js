export default {
  darkMode: 'class',
  content: [
    './index.html',
    './*.{js,jsx}',
    './assets/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './firebase/**/*.{js,jsx}',
    './hooks/**/*.{js,jsx}',
    './pages/**/*.{js,jsx}',
    './redux/**/*.{js,jsx}',
    './services/**/*.{js,jsx}',
    './utils/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563EB',
        success: '#16A34A',
        danger: '#DC2626',
        app: '#F8FAFC'
      }
    }
  },
  plugins: []
};
