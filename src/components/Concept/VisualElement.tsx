import React from 'react';
// @ts-ignore
import Image from '@ndla/ui/lib/Image';
import { VisualElement } from '../../interfaces';

export const getIframeSrcFromHtmlString = (html: string) => {
  const el = document.createElement('html');
  el.innerHTML = html;
  const iframe = el.getElementsByTagName('iframe')[0];
  return iframe?.getAttribute('src') || undefined;
};

const getFocalPoint = (visualElement: VisualElement) => {
  if (visualElement.focalX && visualElement.focalY) {
    return { x: visualElement.focalX, y: visualElement.focalY };
  }
  return undefined;
};

const getCrop = (visualElement: VisualElement) => {
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
  visualElement: VisualElement;
}

const VisualElement = ({ visualElement }: Props) => {
  if (visualElement.resource === 'image') {
    return (
      <Image
        alt={visualElement.alt}
        contentType={visualElement.image.contentType}
        crop={getCrop(visualElement)}
        focalPoint={getFocalPoint(visualElement)}
        src={visualElement.image.imageUrl}
      />
    );
  } else if (visualElement.resource === 'brightcove') {
    const src = `https://players.brightcove.net/${visualElement.account}/${visualElement.player}_default/index.html?videoId=${visualElement.videoid}`;
    return (
      <iframe
        frameBorder="0"
        height={400}
        src={src}
        title={visualElement.title}
        width={600}
      />
    );
  } else if (
    visualElement.resource === 'h5p' ||
    visualElement.resource === 'external'
  ) {
    return (
      <iframe
        allowFullScreen={visualElement.oembed.fullscreen || true}
        frameBorder="0"
        height={400}
        src={getIframeSrcFromHtmlString(visualElement.oembed.html)}
        title={visualElement.oembed.title}
        width={600}
      />
    );
  }
  return null;
};

export default VisualElement;
