/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { injectT } from '../../../i18n';
import { choiceIdent } from '../../../util/listingHelpers';

const ChoiceGroup = ({ filter, handleChoiceChange, selectedFilters, t }) => (
  <div>
    <label htmlFor={filter.type}>{t(`${filter.type}`)}</label>
    {filter.labels.map((choice) => {
      const ident = choiceIdent(filter.type, choice);
      const isCheckedBefore = selectedFilters.find(f => f.toString() === ident.toString());
      return (
        <div className="w-checkbox">
          <label className="w-form-label" htmlFor={ident}>
            <input
              className="w-checkbox-input"
              checked={isCheckedBefore}
              type="checkbox"
              id={ident}
              onChange={event => handleChoiceChange(event, ident)}
              key={ident}
            />
            {choice}</label>
        </div>
      );
    })}
  </div>);


ChoiceGroup.propTypes = {
  selectedFilters: PropTypes.arrayOfStrings,
  handleChoiceChange: PropTypes.func.isRequired,
  filter: PropTypes.shape({
    type: PropTypes.string,
    labels: PropTypes.arrayOfStrings,
  }),
};

export default injectT(ChoiceGroup);
