const path = require('path');

module.exports = function override(config, env) {
  // Disable or limit the fork-ts-checker-webpack-plugin to reduce memory usage
  config.plugins = config.plugins.filter(plugin => 
    plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
  );

  // Optimize build performance and memory usage
  config.optimization.splitChunks = {
    chunks: 'all',
    maxSize: 244000, // Limit chunk size to reduce memory usage
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        maxSize: 244000,
      },
    },
  };

  // Reduce memory usage during development
  if (env === 'development') {
    config.optimization.removeAvailableModules = false;
    config.optimization.removeEmptyChunks = false;
    config.optimization.splitChunks = false;
  }

  // Configure webpack dev server for better memory management
  if (config.devServer) {
    config.devServer.hot = false;
    config.devServer.liveReload = false;
  }

  return config;
};
