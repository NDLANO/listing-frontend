/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { handleActions } from 'redux-actions';
import * as actions from './subjectActions';

const initalState = [];

export default handleActions({
  [actions.setSubjects]: {
    next: (state, action) => action.payload,
    throw: state => state,
  },
}, initalState);