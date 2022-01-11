/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';
import {
  resolveJsonOrRejectWithError,
  apiResourceUrl,
} from '../../util/apiHelpers';

const baseConceptUrl = apiResourceUrl('/concept-api/v1/concepts');

export const fetchConcept = (
  conceptId: number,
  language: string,
): Promise<object> =>
  fetch(
    `${baseConceptUrl}/${conceptId}?language=${language}&fallback=true`,
  ).then(resolveJsonOrRejectWithError);
