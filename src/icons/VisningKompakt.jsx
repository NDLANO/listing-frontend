/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

const VisningKompakt = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" style={className}>
    <title>visning</title>
    <rect className="visning-icon" x="20.73" y="9.68" width="21.89" height="4.21" />
    <rect className="visning-icon" x="7.38" y="7" width="9.57" height="9.57" />
    <rect className="visning-icon" x="20.73" y="22.89" width="21.89" height="4.21" />
    <rect className="visning-icon" x="7.38" y="20.22" width="9.57" height="9.57" />
    <rect className="visning-icon" x="20.73" y="36.11" width="21.89" height="4.21" />
    <rect className="visning-icon" x="7.38" y="33.43" width="9.57" height="9.57" />
  </svg>
);

VisningKompakt.propTypes = {
  className: PropTypes.string,
};

export default VisningKompakt;
