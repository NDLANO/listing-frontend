/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { all, fork } from 'redux-saga/effects';
import listingSaga from './containers/ListingPage/listingSaga';
import subjectSaga from './containers/Subject/subjectSaga';

export default function* root() {
  yield all([
    fork(listingSaga),
    fork(subjectSaga)
  ]);
}
