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
import { LabelShape } from './../../../shapes';


class FilterChoices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
    };
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

  render() {
    const { filters, onChoiceChange, selectedFilters } = this.props;

    return (
      <div>
        <div className="filter-tittler">Filter:</div>
        <div className="w-checkbox">{filters.map(filter =>
          <ChoiceGroup
            filter={filter}
            handleChoiceChange={onChoiceChange}
            selectedFilters={selectedFilters}
          />)}</div>
      </div>

    );
  }
}


FilterChoices.propTypes = {
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChoiceChange: PropTypes.func,
  filters: PropTypes.arrayOf(LabelShape),
};

export default injectT(FilterChoices);

