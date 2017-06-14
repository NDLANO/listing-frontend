/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'ndla-util';
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
      if (!filters || filters.length === 0) {
        return (<div className="filter-tittler">{t('listingPage.noFilters')}</div>);
      }
      return null;
    }

    return (
      <aside className="aside">
        <div>
          <div className="filter-tittler">Filter:</div>
          {haveCovers()}
          <div className="w-checkbox">{filters.map(filter =>
            <ChoiceGroup
              filter={filter}
              handleChoiceChange={onChoiceChange}
              selectedFilters={selectedFilters}
              key={uuid()}
            />)}</div>
        </div>
      </aside>
    );
  }
}


FilterChoices.propTypes = {
  selectedFilters: PropTypes.arrayOf(PropTypes.string),
  onChoiceChange: PropTypes.func,
  filters: PropTypes.arrayOf(LabelShape),
};

export default compose(
  injectT,
)(FilterChoices);
