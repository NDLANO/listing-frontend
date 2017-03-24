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
    this.filterByChoices = this.filterByChoices.bind(this);
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

  filterByChoices(checkedBoxes) {
    console.log('yes filter that shit! ');
    console.log('yes filter that shit! checkedBoxes', checkedBoxes);

  }

  render() {
    const { listings } = this.props;

    console.log('#### Listing props.listings', listings);
    console.log('#### Listing props.filterByChoices', this.filterByChoices);

    return (
      <div>
        <ToggleFilterChoices
          filters={mapLabels(listings)}
          filterByChoices={this.filterByChoices}
        />
        <div className="main-content">
          <CoverList listings={listings} />
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
