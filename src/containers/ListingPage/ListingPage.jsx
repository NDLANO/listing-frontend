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

class ListingPage extends Component {

  componentWillMount() {
    const { fetchListing, params: { listingId } } = this.props;
    fetchListing(listingId);
  }

  render() {
    const { listings, locale } = this.props;
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

function mapLabels(docketList) {
  const myMap = new Map();
  let allLabels = [];

    // Make a map witch has flattend all the labels arrays of all the dockets
  docketList.forEach((docket) => {
    docket.labels.forEach((l) => {
      function theType() {
        switch (l.type) {
          case undefined:
            return 'Annet';
          case null:
            return 'Annet';
          default:
            return l.type;
        }
      }
      myMap.set(theType(), [...new Set(myMap.has(theType()) ? myMap.get(theType()).concat(l.labels) : l.labels)]);
    });
  });

    // Flatten the map to an array for listing in the view component
  myMap.forEach((value, key) => {
    allLabels = allLabels.concat([{ type: key, labels: value }]);
  });

  return allLabels;
}

ListingPage.propTypes = {
  params: PropTypes.shape({
    listingId: PropTypes.string.isRequired,
  }).isRequired,
  listing: ListingShape,
  locale: PropTypes.string.isRequired,
  fetchListing: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchListing: actions.fetchListing,
};

const mapStateToProps = (state, ownProps) => {
  const listingId = ownProps.params.listingId;
  return {
    listings: state.listings, // this getListing(listingId)(state) leads to TypeError: Cannot read property 'betongfaget' of undefined Don't know why ...
    locale: getLocale(state),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
