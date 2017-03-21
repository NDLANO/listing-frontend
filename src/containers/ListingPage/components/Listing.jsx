/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes, Component } from 'react';
import {
    addEventListenerForResize,
    updateIFrameDimensions,
    addAsideClickListener,
    removeEventListenerForResize,
    removeAsideClickListener,
} from 'ndla-article-scripts';
import { injectT } from '../../../i18n';

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
    function findCategoryLabel(labels) {
      return labels
              .filter(_ => _.type === 'category')
              .map(_ => _.labels)
              .map(cleanLabel => cleanLabel.join(', '));
    }

    function isSubject(labelTuppel) {
      return labelTuppel.type === 'subject';
    }

    function printSubjects(elem) {
      const findSubject = elem.find(isSubject);
      return findSubject.labels;
    }

    const { listings } = this.props;
    const listItems = listings.filter(() => listings.length > 0).map(docket =>
      <div className="produkt-container">
        <div className="verktoy-bilde-div">
          <img className="verktoy-img" alt={docket.coverPhoto} src={docket.coverPhoto} />
        </div>
        <div className="inner">
          <a className="h2-tittel-lenke" href={docket.articleApiId}>
            {docket.title.substr(0, 16)}
          </a>
          <div className="type-txt">{findCategoryLabel(docket.labels)}</div>
          <p>{docket.description}</p>
          <a href={`/article/${docket.articleApiId}`}>Les mer...</a>
          <div>
            {printSubjects(docket.labels).map(subject => <div><a className="tag-btn w-button" key={subject} href={`/listing/${subject}`}>{subject}</a></div>)}
          </div>
        </div>
      </div>,
            );

    return (
      <div className="main-content">
        <div className="emneomrade-row">{listItems}</div>
      </div>
    );
  }
}


Listing.propTypes = {
  listings: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverPhoto: PropTypes.string.isRequired,
    articleApiId: PropTypes.number.isRequired,
    labels: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string,
      labels: PropTypes.arrayOfStrings,
    })),
  })).isRequired,
  locale: PropTypes.string,
};

export default injectT(Listing);
