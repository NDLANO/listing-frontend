/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// import before all other imports component to make sure it is loaded before any emotion stuff.
import '../../style/index.css';
import config from '../../config';
import { isListeParamUrl, isListePathUrl } from '../../util/listingHelpers';
import handleError from '../../util/handleError';
import { createApolloClient } from '../../util/apiHelpers';
import { httpStatus } from '../../constants';
import { conceptTitleQuery } from '../../queries';

const getOembedObject = (req, title, html) => {
  return {
    data: {
      type: 'rich',
      providerName: 'NDLA Liste',
      version: '1.0', // oEmbed version
      height: req.query.height || 600,
      width: req.query.width || 800,
      title,
      html,
    },
  };
};

let apolloClient;

const getApolloClient = () => {
  if (apolloClient) {
    return apolloClient;
  } else {
    apolloClient = createApolloClient();
    return apolloClient;
  }
};

const getConceptHTMLandTitle = async id => {
  const client = getApolloClient();
  const concept = await client.query({
    query: conceptTitleQuery,
    variables: {
      id,
    },
  });
  const title = concept.data.detailedConcept?.title;
  return {
    title: title,
    html: `<iframe aria-label="${title}" src="${config.ndlaListingFrontendDomain}/concepts/${id}" frameborder="0" allowFullscreen="" />`,
  };
};

const getConceptId = url => {
  const decodedUrl = decodeURIComponent(url);
  if (isListeParamUrl(decodedUrl)) {
    return decodedUrl.split('=').pop();
  }
  if (isListePathUrl(decodedUrl)) {
    return decodedUrl.split('/').pop();
  }
  return undefined;
};

const oembedConceptRoute = async (req, url) => {
  const id = await getConceptId(url);
  if (!id) {
    return {
      status: httpStatus.badRequest,
      data: 'Bad request. Invalid url.',
    };
  }

  try {
    const { html, title } = await getConceptHTMLandTitle(id);
    return getOembedObject(req, title, html);
  } catch (error) {
    handleError(error);
    const status = error.status || httpStatus.internalServerError;
    return {
      status,
      data: 'Internal server error',
    };
  }
};

const oembedListingRoute = (req, url) => {
  const decodedUrl = decodeURIComponent(url);
  // This currently only supports one filter
  const filter = decodedUrl.split('filters[]=')[1];
  const html = `<iframe aria-label="${'decodedTitle'}" src="${
    config.ndlaListingFrontendDomain
  }/listing?filters[]=${filter}" frameborder="0" allowFullscreen="" />`;

  return getOembedObject(req, filter, html);
};

const oembedSubjectsRoute = (req, url) => {
  const decodedUrl = decodeURIComponent(url);
  // This currently only supports one subject
  const subjects = decodedUrl.split('subjects[]=')[1];
  const html = `<iframe aria-label="${'decodedTitle'}" src="${
    config.ndlaListingFrontendDomain
  }/listing?subjects[]=${subjects}" frameborder="0" allowFullscreen="" />`;

  return getOembedObject(req, subjects, html);
};

export async function oembedRoute(req) {
  const { url } = req.query;

  if (!url) {
    return {
      status: httpStatus.badRequest,
      data: 'Bad request. Missing url param.',
    };
  }

  if (url.includes('concept')) {
    return await oembedConceptRoute(req, url);
  } else if (url.includes('filters')) {
    return oembedListingRoute(req, url);
  } else if (url.includes('subjects')) {
    return oembedSubjectsRoute(req, url);
  } else {
    return {
      status: httpStatus.badRequest,
      data: 'Bad request.',
    };
  }
}
