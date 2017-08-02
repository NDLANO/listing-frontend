/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes, Component } from 'react';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { OneColumn } from 'ndla-ui';
import * as actions from './listingActions';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';
import Listing from './components/Listing';

class ListingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      sortType: 'title_asc',
      viewType: 'grid',
    };
    this.onViewTypeChange = this.onViewTypeChange.bind(this);
    this.onSortChange = this.onSortChange.bind(this);
  }

  componentWillMount() {
    const { fetchListingByTheme, match: { params } } = this.props;
    fetchListingByTheme(params.listingId);
  }

  onViewTypeChange(type) {
    this.setState({ viewType: type });
  }

  onSortChange(event) {
    this.setState({ sortType: event.target.value });
  }


  render() {
    const { listings } = this.props;
    if (!listings) {
      return null;
    }
    return (
      <OneColumn>
        <Helmet title={'NDLA Utlisting'} />
        <div className="flex-container">
          <Listing
            listings={listings}
            viewType={this.state.viewType}
            sortType={this.state.sortType}
            onViewTypeChange={this.onViewTypeChange}
            onSortChange={this.onSortChange}
          />
        </div>
      </OneColumn>
    );
  }
}


ListingPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string.isRequired,
  fetchListingByTheme: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchListingByTheme: actions.fetchListing,
};

const mapStateToProps = state => ({
  listings: state.listings,
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
