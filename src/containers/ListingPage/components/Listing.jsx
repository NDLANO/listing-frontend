/*
 *  Copyright (c) 2016-present, NDLA.
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

class Listing extends Component {

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
        const {listings} = this.props;
        console.log("VIEW listings", listings);
        const listItems = listings.filter(_ => listings.length > 0).map((docket, index) =>
                <div className="produkt-container" key={index}>
                    <div className="verktoy-bilde-div">
                        <img className="verktoy-img" alt={docket.coverPhoto} src={docket.coverPhoto}/>
                    </div>
                    <div className="inner">
                        <a className="h2-tittel-lenke" href={docket.articleApiId}>
                            {docket.title.substr(0, 16)}
                        </a>
                        <div className="type-txt">{findCategoryLabel(docket.labels)}</div>
                        <p>{docket.description}</p>
                        <a href={'/article/' + docket.articleApiId}>Les mer...</a>
                        <div>
                            {printSubjects(docket.labels).map((s, i) => {
                                return <div><a className="tag-btn w-button" key={i} href="#">{s}</a></div>
                            })}
                        </div>
                    </div>
                </div>
            );

        return (
            <div className="main-content">
                <div className="emneomrade-row">{listItems}</div>
            </div>
        );
    }
}

function findCategoryLabel(labels) {
    return labels
        .filter(_ => _.type === 'category')
        .map(_ => _.labels)
        .map(cleanLabel => cleanLabel.join(', '));
}

function printSubjects(elem) {
    let findSubject = elem.find(isSubject);
    return findSubject.labels
}

function isSubject(labelTuppel) {
    return labelTuppel.type === "subject"
}

Listing.propTypes = {
    listing: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        coverPhoto: PropTypes.string.isRequired,
        articleApiId: PropTypes.number.isRequired,
        labels: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            labels: PropTypes.arrayOfStrings
        }))
    }).isRequired,
    locale: PropTypes.string,
};

export default injectT(Listing)