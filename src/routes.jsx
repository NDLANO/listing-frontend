/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { Route, IndexRoute } from 'react-router';

import WelcomePage from './containers/WelcomePage/WelcomePage';
import App from './containers/App/App';
import ArticlePage from './containers/ArticlePage/ArticlePage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';

export function toArticle(articleId) {
  return `/article/${articleId}`;
}

export default function () {
  return (
    <Route path="/" component={App}>
      <IndexRoute component={WelcomePage} />
      <Route path="article/:articleId(/)" component={ArticlePage} />
      <Route path="*" status={404} component={NotFoundPage} />
    </Route>
  );
}
