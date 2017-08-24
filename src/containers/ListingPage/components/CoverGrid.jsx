/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import {uuid} from 'ndla-util';
import {injectT} from 'ndla-i18n';
import {buttonSubjectChoiceIdent, findCategoryLabel, printSubjects} from '../../../util/listingHelpers';
import {CoverShape} from '../../../shapes';
import ToggleOembed from "./ToggleOembed";


const CoverGrid = ({ listings, onSubjectButtonClick, onViewOembed }) => (
    <div className="emneomrade-row">{listings.map(item =>
      <CoverItem
        key={item.id}
        listing={item}
        onSubjectButtonClick={onSubjectButtonClick}
        onViewOembed={onViewOembed}
      />)}</div>
  );

CoverGrid.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
  onSubjectButtonClick: PropTypes.func,
  onViewOembed: PropTypes.func,
};

const CoverItem = ({ listing, onSubjectButtonClick, onViewOembed }) => (
  <div className="produkt-container">
    <div className="verktoy-bilde-div">
      <img className="verktoy-img" alt={listing.coverPhotoUrl} src={listing.coverPhotoUrl}/>
    </div>
    <div className="inner">
      <div className="h2-tittel-lenke">
        <div className="h2-txt-overflow">{listing.title.title}</div>
      </div>
      <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
      <p>{listing.description.description}</p>
      <div>
        <ToggleOembed
          onViewOembed={onViewOembed}
          cssClass="visfilter-btn-grid" url={listing.oembedUrl}/>
      </div>
      <div>
        {printSubjects(listing.labels.labels).map(subject => <div key={uuid()}>
          <button className="tag-btn w-button" id={buttonSubjectChoiceIdent(subject)}
                  onClick={event => onSubjectButtonClick(event)}>{subject}</button>
        </div>)
        }
      </div>
    </div>
  </div>
);

CoverItem.propTypes = {
  listing: CoverShape,
  onSubjectButtonClick: PropTypes.func,
  onViewOembed: PropTypes.func,
};

export default injectT(CoverGrid);
