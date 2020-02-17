/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { select, call, put, takeEvery } from 'redux-saga/effects';
import * as actions from './listingActions';
import * as api from './listingApi';
import { mapTagsToFilters } from '../../util/listingHelpers'

export function* fetchListing() {
  const listings = yield call(() => api.fetchListing(1000));

  if (!listings.results) {
    yield put(actions.setListing({}));
  } else {
    const locale = yield select(state => state.locale);
    yield put(actions.setListing(listings.results.sort((a, b) => a.title.title.localeCompare(b.title.title, locale))));
  }
}

export function* fetchListingBySubject(action) {
  const { payload: subjectId } = action;
  const listings = yield call(() => api.fetchListingBySubject(subjectId, 1000));

  if (!listings.results) {
    yield put(actions.setListing({}));
  } else {
    const locale = yield select(state => state.locale);
    yield put(actions.setListing(listings.results.sort((a, b) => a.title.title.localeCompare(b.title.title, locale))));
  }
}

export function* fetchFilters(action) {
  const { payload: subjectIds } = action;
  const tags = yield call(() => api.fetchTags(subjectIds));

  if (tags.length === 0) {
    yield put(actions.setFilters({ main: [], sub: [] }));
  }
  else {
    const tagsArray = [].concat(...tags.map(tag => [...tag.tags]));
    yield put(actions.setFilters(mapTagsToFilters(tagsArray)));
  }
}

export function* watchFetchListing() {
  yield takeEvery(actions.fetchListing, fetchListing);
  yield takeEvery(actions.fetchListingBySubject, fetchListingBySubject);
  yield takeEvery(actions.fetchFilters, fetchFilters);
}

export default watchFetchListing;
