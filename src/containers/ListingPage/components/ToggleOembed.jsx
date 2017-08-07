/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import { connect } from 'react-redux';
import React, { PropTypes, Component } from 'react';
import Oembed from "./Oembed";


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
  }

  render() {
    const { isVisOembed } = this.state;

    const child = (
      <Oembed url={this.props.url}/>
      );

    return (
      <div className="w-form">
        <button className={`${this.props.cssClass} w-button c-button c-button--outline`} onClick={this.handleClick}>Les mer ... </button>
        { isVisOembed ? child : null }
      </div>
    );
  }
}

const mapDispatchToProps = {
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
