/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl } from '../../util/apiHelpers';

const baseListingUrl = apiResourceUrl('/concept-api/v1/concepts');
const baseTaxonomyUrl = apiResourceUrl('/taxonomy/v1/subjects/')

export const fetchListing = (subjectId, pageSize) => fetch(`${baseListingUrl}?subjectIds=${subjectId}&page-size=${pageSize}`).then(resolveJsonOrRejectWithError);
export const fetchTags = (subjectId) => fetch(`${baseListingUrl}/tags/?subjectIds=${subjectId}`)
    .then(res => res.ok ? res.json() : {});
export const fetchSubject = (subjectId) => fetch(baseTaxonomyUrl + subjectId)
    .then(res => res.ok ? res.json() : subjectId);