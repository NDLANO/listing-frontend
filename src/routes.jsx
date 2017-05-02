/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App/App';
import ArticlePage from './containers/ArticlePage/ArticlePage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import ListingPage from './containers/ListingPage/ListingPage';
import SubjectPage from './containers/SubjectPage/SubjectPage';

export function toArticle(articleId) {
  return `/article/${articleId}`;
}

export function toListing(listingId) {
  return `/listing/${listingId}`;
}

export default function () {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={SubjectPage} />
      <Route path="listing(/)" component={SubjectPage} />
      <Route path="listing/:listingId(/)" component={ListingPage} />
      <Route path="article/:articleId(/)" component={ArticlePage} />
      <Route path="*" status={404} component={NotFoundPage} />
    </Route>
  );
}
