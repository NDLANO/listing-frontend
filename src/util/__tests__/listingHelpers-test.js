/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { mapTagsToFilters } from '../listingHelpers';

test('split list into filters', () => {
  expect(typeof mapTagsToFilters).toBe('function');

  const result = new Map();
  result.set('Liste', { main: ['filter1'], sub: ['filter2'] });
  expect(mapTagsToFilters(['Liste:filter1:filter2'])).toEqual(result);
});

test('split list into filters without sub', () => {
  expect(typeof mapTagsToFilters).toBe('function');

  const result = new Map();
  result.set('Liste', { main: ['filter1'], sub: [] });
  expect(mapTagsToFilters(['Liste:filter1:'])).toEqual(result);
});

test('split list into filters without main and sub', () => {
  expect(typeof mapTagsToFilters).toBe('function');

  const result = new Map();
  result.set('Liste', { main: [], sub: [] });
  expect(mapTagsToFilters(['Liste::'])).toEqual(result);
});
