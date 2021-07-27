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
} from '../../util/apiHelpers';
import { OembedProxyApiType } from './oembedProxyApiInterfaces';

const baseArticleUrl = apiResourceUrl('/oembed-proxy/v1/oembed');

export const fetchOembed = (url: string): Promise<OembedProxyApiType> =>
  fetch(`${baseArticleUrl}/?url=${url}`).then(resolveJsonOrRejectWithError);
