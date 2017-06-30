/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import defined from 'defined';
import config from '../config';


const apiBaseUrl = window.config.ndlaApiUrl;

export { apiBaseUrl };

export function headerWithAccessToken(token) {
  return { Authorization: `Bearer ${token}` };
}

export function apiResourceUrl(path) {
  return apiBaseUrl + path;
}

export function ndlaFrontendUrl(path) {
  return config.ndlaFrontendDomain + path;
}

export function createErrorPayload(status, message, json) {
  return Object.assign(new Error(message), { status, json });
}

export function resolveJsonOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve() : resolve(res.json());
    }
    return res.json()
      .then(json => createErrorPayload(res.status, defined(json.message, res.statusText), json))
      .catch(reject);
  });
}
