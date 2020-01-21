/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl } from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/concept-api/v1/concepts');
const baseOembedUrl = apiResourceUrl('/oembed-proxy/v1/oembed');

export const fetchListing = (subjectIds, pageSize) => fetch(`${baseListingUrl}?subjectIds=${subjectIds.toString()}&page-size=${pageSize}`).then(resolveJsonOrRejectWithError);
export const fetchOembed = (url) => fetch(`${baseOembedUrl}/?url=${encodeURI(url)}`).then(resolveJsonOrRejectWithError);