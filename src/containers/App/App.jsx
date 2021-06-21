/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// import before all other imports component to make sure it is loaded before any emotion stuff.
import '../../style/index.css';

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { PageContainer } from '@ndla/ui';
import { useTranslation } from 'react-i18next';
import { getLocale } from '../Locale/localeSelectors';
import ListingPage from '../ListingPage/ListingPage';
import ConceptPage from '../../components/Concept';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const App = ({ locale }) => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <StyledPageWrapper>
        <Helmet
          title="NDLA"
          meta={[{ name: 'description', content: t('meta.description') }]}
        />

        <Switch>
          <Route
            path="/"
            exact
            component={routeProps => (
              <ListingPage
                locale={locale}
                location={routeProps.location}
                isOembed={false}
              />
            )}
          />
          <Route
            path="/concepts/:conceptId/:selectedLanguage?"
            component={routeProps => (
              <ConceptPage
                conceptId={routeProps.match.params.conceptId}
                inModal={false}
                language={routeProps.match.params.selectedLanguage || locale}
              />
            )}
          />
          <Route
            path="/listing"
            component={routeProps => (
              <ListingPage
                isOembed={true}
                locale={locale}
                location={routeProps.location}
              />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </StyledPageWrapper>
    </PageContainer>
  );
};

App.propTypes = {
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps)(App);
