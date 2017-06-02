/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'ndla-util';
import { injectT } from '../../../i18n';
import { choiceIdent } from '../../../util/listingHelpers';

const ChoiceGroup = ({ filter, handleChoiceChange, selectedFilters }) => (
  <div>
    <label htmlFor={filter.type}>{filter.type}:</label>
    {filter.labels.map((choice) => {
      const ident = choiceIdent(filter.type, choice);
      const isCheckedBefore = selectedFilters.find(f => f.toString() === ident.toString());
      return (
        <div className="w-checkbox" key={uuid()} >
          <label className="w-form-label" htmlFor={ident}>
            <input
              className="w-checkbox-input"
              checked={isCheckedBefore}
              type="checkbox"
              id={ident}
              onChange={event => handleChoiceChange(event, ident)}
            />
            {choice}</label>
        </div>
      );
    })}
  </div>);


ChoiceGroup.propTypes = {
  handleChoiceChange: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    type: PropTypes.string,
    labels: PropTypes.arrayOfStrings,
  }),
  selectedFilters:  PropTypes.arrayOf(PropTypes.string),
};

export default injectT(ChoiceGroup);
