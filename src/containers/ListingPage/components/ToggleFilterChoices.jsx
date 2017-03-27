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
import { CoverShape } from '../../../shapes';
import FilterChoices from './FilterChoices';


class ToggleFilterChoices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisFilter: false,
    };

    this.handleClick = this.handleClick.bind(this);
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


  handleClick() {
    this.setState({ isVisFilter: !this.state.isVisFilter });
  }

  render() {
    const { filters, onChoiceChange, selectedFilters } = this.props;
    const { isVisFilter } = this.state;

    console.log('ToggleFilterChoices filters', filters);
    console.log('ToggleFilterChoices selectedFilters', selectedFilters);

    const child = (
      <FilterChoices
        onChoiceChange={onChoiceChange}
        filters={filters}
        selectedFilters={selectedFilters}
      />);

    return (
      <div className="w-form">
        <button className="visfilter-btn w-button visfilter c-button" onClick={this.handleClick}>Vis filter</button>
        { isVisFilter ? child : null }
      </div>
    );
  }
}

ToggleFilterChoices.propTypes = {
  selectedFilters: PropTypes.arrayOfStrings,
  onChoiceChange: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(CoverShape),
};

export default ToggleFilterChoices;
