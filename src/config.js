/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const environment = {
  development: {
    isProduction: false,
  },
  production: {
    isProduction: true,
  },
}[process.env.NODE_ENV || 'development'];

const ndlaEnvironment = process.env.NDLA_ENVIRONMENT || 'test';
const apiDomain = () => {
  switch (process.env.NDLA_ENVIRONMENT) {
    case 'local':
      return 'http://proxy.ndla-local';
    case 'prod':
      return 'https://api.ndla.no';
    default:
      return `https://${ndlaEnvironment}.api.ndla.no`;
  }
};

const ndlaFrontendDomain = () => {
  switch (process.env.NDLA_ENVIRONMENT) {
    case 'local':
      return 'http://localhost:30017';
    case 'prod':
      return 'https://listing-frontend.api.ndla.no';
    default:
      return `https://listing-frontend.${ndlaEnvironment}.api.ndla.no`;
  }
};


module.exports = Object.assign({
  host: process.env.NDLA_FRONTENTD_HOST || 'localhost',
  port: process.env.NDLA_FRONTENTD_PORT || '3000',
  redirectPort: process.env.NDLA_REDIRECT_PORT || '3001',
  googleTagMangerId: process.env.GOOGLE_TAG_MANGER_ID || undefined,
  disableSSR: process.env.DISABLE_SSR || false,
  ndlaApiUrl: process.env.NDLA_API_URL || apiDomain(),
  ndlaApiKey: process.env.NDLA_API_KEY || 'ndlalearningpathfrontend',
  ndlaFrontendDomain: ndlaFrontendDomain(),
}, environment);
