/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const postcssPresetEnv = require('postcss-preset-env');
const postcssFocus = require('postcss-focus');
const postcssImport = require('postcss-import');
const postcssReporter = require('postcss-reporter');

module.exports = {
  plugins: [
    postcssImport({
      glob: true,
    }),
    postcssFocus(), // Add a :focus to every :hover
    postcssPresetEnv(),
    postcssReporter({
      // Posts messages from plugins to the terminal
      clearMessages: true,
    }),
  ],
};
