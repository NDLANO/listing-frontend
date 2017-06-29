/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes } from 'react';
import { Masthead, MastheadItem, Logo } from 'ndla-ui';


const MastheadContainer = () => (
  <Masthead>
    <MastheadItem right>
      <Logo altText="Nasjonal digital læringsarena" />
    </MastheadItem>
  </Masthead>
);

MastheadContainer.propTypes = {
  t: PropTypes.func.isRequired,
};


export default MastheadContainer;
