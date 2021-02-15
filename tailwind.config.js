module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './src/**/*.ts', './src/**/*.tsx'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      minHeight: {
        500: '500px',
      },
      maxHeight: {
        500: '500px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
