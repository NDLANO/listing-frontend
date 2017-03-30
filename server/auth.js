/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import 'isomorphic-fetch';
import btoa from 'btoa';
import config from '../src/config';
import { resolveJsonOrRejectWithError } from '../src/util/apiHelpers';

const NDLA_API_URL = config.ndlaApiUrl;

const url = `${NDLA_API_URL}/auth/tokens`;

const b64EncodeUnicode = str => btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)));

export const getToken = () => {
  console.log('auth getToken fetch ', url);
  const authHead = `Basic ${b64EncodeUnicode(`${process.env.NDLA_LISTING_CLIENT_ID}:${process.env.NDLA_LISTING_CLIENT_SECRET}`)}`;
  console.log('authHead: ', authHead);
  return fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    Authorization: authHead,
  },
  body: 'grant_type=client_credentials',
}).then(res => {
  const json = res.json();
  console.log('res.json', json);
  const result = res;
    let wat =  resolveJsonOrRejectWithError(result);
    console.log('wat resolveJsonOrRejectWithError', wat);
  console.log('get token res', result);
  console.log('##### get token res.json', result.json());
  return json;
  }); };
