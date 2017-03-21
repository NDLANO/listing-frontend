/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, {PropTypes, Component} from "react";
import Icon from '../../../icons/Icon';

import {
    addEventListenerForResize,
    updateIFrameDimensions,
    addAsideClickListener,
    removeEventListenerForResize,
    removeAsideClickListener
} from "ndla-article-scripts";
import {injectT} from "../../../i18n";


class FilterBar extends Component {

    componentDidMount() {
        addEventListenerForResize();
        updateIFrameDimensions();
        addAsideClickListener();
    }

    componentWillUnmount() {
        removeEventListenerForResize();
        removeAsideClickListener();
    }

    render() {
        // Dette er hentet rått fra eksempelspekken og så gjort om til så enkle html elementer som mulig ...

        return (
            <div className="visnings-container">
                <div className="velgfag-div">
                    <div className="filter-tittler">VELG FAG:</div>

                    <div className="dropdown-outer w-dropdown">
                        <select>
                            <option>Betongfaget</option>
                            <option>Murerfaget</option>
                            <option>Tømrerfaget</option>
                            <option>Rørleggerfaget</option>
                            <option>Kokke- og servitørfag</option>
                        </select>
                    </div>
                </div>
                <div className="visningsvalg-div">
                    <div className="filter-tittler">Visnings valg:</div>
                    <a className="visnings-btn w-inline-block" href="#"><Icon.VisningListe className="visning-icon" /></a>
                    <a className="visnings-btn w-inline-block" href="#"><Icon.VisningFull className="visning-icon" /></a>
                    <a className="visnings-btn w-inline-block" href="#"><Icon.VisningKompakt className="visning-icon"/></a>
                </div>
                <div className="standard-filter-div">
                    <div className="filter-tittler">Sorter etter:</div>
                    <div className="dropdown-outer w-dropdown">
                        <select>
                            <option>Alfabetisk a-å (not working yet)</option>
                            <option>Alfabetisk å–a (not working yet)</option>
                            <option>Etter ...  (not working yet)</option>
                            <option>Etter ...  (not working yet)</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

}

export default injectT(FilterBar);
