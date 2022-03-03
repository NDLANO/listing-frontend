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
import { Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import Helmet from 'react-helmet';
import { PageContainer, Spinner } from '@ndla/ui';

import { useTranslation } from 'react-i18next';

import { useApolloClient } from '@apollo/client';
import ListingPage from '../ListingPage/ListingPage';
import { ConceptPageWrapper } from '../../components/Concept/ConceptPage';
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
  initializeI18n(i18n, client);

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
        <Routes>
          <Route path="/" element={<ListingPage isOembed={false} />}>
            <Route
              path="concepts/:conceptId/:selectedLanguage?"
              element={<ConceptPageWrapper inModal={false} />}
            />
            <Route path="listing" element={<ListingPage isOembed={true} />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </StyledPageWrapper>
      <Matomo />
    </PageContainer>
  );
};

export default App;
