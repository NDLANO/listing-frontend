/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { copyTextToClipboard } from '@ndla/util';
import Button from '@ndla/button';

const CopyTextButton = ({ copyTitle, hasCopiedTitle, stringToCopy }) => {
  const [hasCopied, setHasCopied] = useState(false);
  let buttonContainer = useRef(null);
  let timer;

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    const success = copyTextToClipboard(stringToCopy, buttonContainer);

    if (success) {
      setHasCopied(true);

      timer = setTimeout(() => {
        // Reset state after 10 seconds
        setHasCopied(false);
      }, 10000);
    }
  };

  return (
    <span
      ref={r => {
        buttonContainer = r;
      }}>
      <Button
        outline
        className="c-licenseToggle__button"
        disabled={hasCopied}
        onClick={handleClick}>
        {hasCopied ? hasCopiedTitle : copyTitle}
      </Button>
    </span>
  );
};

CopyTextButton.propTypes = {
  stringToCopy: PropTypes.string.isRequired,
  copyTitle: PropTypes.string.isRequired,
  hasCopiedTitle: PropTypes.string.isRequired,
};

export default CopyTextButton;
