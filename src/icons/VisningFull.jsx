/*
 *  Copyright (c) 2017-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */
import React, {PropTypes} from "react";

const VisningFull = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" className={className}>
        <title>visning</title>
        <rect className="visning-icon" x="7" y="7" width="14.04" height="14.04"/>
        <rect className="visning-icon" x="28.95" y="7" width="14.04" height="14.04"/>
        <rect className="visning-icon" x="7" y="28.95" width="14.04" height="14.04"/>
        <rect className="visning-icon" x="28.95" y="28.95" width="14.04" height="14.04"/>
    </svg>
);

VisningFull.propTypes = {
    className: PropTypes.string.isRequired,
};

export default VisningFull;
