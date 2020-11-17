/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';
// Make it easy to add common options (i.e. headers) later
// by wrapping fetch
function createFetch(...args) {
  return fetch(...args);
}

export default createFetch;