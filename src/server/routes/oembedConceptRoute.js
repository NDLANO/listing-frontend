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

const getHTMLandTitle = (id, lang) => {
  console.log('id : lang', id, lang);
  const concept = fetchConcept(id, lang);
  return {
    title: concept.title?.title,
    html: `<iframe aria-label="${concept.title?.title}" src="${config.ndlaListingFrontendDomain}?concept=${id}&removeRelatedContent=true" frameborder="0" allowFullscreen="" />`,
  };
};

const getConceptId = url => {
  if (isValidListeUrl(url)) {
    const idAndLang = url.split('/concepts/')[1];
    const [id, lang] = idAndLang.split('/');
    return [id, lang];
  } else {
    return [undefined, undefined];
  }
};

export async function oembedConceptRoute(req) {
  const { url } = req.query;
  if (!url) {
    return {
      status: BAD_REQUEST,
      data: 'Bad request. Missing url param.',
    };
  }

  const [id, lang] = getConceptId(url);
  if (!id) {
    return {
      status: BAD_REQUEST,
      data: 'Bad request. Invalid url.',
    };
  }

  try {
    const { html, title } = getHTMLandTitle(id, lang);
    return getOembedObject(req, title, html);
  } catch (error) {
    //handleError(error);
    console.error(error);
    const status = error.status || INTERNAL_SERVER_ERROR;
    return {
      status,
      data: 'Internal server error',
    };
  }
}
