/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { TFunction } from 'react-i18next';

interface Creator {
  type: string;
  name: string;
}

interface Copyright {
  creators?: Creator[];
  rightsholders?: Creator[];
  license?: { license?: string };
}
const creatorCopyString = (creator: Creator, t: TFunction) => {
  const type = t(creator.type.toLowerCase());
  return `${type}: ${creator?.name}`;
};

export const getCopyrightCopyString = (
  copyright: Copyright | undefined,
  t: TFunction,
) => {
  const license = copyright?.license?.license ?? '';
  const creators = copyright?.creators ?? copyright?.rightsholders ?? [];
  const creatorsCopyString = creators
    .map(c => creatorCopyString(c, t))
    .join('\n');

  const licensePrefix = license.toLowerCase().includes('by') ? 'CC ' : '';
  return `${licensePrefix}${license.toUpperCase()} ${creatorsCopyString}`;
};
