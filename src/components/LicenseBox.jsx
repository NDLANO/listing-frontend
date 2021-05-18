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

  entity.copyright?.authors?.length &&
    licenseItems.push({
      label: t('license.originator'),
      description: entity.copyright.authors
        .map(author => author.name)
        .toString(),
      metaType: metaTypes.author,
    });

  entity.copyright?.rightsholders?.length &&
    licenseItems.push({
      label: t('license.rightsholder'),
      description: entity.copyright.rightsholders
        .map(holder => holder.name)
        .toString(),
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
            license={concept.copyright.license.license}
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
                  stringToCopy={getCopyrightCopyString(concept.copyright, t)}
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
  concept: PropTypes.shape({
    title: PropTypes.string,
    created: PropTypes.string,
    content: PropTypes.string,
    subjectIds: PropTypes.arrayOf(PropTypes.string),
    copyright: PropTypes.shape({
      license: PropTypes.shape({
        license: PropTypes.string,
      }),
    }),
  }),
};

export const ImageContent = ({ t, images }) => {
  const AnchorButton = StyledButton.withComponent('a');

  return (
    <>
      <div className="u-introduction">
        <h2>{t('license.images.heading')}</h2>
        <p>{t('license.images.description')}</p>
      </div>
      <MediaList>
        {images.map(image => (
          <MediaListItem key={image.src}>
            <MediaListItemImage>
              <img src={image.src} alt={image.altText} />
            </MediaListItemImage>
            <MediaListItemBody
              license={image.copyright.license.license}
              title={t('license.images.rules')}
              resourceUrl=""
              locale="nb"
              resourceType="image">
              <MediaListItemActions>
                <div className="c-medialist__ref">
                  <MediaListItemMeta items={getLicenseItems(image, t)} />
                  <CopyTextButton
                    hasCopiedTitle={t('license.hasCopiedTitle')}
                    copyTitle={t('license.copyTitle')}
                    stringToCopy={getCopyrightCopyString(image.copyright, t)}
                  />
                  <AnchorButton
                    href={downloadUrl(image.src)}
                    appearance="outline"
                    download>
                    {t('license.download')}
                  </AnchorButton>
                </div>
              </MediaListItemActions>
            </MediaListItemBody>
          </MediaListItem>
        ))}
      </MediaList>
    </>
  );
};

ImageContent.propTypes = {
  t: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      src: PropTypes.string,
      altText: PropTypes.string,
      copyright: PropTypes.shape({
        license: PropTypes.shape({
          license: PropTypes.string,
        }),
      }),
    }),
  ),
};

export const VisualElementContent = ({ t, visualElement }) => {
  const resourceType = visualElement.resource === 'h5p' ? 'h5p' : 'video';
  const licenseItems = getLicenseItems(visualElement, t);
  return (
    <>
      <div className="u-introduction">
        <h2>{t(`license.${resourceType}.heading`)}</h2>
        <p>{t(`license.${resourceType}.description`)}</p>
      </div>
      <MediaList>
        <MediaListItem>
          <MediaListItemImage>
            <img src={visualElement.thumbnail} alt={visualElement.alt} />
          </MediaListItemImage>
          <MediaListItemBody
            license={visualElement.copyright.license.license}
            title={t(`license.${resourceType}.rules`)}
            resourceUrl=""
            locale="nb"
            resourceType={resourceType}>
            <MediaListItemActions>
              <div className="c-medialist__ref">
                <MediaListItemMeta items={licenseItems} />
                <CopyTextButton
                  hasCopiedTitle={t('license.hasCopiedTitle')}
                  copyTitle={t('license.copyTitle')}
                  stringToCopy={getCopyrightCopyString(
                    visualElement.copyright,
                    t,
                  )}
                />
              </div>
            </MediaListItemActions>
          </MediaListItemBody>
        </MediaListItem>
      </MediaList>
    </>
  );
};

VisualElementContent.propTypes = {
  t: PropTypes.func.isRequired,
  visualElement: PropTypes.shape({
    resource: PropTypes.string,
    thumbnail: PropTypes.string,
    alt: PropTypes.string,
    copyright: PropTypes.shape({
      license: PropTypes.shape({
        license: PropTypes.string,
      }),
    }),
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
