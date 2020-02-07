/**
 * PRODUCTION WEBPACK CONFIGURATION
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = require('./webpack.config.base')({
  // In production, we skip all hot-reloading stuff
  entry: {
    main: [],
    embed: [],
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
  },

  babelPresetTargets: {
    browsers: ['last 2 versions', 'IE >= 12'],
  },

  rules: [
    {
      // Extract css to seprate file. Run css url's trough file loader for hashing in prod build
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader'],
      }),
    },
  ],

  vendorFilename: '[name].[chunkhash].js',

  // Use hashes in prod to anbale caching
  fileLoader: 'file-loader?name=[name]-[hash].[ext]',

  plugins: [
    // Minify and optimize the JavaScript
    new UglifyJsPlugin({
      test: /\.js($|\?)/i,
      sourceMap: true,
      uglifyOptions: {
        mangle: {
          keep_fnames: true,
        },
        compress: {
          warnings: false,
        },
        output: {
          beautify: false,
        },
      },
    }),
    new BundleAnalyzerPlugin(
      {
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analyzer-report.html',
      }),
    new ManifestPlugin({ fileName: 'assets.json' }),

    // Extract the CSS into a separate file
    new ExtractTextPlugin('[name].[contenthash].css'),
  ],
  devtool: 'source-map',
});
