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
import { StyledButton } from '@ndla/button';
import CopyTextButton from './CopyTextButton';
import { getCopyrightCopyString } from '../util/getCopyrightCopyString';
import { downloadUrl } from '../util/downloadHelpers';
import formatDate from '../util/formatDate';

const getLicenseItems = (entity, t) => {
  const licenseItems = [];

  entity.title &&
    licenseItems.push({
      label: t('license.title'),
      description: entity.title,
      metaType: metaTypes.title,
    });

  entity.authors?.length &&
    licenseItems.push({
      label: t('license.originator'),
      description: entity.authors.map(author => author.name).toString(),
      metaType: metaTypes.author,
    });

  entity.rightsholders?.length &&
    licenseItems.push({
      label: t('license.rightsholder'),
      description: entity.rightsholders.toString(),
      metaType: metaTypes.copyrightHolder,
    });

  return licenseItems;
};

export const TextContent = ({ t, concept, locale }) => {
  const licenseItems = getLicenseItems(concept, t);

  concept.created &&
    licenseItems.push({
      label: t('license.published'),
      description: formatDate(concept.created, locale),
      metaType: metaTypes.other,
    });

  return (
    <>
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
            license={concept.license}
            title={t('license.text.rules')}
            resourceUrl=""
            locale="nb"
            resourceType="text">
            <MediaListItemActions>
              <div className="c-medialist__ref">
                <MediaListItemMeta items={licenseItems} />
                <CopyTextButton
                  hasCopiedTitle={t('license.hasCopiedTitle')}
                  copyTitle={t('license.copyTitle')}
                  stringToCopy={getCopyrightCopyString(concept, t)}
                />
              </div>
            </MediaListItemActions>
          </MediaListItemBody>
        </MediaListItem>
      </MediaList>
    </>
  );
};

TextContent.propTypes = {
  t: PropTypes.func.isRequired,
  locale: PropTypes.string,
  concept: PropTypes.exact({
    articleId: PropTypes.number,
    title: PropTypes.string,
    source: PropTypes.string,
    created: PropTypes.string,
    content: PropTypes.string,
    image: PropTypes.string,
    subjectIds: PropTypes.arrayOf(PropTypes.string),
    license: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
      }),
    ),
    rightsholders: PropTypes.arrayOf(PropTypes.string),
    visualElement: PropTypes.string,
  }),
};

export const ImageContent = ({ t, image }) => {
  const licenseItems = getLicenseItems(image, t);

  image.created &&
    licenseItems.push({
      label: t('license.source'),
      description: image.origin,
      metaType: metaTypes.other,
    });

  const AnchorButton = StyledButton.withComponent('a');

  return (
    <>
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
                <MediaListItemMeta items={licenseItems} />
                <CopyTextButton
                  hasCopiedTitle={t('license.hasCopiedTitle')}
                  copyTitle={t('license.copyTitle')}
                  stringToCopy={getCopyrightCopyString(image, t)}
                />
                <AnchorButton
                  href={downloadUrl(image.image.url)}
                  appearance="outline"
                  download>
                  {t('license.download')}
                </AnchorButton>
              </div>
            </MediaListItemActions>
          </MediaListItemBody>
        </MediaListItem>
      </MediaList>
    </>
  );
};

ImageContent.propTypes = {
  t: PropTypes.func.isRequired,
  image: PropTypes.exact({
    title: PropTypes.string,
    image: PropTypes.exact({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    created: PropTypes.string,
    license: PropTypes.string,
    authors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
      }),
    ),
    rightsholders: PropTypes.arrayOf(PropTypes.string),
    origin: PropTypes.string,
  }),
};

export const OembedContent = ({ oembed, t }) => (
  <>
    <h2>{t('license.embedlink.heading')}</h2>
    <p>{t('license.embedlink.description')}</p>
    <CopyTextButton
      copyTitle={t('license.embedlink.copyTitle')}
      hasCopiedTitle={t('license.embedlink.hasCopiedTitle')}
      stringToCopy={oembed}
    />
  </>
);

OembedContent.propTypes = {
  oembed: PropTypes.string.isRequired,
};
