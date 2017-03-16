/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import fetch from "isomorphic-fetch";
import {resolveJsonOrRejectWithError, apiResourceUrl} from "../../util/apiHelpers";

const converterBaseUrl = apiResourceUrl('/listing-converter/raw');
const baseUrl = apiResourceUrl('/listing-api/v1/listings');

function mockListing(id) {
    return JSON.parse(`
    {"title": "Hammer ${id}",
     "description": "kort tekst for ${id}", 
     "coverPhoto": "https://test.api.ndla.no/image-api/v1/raw/skyss_vergrei_plakater_a3-4.jpg?cropStart=200,200&cropEnd=400,400", 
     "articleApiId": 187, 
     "labels": [
       {
        "type": "subject", 
        "labels": ["betongfaget", "murerfaget", "tømrerfaget"]
        },
        {
         "type": "category",
         "labels": ["personlig verktøy"]
        }
     ]
     }`);
}

//Mock data enn så lenge
export const fetchListing = (id, locale) => {
    const mockListings = [1,2,3,4,5,6,7].map(i => mockListing(i+id));
    return mockListings;
}


//TODO - real api calls to backend
// export const fetchListing = (id, locale) => fetch(`${converterBaseUrl}/${locale}/${id}`).then(resolveJsonOrRejectWithError);

// export const fetchListings = ids => fetch(`${baseUrl}?ids=${ids.join(',')}`).then(resolveJsonOrRejectWithError);