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
import { ListingShape } from '../../../shapes';

const Listing = ({ listings }) => (
  <div className="main-content">
    <div className="emneomrade-row">{listings.map(item => <ListingItem listing={item} />)}</div>
  </div>
  );

const ListingItem = ({ listing }) => (
  <div className="produkt-container">
    <div className="verktoy-bilde-div">
      <img className="verktoy-img" alt={listing.coverPhoto} src={listing.coverPhoto} />
    </div>
    <div className="inner">
      <a className="h2-tittel-lenke" href={listing.articleApiId}>
        {listing.title.substr(0, 16)}
      </a>
      <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
      <p>{listing.description}</p>
      <a href={`/article/${listing.articleApiId}`}>Les mer...</a>
      <div>
        {printSubjects(listing.labels).map(subject => <div><a className="tag-btn w-button" key={subject} href={`/listing/${subject}`}>{subject}</a></div>)}
      </div>
    </div>

  </div>
);

ListingItem.propTypes = {
  listing: PropTypes.shape(ListingShape),
};

Listing.propTypes = {
  listings: PropTypes.arrayOf(ListingShape).isRequired,
  locale: PropTypes.string,
};

export default injectT(Listing);
