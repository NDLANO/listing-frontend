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
  fetch,
} from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/concept-api/v1/concepts');
const baseImageUrl = apiResourceUrl('/image-api/v2/images');
const baseArticleUrl = apiResourceUrl('/article-api/v2/articles');

export const fetchConcepts = (page, pageSize, language, query) =>
  fetch(
    `${baseListingUrl}?sort=title&page=${page}&page-size=${pageSize}&language=${language}&query=${query}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);

export const fetchConceptsBySubject = (
  subjectId,
  page,
  pageSize,
  language,
  query,
) =>
  fetch(
    `${baseListingUrl}?sort=title&subjects=${subjectId}&page=${page}&page-size=${pageSize}&language=${language}&query=${query}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);

export const fetchConceptsByTags = (tags, page, pageSize, language, query) =>
  fetch(
    `${baseListingUrl}?sort=title&tags=${tags}&page=${page}&page-size=${pageSize}&language=${language}&query=${query}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);

export const fetchTags = language =>
  fetch(`${baseListingUrl}/tags/?language=${language}`).then(
    resolveJsonOrRejectWithError,
  );

export const fetchConcept = (conceptId, language) =>
  fetch(
    `${baseListingUrl}/${conceptId}?language=${language}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);

export const fetchImage = (imageId, language) =>
  fetch(`${baseImageUrl}/${imageId}?language=${language}&fallback=true`).then(
    resolveJsonOrRejectWithError,
  );

export const fetchArticle = (articleId, language) =>
  fetch(
    `${baseArticleUrl}/${articleId}?language=${language}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);
