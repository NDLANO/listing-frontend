/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const errorReporter = (store) => (next) => (action) => {
  if (action.error) {
    const err = action.payload;
    /* eslint-disable no-console */
    if (err.status) {
      const json = err.json;
      console.error(`${err.status} ${err.message}: ${json.code} ${json.description}. %o`, json.messages);
    } else {
      console.error(action.payload, action, store.getState());
    }
    /* eslint-enable no-console */
  }

  return next(action);
};

export default errorReporter;
