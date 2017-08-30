/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

export function sortListing(sortType, listings) {
  switch (sortType) {
    case 'title_asc':
      listings.sort((a, b) => a.title.title.localeCompare(b.title.title, 'nb'));
      break;
    case 'title_desc':
      listings.sort((b, a) => a.title.title.localeCompare(b.title.title, 'nb'));
      break;
    default:
      listings.sort((a, b) => a.title.title.localeCompare(b.title.title, 'nb'));
  }
}
