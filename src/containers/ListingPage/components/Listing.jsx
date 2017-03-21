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
import { findCategoryLabel, printSubjects } from '../../../util/listingHelpers';

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
    const { listings } = this.props;
    const listItems = listings.filter(() => listings.length > 0).map(cover =>
      <div className="produkt-container">
        <div className="verktoy-bilde-div">
          <img className="verktoy-img" alt={cover.coverPhoto} src={cover.coverPhoto} />
        </div>
        <div className="inner">
          <a className="h2-tittel-lenke" href={cover.articleApiId}>
            {cover.title.substr(0, 16)}
          </a>
          <div className="type-txt">{findCategoryLabel(cover.labels)}</div>
          <p>{cover.description}</p>
          <a href={`/article/${cover.articleApiId}`}>Les mer...</a>
          <div>
            {printSubjects(cover.labels).map(subject => <div><a className="tag-btn w-button" key={subject} href={`/listing/${subject}`}>{subject}</a></div>)}
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
