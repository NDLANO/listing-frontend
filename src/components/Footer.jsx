/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Footer, FooterText, EditorName } from '@ndla/ui';
import { i18n } from '@ndla/i18n';

const StyledFooterWrapper = styled.div`
  margin-top: 52px;
`;

const FooterWrapper = () => {
  const { t } = useTranslation();
  return (
    <StyledFooterWrapper>
      <Footer lang={i18n.language}>
        <FooterText>
          <EditorName
            title={t('footer.footerEditiorInChief')}
            name="Sigurd Trageton"
          />
          {t('logo.altText')}
        </FooterText>
      </Footer>
    </StyledFooterWrapper>
  );
};

export default FooterWrapper;
