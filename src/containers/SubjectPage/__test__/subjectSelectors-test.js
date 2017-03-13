/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import { getSubject } from '../subjectSelectors';

const state = {
  locale: 'nb',
  subjects: {
    1: {
      id: 1,
      created: '2014-12-24T10:44:06Z',
      title: [
                { title: 'Fag tester', language: 'nb' },
                { title: 'Subject testing', language: 'en' },
      ],
    },
  },
};

test('subjectSelectors getSubject with id', () => {
  expect(getSubject(1)(state).id).toBe(1);
});
