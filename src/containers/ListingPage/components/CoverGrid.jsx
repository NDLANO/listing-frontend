/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes } from 'react';

import { injectT } from '../../../i18n';
import { findCategoryLabel, printSubjects } from '../../../util/listingHelpers';
import { CoverShape } from '../../../shapes';

const CoverGrid = ({ listings, onSubjectButtonClick }) => (
  <div className="main-content">
    <div className="emneomrade-row">{listings.map(item =>
      <CoverItem
        key={item.id}
        listing={item}
        onSubjectButtonClick={onSubjectButtonClick}
      />)}</div>
  </div>
  );


const CoverItem = ({ listing, onSubjectButtonClick }) => (
  <div className="produkt-container" key={listing.id}>
    <div className="verktoy-bilde-div">
      <img className="verktoy-img" alt={listing.coverPhotoUrl} src={listing.coverPhotoUrl} />
    </div>
    <div className="inner">
      <a className="h2-tittel-lenke" href={`/article/${listing.articleApiId}`}>
        {listing.title}
      </a>
      <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
      <p>{listing.description}</p>
      <a href={`/article/${listing.articleApiId}`}>
        Les mer...</a>
      <div>
        {printSubjects(listing.labels).map(subject => <div>
          <button className="tag-btn w-button" id={`subject+${subject}`} onClick={event => onSubjectButtonClick(event)}>{subject}</button>
        </div>)}
      </div>
    </div>
  </div>
  );

CoverItem.propTypes = {
  listing: PropTypes.shape(CoverShape),
  onSubjectButtonClick: PropTypes.func,
};

CoverGrid.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
  onSubjectButtonClick: PropTypes.func,
};

export default injectT(CoverGrid);
