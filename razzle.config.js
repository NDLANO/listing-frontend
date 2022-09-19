const { modifyRule } = require('razzle-config-utils');
const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies

module.exports = {
  modifyWebpackConfig({ env: { target, dev }, webpackConfig: appConfig }) {
    modifyRule(appConfig, { test: /\.css$/ }, rule => {
      rule.use.push({ loader: 'postcss-loader' });
      rule.use.push({ loader: 'sass-loader' });
    });

    if (target === 'web') {
      appConfig.output.filename = dev
        ? 'static/js/[name].js'
        : 'static/js/[name].[hash:8].js';

      appConfig.output.globalObject = 'this'; // use this as global object to prevent webworker window error

      if (!dev) {
        appConfig.optimization.concatenateModules = true;
        appConfig.devtool = 'source-map';
        appConfig.performance = { hints: false };
      }
    }

    if (target === 'node' && !dev) {
      // This change bundles node_modules into server.js. The result is smaller Docker images.
      // It triggers a couple of «Critical dependency: the request of a dependency is an
      // expression warning» which we can safely ignore.
      appConfig.externals = [];

      // This tells webpack to resolve esm modules before commonjs on the server-side.
      // @apollo/client stopped being bundled without this when moving from 3.4.x to 3.5.x
      appConfig.resolve.mainFields = ['module', 'main'];

      // Razzle/CRA breaks the build on webpack warnings. Disable CI env to circumvent the check.
      process.env.CI = 'false';
    }

    return appConfig;
  },
};
