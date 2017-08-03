/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {uuid} from 'ndla-util';
import {injectT} from 'ndla-i18n';
import {buttonSubjectChoiceIdent, findCategoryLabel, printSubjects} from '../../../util/listingHelpers';
import {CoverShape} from '../../../shapes';
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


class CoverItem extends Component {

  constructor(props) {
    super(props);
    this.state = {
      oembedCss: "",
    };
    this.onOembedButtonClick = this.onOembedButtonClick.bind(this);
  }

  onOembedButtonClick(isVisOembed) {
    if (isVisOembed) {
      this.setState({oembedCss: "bigger-grid"})
    } else {
      this.setState({oembedCss: ""})
    }
  }


  render(){

    const  { listing, onSubjectButtonClick } = this.props;

    return(
      <div className={`produkt-container ${this.state.oembedCss}`}>
      <div className="verktoy-bilde-div">
        <img className="verktoy-img" alt={listing.coverPhotoUrl} src={listing.coverPhotoUrl} />
      </div>
      <div className="inner">
        <div className="h2-tittel-lenke">
          <div className="h2-txt-overflow">{listing.title}</div>
        </div>
        <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
        <p>{listing.description}</p>
          <div><ToggleOembed
            onOembedButtonClick={this.onOembedButtonClick}
            cssClass="visfilter-btn-grid" url={listing.oembedUrl} />
          </div>
        <div>
          {printSubjects(listing.labels).map(subject => <div key={uuid()}>
            <button className="tag-btn w-button" id={buttonSubjectChoiceIdent(subject)} onClick={event => onSubjectButtonClick(event)}>{subject}</button>
          </div>)
          }
        </div>
      </div>
    </div>);
  }
}

CoverItem.propTypes = {
  listing: CoverShape,
  onSubjectButtonClick: PropTypes.func,
  onOembedButtonClick: PropTypes.func,
};

export default injectT(CoverGrid);
