/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import {compose} from 'redux';
import {injectT} from 'ndla-i18n';
import React, {Component, PropTypes} from 'react';
import get from 'lodash/get';
import * as api from './../listingApi';
import Spinner from "./Spinner";

export const urlIsNDLA = url => (/^(http|https):\/\/ndla.no/).test(url);
export const urlIsApiNDLA = url => (/^(http|https):\/\/ndla-frontend.(test.|staging.)?api.ndla.no/).test(url);
export const urlIsLocalNdla = url => (/^http:\/\/proxy.ndla-local:30017/).test(url);

class Oembed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      html: "",
      isNDLAResource: false,
      listeningToResize: false,
      isLoadingResource: true,
    };

    this.handleResizeMessage = this.handleResizeMessage.bind(this);

  }

  componentWillMount() {
    this.handleIframeResizing(this.props);
  }


  componentDidMount() {
    const {url} = this.props;
    api.fetchOembed(url).then((res) => {
      this.setState({html: res.html})
    });
  }


  componentWillReceiveProps(props) {
    this.handleIframeResizing(props);
  }


  componentWillUnmount() {
    this.disableIframeResizing();
    this.setState({isLoadingResource: false});
  }

  getIframeDOM() {
    return this.iframeDiv.children[0];
  }


  handleIframeResizing({url}) {
    if (urlIsNDLA(url) || urlIsApiNDLA(url) || urlIsLocalNdla(url)) {
      this.setState({isNDLAResource: true}, this.enableIframeResizing);
    } else {
      this.setState({isNDLAResource: false}, this.disableIframeResizing);
    }
  }

  enableIframeResizing() {
    if (!this.state.listeningToResize) {
      window.addEventListener('message', this.handleResizeMessage);
      this.setState({listeningToResize: true});
    }
  }

  disableIframeResizing() {
    window.removeEventListener('message', this.handleResizeMessage);
    this.setState({listeningToResize: false});
    this.setState({isLoadingResource: false});
  }

  handleResizeMessage(evt) {
    if (!this.state.listeningToResize) {
      return;
    }

    const iframe = this.getIframeDOM();

    if (iframe.contentWindow !== get(evt, 'source')) {
      return;
    }

    /* Needed to enforce content to stay within iframe on Safari iOS */
    iframe.setAttribute('scrolling', 'no');

    this.setState({isLoadingResource: false});
  }


  render() {

    return (
      <div>
        {this.state.isLoadingResource && <Spinner hasMargins/>}
        <div className="bigger" dangerouslySetInnerHTML={{__html: this.state.html}}
             ref={(iframeDiv) => {
               this.iframeDiv = iframeDiv;
             }}
        />
      </div>
    )
  }


}

Oembed.propTypes = {
  url: PropTypes.string.isRequired,
};


export default compose(
  injectT,
)(Oembed);
