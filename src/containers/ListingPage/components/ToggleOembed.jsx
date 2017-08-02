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
import { LabelShape } from '../../../shapes';
import * as api from './../listingApi';

// import FilterChoices from './FilterChoices';


class ToggleOembed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isVisOembed: false,
      content: "Fetching content",
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({ isVisOembed: !prevState.isVisOembed }));
    console.log('Oembed cliked... go fetch it...', this.props.url);
    api.fetchOembed(this.props.url).then((v) => {
    // api.fetchOembed('https://ndla.no/node/81538').then((v) => {
      console.log('v', v);
      this.setState({ content: v.html });
    }, (e) => {
      console.log('e', e);

    });

    // const { fetchOembed } this.props;
    // const oembed = yield call(api.fetchOembed, url);

  }

  render() {
    // const { filters, onChoiceChange, selectedFilters } = this.props;
    const { isVisOembed } = this.state;

    const child = (<div>
        <p>Hello this is a oembed article. </p>

        <div className="bigger" dangerouslySetInnerHTML={{ __html: this.state.content }} />
      </div>);

    return (
      <div className="w-form">
        <button className="visfilter-btn w-button visfilter c-button" onClick={this.handleClick}>Vis oembed article</button>
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
};


const mapStateToProps = state => ({
  oembed: state.oembed,
});

export default connect(mapStateToProps, mapDispatchToProps)(ToggleOembed);
