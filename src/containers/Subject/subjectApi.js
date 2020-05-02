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
} from '../../util/apiHelpers';

const baseSubjectUrl = apiResourceUrl('/concept-api/v1/concepts/subjects/');
const baseTaxonomyUrl = apiResourceUrl('/taxonomy/v1/subjects/');

export const fetchSubjectIds = () =>
  fetch(baseSubjectUrl).then(resolveJsonOrRejectWithError);
export const fetchSubject = id => fetch(baseTaxonomyUrl + id).then(resolveJsonOrRejectWithError);
