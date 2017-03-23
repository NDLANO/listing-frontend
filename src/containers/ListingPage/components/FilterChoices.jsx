/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { injectT } from '../../../i18n';

const FilterChoices = ({ filters }) => (
  <div>
    <div>
      <div className="filter-tittler">Filter:</div>
      <div className="w-checkbox">{filters.map(filter => <ChoiceGroup filter={filter} />)}</div>
    </div>
    <a className="vis-ressurs-btn w-button" href="/listing/oppdaterUtvlag">Oppdatert utvalg</a>
  </div>
  );

const ChoiceGroup = ({ filter }) => (
  <div>
    <label htmlFor={filter.type}>{filter.type}:</label>
    {filter.labels.map(choice => (
      <div className="w-checkbox">
        <label className="w-form-label" htmlFor={choice}>
          <input className="w-checkbox-input" type="checkbox" value={choice} />
          {choice}</label>
      </div>
      ))}
  </div>
);

ChoiceGroup.propTypes = {
  filter: PropTypes.shape({
    type: PropTypes.string,
    labels: PropTypes.arrayOfStrings,
  }),
};

FilterChoices.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string,
    labels: PropTypes.arrayOfStrings,
  })),
};

export default injectT(FilterChoices);

