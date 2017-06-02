/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { call, select, put, take } from 'redux-saga-effects';
import { getLocale } from '../Locale/localeSelectors';
import * as actions from './listingActions';
import * as api from './listingApi';
import { listingsFlattLabels } from './../../util/listingHelpers';
import { getAccessToken } from '../App/sessionSelectors';

/* eslint-disable no-param-reassign*/
/* Rename functions AFTER THEY ARE WORING OK AGAIN ... */
export function* fetchListingByFilter(id) {
  const locale = yield select(getLocale);
  const token = yield select(getAccessToken);
  const listings = yield call(api.fetchListingByFilter, id, locale, token);

  if (!listings.results) {
    yield put(actions.setListing([]));
  } else {
    const arrayWithfilterChoices = listings.results.map((listing) => {
      const listingFilterChoices = listingsFlattLabels(listing.labels);
      listing.filterChoices = listingFilterChoices.reduce((a, b) => a.concat(b), []);
      return listing;
    }).sort((a, b) => a.title.localeCompare(b.title));

    yield put(actions.setListing(arrayWithfilterChoices));
  }
}
/* eslint-disable no-param-reassign*/

export function* watchFetchListingByFilter() {
  while (true) {
    const { payload: id } = yield take(actions.fetchListing);
    yield call(fetchListingByFilter, id);
  }
}

export default [
  watchFetchListingByFilter,
];
