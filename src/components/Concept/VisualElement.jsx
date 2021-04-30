import React from 'react';
import PropTypes from 'prop-types';
import Image from '@ndla/ui/lib/Image';

export const getIframeSrcFromHtmlString = html => {
  const el = document.createElement('html');
  el.innerHTML = html;
  const iframe = el.getElementsByTagName('iframe')[0];
  return iframe.getAttribute('src');
};

const getFocalPoint = data => {
  if (data.focalX && data.focalY) {
    return { x: data.focalX, y: data.focalY };
  }
  return undefined;
};

const getCrop = data => {
  if (
    (data.lowerRightX &&
      data.lowerRightY &&
      data.upperLeftX &&
      data.upperLeftY) !== undefined
  ) {
    return {
      startX: data.lowerRightX,
      startY: data.lowerRightY,
      endX: data.upperLeftX,
      endY: data.upperLeftY,
    };
  }
  return undefined;
};

const VisualElement = ({ visualElement }) => {
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

VisualElement.propTypes = {
  visualElement: PropTypes.string,
};

export default VisualElement;
