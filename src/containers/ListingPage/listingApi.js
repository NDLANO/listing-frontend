/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl, fetchWithAccessToken } from '../../util/apiHelpers';

const baseUrl = apiResourceUrl('/listing-api/v1/listing');

export const fetchListing = (locale, page = 1) => fetchWithAccessToken(`${baseUrl}?page=${page}`).then(resolveJsonOrRejectWithError);
