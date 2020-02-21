/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { call, all, put, takeEvery } from 'redux-saga/effects';
import * as actions from './subjectActions';
import * as api from './subjectApi';

export function* fetchSubjects() {
  const subjectIds = yield call(api.fetchSubjects);

  if (!subjectIds) {
    yield put(actions.setSubjects([]));
  } else {
    const subjects = [];
    yield all(
      subjectIds.map(id =>
        call(() =>
          api
            .fetchSubjectNames(id)
            .then(response => response.json())
            .then(subject => {
              subjects.push({
                id,
                name: subject.name ? subject.name : id,
              });
            })
            .catch(() => {}),
        ),
      ),
    );
    yield put(actions.setSubjects(subjects));
  }
}

export function* watchFetchSubjects() {
  yield takeEvery(actions.fetchSubjects, fetchSubjects);
}

export default watchFetchSubjects;
