/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import { take, call, put, select } from 'redux-saga-effects';
import { getLocale } from '../Locale/localeSelectors';
import * as constants from './subjectConstants';
import * as actions from './subjectActions';
import * as api from './subjectApi';

export function* fetchSubject(id) {
  try {
    const locale = yield select(getLocale);
    const subject = yield call(api.fetchSubject, id, locale);
    yield put(actions.setSubject(subject));
  } catch (error) {
    throw error;
  }
}

export function* watchFetchSubject() {
  while (true) {
    const id = yield take(constants.FETCH_SUBJECT);
    yield call(fetchSubject, id);
  }
}

export default [
  watchFetchSubject,
];
