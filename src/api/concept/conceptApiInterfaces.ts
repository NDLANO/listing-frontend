/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Copyright, MetaImage, Title } from '../../interfaces';

interface ConceptCopyright extends Omit<Copyright, 'license' | 'origin'> {
  license?: {
    license: string;
    description?: string;
    url?: string;
  };
  origin?: string;
}

interface ConceptContent {
  content: string;
  language: string;
}

interface ConceptTags {
  tags: string[];
  language: string;
}

export interface ConceptApiType {
  id: number;
  revision: number;
  title?: Title;
  content?: ConceptContent;
  copyright?: ConceptCopyright;
  source?: string;
  metaImage?: MetaImage;
  tags?: ConceptTags;
  subjectIds?: string[];
  created: string;
  updated: string;
  updatedBy?: string[];
  supportedLanguages: string[];
  articleIds: number[];
  status: {
    current: string;
    other: string[];
  };
  visualElement?: {
    visualElement: string;
    language: string;
  };
}

interface ConceptSummaryApiType {
  id: number;
  title: Title;
  content: ConceptContent;
  metaImage: MetaImage;
  tags?: ConceptTags;
  subjectIds?: string[];
  supportedLanguages: string[];
  lastUpdated: string;
  status: {
    current: string;
    other: string[];
  };
  updatedBy: string[];
}

export interface ConceptSearchResult {
  totalCount: number;
  page?: number;
  pageSize: number;
  language: string;
  results: ConceptSummaryApiType[];
}
