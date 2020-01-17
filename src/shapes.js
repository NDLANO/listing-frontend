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
  tags: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    language: PropTypes.string.isRequired
  }),
  metaImage: PropTypes.shape({
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }),
  id: PropTypes.number.isRequired,
  subjectIds: PropTypes.arrayOf(PropTypes.string),
  content: PropTypes.shape({
    content: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  }),
  supportedLanguages: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.shape({
    title: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired
  })
})