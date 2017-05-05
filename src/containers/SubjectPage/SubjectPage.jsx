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

/**
 * Listen av fag er hardkodet her foreløpig intill det blir bestemt/tilgjengelig hvordan best hente den dynamiskt.
 * https://github.com/NDLANO/Issues/issues/253
 * Den samme listen skal på sikt bli en nedtreksmeny i ListingPage.
 *
 * Formålet med denne siden er kun for ha ett sted med "stave"-kontroll på hva som blir sendt som filter-parameter til apiet intill videre.
 * For enklere å støtte ruta som er "root" på listing tilfelle noen går dit manuelt i adressefeltet.
 */
const SubjectPage = ({ t }) =>
  <OneColumn >
    <h1>{t('subjectPage.heading')}</h1>
    <p>{t('subjectPage.intro')}</p>
    <h2>{t('subjectPage.chooseSubject')}</h2>
    <ul>
      <li><a href="/listing/betongfaget">{t('subjectPage.concreteSubject')}</a></li>
      <li><a href="/listing/murerfaget">{t('subjectPage.bricklayingSubject')}</a></li>
      <li><a href="/listing/tømrerfaget">{t('subjectPage.carpentingSubject')}</a></li>
    </ul>
  </OneColumn>
;

SubjectPage.propTypes = {
};

export default compose(
  injectT,
)(SubjectPage);
