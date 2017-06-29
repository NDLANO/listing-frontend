/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';
import { resolveJsonOrRejectWithError, apiResourceUrl, headerWithAccessToken } from '../../util/apiHelpers';

const baseUrl = apiResourceUrl('/listing-api/v1/listing');

export const fetchListing = (locale, token, page = 1) => fetch(`${baseUrl}?page=${page}`, { headers: headerWithAccessToken(token) }).then(resolveJsonOrRejectWithError);
