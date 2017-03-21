/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import {
    addEventListenerForResize,
    updateIFrameDimensions,
    addAsideClickListener,
    removeEventListenerForResize,
    removeAsideClickListener,
} from 'ndla-article-scripts';
import React, { PropTypes, Component } from 'react';
import { injectT } from '../../../i18n';

class FilterChoices extends Component {

  componentDidMount() {
    addEventListenerForResize();
    updateIFrameDimensions();
    addAsideClickListener();
  }

  componentWillUnmount() {
    removeEventListenerForResize();
    removeAsideClickListener();
  }

  render() {
    const { filters } = this.props;

    const choices = filters.map(cover =>
      <div>
        <label htmlFor={cover.type}>{cover.type}:</label>
        {cover.labels.map(choice => (<div className="w-checkbox">
          <label className="w-form-label" key={choice} htmlFor={cover.type.concat('filterChoices')}>
            <input className="w-checkbox-input" type="checkbox" key={choice} value={choice} name={cover.type.concat('filterChoices')} />{choice}</label>
        </div>))}
      </div>,
        );

    return (
      <div className="w-form">
        <a className="visfilter-btn w-button" href="/listing/visFilter">Vis filter</a>
        <div>
          <div className="filter-tittler">Filter:</div>
          <div className="w-checkbox">{choices}</div>
        </div>
        <a className="vis-ressurs-btn w-button" href="/listing/oppdaterUtvlag">Oppdatert utvalg</a>
      </div>
    );
  }
}

FilterChoices.propTypes = {
  filters: PropTypes.arrayOfStrings,
};

export default injectT(FilterChoices);

