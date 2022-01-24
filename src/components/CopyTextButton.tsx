/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import { copyTextToClipboard } from '@ndla/util';
import { Code } from '@ndla/icons/editor';
import Button from '@ndla/button';

interface Props {
  stringToCopy: string;
  copyTitle: string;
  hasCopiedTitle: string;
  timeout?: number;
  ghostPill?: boolean;
}
const CopyTextButton = ({
  copyTitle,
  hasCopiedTitle,
  stringToCopy,
  timeout,
  ghostPill,
}: Props) => {
  const [hasCopied, setHasCopied] = useState(false);
  const buttonContainer = useRef<HTMLSpanElement | null>(null);
  let timer: ReturnType<typeof setTimeout>;

  useEffect(() => {
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClick = () => {
    const success = copyTextToClipboard(
      stringToCopy,
      buttonContainer.current ?? undefined,
    );

    if (success) {
      setHasCopied(true);

      timer = setTimeout(() => {
        // Reset state after 10 seconds
        setHasCopied(false);
      }, timeout || 10000);
    }
  };

  return (
    <span ref={buttonContainer}>
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

export default CopyTextButton;
