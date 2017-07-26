/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import PropTypes from 'prop-types';

export const ArticleShape = PropTypes.shape({
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  copyright: PropTypes.shape({
    authors: PropTypes.array.isRequired,
  }).isRequired,
  created: PropTypes.string.isRequired,
  updated: PropTypes.string.isRequired,
});

export const LabelShape = PropTypes.shape({
  type: PropTypes.string,
  labels: PropTypes.arrayOfStrings,
});

export const CoverShape = PropTypes.shape({
  articleApiId: PropTypes.number.isRequired,
  coverPhotoUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  filterChoices: PropTypes.arrayOfStrings,
  id: PropTypes.number.isRequired,
  labels: PropTypes.arrayOf(LabelShape),
  supportedLanguages: PropTypes.arrayOfStrings,
  title: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
});
