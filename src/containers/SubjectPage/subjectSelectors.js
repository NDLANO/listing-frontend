/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { createSelector } from 'reselect';
import { getLocale } from '../Locale/localeSelectors';
import { titleI18N, metaDescriptionI18N } from '../../util/i18nFieldFinder';

const getSubjectFromState = state => state.subjects;

export const getSubjectById = subjectId => createSelector(
  [getSubjectFromState],
  subjects => subjects[subjectId],
);

export const getSubject = subjectId => createSelector(
  [getSubjectById(subjectId), getLocale],
  (subject, locale) => (
    subject ? {
      ...subject,
      title: titleI18N(subject, locale, true),
      metaDescription: metaDescriptionI18N(subject, locale, true),
    } : undefined
  ),
);
