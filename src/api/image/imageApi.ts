/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {
  resolveJsonOrRejectWithError,
  apiResourceUrl,
  fetch,
  // @ts-ignore
} from '../../util/apiHelpers';
import { ImageApiType } from './imageApiInterfaces';

const baseImageUrl = apiResourceUrl('/image-api/v2/images');

export const fetchImage = (
  imageId: number,
  language: string,
): Promise<ImageApiType> =>
  fetch(`${baseImageUrl}/${imageId}?language=${language}&fallback=true`).then(
    resolveJsonOrRejectWithError,
  );
