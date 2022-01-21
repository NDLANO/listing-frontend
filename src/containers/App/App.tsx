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
import {
  Route,
  RouteComponentProps,
  Switch,
  useHistory,
} from 'react-router-dom';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { PageContainer, Spinner } from '@ndla/ui';

import { useTranslation } from 'react-i18next';

import { useApolloClient } from '@apollo/client';
import ListingPage from '../ListingPage/ListingPage';
import ConceptPage from '../../components/Concept';
import { Matomo } from '../../components/Matomo';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { initializeI18n } from '../../i18n';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const App = () => {
  const { t, i18n } = useTranslation();
  const client = useApolloClient();
  const history = useHistory();
  initializeI18n(i18n, client, history);

  if (!i18n.isInitialized) {
    return <Spinner />;
  }

  return (
    <PageContainer>
      <StyledPageWrapper>
        <Helmet
          title="NDLA"
          meta={[{ name: 'description', content: t('meta.description') }]}
        />
        <Switch>
          <Route
            exact
            path="/"
            component={(routeProps: RouteComponentProps) => (
              <ListingPage location={routeProps.location} isOembed={false} />
            )}
          />
          <Route
            path="/concepts/:conceptId/:selectedLanguage?"
            component={(
              routeProps: RouteComponentProps<{
                conceptId: string;
                selectedLanguage: string;
              }>,
            ) => (
              <ConceptPage
                conceptId={routeProps.match.params.conceptId}
                inModal={false}
                language={
                  routeProps.match.params.selectedLanguage || i18n.language
                }
              />
            )}
          />
          <Route
            path="/listing"
            component={(routeProps: RouteComponentProps) => (
              <ListingPage isOembed={true} location={routeProps.location} />
            )}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </StyledPageWrapper>
      <Matomo />
    </PageContainer>
  );
};

export default App;
