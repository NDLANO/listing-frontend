/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import PropTypes from 'prop-types';

export const LabelShape = PropTypes.shape({
  type: PropTypes.string,
  labels: PropTypes.arrayOfStrings,
});

export const CoverShape = PropTypes.shape({
  articleApiId: PropTypes.number.isRequired,
  coverPhotoUrl: PropTypes.string.isRequired,
  description: PropTypes.shape({
    description: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }),
  filterChoices: PropTypes.arrayOfStrings,
  id: PropTypes.number.isRequired,
  labels: PropTypes.shape({
    labels: PropTypes.arrayOf(LabelShape).isRequired,
    language: PropTypes.string.isRequired
  }),
  supportedLanguages: PropTypes.arrayOfStrings,
  title: PropTypes.shape({
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }),
  theme: PropTypes.string.isRequired,
  oembedUrl: PropTypes.string,
});
