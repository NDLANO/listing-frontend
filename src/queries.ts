/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from '@apollo/client';

export const conceptSearchQuery = gql`
  query ConceptSearch(
    $query: String
    $subjects: String
    $tags: String
    $page: String
    $pageSize: String
    $exactMatch: Boolean
    $language: String
  ) {
    conceptSearch(
      query: $query
      subjects: $subjects
      tags: $tags
      page: $page
      pageSize: $pageSize
      exactMatch: $exactMatch
      language: $language
    ) {
      totalCount
      concepts {
        id
        title
        content
        tags
        metaImage {
          url
          alt
        }
      }
    }
  }
`;
