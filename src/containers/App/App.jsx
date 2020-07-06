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
import { injectT } from '@ndla/i18n';

import Footer from './components/Footer';
import { getLocale } from '../Locale/localeSelectors';
import ListingPage from '../ListingPage/ListingPage';

const StyledPageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export class App extends React.Component {
  getChildContext() {
    return {
      locale: this.props.locale,
    };
  }

  render() {
    const { t } = this.props;
    return (
      <PageContainer>
        <StyledPageWrapper>
          <Helmet
            title="NDLA"
            meta={[{ name: 'description', content: t('meta.description') }]}
          />
          <Switch>
            <Route path="/" component={ListingPage} />
          </Switch>
          <Footer t={t} />
        </StyledPageWrapper>
      </PageContainer>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string.isRequired,
};

App.childContextTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps)(injectT(App));
