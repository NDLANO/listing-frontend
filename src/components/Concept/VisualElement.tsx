import React from 'react';
import Image from '@ndla/ui/lib/Image';
import { ImageType, VisualElementType } from '../../interfaces';

export const getIframeSrcFromHtmlString = (
  html: string,
): string | undefined => {
  const el = document.createElement('html');
  el.innerHTML = html;
  const iframe = el.getElementsByTagName('iframe')[0];
  return iframe?.getAttribute('src') || undefined;
};

const getFocalPoint = (visualElement: ImageType): object | undefined => {
  if (visualElement.focalX && visualElement.focalY) {
    return { x: visualElement.focalX, y: visualElement.focalY };
  }
  return undefined;
};

const getCrop = (visualElement: ImageType): object | undefined => {
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
  visualElement: VisualElementType;
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
        frameBorder="0"
        height={visualElement.brightcove.iframe?.height}
        src={visualElement.brightcove.iframe?.src}
        title={visualElement.title}
        width={visualElement.brightcove.iframe?.width}
      />
    );
  } else if (visualElement.h5p) {
    return (
      <iframe
        allowFullScreen={true}
        frameBorder="0"
        height={400}
        src={getIframeSrcFromHtmlString(visualElement.h5p.src!)}
        title={visualElement.h5p.title}
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
