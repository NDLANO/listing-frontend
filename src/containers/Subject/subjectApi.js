/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { resolveJsonOrRejectWithError, apiResourceUrl } from '../../util/apiHelpers';

const baseSubjectUrl = apiResourceUrl('/concept-api/v1/concepts/subjects');

export const fetchSubjects = () => fetch(baseSubjectUrl).then(resolveJsonOrRejectWithError);