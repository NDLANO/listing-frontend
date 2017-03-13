/*
 *  Copyright (c) 2017-present, NDLA.
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
  console.log('sS fetch', id);
  try {
    const locale = yield select(getLocale);
    console.log('subject Saga locale ', locale);
    const subject = yield call(api.fetchSubject, id, locale);
      console.log("subjectSagas sub ", subject);
    yield put(actions.setSubject(subject));
  } catch (error) {
    console.log('error error ', error);
    throw error;
  }
}

export function* watchFetchSubject() {
  while (true) {
      console.log("while true do this...");
         const id = yield take(constants.FETCH_SUBJECT);
         console.log("fetch subject payload ", id);
      yield call(fetchSubject, id);
  }
}

export default [
  watchFetchSubject,
];
