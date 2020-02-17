/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';

export const fetchListing = createAction('FETCH_LISTING');
export const fetchListingBySubject = createAction('FETCH_LISTING_BY_SUBJECT');
export const setListing = createAction('SET_LISTING');
export const fetchFilters = createAction('FETCH_FILTERS');
export const setFilters = createAction('SET_FILTERS');
export const resetFilters = createAction('RESET_FILTERS');
