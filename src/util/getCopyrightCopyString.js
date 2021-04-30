/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

export const getCopyrightCopyString = (copyright, t) => {
  const license = copyright.license.license;
  let creatorsCopyString;

  if (copyright?.authors?.length) {
    creatorsCopyString = copyright.authors
      .map(author => `${author?.type}: ${author?.name}`)
      .join('\n');
  } else {
    creatorsCopyString = copyright?.creators
      ?.map(creator => {
        const type = t(`creditType.${creator?.type?.toLowerCase()}`);
        return `${type}: ${creator?.name}`;
      })
      .join('\n');
  }

  const licenseCopyString = `${
    license?.toLowerCase().includes('by') ? 'CC ' : ''
  }${license}`.toUpperCase();

  return `${licenseCopyString} ${creatorsCopyString}`;
};
