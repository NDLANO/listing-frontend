/*
 *  Copyright (c) 2017-present, NDLA.
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
import ChoiceGroup from './ChoiceGroup';


class FilterChoices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
    };

    this.filterListings = this.filterListings.bind(this);
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

  filterListings() {
    console.log('### hallo');
    // this.setState({ labels: ['more', 'stuff'] });
    // console.log('this state', this);
  }

  render() {
    const { filters, onChoiceChange, selectedFilters } = this.props;
    console.log('FilterChoices filters', filters);
    console.log('FilterChoices onChoiceChange', onChoiceChange);
    console.log('FilterChoices selectedFilters', selectedFilters);

    return (
      <div>
        <form>
          <div>
            <div className="filter-tittler">Filter:</div>
            <div className="w-checkbox">{filters.map(filter =>
              <ChoiceGroup
                filter={filter}
                handleChoiceChange={onChoiceChange}
                selectedFilters={selectedFilters}
              />)}</div>
          </div>
          <button className="vis-ressurs-btn w-button" type="submit" onClick={this.filterListings}>Oppdatert utvalg</button>
        </form>
      </div>
    );
  }

}


FilterChoices.propTypes = {
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChoiceChange: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    labels: PropTypes.arrayOfStrings,
  })),
};

export default injectT(FilterChoices);

