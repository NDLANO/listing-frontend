/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { PageContainer } from 'ndla-ui';
import { injectT } from 'ndla-i18n';

import Masthead from '../Masthead';
import Footer from './components/Footer';
import { getLocale } from '../Locale/localeSelectors';
import ListingPage from '../ListingPage/ListingPage';
import ThemePage from "../ThemePage/ThemePage";
import * as actions from '../Subject/subjectActions';

export class App extends React.Component {
  getChildContext() {
    return {
      locale: this.props.locale,
    };
  }

  componentDidMount() {
    this.props.fetchSubjects();  
  }

  render() {
    const { t } = this.props;
    return (
      <PageContainer>
        <Helmet
          title="NDLA"
          meta={[
            { name: 'description', content: t('meta.description') },
          ]}
        />

        <Masthead t={t} />

        <Switch>
          <Route path="/:listingId" component={ListingPage}/>
          <Route path="/" component={ThemePage}/>
        </Switch>
        <Footer t={t} />
      </PageContainer>
    );
  }
}

App.propTypes = {
  locale: PropTypes.string.isRequired,
  fetchSubjects: PropTypes.func.isRequired
};

App.childContextTypes = {
  locale: PropTypes.string,
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

const mapDispatchToProps = {
  fetchSubjects: actions.fetchSubjects,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(injectT(App)));
