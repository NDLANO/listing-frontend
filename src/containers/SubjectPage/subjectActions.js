/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import { createAction } from 'redux-actions';
import * as constants from './subjectConstants';

export const fetchSubject = createAction(constants.FETCH_SUBJECT);
export const setSubject = createAction(constants.SET_SUBJECT);
