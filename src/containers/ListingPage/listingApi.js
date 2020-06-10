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
const baseArticleUrl = apiResourceUrl('/article-api/v2/articles');

export const fetchConcepts = (query, pageSize) =>
  fetch(`${baseListingUrl}?sort=title&query=${query}&page-size=${pageSize}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchConceptsBySubject = (subjectId, pageSize) =>
  fetch(`${baseListingUrl}?sort=title&subjects=${subjectId}&page-size=${pageSize}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchConceptsByTags = (tags, pageSize) =>
  fetch(`${baseListingUrl}?sort=title&tags=${tags}&page-size=${pageSize}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchTags = () =>
  fetch(`${baseListingUrl}/tags/`).then(resolveJsonOrRejectWithError);
export const fetchConcept = conceptId =>
  fetch(`${baseListingUrl}/${conceptId}`).then(resolveJsonOrRejectWithError);
export const fetchImage = imageId =>
  fetch(`${baseImageUrl}/${imageId}`).then(resolveJsonOrRejectWithError);
export const fetchArticle = articleId =>
  fetch(`${baseArticleUrl}/${articleId}`).then(resolveJsonOrRejectWithError);
