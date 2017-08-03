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

const CoverList = ({listings}) => (
  <div className="emneomrade-row">
    {listings.map(item => <CoverItem key={item.id} listing={item}/>)}
  </div>
);

CoverList.propTypes = {
  listings: PropTypes.arrayOf(CoverShape),
  locale: PropTypes.string,
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
    const  { listing } = this.props;

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
};


export default injectT(CoverList);
