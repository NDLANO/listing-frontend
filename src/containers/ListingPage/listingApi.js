/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl, fetchWithAccessToken } from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/listing-api/v1/listing');
const baseOembedUrl ='https://test.api.ndla.no/oembed-proxy/v1/oembed';

export const fetchListingByTheme = (locale, theme) => fetchWithAccessToken(`${baseListingUrl}/theme/${theme}`).then(resolveJsonOrRejectWithError);

export const fetchOembed = ( url ) => {
  console.log('api fetch oembd', url);
  console.log('api fetch oembd', encodeURIComponent(url));
  const theUrl = `${baseOembedUrl}/?url=${encodeURI(url)}`;
  console.log('theUrl        ', theUrl);
  const url1 = `https://test.api.ndla.no/oembed-proxy/v1/oembed/?url=https%3A%2F%2Fndla.no%2Fnode%2F81538`;
  console.log('hardkodet url1', url1);
  const res = fetchWithAccessToken(`${theUrl}`).then(resolveJsonOrRejectWithError);
  console.log('res:', res);
  return res;
};