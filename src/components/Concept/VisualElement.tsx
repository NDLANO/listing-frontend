import React from 'react';
import styled from '@emotion/styled';
import { colors, spacing, fonts } from '@ndla/core';
import { ImageCrop, ImageFocalPoint } from '@ndla/ui/lib/Image';
import { Image, ImageLink } from '@ndla/ui';
import { getLicenseByAbbreviation, LicenseByline } from '@ndla/licenses';
import { GQLVisualElement, GQLImageElement } from '../../graphqlTypes';

export const getIframeSrcFromHtmlString = (
  html: string,
): string | undefined => {
  const el = document.createElement('html');
  el.innerHTML = html;
  const iframe = el.getElementsByTagName('iframe')[0];
  return iframe?.getAttribute('src') || undefined;
};

const getFocalPoint = (
  visualElement: GQLImageElement,
): ImageFocalPoint | undefined => {
  if (visualElement.focalX && visualElement.focalY) {
    return { x: visualElement.focalX, y: visualElement.focalY };
  }
  return undefined;
};

const getCrop = (visualElement: GQLImageElement): ImageCrop | undefined => {
  if (
    visualElement.lowerRightX &&
    visualElement.lowerRightY &&
    visualElement.upperLeftX &&
    visualElement.upperLeftY
  ) {
    return {
      startX: visualElement.lowerRightX,
      startY: visualElement.lowerRightY,
      endX: visualElement.upperLeftX,
      endY: visualElement.upperLeftY,
    };
  }
  return undefined;
};

const LicensesWrapper = styled.div`
  border-top: 1px solid ${colors.brand.tertiary};
  padding-top: ${spacing.small};
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  position: aboslute;
  left: ${spacing.xsmall};
  width: 100%;
  > span {
    margin-right: ${spacing.xsmall};
    color: ${colors.text.light};
    ${fonts.sizes('14px', 1.1)};
    padding-bottom: ${spacing.xsmall};
    font-family: ${fonts.serif};
    padding-bottom: 3px;
    padding-top: 3px;
    margin-top: -4px;
    &:not(:last-child) {
      padding-right: ${spacing.xsmall};
      border-right: 1px solid ${colors.brand.greyLight};
    }
  }
`;

interface Props {
  visualElement: GQLVisualElement;
  language: string;
}

const VisualElement = ({
  visualElement,
  language,
}: Props): JSX.Element | null => {
  if (visualElement.image) {
    const { rights } = getLicenseByAbbreviation(
      visualElement.copyright?.license?.license || '',
      'nb',
    );
    const authors =
      visualElement.copyright?.creators ||
      visualElement.copyright?.rightsholders ||
      [];
    const crop = getCrop(visualElement.image);
    return (
      <>
        <ImageLink src={visualElement.image.src} crop={crop}>
          <Image
            alt={visualElement.image.altText}
            contentType={visualElement.image.contentType}
            crop={crop}
            focalPoint={getFocalPoint(visualElement.image)}
            src={visualElement.image.src}
          />
        </ImageLink>
        <LicensesWrapper>
          <LicenseByline
            locale={language}
            color="#fff"
            licenseRights={rights}
          />
          {authors.map(author => (
            <span>{author.name}</span>
          ))}
        </LicensesWrapper>
      </>
    );
  } else if (visualElement.brightcove) {
    return (
      <iframe
        allowFullScreen={true}
        frameBorder="0"
        height={400}
        src={visualElement.url}
        title={visualElement.title}
        width={600}
      />
    );
  } else if (visualElement.h5p) {
    return (
      <iframe
        allowFullScreen={true}
        frameBorder="0"
        height={400}
        src={visualElement.url}
        title={visualElement.title}
        width={600}
      />
    );
  } else if (visualElement.oembed) {
    return (
      <iframe
        allowFullScreen={visualElement.oembed.fullscreen || true}
        frameBorder="0"
        height={400}
        src={getIframeSrcFromHtmlString(visualElement.oembed.html!)}
        title={visualElement.oembed.title}
        width={600}
      />
    );
  }
  return null;
};

export default VisualElement;
