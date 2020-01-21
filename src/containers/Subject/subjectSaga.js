/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { call, put, takeEvery } from 'redux-saga-effects';
import * as actions from './subjectActions';
import * as api from './subjectApi';

export function* fetchSubjects() {
  const subjects = yield call(api.fetchSubjects);
  
  if (!subjects) {
    yield put(actions.setSubjects([]));
  } else {
    yield put(actions.setSubjects(subjects))
  }
}

export function* watchFetchSubjects() {
  yield takeEvery(actions.fetchSubjects, fetchSubjects);
}

export default watchFetchSubjects;