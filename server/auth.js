/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';

const fetch = require('node-fetch');

const url = 'https://ndla.eu.auth0.com/oauth/token';

const listingFrontendClientId = process.env.NDLA_LISTING_CLIENT_ID;
const listingFrontendClientSecret = process.env.NDLA_LISTING_CLIENT_SECRET;

export const getToken = () =>
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: listingFrontendClientId,
      client_secret: listingFrontendClientSecret,
      audience: 'ndla_system'
    }),
    json: true
  }).then(res => res.json());
