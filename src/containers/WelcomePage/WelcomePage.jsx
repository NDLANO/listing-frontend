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
  <OneColumn cssModifier="narrow">
    <h2>{t('welcomePage.chooseSubject')}</h2>
  </OneColumn>
;

WelcomePage.propTypes = {
};

export default compose(
  injectT,
)(WelcomePage);
