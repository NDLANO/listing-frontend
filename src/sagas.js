/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { fork } from 'redux-saga/effects';
import listingSaga from './containers/ListingPage/listingSaga';

export default function* root() {
  yield fork(listingSaga);
}
