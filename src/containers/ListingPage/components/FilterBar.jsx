/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import Icon from '../../../icons/Icon';
import { injectT } from '../../../i18n';

const FilterBar = () =>

    // Dette er hentet rått fra eksempelspekken og så gjort om til så enkle html elementer som mulig ...
    // Det er egne issues på funksjonalitet til nedtrekkslistene. De er fjernet foreløpig, vi venter på avklaringer.

     (
       <div className="visnings-container">
         <div className="velgfag-div">
           <div className="filter-tittler">-</div>

           <div className="dropdown-outer w-dropdown">
             -
           </div>
         </div>
         <div className="visningsvalg-div">
           <div className="filter-tittler">Visnings valg:</div>
           <a className="visnings-btn w-inline-block" href="/listing/visSomListe"><Icon.VisningListe className="visning-icon" /></a>
           <a className="visnings-btn w-inline-block" href="/listing/visFullInfo"><Icon.VisningFull className="visning-icon" /></a>
           <a className="visnings-btn w-inline-block" href="/listing/visKompakt"><Icon.VisningKompakt className="visning-icon" /></a>
         </div>
         <div className="standard-filter-div">
           <div className="filter-tittler">-</div>
           <div className="dropdown-outer w-dropdown">
            -
           </div>
         </div>
       </div>
    );

export default injectT(FilterBar);
