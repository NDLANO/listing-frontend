/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import { Link } from 'react-router-dom';
import {OneColumn} from 'ndla-ui';
import { injectT } from 'ndla-i18n';

const ThemePage = ({t}) =>
  <OneColumn>
    <h1>{t('themePage.heading')}</h1>
    <p>{t('themePage.intro')}</p>
    <h2>{t('themePage.chooseTheme')}</h2>
    <Link to='/listing/verktoy'>{t('themePage.toolTheme')}</Link>
    <br/>
    <Link to='/listing/naturbruk'>{t('themePage.natureTheme')}</Link>
  </OneColumn>
;

export default injectT(ThemePage);
