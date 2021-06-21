/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { Footer, FooterText, EditorName } from '@ndla/ui';

import { getLocale } from '../containers/Locale/localeSelectors';

const StyledFooterWrapper = styled.div`
  margin-top: 52px;
`;

const FooterWrapper = ({ locale }) => {
  const { t } = useTranslation();
  return (
    <StyledFooterWrapper>
      <Footer lang={locale}>
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

FooterWrapper.propTypes = {
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps)(FooterWrapper);
