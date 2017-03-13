/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { fork } from 'redux-saga-effects';
import articleSagas from './containers/ArticlePage/articleSagas';
import subjectSagas from './containers/SubjectPage/subjectSagas';

export default function* root() {
  yield [
    ...articleSagas.map(s => fork(s)),
    ...subjectSagas.map(s => fork(s)),
  ];
}
