/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { compose, createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './reducers';

import { errorReporter } from './middleware';

export default function configureStore(initialState, history) {
  const middleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();

  const createFinalStore = compose(
    applyMiddleware(sagaMiddleware, errorReporter, middleware),
    /* eslint-disable no-underscore-dangle */
    global.__CLIENT__ && window && window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  )(createStore);

  const store = createFinalStore(rootReducer, initialState);

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  return store;
}
