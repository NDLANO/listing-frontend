/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import locale from './containers/Locale/localeReducer';
import articles from './containers/ArticlePage/articlesReducer';

const rootReducers = combineReducers({
  articles,
  locale,
  routing: routerReducer,
});

export default rootReducers;
