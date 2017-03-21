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
import { ListingShape } from '../../shapes';
import Listing from './components/Listing';
import FilterBar from './components/FilterBar';
import FilterChoices from './components/FilterChoices';
import { mapLabels } from '../../util/listingHelpers';


class ListingPage extends Component {

  componentWillMount() {
    const { fetchListing, params: { listingId } } = this.props;
    fetchListing(listingId);
  }

  render() {
    const { listings } = this.props;
    if (!listings) {
      return null;
    }

    return (
      <OneColumn>
        <Helmet title={'NDLA Utlisting'} />
        <h2>NB! WORK IN PROGRESS - ONLY MOCK DATA</h2>
        <FilterBar />
        <FilterChoices filters={mapLabels(listings)} />
        <Listing listings={listings} />
      </OneColumn>
    );
  }
}


ListingPage.propTypes = {
  params: PropTypes.shape({
    listingId: PropTypes.string.isRequired,
  }).isRequired,
  listings: PropTypes.arrayOf(ListingShape),
  listing: ListingShape,
  locale: PropTypes.string.isRequired,
  fetchListing: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchListing: actions.fetchListing,
};

const mapStateToProps = state => ({
  listings: state.listings,
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
