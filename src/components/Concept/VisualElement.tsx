import React from 'react';
import Image from '@ndla/ui/lib/Image';
import { GQLVisualElement, GQLImageElement } from '../../graphqlTypes';

export const getIframeSrcFromHtmlString = (
  html: string,
): string | undefined => {
  const el = document.createElement('html');
  el.innerHTML = html;
  const iframe = el.getElementsByTagName('iframe')[0];
  return iframe?.getAttribute('src') || undefined;
};

const getFocalPoint = (visualElement: GQLImageElement): object | undefined => {
  if (visualElement.focalX && visualElement.focalY) {
    return { x: visualElement.focalX, y: visualElement.focalY };
  }
  return undefined;
};

const getCrop = (visualElement: GQLImageElement): object | undefined => {
  if (
    (visualElement.lowerRightX &&
      visualElement.lowerRightY &&
      visualElement.upperLeftX &&
      visualElement.upperLeftY) !== null
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

interface Props {
  visualElement: GQLVisualElement;
}

const VisualElement = ({ visualElement }: Props): JSX.Element | null => {
  if (visualElement.image) {
    return (
      <Image
        alt={visualElement.image.altText}
        contentType={visualElement.image.contentType}
        crop={getCrop(visualElement.image)}
        focalPoint={getFocalPoint(visualElement.image)}
        src={visualElement.image.src}
      />
    );
  } else if (visualElement.brightcove) {
    return (
      <iframe
        allowFullScreen={true}
        frameBorder="0"
        height={400}
        src={visualElement.brightcove.iframe?.src}
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
