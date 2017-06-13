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
import { ndlaFrontendUrl } from '../../../util/apiHelpers';

const CoverGrid = ({ listings }) => (
  <div className="main-content">
    <div className="emneomrade-row">{listings.map(item => <CoverItem key={item.id} listing={item} />)}</div>
  </div>
);

const CoverItem = ({ listing }) => (
  <div className="produkt-container" key={listing.id}>
    <div className="verktoy-bilde-div">
      <img className="verktoy-img" alt={listing.coverPhotoUrl} src={listing.coverPhotoUrl} />
    </div>
    <div className="inner">
      <a className="h2-tittel-lenke" href={ndlaFrontendUrl(`/article/${listing.articleApiId}`)} target="_blank" rel="noopener noreferrer">
        {listing.title}
      </a>
      <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
      <p>{listing.description}</p>
      <a href={`/article/${listing.articleApiId}`}>
        Les mer...</a>
      <div>
        {printSubjects(listing.labels).map(subject => <div><a className="tag-btn w-button" key={subject} href={`/listing/${subject}`}>{subject}</a></div>)}
      </div>
    </div>
  </div>
);

CoverItem.propTypes = {
  listing: PropTypes.shape(CoverShape),
};

CoverGrid.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
};

export default injectT(CoverGrid);
