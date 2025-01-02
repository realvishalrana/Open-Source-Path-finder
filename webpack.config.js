const webpack = require('webpack');

module.exports = {
  // ...existing code...
  resolve: {
    // ...existing code...
    fallback: {
      buffer: require.resolve('buffer/'),
      // ...other fallbacks if needed...
    },
  },
  plugins: [
    // ...existing plugins...
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
