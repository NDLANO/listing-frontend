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
import formatDate from '../../util/formatDate';

const getListingFromState = state => state.listings;

export const getListingById = listingId => createSelector(
    [getListingFromState],
    listings => listings[listingId],
);

export const getListing = listingId => createSelector(
    [getListingById(listingId), getLocale],
    (listing, locale) => (
        listing ? {
          ...listing,
          title: titleI18N(listing, locale, true),
        } : undefined
    ),
);
