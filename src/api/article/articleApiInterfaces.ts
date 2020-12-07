/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Copyright, MetaImage, Title } from '../../interfaces';

export interface ArticleSearchSummaryApiType {
  id: number;
  title: Title;
  visualElement?: {
    visualElement: string;
    language: string;
  };
  introduction?: {
    introduction: string;
    language: string;
  };
  metaImage?: MetaImage;
  url: string;
  license: string;
  articleType: string;
  lastUpdated: string;
  supportedLanguages: string[];
  grepCodes: string[];
}

export interface ArticleSearchResult {
  totalCount: number;
  page?: number;
  pageSize: number;
  language: string;
  results: ArticleSearchSummaryApiType[];
}

export interface ArticleApiType {
  id: number;
  revision: number;
  status: {
    status: string;
    other: string[];
  };
  title: Title;
  content: {
    content: string;
    language: string;
  };
  copyright: Copyright;
  tags: {
    tags: string[];
    language: string;
  };
  requiredLibraries: [
    {
      mediaType: string;
      name: string;
      url: string;
    },
  ];
  visualElement?: {
    visualElement: string;
    language: string;
  };
  metaImage?: MetaImage;
  introduction?: {
    introduction: string;
    language: string;
  };
  metaDescription: {
    metaDescription: string;
    language: string;
  };
  created: string;
  updated: string;
  updatedBy: string;
  published: string;
  articleType: string;
  supportedLanguages: string[];
  grepCodes: string[];
}
