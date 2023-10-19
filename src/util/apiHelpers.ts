/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  ApolloClient,
  ApolloLink,
  FieldFunctionOptions,
  InMemoryCache,
} from '@apollo/client';
import { BatchHttpLink } from '@apollo/client/link/batch-http';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import fetch from 'node-fetch';
import handleError from './handleError';
import config from '../config';

const __CLIENT__ = process.env.BUILD_TARGET === 'client'; //eslint-disable-line

declare global {
  let __SERVER__: boolean;
}
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

export function apiResourceUrl(path: string) {
  return apiBaseUrl + path;
}

export function createErrorPayload(
  status: number,
  message: string,
  json: Record<string, any>,
) {
  return Object.assign(new Error(message), { status, json });
}

export function resolveJsonOrRejectWithError(res: Response) {
  return new Promise((resolve, reject) => {
    if (res.ok) {
      return res.status === 204 ? resolve({}) : resolve(res.json());
    }
    res
      .json()
      .then(json => {
        reject(
          createErrorPayload(res.status, json.message ?? res.statusText, json),
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

interface ConceptResult {
  totalCount: number;
  concepts: any[];
  language: string;
}

const initialConceptResult: ConceptResult = {
  totalCount: 0,
  concepts: [],
  language: '',
};

const typePolicies = {
  Query: {
    fields: {
      conceptSearch: {
        keyArgs: ['query', 'subjects', 'tags'],
        merge(
          existing = initialConceptResult,
          incoming: ConceptResult,
          { args }: FieldFunctionOptions,
        ) {
          return {
            language: args?.language,
            totalCount: incoming.totalCount,
            concepts: [...existing.concepts, ...incoming.concepts],
          };
        },
      },
    },
  },
};

export const createApolloClient = (language = 'nb') => {
  const cache = __CLIENT__
    ? new InMemoryCache({ typePolicies }).restore(window.DATA.apolloState)
    : new InMemoryCache({ typePolicies });

  const client = new ApolloClient({
    ssrMode: true,
    link: createApolloLinks(language),
    cache,
  });

  return client;
};

export const createApolloLinks = (lang: string) => {
  const headersLink = setContext(async (_, { headers }) => ({
    headers: {
      ...headers,
      'Accept-Language': lang,
    },
  }));
  return ApolloLink.from([
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
      fetch,
    }),
  ]);
};
