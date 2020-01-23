/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { take, select, call, put, takeEvery } from 'redux-saga/effects';
import * as actions from './listingActions';
import * as api from './listingApi';
import { setSubjects } from '../Subject/subjectActions';

export function* fetchListing() {
  let subjects = yield select(state => state.subjects);
  if (!subjects) {
    yield take(setSubjects);
    subjects = yield select(state => state.subjects);
  }
  const listings = yield call(() => api.fetchListing(subjects.map(subject => subject.id), 12));

  if (!listings.results) {
    yield put(actions.setListing([]));
  } else {
    const locale = yield select(state => state.locale);
    yield put(actions.setListing(listings.results.sort((a, b) => a.title.title.localeCompare(b.title.title, locale))));
  }
}

export function* watchFetchListing() {
  yield takeEvery(actions.fetchListing, fetchListing);
}

export default watchFetchListing;
