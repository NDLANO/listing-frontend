/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { createElement, PropTypes } from 'react';
import classNames from 'classnames';

import VisningFull from './VisningFull';
import VisningKompakt from './VisningKompakt';
import VisningListe from './VisningListe';

function Icon(props) {
  const { icon, ...rest } = props;
  return createElement(icon, { classNames: classNames('icon', rest.className) });
}

Icon.VisningFull = props => (<Icon {...props} icon={VisningFull} />);
Icon.VisningKompakt = props => (<Icon {...props} icon={VisningKompakt} />);
Icon.VisningListe = props => (<Icon {...props} icon={VisningListe} />);

Icon.propTypes = {
  icon: PropTypes.func,
};

export default Icon;
