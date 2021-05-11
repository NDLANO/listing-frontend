/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export interface Location {
  search: string;
  pathname: string;
}

export interface Title {
  title: string;
  language: string;
}

export interface MetaImage {
  url: string;
  alt: string;
  language: string;
}

interface Author {
  name: string;
  type: string;
}

export interface Copyright {
  license: {
    license: string;
    description?: string;
    url?: string;
  };
  origin: string;
  processors: Author[];
  rightsholders: Author[];
  creators: Author[];
  agreementId?: number;
  validFrom?: string;
  validTo?: string;
}

export interface Subject {
  id: string;
  name: string;
}

export interface ListingPageType {
  listingPage: {
    subjects: Subject[];
    tags: string[];
  };
}

export interface VisualElementType {
  resource: string;
  resourceId: string;
  title: string;
  url: string;
  alt: string;
  lowerRightX: number;
  lowerRightY: number;
  upperLeftX: number;
  upperLeftY: number;
  focalX: number;
  focalY: number;
  image: {
    imageUrl: string;
    contentType: string;
  };
  oembed: {
    title: string;
    html: string;
    fullscreen: boolean;
  };
  copyright?: Copyright;
}

export interface Filter {
  main: string[];
  sub: string[];
}

export interface ListItem {
  id: string;
  name: string;
  description: string;
  category: {
    title: string;
    value: string;
  };
  filters: string[];
  image?: string;
  subjectIds?: string[];
}

export interface Concept {
  id: string;
  title: string;
  content: string;
  tags: string[];
  metaImage: {
    url: string;
    alt: string;
  };
}

export interface ConceptSearch {
  conceptSearch: {
    totalCount: number;
    concepts: Concept[];
  };
}
