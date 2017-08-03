/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';
import * as actions from './../listingActions';
import * as api from './../listingApi';

class ToggleOembed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisOembed: false,
      content: "",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { onOembedButtonClick } = this.props;
    this.setState(prevState => ({ isVisOembed: !prevState.isVisOembed }));
    onOembedButtonClick(!this.state.isVisOembed);
    api.fetchOembed(this.props.url).then((v) => {
      this.setState({ content: v.html });
    }, (e) => {
      console.error('e', e);
    });
  }

  render() {
    const { isVisOembed } = this.state;

    const child = (
      <div>
        <div className="bigger" dangerouslySetInnerHTML={{ __html: this.state.content }} />
      </div>);

    return (
      <div className="w-form">
        <button className={`${this.props.cssClass} w-button c-button c-button--outline`} onClick={this.handleClick}>Les mer ... </button>
        { isVisOembed ? child : null }
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchOembed: actions.fetchOembed,
};


ToggleOembed.propTypes = {
  oembed: PropTypes.string,
  url: PropTypes.string.isRequired,
  cssClass: PropTypes.string,
  onOembedButtonClick: PropTypes.func,
};


const mapStateToProps = state => ({
  oembed: state.oembed,
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleOembed);
