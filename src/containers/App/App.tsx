/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Outlet, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { PageContainer } from '@ndla/ui';

import ConceptPage from '../../components/Concept';
import { Matomo } from '../../components/Matomo';
import ListingPage from '../ListingPage/ListingPage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Layout = () => {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <StyledPageWrapper>
        <Helmet
          title="NDLA"
          meta={[{ name: 'description', content: t('meta.description') }]}
        />
        <Outlet />
      </StyledPageWrapper>
      <Matomo />
    </PageContainer>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route index element={<ListingPage isOembed={false} />} />
      <Route path="concepts/:conceptId" element={<ConceptPage />}>
        <Route path=":selectedLanguage" element={<ConceptPage />} />
      </Route>
      <Route path="/listing" element={<ListingPage isOembed={true} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default App;
