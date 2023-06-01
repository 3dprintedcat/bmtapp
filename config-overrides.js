const path = require('path');
const webpack = require('webpack');

module.exports = function override(config, env) {
  // Ensure all necessary polyfills are included
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "path": require.resolve("path-browserify"),
    "fs": require.resolve("browserify-fs"),
    "buffer": require.resolve("buffer/"),
    "stream": require.resolve("stream-browserify"),
    "util": require.resolve("util/")
  };

  // Add a new entry point for the overlay
  config.entry = {
    main: config.entry, // The original entry point
    overlay: path.resolve(__dirname, 'src/overlay.js') // The new entry point for the overlay
  };

  // Modify the output filename to include the entry name
  config.output.filename = 'static/js/[name].bundle.js';

  return config;
};
