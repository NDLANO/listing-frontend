/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { OneColumn } from '@ndla/ui';
import ListingPage from '../../components/Listing/ListingPage';

const ListingRoute = ({ match }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <OneColumn>
        <Switch>
          <Route
            path={`${match.url}/:listingFilter/:selectedLanguage?`}
            render={routeProps => <ListingPage />}
          />
        </Switch>
      </OneColumn>
    </div>
  );
};

ListingRoute.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
};

export default ListingRoute;
