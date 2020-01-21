/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { select, call, put, takeEvery } from 'redux-saga-effects';
import * as actions from './listingActions';
import * as api from './listingApi';

export function* fetchListing() {
  const subjects = yield select(state => state.subjects);
  const listings = yield call(() => api.fetchListing(subjects, 10));

  if (!listings.results) {
    yield put(actions.setListing([]));
  } else {
    yield put(actions.setListing(listings.results.sort((a, b) => a.title.title.localeCompare(b.title.title))));
  }
}

export function* watchFetchListing() {
  yield takeEvery(actions.fetchListing, fetchListing);
}

export default watchFetchListing;
