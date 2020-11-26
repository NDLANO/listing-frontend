/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

// import before all other imports component to make sure it is loaded before any emotion stuff.
import '../../style/index.css';

import React, { ReactElement } from 'react';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
// @ts-ignore
import { PageContainer } from '@ndla/ui';
import { injectT, tType } from '@ndla/i18n';

// @ts-ignore
import { getLocale } from '../Locale/localeSelectors';
// @ts-ignore
import ListingPage from '../ListingPage/ListingPage';
// @ts-ignore
import ConceptPage from '../../components/Concept';
// @ts-ignore
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

interface Props {
  locale: string;
}

interface ParamsProps {
  conceptId: string;
  selectedLanguage: string;
}

const App = ({ t, locale }: Props & tType): ReactElement => {
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
            component={(routeProps: RouteComponentProps): ReactElement => (
              <ListingPage
                locale={locale}
                location={routeProps.location}
                isOembed={false}
              />
            )}
          />
          <Route
            path="/concepts/:conceptId/:selectedLanguage?"
            component={(
              routeProps: RouteComponentProps<ParamsProps>,
            ): ReactElement => (
              <ConceptPage
                conceptId={Number(routeProps.match.params.conceptId)}
                inModal={false}
                language={routeProps.match.params.selectedLanguage || locale}
              />
            )}
          />
          <Route
            path="/listing"
            component={(routeProps: RouteComponentProps): ReactElement => (
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

const mapStateToProps = (state: { locale: '' }): { locale: string } => ({
  locale: getLocale(state),
});

export default injectT(connect(mapStateToProps)(App));
