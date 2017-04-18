/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';

import { injectT } from '../../../i18n';
import { mapLabels } from '../../../util/listingHelpers';
import { CoverShape } from '../../../shapes';
import ToggleFilterChoices from './ToggleFilterChoices';
import CoverList from './CoverList';
import CoverGrid from './CoverGrid';
import CoverCompact from './CoverCompact';

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
    };
    this.onChoiceChange = this.onChoiceChange.bind(this);
  }


  onChoiceChange(event, choice) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    const choicesMade = this.state.selectedFilters;

    if (value) {
      this.setState({ selectedFilters: this.state.selectedFilters.concat(choice) });
    } else {
      const reduced = choicesMade.filter(c => c !== choice);
      this.setState({ selectedFilters: reduced });
    }
  }

  render() {
    const { listings, viewType } = this.props;

    function isSelected(selectedFilters, choices) {
      if (choices === undefined) {
        return false;
      }
      return selectedFilters.find(wanted => choices.includes(wanted));
    }

    const theWantedListings = () => {
      if (this.state.selectedFilters.length > 0) {
        return listings.filter(cover => isSelected(this.state.selectedFilters, cover.filterChoices));
      }
      return listings;
    };

    const renderGivenViewType = () => {
      if (viewType === 'grid') {
        return (
          <div className="main-content">
            <CoverGrid listings={theWantedListings()} />
          </div>
        );
      }
      if (viewType === 'list') {
        return (
          <div className="main-content">
            <CoverList listings={theWantedListings()} />
          </div>
        );
      }
      if (viewType === 'compact') {
        return (
          <div className="main-content">
            <CoverCompact listings={theWantedListings()} />
          </div>
        );
      }

      // Use the grid view as a default fallthrough in case viewType is not set.
      return (
        <div className="main-content">
          <CoverGrid listings={theWantedListings()} />
        </div>);
    };

    return (
      <div>
        <ToggleFilterChoices
          filters={mapLabels(listings)}
          onChoiceChange={this.onChoiceChange}
          selectedFilters={this.state.selectedFilters}
        />
        {renderGivenViewType()}
      </div>
    );
  }

}

Listing.propTypes = {
  listings: PropTypes.arrayOf(CoverShape).isRequired,
  viewType: PropTypes.string.isRequired,
  locale: PropTypes.string,
};

export default injectT(Listing);
