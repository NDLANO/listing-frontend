/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import config from '../../config';
import { fetchConcept } from '../../containers/ListingPage/listingApi';
import { isValidListeUrl } from '../../util/listingHelpers';
import handleError from '../../util/handleError';

const getOembedObject = (req, title, html) => {
  return {
    data: {
      type: 'rich',
      version: '1.0', // oEmbed version
      height: req.query.height || 800,
      width: req.query.width || 800,
      title,
      html,
    },
  };
};

const getHTMLandTitle = async id => {
  const concept = await fetchConcept(id);
  const title = concept.title?.title;
  return {
    title: title,
    html: `<iframe aria-label="${title}" src="${config.ndlaListingFrontendDomain}/concepts/${id}" frameborder="0" allowFullscreen="" />`,
  };
};

const getConceptId = url =>
  isValidListeUrl(url) ? url.split('=')[1] : undefined;

export async function oembedConceptRoute(req) {
  const { url } = req.query;
  if (!url) {
    return {
      status: BAD_REQUEST,
      data: 'Bad request. Missing url param.',
    };
  }

  const id = getConceptId(url);
  if (!id) {
    return {
      status: BAD_REQUEST,
      data: 'Bad request. Invalid url.',
    };
  }

  try {
    const { html, title } = await getHTMLandTitle(id);
    return getOembedObject(req, title, html);
  } catch (error) {
    handleError(error);
    const status = error.status || INTERNAL_SERVER_ERROR;
    return {
      status,
      data: 'Internal server error',
    };
  }
}
