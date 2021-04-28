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

export interface ListingPage {
  conceptPage: {
    subjects: Subject[];
    tags: string[];
  }
}
