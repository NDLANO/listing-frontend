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
import { mapLabels, choiceIdent } from '../../../util/listingHelpers';
import { CoverShape } from '../../../shapes';
import ToggleFilterChoices from './ToggleFilterChoices';
import CoverList from './CoverList';

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedFilters: [],
    };
    this.filterByChoices = this.filterByChoices.bind(this);
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


  filterByChoices(checkedBoxes) {
    //Denne er evt. hvis man ønsker å bruke knappen som en trykke ting
    this.setState({ selectedFilters: ['some', 'thing'] });
  }

  render() {
    const { listings } = this.props;


    const theWantedListings = () => {
      if (this.state.selectedFilters.length > 0) {
        console.log('%%%%%%%%%%%%%%%%%%%%\n yup you have changed, so we need to filter that shit');

        const chosenListings = listings.filter((cover) => {
          const newList = cover.labels.map((a) => {
            const what = a.labels.map(c => choiceIdent(a.type, c));

            return what;
          });

          const newListReduced = newList.reduce((a, b) => a.concat(b), []);

          console.log('newList for ', cover.title);
          console.log('newList', newList);
          console.log('newList flatten', newListReduced);
          console.log('selectedFilters', this.state.selectedFilters);

          // Her må vi finne ut om newListReduced har en label som finnes i selectedFiltesrs, og hvis ja returneres hele coveret

          const found = this.state.selectedFilters.find((f) => {
            console.log(('f:', f));
            const includes = newListReduced.includes(f);
            console.log('includes', includes);
            return includes;
          });

          console.log('found', found);
          console.log('-----|');
          if (found) return cover;
        });

        console.log('chosen listings', chosenListings);

        return chosenListings;
      }
      console.log('%%%% is compleatly new listing uten filter');
      return listings;
    };
    console.log('##### Listing props.listings', listings);
    console.log('##### Listing props.theWantedListings', theWantedListings());


    return (
      <div>
        <ToggleFilterChoices
          filters={mapLabels(listings)}
          filterByChoices={this.filterByChoices}
          onChoiceChange={this.onChoiceChange}
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
