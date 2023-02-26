const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@modules/*': path.resolve(__dirname, 'src/modules*'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@store': path.resolve(__dirname, 'src/store'),
      '@i18n': path.resolve(__dirname, 'src/i18n'),
      '@helpers': path.resolve(__dirname, 'src/helpers'),
      '@screens': path.resolve(__dirname, 'src/screens'),
      '@Hooks': path.resolve(__dirname, 'src/Hooks'),

    }
  },
};