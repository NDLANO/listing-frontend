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
import { mapTagsToCategories } from '../../util/listingHelpers'

export function* fetchListing(action) {
  const { payload: subjectId } = action;

  const subject = yield call(() => api.fetchSubject(subjectId));
  const tags = yield call(() => api.fetchTags(subjectId));
  const listings = yield call(() => api.fetchListing(subjectId, 12));

  if (!listings.results) {
    yield put(actions.setListing({}));
  } else {
    const locale = yield select(state => state.locale);
    yield put(actions.setListing({
      subjectName: subject.name || subjectId,
      categories: tags.tags ? mapTagsToCategories(tags.tags) : undefined,
      listings: listings.results.sort((a, b) => a.title.title.localeCompare(b.title.title, locale))
    }))
  }
}

export function* watchFetchListing() {
  yield takeEvery(actions.fetchListing, fetchListing);
}

export default watchFetchListing;
