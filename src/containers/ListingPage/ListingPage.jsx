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
// import { mapLabels } from '../../util/listingHelpers';
// import ToggleFilterChoices from './components/ToggleFilterChoices';


class ListingPage extends Component {

  // constructor(props) {
  //   super(props);
  //   const { listings } = this.props;
  //   console.log('inside the constructor', listings);
  //   this.state = {
  //     listings: [],
  //     filtersOn: false, //Flagg for å indikere om det er endrnger gitt filterchanges ... mulig er unødvendig
  //   };
  // }

  componentWillMount() {
    const { fetchListing, params: { listingId } } = this.props;
    fetchListing(listingId);
  }


  render() {
    const { listings } = this.props;
    if (!listings) {
      return null;
    }

    // TODOs
    // * Rename CoverList til CoverList
    // * Lage en ny component som både ToggleFilterChoices og CoverList er i
    // * Bruk state til nye top kompnent til å styre filter?

    return (
      <OneColumn>
        <Helmet title={'NDLA Utlisting'} />
        <h2>NB! WORK IN PROGRESS - ONLY MOCK DATA</h2>
        <ViewBar />
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
  // listing: CoverShape,
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
