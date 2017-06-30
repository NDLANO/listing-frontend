/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { fork } from 'redux-saga-effects';
import listingSagas from './containers/ListingPage/listingSagas';

export default function* root() {
  yield [
    ...listingSagas.map(s => fork(s)),
  ];
}
