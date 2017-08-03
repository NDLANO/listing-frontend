/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, {PropTypes} from 'react';
import {injectT} from 'ndla-i18n';

import {findCategoryLabel} from '../../../util/listingHelpers';
import {CoverShape} from '../../../shapes';
import ToggleOembed from "./ToggleOembed";

const CoverList = ({listings}) => (
  <div className="emneomrade-row">
    {listings.map(item => <CoverItem key={item.id} listing={item}/>)}
  </div>
);

CoverList.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
};


const CoverItem = ({listing}) => (
  <div className="produkt-container listView">
    <div className="innerList">
      <div className="h2-tittel-lenke" href={`/article/${listing.articleApiId}`}>
        <div className="h2-txt-overflow">
          {listing.title}
        </div>
      </div>
      <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
      <ToggleOembed
        cssClass="visfilter-btn-list"
        url={listing.oembedUrl}/>
    </div>
  </div>
);

CoverItem.propTypes = {
  listing: CoverShape,
};


export default injectT(CoverList);
