/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { compose } from 'redux';
import { OneColumn } from 'ndla-ui';
import { injectT } from '../../i18n';

export const WelcomePage = ({ t }) =>
  <OneColumn >
    <h1>{t('welcomePage.hello')}</h1>
    <p>{t('welcomePage.morehello')}</p>
  </OneColumn>
;

WelcomePage.propTypes = {
};

export default compose(
  injectT,
)(WelcomePage);
