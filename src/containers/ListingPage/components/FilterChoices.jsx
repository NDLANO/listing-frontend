/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, {PropTypes, Component} from "react";
import {
    addEventListenerForResize,
    updateIFrameDimensions,
    addAsideClickListener,
    removeEventListenerForResize,
    removeAsideClickListener
} from "ndla-article-scripts";
import {injectT} from "../../../i18n";

class FilterChoices extends Component {

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

        const {filters} = this.props;

        filters.map((docket, index) => console.log("docket ", docket));

        const t = filters.map((docket, index) =>
            <div>
                <label>{docket.type}:</label>
                {docket.labels.map((s, i) => {
                    return ( <div className="w-checkbox">
                        <label className="w-form-label" key={i}>
                            <input className="w-checkbox-input" type="checkbox"/>{s}</label>
                    </div>);
                })}
            </div>
        );

        return (
            <div className="w-form">
                <a className="visfilter-btn w-button" href="#">Vis filter</a>
                <div>
                    <div className="filter-tittler">Filter:</div>
                    <div className="what">{t}</div>
                </div>
                <a className="vis-ressurs-btn w-button" href="annen-side.html">Oppdatert utvalg</a>
            </div>
        );
    }
}

export default injectT(FilterChoices)

