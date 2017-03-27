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


export function* fetchListing(id) {
  console.log('ignoring id in v1', id);
  const locale = yield select(getLocale);
  const listing1 = yield call(api.fetchListing, 1, locale);
  const listing2 = yield call(api.fetchListing, 2, locale);
  const listing3 = yield call(api.fetchListing, 3, locale);
  const listing4 = yield call(api.fetchListing, 4, locale);
  const listing5 = yield call(api.fetchListing, 5, locale);
  console.log('listingSagas ', listing1);
  console.log('listingSagas ', listing2);
  console.log('listingSagas ', listing3);
  console.log('listingSagas ', listing4);
  console.log('listingSagas ', listing5);

  const listingArray = [listing1].concat(listing2, listing3, listing4, listing5);

  const arrayWithfilterChoices = listingArray.map((listing) => {
    const listingsFlattLabels2 = listingsFlattLabels(listing.labels);
    listing.filterChoices = listingsFlattLabels2.reduce((a, b) => a.concat(b), []);
    return listing;
  });

  console.log('arrayWithfilterChoices', arrayWithfilterChoices);
  // return arrayWithfilterChoices;
  yield put(actions.setListing(arrayWithfilterChoices));
}

export function* watchFetchListing() {
  while (true) {
    const { payload: id } = yield take(actions.fetchListing);
    // const id = yield take(constants.FETCH_LISTING);
    // const current = yield select(getListing(id));
    // console.log("current: ", current);

    yield call(fetchListing, id);
  }
}

export default [
  watchFetchListing,
];
