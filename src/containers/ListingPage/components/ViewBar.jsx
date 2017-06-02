/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import Icon from '../../../icons/Icon';

const ViewBar = ({ onViewTypeChange, onSortChange }) => (
  <div>
    <div className="">
      <div className="visningsvalg-div">
        <div className="filter-tittler">Visnings valg:</div>
        <button className="visnings-btn w-inline-block" onClick={() => onViewTypeChange('grid')}>
          <Icon.VisningFull className="visning-icon" />
        </button>
        <button className="visnings-btn w-inline-block" onClick={() => onViewTypeChange('list')}>
          <Icon.VisningListe className="visning-icon" />
        </button>
      </div>
      <div className="standard-filter-div">
        <div className="filter-tittler">Sorter etter:</div>
        <div className="dropdown-outer w-dropdown">
          <select className="styled-select slate" onChange={onSortChange}>
            <option value="title_asc">Alfabetisk a-å</option>
            <option value="title_desc">Alfabetisk å–a</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  );

ViewBar.propTypes = {
  onViewTypeChange: PropTypes.func,
  onSortChange: PropTypes.func,
};

export default ViewBar;
