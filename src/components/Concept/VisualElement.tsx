/*
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { gql } from '@apollo/client';
import styled from '@emotion/styled';
import { colors, fonts, spacing } from '@ndla/core';
import { getLicenseByAbbreviation, LicenseByline } from '@ndla/licenses';
import { Image, ImageCrop, ImageFocalPoint, ImageLink } from '@ndla/ui';
import {
  GQLImageElement,
  GQLListingVisualElementFragment,
} from '../../graphqlTypes';

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
  language: string;
  visualElement: GQLListingVisualElementFragment;
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
          <LicenseByline locale={language} licenseRights={rights} />
          {authors.map((author, i) => (
            <span key={`author-${i}`}>{author.name}</span>
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
        src={visualElement.brightcove.iframe?.src || visualElement.url}
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

VisualElement.fragments = {
  visualElement: gql`
    fragment ListingVisualElement on VisualElement {
      url
      title
      oembed {
        fullscreen
        html
        title
      }
      brightcove {
        iframe {
          src
        }
      }
      image {
        contentType
        src
        altText
        focalX
        focalY
        lowerRightX
        lowerRightY
        upperLeftX
        upperLeftY
      }
      # h5p src is only included so we receive a h5p property from GQL
      h5p {
        src
      }
      copyright {
        license {
          license
        }
        creators {
          name
        }
        rightsholders {
          name
        }
      }
    }
  `,
};

export default VisualElement;
