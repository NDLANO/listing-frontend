/*
 *  Copyright (c) 2020-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import {
  MediaList,
  MediaListItem,
  MediaListItemBody,
  MediaListItemActions,
  MediaListItemImage,
  MediaListItemMeta,
} from '@ndla/ui';
import { FileDocumentOutline } from '@ndla/icons/common';
import { metaTypes } from '@ndla/licenses';
import Button, { CopyButton } from '@ndla/button';

export const TextContent = ({ t, concept }) => (
  <div>
    <div className="u-introduction">
      <h2>{t('license.text.heading')}</h2>
      <p>{t('license.text.description')}</p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <FileDocumentOutline className="c-medialist__icon" />
        </MediaListItemImage>
        <MediaListItemBody
          license={concept.license || 'N/A'}
          title={t('license.text.rules')}
          resourceUrl=""
          locale="nb"
          resourceType="text">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  {
                    label: t('license.title'),
                    description: concept.title,
                    metaType: metaTypes.title,
                  },
                  concept.authors
                    ? {
                        label: t('license.originator'),
                        description: concept.authors.toString(),
                        metaType: metaTypes.author,
                      }
                    : null,
                  concept.rightsholders
                    ? {
                        label: t('license.rightsholder'),
                        description: concept.rightsholders.toString(),
                        metaType: metaTypes.copyrightHolder,
                      }
                    : null,
                  {
                    label: t('license.published'),
                    description: concept.created,
                    metaType: metaTypes.other,
                  },
                ].filter(i => i !== null)}
              />
              <CopyButton outline copyNode={t('license.hasCopiedTitle')}>
                {t('license.copyTitle')}
              </CopyButton>
              <Button outline onClick={() => {}}>
                {t('license.download')}
              </Button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>
);

TextContent.propTypes = {
  t: PropTypes.func.isRequired,
  concept: PropTypes.exact({
    title: PropTypes.string,
    source: PropTypes.string,
    created: PropTypes.string,
    license: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    rightsholders: PropTypes.arrayOf(PropTypes.string),
  }),
};

export const ImageContent = ({ t, image }) => (
  <div>
    <div className="u-introduction">
      <h2>{t('license.images.heading')}</h2>
      <p>{t('license.images.description')}</p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <img src={image.image.url} alt={image.image.alt} />
        </MediaListItemImage>
        <MediaListItemBody
          license={image.license}
          title={t('license.images.rules')}
          resourceUrl=""
          locale="nb"
          resourceType="image">
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  {
                    label: t('license.title'),
                    description: image.title,
                    metaType: metaTypes.title,
                  },
                  {
                    label: t('license.originator'),
                    description: image.authors.toString(),
                    metaType: metaTypes.author,
                  },
                  {
                    label: t('license.rightsholder'),
                    description: image.rightsholders.toString(),
                    metaType: metaTypes.copyrightHolder,
                  },
                  {
                    label: t('license.source'),
                    description: image.origin,
                    metaType: metaTypes.other,
                  },
                ]}
              />
              <CopyButton outline copyNode={t('license.hasCopiedTitle')}>
                {t('license.copyTitle')}
              </CopyButton>
              <Button outline onClick={() => {}}>
                {t('license.download')}
              </Button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>
);

ImageContent.propTypes = {
  t: PropTypes.func.isRequired,
  image: PropTypes.exact({
    title: PropTypes.string,
    image: PropTypes.exact({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    license: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    rightsholders: PropTypes.arrayOf(PropTypes.string),
    origin: PropTypes.string,
  }),
};
