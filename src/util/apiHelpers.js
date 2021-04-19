/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import defined from 'defined';
import { ApolloClient, ApolloLink, InMemoryCache } from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import handleError from './handleError';
import config from '../config';
import { default as createFetch } from './fetch';

export const fetch = createFetch;

const __CLIENT__ = process.env.BUILD_TARGET === 'client'; //eslint-disable-line

const NDLA_API_URL = global.__SERVER__
  ? config.ndlaApiUrl
  : window.config.ndlaApiUrl;
const NDLA_API_KEY = global.__SERVER__
  ? config.ndlaApiKey
  : window.config.ndlaApiKey;

if (process.env.NODE_ENV === 'unittest') {
  global.__SERVER__ = false; //eslint-disable-line
}

export const defaultApiKey = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'ndlatestapikey';
  }

  return NDLA_API_KEY;
})();

const apiBaseUrl = (() => {
  if (process.env.NODE_ENV === 'unittest') {
    return 'http://ndla-api';
  }
  return NDLA_API_URL;
})();

export { apiBaseUrl };

export function apiResourceUrl(path) {
  return apiBaseUrl + path;
}

export function createErrorPayload(status, message, json) {
  return Object.assign(new Error(message), { status, json });
}

export function resolveJsonOrRejectWithError(res) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve() : resolve(res.json());
    }
    res
      .json()
      .then(json => {
        reject(
          createErrorPayload(
            res.status,
            defined(json.message, res.statusText),
            json,
          ),
        );
      })
      .catch(reject);
  });
}

const uri = (() => {
  if (config.localGraphQLApi) {
    return 'http://localhost:4000/graphql-api/graphql';
  }
  return apiResourceUrl('/graphql-api/graphql');
})();

const initialConceptResult = {
  totalCount: 0,
  concepts: [],
};
const typePolicies = {
  Query: {
    fields: {
      conceptSearch: {
        keyArgs: ['query', 'subjects'],
        merge(existing = initialConceptResult, incoming) {
          console.log(incoming);
          return {
            totalCount: incoming.totalCount,
            concepts: [...existing.concepts, ...incoming.concepts],
          };
        },
      },
    },
  },
};

export const createApolloClient = (language = 'nb') => {
  const headersLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      'Accept-Language': language,
    },
  }));

  const cache = __CLIENT__
    ? new InMemoryCache({ typePolicies }).restore(window.DATA.apolloState)
    : new InMemoryCache({ typePolicies });

  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors) {
          graphQLErrors.map(({ message, locations, path }) =>
            handleError(
              `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            ),
          );
        }
        if (networkError) {
          handleError(`[Network error]: ${networkError}`, {
            clientTime: new Date().getTime(),
          });
        }
      }),
      headersLink,
      new BatchHttpLink({
        uri,
        fetch: createFetch,
      }),
    ]),
    cache,
  });

  return client;
};
