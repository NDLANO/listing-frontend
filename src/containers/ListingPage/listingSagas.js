/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { call, select, put, take } from 'redux-saga-effects';
import { range } from 'lodash';
import { getLocale } from '../Locale/localeSelectors';
import * as actions from './listingActions';
import * as api from './listingApi';
import { listingsFlattLabels } from './../../util/listingHelpers';
import { getAccessToken } from '../App/sessionSelectors';

/* eslint-disable no-param-reassign*/
export function* fetchListing() {
  const locale = yield select(getLocale);
  const token = yield select(getAccessToken);
  const listings = yield call(api.fetchListing, locale, token);

  if (!listings.results) {
    yield put(actions.setListing([]));
  } else {
    const numberOfPages = Math.ceil(listings.totalCount / listings.pageSize);
    range(2, numberOfPages - 1).forEach(function* pageNumbers(i) {
      const tempListings = yield call(api.fetchListing, locale, token, i);
      listings.results.push(...tempListings.results);
    });
    const arrayWithfilterChoices = listings.results.map((listing) => {
      const listingFilterChoices = listingsFlattLabels(listing.labels);
      listing.filterChoices = listingFilterChoices.reduce((a, b) => a.concat(b), []);
      return listing;
    });

    yield put(actions.setListing(arrayWithfilterChoices));
  }
}
/* eslint-disable no-param-reassign*/

export function* watchFetchListing() {
  while (true) {
    yield take(actions.fetchListing);
    yield call(fetchListing);
  }
}

export default [
  watchFetchListing,
];
