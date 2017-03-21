/*
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';

// Trenger sansynligvis noe styling subject/listing/kort/topic fra ndla-ui.... men hva...
import { Article as UIArticle } from 'ndla-ui';

import {
    addEventListenerForResize,
    updateIFrameDimensions,
    addAsideClickListener,
    removeEventListenerForResize,
    removeAsideClickListener } from 'ndla-article-scripts';
import { injectT } from '../../../i18n';


class Subject extends Component {

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
    const { subject } = this.props;

    return (
      <UIArticle>
        <h1>{subject.title}</h1>
      </UIArticle>
    );
  }
}

Subject.propTypes = {
  subject: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  locale: PropTypes.string.isRequired,
};

export default injectT(Subject);
