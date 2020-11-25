/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  resolveJsonOrRejectWithError,
  apiResourceUrl,
  fetch,
  // @ts-ignore
} from '../../util/apiHelpers';
import { ConceptSearchResult } from './conceptApiInterfaces';

/** Type used to indicate that the api takes a string with comma separated values to
 *  simulate an array: ie 'item1,item2,item3' */
type CommaSeparatedList = string;

const baseConceptUrl = apiResourceUrl('/concept-api/v1/concepts');

export const fetchConcepts = (
  page: number,
  pageSize: number,
  language: string,
  query: string,
): Promise<ConceptSearchResult[]> =>
  fetch(
    `${baseConceptUrl}?sort=title&page=${page}&page-size=${pageSize}&language=${language}&query=${query}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);

export const fetchConceptsBySubject = (
  subjectId: number,
  page: number,
  pageSize: number,
  language: string,
  query: string,
): Promise<ConceptSearchResult[]> =>
  fetch(
    `${baseConceptUrl}?sort=title&subjects=${subjectId}&page=${page}&page-size=${pageSize}&language=${language}&query=${query}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);

export const fetchConceptsByTags = (
  tags: CommaSeparatedList,
  page: number,
  pageSize: number,
  language: string,
  query: string,
): Promise<ConceptSearchResult[]> =>
  fetch(
    `${baseConceptUrl}?sort=title&tags=${tags}&page=${page}&page-size=${pageSize}&language=${language}&query=${query}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);

export const fetchTags = (language: string): Promise<string[]> =>
  fetch(`${baseConceptUrl}/tags/?language=${language}`).then(
    resolveJsonOrRejectWithError,
  );

export const fetchConcept = (
  conceptId: number,
  language: string,
): Promise<object> =>
  fetch(
    `${baseConceptUrl}/${conceptId}?language=${language}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);
