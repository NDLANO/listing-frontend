/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {injectT} from '@ndla/i18n';
import { Footer, FooterText, EditorName } from '@ndla/ui';

import { useTranslation } from 'react-i18next';

const StyledFooterWrapper = styled.div`
  margin-top: 52px;
`;

const FooterWrapper = () => {
  const {t, i18n} = useTranslation();
  return (
    <StyledFooterWrapper>
      <Footer lang={i18n.language}>
        <FooterText>
          <EditorName
            title={t('footer.footerEditiorInChief')}
            name="Sigurd Trageton"
          />
          {t('footer.footerInfo')}
        </FooterText>
      </Footer>
    </StyledFooterWrapper>
  );
};

FooterWrapper.propTypes = {
  t: PropTypes.func.isRequired,
};

export default injectT(FooterWrapper);
