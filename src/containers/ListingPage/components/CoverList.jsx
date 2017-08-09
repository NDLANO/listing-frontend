/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, {PropTypes, Component} from 'react';
import {injectT} from 'ndla-i18n';

import {findCategoryLabel} from '../../../util/listingHelpers';
import {CoverShape} from '../../../shapes';
import ToggleOembed from "./ToggleOembed";

const CoverList = ({listings, onViewOembed}) => (
  <div className="emneomrade-row">
    {listings.map(item => <CoverItem
        key={item.id}
        listing={item}
        onViewOembed={onViewOembed}
    />)}
  </div>
);

CoverList.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
  onViewOembed: PropTypes.func,
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
      this.setState({oembedCss: "oembed-grid"})
    } else {
      this.setState({oembedCss: ""})
    }
  }

  render(){
    const  { listing, onViewOembed } = this.props;

    return(
      <div className="produkt-container listView">
        <div className="innerList">
          <div className="h2-tittel-lenke" href={`/article/${listing.articleApiId}`}>
            <div className="h2-txt-overflow">
              {listing.title}
            </div>
          </div>
          <div className="type-txt">{findCategoryLabel(listing.labels)}</div>
          <ToggleOembed
            onOembedButtonClick={this.onOembedButtonClick}
            onViewOembed={onViewOembed}
            cssClass="visfilter-btn-list"
            url={listing.oembedUrl}/>
        </div>
      </div>
    );
  }

}


CoverItem.propTypes = {
  listing: CoverShape,
  onOembedButtonClick: PropTypes.func,
  onViewOembed: PropTypes.func,
};


export default injectT(CoverList);
