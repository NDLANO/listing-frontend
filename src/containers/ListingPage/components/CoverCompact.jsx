/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes } from 'react';

import { injectT } from '../../../i18n';
import { findCategoryLabel } from '../../../util/listingHelpers';
import { CoverShape } from '../../../shapes';

const CoverCompact = ({ listings }) => (
  <div className="main-content">
    <div className="emneomrade-row">{listings.map(item => <CoverItem key={item.id} listing={item} />)}</div>
  </div>
);


const CoverItem = ({ listing }) => (
  <div className="produkt-container listView">
    <div className="innerList compactView">
      <div className="compactView1">
        <a className="h2-tittel-lenke" href={`/article/${listing.articleApiId}`}>
          {listing.title}
        </a>
        <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
      </div>
      <div className="compactView2">
        <p>{listing.description}
          <br />
          <a href={`/article/${listing.articleApiId}`}>Les mer...</a></p>
      </div>
    </div>
  </div>
);

CoverItem.propTypes = {
  listing: PropTypes.shape(CoverShape),
};

CoverCompact.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
};

export default injectT(CoverCompact);
