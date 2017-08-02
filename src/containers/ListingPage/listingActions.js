/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';

export const fetchListing = createAction('FETCH_LISTING');
export const setListing = createAction('SET_LISTING');
export const fetchOembed = createAction('FETCH_OEMBED');
export const setOembed = createAction('SET_OEMBED');
