/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { handleActions } from 'redux-actions';
import * as actions from './listingActions';

const initalState = {
  filters: {
    main: [],
    sub: []
  },
  listings: []
};

export default handleActions({
  [actions.setListing]: {
    next: (state, action) => ({...state, listings: action.payload }),
    throw: state => state
  },
  [actions.setFilters]: {
    next: (state, action) => ({...state, filters: action.payload }),
    throw: state => state
  },
  [actions.resetFilters]: {
    next: (state) => ({...state, filters: initalState.filters }),
    throw: state => state
  }
}, initalState);
