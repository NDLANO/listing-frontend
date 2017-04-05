/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes, Component } from 'react';
import { compose } from 'redux';
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

  render() {
    const { filters, onChoiceChange, selectedFilters, t } = this.props;

    function haveCovers() {
      if (filters === undefined || filters.length === 0) {
        return (<div className="filter-tittler">{t('listingPage.noFilters')}</div>);
      }
      return null;
    }

    return (
      <div>
        <div className="filter-tittler">Filter:</div>
        {haveCovers()}
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

export default compose(
  injectT,
)(FilterChoices);
