/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import { mapConceptToListItem } from '../../util/listingHelpers';
import ListView from '@ndla/listview';
import { OneColumn } from 'ndla-ui';
import * as actions from './listingActions';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';

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
    const { fetchListing, match: { params } } = this.props;
    fetchListing(params.listingId);
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
        <Helmet title={'NDLA Utlisting'}/>
        <div className="flex-container">
          <ListView
            items={listings.map(concept => mapConceptToListItem(concept))}
            viewStyle={this.state.viewType}
            onSelectItem={() => {}}
            disableViewOption
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
