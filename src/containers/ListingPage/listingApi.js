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

export const fetchConcepts = (page, pageSize, language) =>
  fetch(`${baseListingUrl}?sort=title&page=${page}&page-size=${pageSize}&language=${language}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchConceptsBySubject = (subjectId, page, pageSize, language) =>
  fetch(
    `${baseListingUrl}?sort=title&subjects=${subjectId}&page=${page}&page-size=${pageSize}&language=${language}`,
  ).then(resolveJsonOrRejectWithError);

  export const fetchConceptsByTags = (tags, page, pageSize, language) =>
  fetch(
    `${baseListingUrl}?sort=title&tags=${tags}&page=${page}&page-size=${pageSize}&language=${language}`,
  ).then(resolveJsonOrRejectWithError);

export const fetchTags = language =>
  fetch(`${baseListingUrl}/tags/?language=${language}`).then(
    resolveJsonOrRejectWithError,
  );
export const fetchConcept = conceptId =>
  fetch(`${baseListingUrl}/${conceptId}`).then(resolveJsonOrRejectWithError);
export const fetchImage = imageId =>
  fetch(`${baseImageUrl}/${imageId}`).then(resolveJsonOrRejectWithError);
export const fetchArticle = articleId =>
  fetch(`${baseArticleUrl}/${articleId}`).then(resolveJsonOrRejectWithError);
