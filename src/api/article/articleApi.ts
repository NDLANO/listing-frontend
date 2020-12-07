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
import { ArticleApiType } from './articleApiInterfaces';

const baseArticleUrl = apiResourceUrl('/article-api/v2/articles');

export const fetchArticle = (
  articleId: number,
  language: string,
): Promise<ArticleApiType> =>
  fetch(
    `${baseArticleUrl}/${articleId}?language=${language}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);
