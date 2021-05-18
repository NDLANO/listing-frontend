/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from '@apollo/client';

export const listingPageQuery = gql`
  query ListingPage {
    listingPage {
      subjects {
        id
        name
      }
      tags
    }
  }
`;

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

export const detailedConceptQuery = gql`
  query DetailedConcept($id: String) {
    detailedConcept(id: $id) {
      title
      content
      created
      subjectIds
      copyright {
        license {
          license
        }
        origin
        authors: creators {
          name
          type
        }
      }
      image {
        title
        src
        altText
        copyright {
          license {
            license
          }
          authors: creators {
            name
            type
          }
          rightsholders {
            name
          }
        }
      }
      articles {
        id
        title
      }
      visualElement {
        resource
        title
        url
        alt
        thumbnail
        image {
          imageUrl
          contentType
        }
        oembed {
          title
          html
          fullscreen
        }
        lowerRightX
        lowerRightY
        upperLeftX
        upperLeftY
        focalX
        focalY
        copyright {
          license {
            license
          }
          authors: creators {
            name
            type
          }
          rightsholders {
            name
            type
          }
        }
      }
    }
  }
`;
