/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import {
  addEventListenerForResize,
  updateIFrameDimensions,
  addAsideClickListener,
  removeEventListenerForResize,
  removeAsideClickListener,
} from 'ndla-article-scripts';

import React, { PropTypes, Component } from 'react';

import { injectT } from '../../../i18n';
import { mapLabels } from '../../../util/listingHelpers';
import { CoverShape } from '../../../shapes';
import ToggleFilterChoices from './ToggleFilterChoices';
import CoverList from './CoverList';

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
    };
    this.onChoiceChange = this.onChoiceChange.bind(this);
  }

  componentDidMount() {
    addEventListenerForResize();
    updateIFrameDimensions();
    addAsideClickListener();
  }

  componentWillUnmount() {
    removeEventListenerForResize();
    removeAsideClickListener();
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
    const { listings } = this.props;

    function isSelected(selectedFilters, choices) {
      console.log('selectedFilters', selectedFilters);
      console.log('choices', choices);
      if (choices === undefined) {
        return false;
      }
      return selectedFilters.find(wanted => choices.includes(wanted));
    }

    console.log('listings.filterChoices', listings.filterChoices);
    console.log('this.state.selectedFilters', this.state.selectedFilters);


    const theWantedListings = () => {
      if (this.state.selectedFilters.length > 0) {
        const filterdListings = listings.filter(cover => isSelected(this.state.selectedFilters, cover.filterChoices));
        console.log('%%%% yup have checked choices, so we need to filter that listings list', filterdListings);
        return filterdListings;
      }
      console.log('%%%% is compleatly new listing no filter on', listings);
      return listings;
    };


    return (
      <div>
        <ToggleFilterChoices
          filters={mapLabels(listings)}
          onChoiceChange={this.onChoiceChange}
          selectedFilters={this.state.selectedFilters}
        />
        <div className="main-content">
          <CoverList listings={theWantedListings()} />
        </div>
      </div>
    );
  }

}

Listing.propTypes = {
  listings: PropTypes.arrayOf(CoverShape).isRequired,
  locale: PropTypes.string,
};

export default injectT(Listing);
