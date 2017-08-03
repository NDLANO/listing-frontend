/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { uuid } from 'ndla-util';
import { injectT } from 'ndla-i18n';
import { findCategoryLabel, printSubjects, buttonSubjectChoiceIdent } from '../../../util/listingHelpers';
import { CoverShape } from '../../../shapes';
import { ndlaFrontendUrl } from '../../../util/apiHelpers';
import ToggleOembed from "./ToggleOembed";


const CoverGrid = ({ listings, onSubjectButtonClick }) => (
    <div className="emneomrade-row">{listings.map(item =>
      <CoverItem
        key={item.id}
        listing={item}
        onSubjectButtonClick={onSubjectButtonClick}
      />)}</div>
  );

CoverGrid.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
  onSubjectButtonClick: PropTypes.func,
};


const CoverItem = ({ listing, onSubjectButtonClick }) => (
  <div className="produkt-container">
    <div className="verktoy-bilde-div">
      <img className="verktoy-img" alt={listing.coverPhotoUrl} src={listing.coverPhotoUrl} />
    </div>
    <div className="inner">
      <div className="h2-tittel-lenke">
        <div className="h2-txt-overflow">{listing.title}</div>
      </div>
      <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
      <p>{listing.description}</p>
      <p>
        <ToggleOembed cssClass="visfilter-btn-grid" url={listing.oembedUrl} />
      </p>
    <div>
        {printSubjects(listing.labels).map(subject => <div key={uuid()}>
          <button className="tag-btn w-button" id={buttonSubjectChoiceIdent(subject)} onClick={event => onSubjectButtonClick(event)}>{subject}</button>
        </div>)
        }
      </div>
    </div>
  </div>
  );

CoverItem.propTypes = {
  listing: CoverShape,
  onSubjectButtonClick: PropTypes.func,
};

export default injectT(CoverGrid);
