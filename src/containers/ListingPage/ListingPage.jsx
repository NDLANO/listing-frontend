/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { OneColumn } from 'ndla-ui';
import * as actions from './listingActions';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';
import Listing from './components/Listing';
import ViewBar from './components/ViewBar';


class ListingPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      viewType: 'grid',
    };
    this.onViewChangeToList = this.onViewChangeToList.bind(this);
    this.onViewChangeToGrid = this.onViewChangeToGrid.bind(this);
  }

  componentWillMount() {
    const { fetchListingByFilter, params: { listingId } } = this.props;
    fetchListingByFilter(listingId);
  }

  onViewChangeToList(event) {
    console.log('you clicked madam?', event);
    this.setState({ viewType: 'list' });
  }

  onViewChangeToGrid(event) {
    console.log('you clicked madam?', event);
    this.setState({ viewType: 'grid' });
  }

  render() {
    const { listings, params: { listingId } } = this.props;
    if (!listings) {
      return null;
    }

    return (
      <OneColumn>
        <Helmet title={'NDLA Utlisting'} />
        <ViewBar
          curentSubject={listingId}
          onViewChangeToList={this.onViewChangeToList}
          onViewChangeToGrid={this.onViewChangeToGrid}
        />
        <Listing listings={listings} />
      </OneColumn>
    );
  }
}


ListingPage.propTypes = {
  params: PropTypes.shape({
    listingId: PropTypes.string.isRequired,
  }).isRequired,
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string.isRequired,
  fetchListingByFilter: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchListingByFilter: actions.fetchListing,
};

const mapStateToProps = state => ({
  listings: state.listings,
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
