/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { PropTypes } from 'react';

export const ArticleShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  copyright: PropTypes.shape({
    authors: PropTypes.array.isRequired,
  }).isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
});

export const SubjectShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
});

export const ListingShape = PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    coverPhoto: PropTypes.string.isRequired, //Dette er en URL til et bilde...
    articleApiId: PropTypes.number.isRequired, //Dette er en id som kan brukes mot artikel apiet
    labels: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string,
        labels: PropTypes.arrayOfStrings
    }))
});
