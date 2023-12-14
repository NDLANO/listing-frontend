/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import contentSecurityPolicy from './contentSecurityPolicy';
import config from '../config';
import { httpStatus } from '../constants';
import handleError from '../util/handleError';

global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DISABLE_SSR__ = config.disableSSR; // Disables server side rendering

const defaultRoute = require('./routes/defaultRoute').defaultRoute;
const oembedRoute = require('./routes/oembedRoute').oembedRoute;
const app = express();

const allowedBodyContentTypes = [
  'application/json',
  'application/x-www-form-urlencoded',
];

const ndlaMiddleware = [
  express.static(process.env.RAZZLE_PUBLIC_DIR, {
    maxAge: 1000 * 60 * 60 * 24 * 365, // One year
  }),

  bodyParser.urlencoded({ extended: true }),
  bodyParser.json({
    type: req => allowedBodyContentTypes.includes(req.headers['content-type']),
  }),
  helmet({
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
    contentSecurityPolicy,
  }),
];

function sendResponse(res, data, status = httpStatus.ok) {
  if (
    status === httpStatus.movedPermanently ||
    status === httpStatus.temporaryRedirect
  ) {
    res.writeHead(status, data);
    res.end();
  } else if (res.getHeader('Content-Type') === 'application/json') {
    res.status(status).json(data);
  } else {
    res.status(status).send(data);
  }
}

async function handleRequest(req, res, route) {
  try {
    const { data, status } = await route(req);
    sendResponse(res, data, status);
  } catch (err) {
    handleError(err);
  }
}

if (!config.isVercel) {
  app.use(compression());
}
app.use(ndlaMiddleware);

app.get('/favicon.ico');
app.get('/static/*');

app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

app.get('/health', (req, res) => {
  res
    .status(httpStatus.ok)
    .json({ status: httpStatus.ok, text: 'Health check ok' });
});

app.get('/oembed', ndlaMiddleware, async (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  handleRequest(req, res, oembedRoute);
});

app.get('*', (req, res) => {
  defaultRoute(req, res);
});

export default app;
