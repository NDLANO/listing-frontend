/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from '@apollo/client';

const imageLicenseFragment = gql`
  fragment ImageLicenseInfo on ImageLicense {
    title
    src
    altText
    copyright {
      license {
        license
      }
      creators {
        name
        type
      }
      rightsholders {
        name
        type
      }
    }
  }
`;

export const subjectInfoFragment = gql`
  fragment SubjectInfo on Subject {
    id
    name
    path
  }
`;

export const listingPageQuery = gql`
  query ListingPage {
    listingPage {
      subjects {
        ...SubjectInfo
      }
      tags
    }
  }
  ${subjectInfoFragment}
`;

export const conceptSearchQuery = gql`
  query ConceptSearch(
    $query: String
    $subjects: String
    $tags: String
    $page: String
    $pageSize: String
    $exactMatch: Boolean
    $fallback: Boolean
    $language: String
  ) {
    conceptSearch(
      query: $query
      subjects: $subjects
      tags: $tags
      page: $page
      pageSize: $pageSize
      exactMatch: $exactMatch
      fallback: $fallback
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

const contributorInfoFragment = gql`
  fragment ContributorInfo on Contributor {
    name
    type
  }
`;

const copyrightInfoFragment = gql`
  ${contributorInfoFragment}
  fragment CopyrightInfo on Copyright {
    license {
      license
      url
    }
    creators {
      ...ContributorInfo
    }
    processors {
      ...ContributorInfo
    }
    rightsholders {
      ...ContributorInfo
    }
    origin
  }
`;

export const detailedConceptQuery = gql`
  query DetailedConcept($id: String) {
    detailedConcept(id: $id) {
      title
      content
      created
      subjectIds
      subjectNames
      copyright {
        license {
          license
        }
        origin
        creators {
          name
          type
        }
      }
      image {
        ...ImageLicenseInfo
      }
      articles {
        id
        title
      }
      visualElement {
        title
        resource
        url
        copyright {
          ...CopyrightInfo
        }
        language
        embed
        brightcove {
          videoid
          player
          account
          caption
          description
          cover
          src
          download
          iframe {
            src
            height
            width
          }
          uploadDate
          copyText
        }
        h5p {
          src
          thumbnail
          copyText
        }
        oembed {
          title
          html
          fullscreen
        }
        image {
          resourceid
          alt
          caption
          lowerRightX
          lowerRightY
          upperLeftX
          upperLeftY
          focalX
          focalY
          src
          altText
          contentType
          copyText
        }
      }
    }
  }
  ${imageLicenseFragment}
  ${copyrightInfoFragment}
`;
