/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl } from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/listing-api/v1/listing'); // concept
const baseOembedUrl = apiResourceUrl('/oembed-proxy/v1/oembed');

export const fetchListingByTheme = (locale, theme) => fetch(`${baseListingUrl}/theme/${theme}`).then(resolveJsonOrRejectWithError);
export const fetchOembed = (url) => fetch(`${baseOembedUrl}/?url=${encodeURI(url)}`).then(resolveJsonOrRejectWithError);