/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  mapTagsToFilters,
  isListeParamUrl,
  isListePathUrl,
} from '../listingHelpers';

test('split list into filters', () => {
  expect(typeof mapTagsToFilters).toBe('function');

  const result = new Map();
  result.set('Liste', { main: ['filter1'], sub: ['filter2'] });
  expect(mapTagsToFilters(['Liste:filter1:filter2'])).toEqual(result);
});

test('split list into filters with whitespaces', () => {
  expect(typeof mapTagsToFilters).toBe('function');

  const result = new Map();
  result.set('Liste nummer 1', {
    main: ['filter nummer 1'],
    sub: ['filter nummer 2'],
  });
  expect(
    mapTagsToFilters(['Liste nummer 1:filter nummer 1:filter nummer 2']),
  ).toEqual(result);
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

test('do not split into lists if not two columns', () => {
  expect(typeof mapTagsToFilters).toBe('function');

  const result = new Map();
  expect(mapTagsToFilters(['Teststring'])).toEqual(result);
});

test('isListeParamUrl correct behavior', () => {
  const urls = new Map();
  urls.set('https://liste.ndla.no/?concept=603', true);
  urls.set('https://liste.test.ndla.no/?concept=603', true);
  urls.set('https://liste.staging.ndla.no/?concept=603', true);
  urls.set('http://liste.ndla.no/?concept=603', false);
  urls.set('http://liste.test.ndla.no/?concept=603', false);
  urls.set('http://liste.staging.ndla.no/?concept=603', false);
  urls.set('www.liste.ndla.no/?concept=603', false);
  urls.set('www.liste.test.ndla.no/?concept=603', false);
  urls.set('www.liste.staging.ndla.no/?concept=603', false);
  urls.set('liste.ndla.no/?concept=603', true);
  urls.set('liste.test.ndla.no/?concept=603', true);
  urls.set('liste.staging.ndla.no/?concept=603', true);
  urls.set('https://liste.ndla.no/?concept=w', false);
  urls.set('https://liste.ndla.no/?concept=3w6', false);
  urls.set('https://liste.ndla.no/?concept=', false);
  urls.set('https://liste.ndla.no/?concepts=603', false);
  urls.set('https://liste.ndla.no/', false);
  urls.set('https://liste..ndla.no/?concept=603', false);
  urls.set('https://liste.ndla.no/nn/?concept=603', true);
  urls.set('https://liste.ndla.no/nb/?concept=603', true);

  urls.forEach((value, key) => expect(isListeParamUrl(key)).toBe(value));
});

test('isListePathUrl correct behavior', () => {
  const urls = new Map();
  urls.set('https://liste.ndla.no/concepts/603', true);
  urls.set('https://liste.test.ndla.no/concepts/603', true);
  urls.set('https://liste.staging.ndla.no/concepts/603', true);
  urls.set('http://liste.ndla.no/concepts/603', false);
  urls.set('www.liste.ndla.no/concepts/603', false);
  urls.set('liste.ndla.no/concepts/603', true);
  urls.set('https://liste.ndla.no/concepts/w', false);
  urls.set('https://liste.ndla.no/concepts/', false);
  urls.set('https://liste.ndla.no/', false);
  urls.set('https://liste..ndla.no/concepts/603', false);

  urls.forEach((value, key) => expect(isListePathUrl(key)).toBe(value));
});
