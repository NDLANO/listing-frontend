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
    $page: String
    $pageSize: String
    $language: String
  ) {
    conceptSearch(
      query: $query
      subjects: $subjects
      page: $page
      pageSize: $pageSize
      language: $language
    ) {
      id
      title
      content
      metaImage {
        url
        alt
      }
    }
  }
`;
