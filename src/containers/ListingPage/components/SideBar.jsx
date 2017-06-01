/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes } from 'react';
import { compose } from 'redux';
import { injectT } from '../../../i18n';
import ViewBar from './ViewBar';
import FilterChoices from './FilterChoices';
import { LabelShape } from './../../../shapes';

const SideBar = ({ curentSubject, onViewTypeChange, onSortChange, filters, selectedFilters, onChoiceChange }) => (
  <aside className="aside">
    <ViewBar curentSubject={curentSubject} onViewTypeChange={onViewTypeChange} onSortChange={onSortChange} />
    <FilterChoices selectedFilters={selectedFilters} filters={filters} onChoiceChange={onChoiceChange} />
  </aside>
);


SideBar.propTypes = {
  curentSubject: PropTypes.string,
  onViewTypeChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,
  filters: PropTypes.arrayOf(LabelShape),
  selectedFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChoiceChange: PropTypes.func,
};

export default compose(
  injectT,
)(SideBar);
