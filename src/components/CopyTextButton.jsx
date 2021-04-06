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
import { Code } from '@ndla/icons/editor';
import Button from '@ndla/button';

const CopyTextButton = ({
  copyTitle,
  hasCopiedTitle,
  stringToCopy,
  timeout,
  ghostPill,
}) => {
  const [hasCopied, setHasCopied] = useState(false);
  let buttonContainer = useRef(null);
  let timer;

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    const success = copyTextToClipboard(stringToCopy, buttonContainer);

    if (success) {
      setHasCopied(true);

      timer = setTimeout(() => {
        // Reset state after 10 seconds
        setHasCopied(false);
      }, timeout || 10000);
    }
  };

  return (
    <span
      ref={r => {
        buttonContainer = r;
      }}>
      <Button
        outline={!ghostPill}
        className={ghostPill ? '' : 'c-licenseToggle__button'}
        disabled={hasCopied}
        onClick={handleClick}
        ghostPill={ghostPill}>
        <Code /> {hasCopied ? hasCopiedTitle : copyTitle}
      </Button>
    </span>
  );
};

CopyTextButton.propTypes = {
  stringToCopy: PropTypes.string.isRequired,
  copyTitle: PropTypes.string.isRequired,
  hasCopiedTitle: PropTypes.string.isRequired,
  timeout: PropTypes.number,
  ghostPill: PropTypes.bool,
};

export default CopyTextButton;
