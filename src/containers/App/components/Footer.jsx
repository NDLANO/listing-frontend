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
import styled from '@emotion/styled';
import { injectT } from '@ndla/i18n';
import { Footer, FooterText, EditorName } from '@ndla/ui';

import { getLocale } from '../../Locale/localeSelectors';

const StyledFooterWrapper = styled.div`
  margin-top: 52px;
`;

const FooterWrapper = ({ t, locale }) => {
  return (
    <StyledFooterWrapper>
      <Footer lang={locale}>
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
  locale: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps)(injectT(FooterWrapper));
