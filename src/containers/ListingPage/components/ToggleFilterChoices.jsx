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
import { ListingShape } from '../../../shapes';
import FilterChoices from './FilterChoices';


class ToggleFilterChoices extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisFilter: false,
      selectedFilters: [],
    };

    this.handleClick = this.handleClick.bind(this);
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
    // console.log('onChoicechange event ... ', event);
    // console.log('onChoicechange choice... ', choice);
    const target = event.target;
    console.log('onChoicechange target... ', target);
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // const name = target.name;

    console.log(target);
    console.log(value);
    // console.log('choiceType:', choiceType);
    // console.log('choiceType', choice);
    // const yes = { type: choiceType, choice };

    const choicesMade = this.state.selectedFilters;

    if (value) {
      console.log('ADD choice', choice);
      this.setState({ selectedFilters: this.state.selectedFilters.concat(choice) });
    } else {
      console.log('REMOVE choice', choice);

      const reduced = choicesMade.filter((c) => {
        console.log('filter', c);
        return c !== choice;
      });

      console.log('reduced filterd', reduced);

      this.setState({ selectedFilters: reduced });
    }


    console.log('onChoiceChange state selectedFilters', this.state.selectedFilters);
  }

  handleClick() {
    this.setState({ isVisFilter: !this.state.isVisFilter });
  }

  render() {
    console.log('render state selectedFilters', this.state.selectedFilters);

    const { filters } = this.props;
    const { isVisFilter } = this.state;
    // console.log('ToggleFilterChoices this.handleClick', this.handleClick);
    // console.log('ToggleFilterChoices this.onChoiceChange', this.onChoiceChange);
    const child = <FilterChoices onChoiceChange={this.onChoiceChange} filters={filters} selectedFilters={this.state.selectedFilters} />;

    return (
      <div className="w-form">
        <button className="visfilter-btn w-button visfilter c-button" onClick={this.handleClick}>Vis filter</button>
        { isVisFilter ? child : null }
      </div>
    );
  }
}

ToggleFilterChoices.propTypes = {
  filters: PropTypes.arrayOf(ListingShape),
};

export default ToggleFilterChoices;
