/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, { PropTypes } from 'react';

const VisningListe = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className={className}>

    <title>visning</title>
    <rect className="visning-icon" x="5.78" y="7.2" width="38.44" height="4.68" />
    <rect className="visning-icon" x="5.78" y="17.51" width="38.44" height="4.68" />
    <rect className="visning-icon" x="5.78" y="27.81" width="38.44" height="4.68" />
    <rect className="visning-icon" x="5.78" y="17.51" width="38.44" height="4.68" />
    <rect className="visning-icon" x="5.78" y="27.81" width="38.44" height="4.68" />
    <rect className="visning-icon" x="5.78" y="38.12" width="38.44" height="4.68" />
  </svg>
);

VisningListe.propTypes = {
  className: PropTypes.string,
};

export default VisningListe;
