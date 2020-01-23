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
import ListView, { activeAlphabet } from '@ndla/listview';
import { OneColumn } from 'ndla-ui';

import { mapConceptToListItem } from '../../util/listingHelpers';
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
    this.handleChangedViewStyle = this.handleChangedViewStyle.bind(this);
  }

  componentDidMount() {
    this.props.fetchListing();
  }

  onViewTypeChange(type) {
    this.setState({ viewType: type });
  }

  onSortChange(event) {
    this.setState({ sortType: event.target.value });
  }

  handleChangedViewStyle({ viewType }) {
    this.setState(
      viewType
    )
  }

  render() {
    const { listings } = this.props;
    if (!listings) {
      return null;
    }

    const listItems = listings.map(concept => mapConceptToListItem(concept));

    return (
      <OneColumn>
        <Helmet title={'NDLA Utlisting'}/>
        <div className="flex-container">
          <ListView
            items={listItems}
            alphabet={activeAlphabet(listItems)}
            viewStyle={this.state.viewType}
            onSelectItem={() => {}}
            onChangedViewStyle={this.handleChangedViewStyle}
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
