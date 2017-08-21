/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl, fetchWithAccessToken } from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/listing-api/v1/listing');
const baseOembedUrl = apiResourceUrl('/oembed-proxy/v1/oembed');

export const fetchListingByTheme = (locale, theme) => fetchWithAccessToken(`${baseListingUrl}/theme/${theme}`).then(resolveJsonOrRejectWithError);

export const fetchOembed = (url) => fetchWithAccessToken(`${baseOembedUrl}/?url=${encodeURI(url)}`).then(resolveJsonOrRejectWithError);