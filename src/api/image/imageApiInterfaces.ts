/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { Copyright, Title } from '../../../interfaces';

interface ImageCopyright extends Omit<Copyright, 'license'> {
  license: {
    license: string;
    description: string;
    url?: string;
  };
}

export interface ImageApiType {
  id: string;
  metaUrl: string;
  title: Title;
  alttext: {
    alttext: string;
    language: string;
  };
  imageUrl: string;
  size: number;
  contentType: string;
  copyright: ImageCopyright;
  tags: {
    tags: string[];
    language: string;
  };
  caption: {
    caption: string;
    language: string;
  };
  supportedLanguages: string[];
}
