/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

const creatorCopyString = (creator, t) => {
  const type = t(creator?.type?.toLowerCase());
  return `${type}: ${creator?.name}`;
};

export const getCopyrightCopyString = (copyright, t) => {
  const license = copyright.license.license;
  let creatorsCopyString;

  if (copyright?.creators?.length) {
    creatorsCopyString = copyright.creators
      ?.map(author => creatorCopyString(author, t))
      .join('\n');
  } else {
    creatorsCopyString = copyright.rightsholders
      ?.map(creator => creatorCopyString(creator, t))
      .join('\n');
  }

  const licenseCopyString = `${
    license?.toLowerCase().includes('by') ? 'CC ' : ''
  }${license}`.toUpperCase();

  return `${licenseCopyString} ${creatorsCopyString}`;
};
