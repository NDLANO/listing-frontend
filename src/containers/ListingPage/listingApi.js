/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  resolveJsonOrRejectWithError,
  apiResourceUrl,
} from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/concept-api/v1/concepts');
const baseImageUrl = apiResourceUrl('/image-api/v2/images');

export const fetchListing = pageSize =>
  fetch(`${baseListingUrl}?page-size=${pageSize}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchListingBySubject = (subjectId, pageSize) =>
  fetch(`${baseListingUrl}?subjects=${subjectId}&page-size=${pageSize}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchTags = subjectIds =>
  fetch(`${baseListingUrl}/tags/?subjects=${subjectIds}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchConcept = conceptId =>
  fetch(`${baseListingUrl}/${conceptId}`).then(resolveJsonOrRejectWithError);
export const fetchImage = imageId =>
  fetch(`${baseImageUrl}/${imageId}`).then(resolveJsonOrRejectWithError);
