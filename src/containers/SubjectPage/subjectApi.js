/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import fetch from 'isomorphic-fetch';
import { resolveJsonOrRejectWithError, apiResourceUrl } from '../../util/apiHelpers';

const converterBaseUrl = apiResourceUrl('/subject-converter/raw');
const baseUrl = apiResourceUrl('/subject-api/v1/subjects');

export const fetchSubject = (id, locale) => {
    console.log("subjectApi.fetchSubject id:", id.payload );
    const sub = JSON.parse(`{"id": "${id.payload}", "title": "no ${id.payload} Subject/Fag Tittle for ${locale}"}`);
    console.log("subjectApi returns subject: ", sub);
    return sub;
};

export const fetchSubjects = ids => fetch(`${baseUrl}?ids=${ids.join(',')}`).then(resolveJsonOrRejectWithError);
