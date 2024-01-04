/**
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { TFunction } from "i18next";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { gql } from "@apollo/client";
import { StyledButton, ButtonV2 } from "@ndla/button";
import { FileDocumentOutline } from "@ndla/icons/common";
import { figureApa7CopyString, metaTypes } from "@ndla/licenses";
import Modal, { ModalBody, ModalCloseButton, ModalHeader } from "@ndla/modal";
import Tabs from "@ndla/tabs";
import {
  MediaList,
  MediaListItem,
  MediaListItemBody,
  MediaListItemActions,
  MediaListItemImage,
  MediaListItemMeta,
} from "@ndla/ui";
import CopyTextButton from "./CopyTextButton";
import config from "../config";
import {
  GQLConceptCopyright,
  GQLCopyright,
  GQLCopyrightInfoFragment,
  GQLLicenseBoxConceptCopyrightFragment,
  GQLLicenseBoxConceptFragment,
  GQLVisualElement,
} from "../graphqlTypes";
import { copyrightInfoFragment } from "../queries";
import { downloadUrl } from "../util/downloadHelpers";
import formatDate from "../util/formatDate";

interface LicenseItemEntity {
  title?: string;
  copyright?: Partial<GQLCopyright> | Partial<GQLConceptCopyright>;
}
const getLicenseItems = (entity: LicenseItemEntity, t: TFunction) => {
  const licenseItems = [];

  entity.title &&
    licenseItems.push({
      label: t("license.title"),
      description: entity.title,
      metaType: metaTypes.title,
    });

  entity.copyright?.creators?.length &&
    licenseItems.push({
      label: t("license.originator"),
      description: entity.copyright.creators.map((author) => author.name).toString(),
      metaType: metaTypes.author,
    });

  entity.copyright?.rightsholders?.length &&
    licenseItems.push({
      label: t("license.rightsholder"),
      description: entity.copyright.rightsholders.map((holder) => holder.name).toString(),
      metaType: metaTypes.copyrightHolder,
    });

  return licenseItems;
};

interface TextContentProps {
  locale: string;
  concept: GQLLicenseBoxConceptFragment;
}

export const TextContent = ({ concept, locale }: TextContentProps) => {
  const { t } = useTranslation();
  const licenseItems = getLicenseItems(concept, t);

  concept?.created &&
    licenseItems.push({
      label: t("license.published"),
      description: formatDate(concept.created, locale),
      metaType: metaTypes.other,
    });

  return (
    <>
      <div className="u-introduction">
        <h2>{t("license.text.heading")}</h2>
        <p>{t("license.text.description")}</p>
      </div>
      <MediaList>
        <MediaListItem>
          <MediaListItemImage>
            <FileDocumentOutline className="c-medialist__icon" />
          </MediaListItemImage>
          <MediaListItemBody
            license={concept.copyright?.license?.license ?? ""}
            title={t("license.text.rules")}
            resourceUrl=""
            locale="nb"
            resourceType="text"
          >
            <MediaListItemActions>
              <div className="c-medialist__ref">
                <MediaListItemMeta items={licenseItems} />
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
  copyright?: GQLLicenseBoxConceptCopyrightFragment | GQLCopyrightInfoFragment;
  title?: string;
}
interface ImageContentProps {
  images: ImageContentItem[];
  conceptId: number;
}

export const ImageContent = ({ images, conceptId }: ImageContentProps) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const AnchorButton = StyledButton.withComponent("a");
  return (
    <>
      <div className="u-introduction">
        <h2>{t("license.images.heading")}</h2>
        <p>{t("license.images.description")}</p>
      </div>
      <MediaList>
        {images.map((image) => (
          <MediaListItem key={image.src}>
            <MediaListItemImage>
              <img src={`${image.src}?width=200`} alt={image.altText} />
            </MediaListItemImage>
            <MediaListItemBody
              license={image.copyright?.license?.license ?? ""}
              title={t("license.images.rules")}
              resourceUrl=""
              locale="nb"
              resourceType="image"
            >
              <MediaListItemActions>
                <div className="c-medialist__ref">
                  <MediaListItemMeta items={getLicenseItems(image, t)} />
                  {image.copyright?.license?.license !== "COPYRIGHTED" && (
                    <>
                      <CopyTextButton
                        hasCopiedTitle={t("license.hasCopiedTitle")}
                        copyTitle={t("license.copyTitle")}
                        stringToCopy={figureApa7CopyString(
                          image.title,
                          undefined,
                          undefined,
                          `/concepts/${conceptId}`,
                          image.copyright,
                          image.copyright?.license?.license,
                          config.ndlaFrontendDomain,
                          t,
                          language,
                        )}
                      />
                      <AnchorButton href={downloadUrl(image.src)} appearance="outline" download>
                        {t("license.download")}
                      </AnchorButton>
                    </>
                  )}
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
export const VisualElementContent = ({ visualElement }: VisualElementContentProps) => {
  const { t } = useTranslation();
  const resourceType = visualElement.resource === "h5p" ? "h5p" : "video";
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
              src={visualElement?.brightcove?.cover || visualElement?.h5p?.thumbnail}
              alt={visualElement.brightcove?.caption ?? ""}
            />
          </MediaListItemImage>
          <MediaListItemBody
            license={visualElement?.copyright?.license?.license ?? ""}
            title={t(`license.${resourceType}.rules`)}
            resourceUrl=""
            locale="nb"
            resourceType={resourceType}
          >
            <MediaListItemActions>
              <div className="c-medialist__ref">
                <MediaListItemMeta items={licenseItems} />
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
      <h2>{t("license.concept.embedlink.heading")}</h2>
      <p>{t("license.concept.embedlink.description")}</p>
      <CopyTextButton
        copyTitle={t("license.concept.embedlink.copyTitle")}
        hasCopiedTitle={t("license.concept.embedlink.hasCopiedTitle")}
        stringToCopy={oembed}
      />
    </>
  );
};

const getTabImages = (concept: GQLLicenseBoxConceptFragment) => {
  if (!concept) return;
  const images: ImageContentItem[] = [];
  if (concept.image?.src?.length) {
    images.push(concept.image);
  }
  if (concept.visualElement?.image?.src?.length && concept.visualElement?.image?.src !== concept.image?.src) {
    images.push({
      ...concept.visualElement.image,
      title: concept.visualElement.title,
      copyright: concept.visualElement.copyright,
    });
  }
  return images;
};

interface LicenseBoxProps {
  concept: GQLLicenseBoxConceptFragment;
  language: string;
}

export const LicenseBox = ({ concept, language }: LicenseBoxProps) => {
  const { t } = useTranslation();

  const tabs: { title: string; content: ReactNode }[] = [];
  const images = getTabImages(concept);
  concept.copyright?.license?.license &&
    concept.copyright.license.license !== "unknown" &&
    tabs.push({
      title: t("license.tabs.text"),
      content: <TextContent concept={concept} locale={language} />,
    });

  images?.length &&
    tabs.push({
      title: t("license.tabs.images"),
      content: <ImageContent images={images} conceptId={concept.id} />,
    });

  (concept.visualElement?.h5p || concept.visualElement?.brightcove) &&
    concept.visualElement?.copyright &&
    tabs.push({
      title: t(`license.tabs.${concept.visualElement.resource === "h5p" ? "h5p" : "video"}`),
      content: <VisualElementContent visualElement={concept.visualElement} />,
    });

  tabs.push({
    title: t("license.tabs.embedlink"),
    content: <OembedContent oembed={`${config.ndlaListingFrontendDomain}/concepts/${concept.id}`} />,
  });
  return (
    <Modal activateButton={<ButtonV2 variant="link">{t("article.useContent")}</ButtonV2>} size="medium">
      {(onClose) => (
        <>
          <ModalHeader modifier="no-bottom-padding">
            <ModalCloseButton onClick={onClose} title={t("modal.closeModal")} />
          </ModalHeader>
          <ModalBody>
            <>
              <h1>{t("license.heading")}</h1>
              <Tabs singleLine tabs={tabs} />
            </>
          </ModalBody>
        </>
      )}
    </Modal>
  );
};

const conceptCopyright = gql`
  fragment LicenseBoxConceptCopyright on ConceptCopyright {
    license {
      license
      url
    }
    creators {
      name
      type
    }
    processors {
      name
      type
    }
    rightsholders {
      name
      type
    }
    origin
  }
`;

LicenseBox.fragments = {
  concept: gql`
    fragment LicenseBoxConcept on Concept {
      id
      created
      title
      image {
        src
        altText
        title
        copyright {
          ...CopyrightInfo
        }
      }
      copyright {
        ...LicenseBoxConceptCopyright
      }
      visualElement {
        resource
        title
        copyright {
          ...CopyrightInfo
        }
        image {
          src
          altText
        }
        brightcove {
          cover
          caption
        }
        h5p {
          thumbnail
        }
      }
    }
    ${conceptCopyright}
    ${copyrightInfoFragment}
  `,
};
