/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { all, fork } from 'redux-saga/effects';
import listingSagas from './containers/ListingPage/listingSagas';

export default function* root() {
  yield all([
    ...listingSagas.map(s => fork(s)),
  ]);
}
