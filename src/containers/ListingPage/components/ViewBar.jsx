/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import Icon from '../../../icons/Icon';

const ViewBar = ({ curentSubject, onViewChangeToList, onViewChangeToGrid }) =>

    // Jmf. https://github.com/NDLANO/Issues/issues/256 det er bare specket opp to views i praksis i eksempel-spekken,
    // kommenterer ut den som ikke er spesifisert.
     (
       <div className="visnings-container">
         <div className="velgfag-div">
           <div className="filter-tittler">{curentSubject}</div>

           <div className="dropdown-outer w-dropdown">
             -
           </div>
         </div>
         <div className="visningsvalg-div">
           <div className="filter-tittler">Visnings valg:</div>
           <button className="visnings-btn w-inline-block" onClick={onViewChangeToList}><Icon.VisningListe className="visning-icon" /></button>
           <button className="visnings-btn w-inline-block" onClick={onViewChangeToGrid}><Icon.VisningFull className="visning-icon" /></button>
           {/* <button className="visnings-btn w-inline-block" onClick={onViewChangeToCompact}><Icon.VisningKompakt className="visning-icon" /></button>*/}
         </div>
         <div className="standard-filter-div">
           <div className="filter-tittler">-</div>
           <div className="dropdown-outer w-dropdown">
            -
           </div>
         </div>
       </div>
    );

ViewBar.propTypes = {
  curentSubject: PropTypes.string.isRequired,
  onViewChangeToList: PropTypes.func.isRequired,
  onViewChangeToGrid: PropTypes.func.isRequired,
};

export default ViewBar;
