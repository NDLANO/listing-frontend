/*
 *  Copyright (c) 2020-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React from 'react';
import { TFunction } from 'i18next';
import { useTranslation } from 'react-i18next';
import {
  //@ts-ignore
  MediaList,
  //@ts-ignore
  MediaListItem,
  //@ts-ignore
  MediaListItemBody,
  //@ts-ignore
  MediaListItemActions,
  //@ts-ignore
  MediaListItemImage,
  //@ts-ignore
  MediaListItemMeta,
} from '@ndla/ui';
import { FileDocumentOutline } from '@ndla/icons/common';
import {
  figureApa7CopyString,
  metaTypes,
  webpageReferenceApa7CopyString,
} from '@ndla/licenses';
import { StyledButton } from '@ndla/button';
import CopyTextButton from './CopyTextButton';
import { downloadUrl } from '../util/downloadHelpers';
import formatDate from '../util/formatDate';
import {
  GQLConceptCopyright,
  GQLCopyright,
  GQLCopyrightInfoFragment,
  GQLDetailedConceptQuery,
  GQLImageLicenseInfoFragment,
  GQLVisualElement,
} from '../graphqlTypes';
import config from '../config';

interface LicenseItemEntity {
  title?: string;
  copyright?: Partial<GQLCopyright> | Partial<GQLConceptCopyright>;
}
const getLicenseItems = (entity: LicenseItemEntity, t: TFunction) => {
  const licenseItems = [];

  entity.title &&
    licenseItems.push({
      label: t('license.title'),
      description: entity.title,
      metaType: metaTypes.title,
    });

  entity.copyright?.creators?.length &&
    licenseItems.push({
      label: t('license.originator'),
      description: entity.copyright.creators
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

interface TextContentProps {
  locale: string;
  concept: Required<GQLDetailedConceptQuery>['detailedConcept'];
}

export const TextContent = ({ concept, locale }: TextContentProps) => {
  const { t } = useTranslation();
  const licenseItems = getLicenseItems(concept, t);

  concept?.created &&
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
            license={concept.copyright?.license?.license ?? ''}
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
                  stringToCopy={webpageReferenceApa7CopyString(
                    concept.title,
                    undefined,
                    undefined,
                    `/concepts/${concept.id}`,
                    concept.copyright,
                    locale,
                    config.ndlaFrontendDomain,
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

interface ImageContentItem {
  src: string;
  altText?: string;
  copyright?:
    | GQLImageLicenseInfoFragment['copyright']
    | GQLCopyrightInfoFragment;
  title?: string;
}
interface ImageContentProps {
  images: ImageContentItem[];
  conceptId: number;
}

export const ImageContent = ({ images, conceptId }: ImageContentProps) => {
  const { t } = useTranslation();
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
              license={image.copyright?.license?.license ?? ''}
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
                    stringToCopy={figureApa7CopyString(
                      image.title,
                      undefined,
                      undefined,
                      `/concepts/${conceptId}`,
                      image.copyright,
                      image.copyright?.license?.license,
                      config.ndlaFrontendDomain,
                      t,
                    )}
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

interface VisualElementContentProps {
  visualElement: GQLVisualElement;
}
export const VisualElementContent = ({
  visualElement,
}: VisualElementContentProps) => {
  const { t } = useTranslation();
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
            <img
              src={
                visualElement?.brightcove?.cover ||
                visualElement?.h5p?.thumbnail
              }
              alt={visualElement.brightcove?.caption ?? ''}
            />
          </MediaListItemImage>
          <MediaListItemBody
            license={visualElement?.copyright?.license?.license ?? ''}
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
                  stringToCopy={
                    visualElement?.h5p?.copyText ||
                    visualElement?.brightcove?.copyText ||
                    ''
                  }
                />
              </div>
            </MediaListItemActions>
          </MediaListItemBody>
        </MediaListItem>
      </MediaList>
    </>
  );
};

interface OembedContentProps {
  oembed: string;
}

export const OembedContent = ({ oembed }: OembedContentProps) => {
  const { t } = useTranslation();
  return (
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
};
