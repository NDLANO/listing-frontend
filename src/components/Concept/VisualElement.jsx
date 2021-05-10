import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Image from '@ndla/ui/lib/Image';
import loadVisualElement from '../../util/loadVisualElement';
import { fetchOembed } from '../../api/oembed-proxy/oembedProxyApi';
import { fetchImage } from '../../api/image/imageApi';

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

const VisualElement = visualElement => {
  const [element, setElement] = useState(null);
  useEffect(() => {
    async function getVisualElement() {
      const parsedElement = await loadVisualElement(
        visualElement.visualElement,
      );
      const data = parsedElement('embed').data();
      if (data?.resource === 'image') {
        const image = await fetchImage(data.resourceId);
        const focalPoint = getFocalPoint(data);
        const crop = getCrop(data);

        setElement(
          <Image
            alt={data?.alt}
            contentType={image.contentType}
            crop={crop}
            focalPoint={focalPoint}
            src={`${image.imageUrl}`}
          />,
        );
      }
      if (data?.resource === 'brightcove') {
        const src = `https://players.brightcove.net/${data.account}/${data.player}_default/index.html?videoId=${data.videoid}`;
        setElement(
          <iframe
            frameBorder="0"
            height={400}
            src={src}
            title={data.title}
            width={600}
          />,
        );
      }
      if (data?.resource === 'h5p' || data?.resource === 'external') {
        const oembed = await fetchOembed(data.url);
        const url = getIframeSrcFromHtmlString(oembed.html);
        setElement(
          <iframe
            allowFullScreen={oembed.fullscreen || true}
            frameBorder="0"
            height={400}
            src={url}
            title={oembed.title}
            width={600}
          />,
        );
      }
    }
    getVisualElement();
  }, [visualElement.visualElement]);

  if (!element) return null;
  return element;
};

VisualElement.propTypes = {
  visualElement: PropTypes.string,
};

export default VisualElement;