/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { injectT } from 'ndla-i18n';

import { mapLabels } from '../../../util/listingHelpers';
import { sortListing } from '../../../util/listingSorter';
import { CoverShape, LabelShape } from '../../../shapes';
import CoverList from './CoverList';
import CoverGrid from './CoverGrid';
import SideBar from './SideBar';
import Oembed from "./Oembed";

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
      oembedHtml: '',
      showOembedArticle: false,
    };
    this.onChoiceChange = this.onChoiceChange.bind(this);
    this.onSubjectButtonClick = this.onSubjectButtonClick.bind(this);
    this.onViewOembed = this.onViewOembed.bind(this);
    this.onBackToListing = this.onBackToListing.bind(this);
  }


  onChoiceChange(event, choice) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.updateSelectedFiltersState(value, choice);
  }

  onSubjectButtonClick(event) {
    const choice = event.target.id;
    const isSelected = (this.state.selectedFilters.indexOf(choice) === -1);
    this.updateSelectedFiltersState(isSelected, choice);
  }

  onViewOembed(html) {
    this.setState({ oembedHtml: html });
    this.setState(prevState => ({ showOembedArticle: !prevState.showOembedArticle }));
  }

  onBackToListing() {
    this.setState({ showOembedArticle: false });
  }

  updateSelectedFiltersState(isSelected, choice) {
    if (isSelected) {
      this.setState({ selectedFilters: this.state.selectedFilters.concat(choice) });
    } else {
      const reduced = this.state.selectedFilters.filter(c => c !== choice);
      this.setState({ selectedFilters: reduced });
    }
  }

  render() {
    const { listings, viewType, sortType, curentSubject, onViewTypeChange, onSortChange } = this.props;
    const { showOembedArticle } = this.state;

    function isSelected(selectedFilters, choices) {
      if (choices === undefined) {
        return false;
      }
      return selectedFilters.find(wanted => choices.includes(wanted));
    }

    const theWantedListings = () => {
      sortListing(sortType, listings);

      if (this.state.selectedFilters.length > 0) {
        return listings.filter(cover => isSelected(this.state.selectedFilters, cover.filterChoices));
      }
      return listings;
    };

    const renderGivenViewType = () => {
      if (viewType === 'grid') {
        return (
          <div className="main-content">
            <CoverGrid
              listings={theWantedListings()}
              onSubjectButtonClick={this.onSubjectButtonClick}
              onViewOembed={this.onViewOembed}
            />
          </div>
        );
      }
      if (viewType === 'list') {
        return (
          <div className="main-content">
            <CoverList
              listings={theWantedListings()}
              onSubjectButtonClick={this.onSubjectButtonClick}
              onViewOembed={this.onViewOembed}
            />
          </div>
        );
      }

      // Use the grid view as a default fallthrough in case viewType is not set.
      return (
        <div className="main-content">
          <CoverGrid
            listings={theWantedListings()}
            onSubjectButtonClick={this.onSubjectButtonClick}
            onViewOembed={this.onViewOembed}
          />
        </div>);
    };


    const article = (
      <div className="oembed-content">
        <Oembed
          url={this.state.oembedHtml}
          onBackToListing={this.onBackToListing}
        />
      </div>
    );

    const listing = (
      <div className="flex-container">
        <SideBar
          curentSubject={curentSubject}
          onViewTypeChange={onViewTypeChange}
          onSortChange={onSortChange}
          filters={mapLabels(listings)}
          selectedFilters={this.state.selectedFilters}
          onChoiceChange={this.onChoiceChange}
        />
        {renderGivenViewType()}
      </div>
    );

    return (<div>
        {showOembedArticle ? article : listing}
      </div>
    );
  }

}

Listing.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  viewType: PropTypes.string.isRequired,
  sortType: PropTypes.string.isRequired,
  locale: PropTypes.string,
  url: PropTypes.string,
  curentSubject: PropTypes.string,
  onViewTypeChange: PropTypes.func,
  onSortChange: PropTypes.func,
  onViewOembed: PropTypes.func,
  onBackToListing: PropTypes.func,
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
  onChoiceChange: PropTypes.func,
  onSubjectButtonClick: PropTypes.func,
  filters: PropTypes.arrayOf(LabelShape),
};

export default injectT(Listing);
