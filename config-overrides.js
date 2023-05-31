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

  return config;
};
