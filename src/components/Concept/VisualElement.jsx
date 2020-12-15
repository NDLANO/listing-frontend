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
            focalPoint={focalPoint}
            contentType={image.contentType}
            crop={crop}
            alt={data?.alt}
            src={`${image.imageUrl}`}
          />,
        );
      }
      if (data?.resource === 'brightcove') {
        const src = `https://players.brightcove.net/${data.account}/${data.player}_default/index.html?videoId=${data.videoid}`;
        setElement(
          <iframe
            title={data.title}
            src={src}
            width={data.width || 600}
            height={data.height || 400}
          />,
        );
      }
      if (data?.resource === 'external' && data?.url?.includes('youtu')) {
        const youtubeEmbedUrl = `https://www.youtube.com/embed/${data.url
          .split('/')
          .pop()
          .split('v=')
          .pop()}?`;
        setElement(
          <iframe
            src={youtubeEmbedUrl}
            width={data.width || 600}
            height={data.height || 400}
            title={data.title}
            allowFullScreen={data.fullscreen || true}
            frameBorder="0"
          />,
        );
      }
      if (data?.resource === 'h5p') {
        const oembed = await fetchOembed(data.url);
        const url = getIframeSrcFromHtmlString(oembed.html);
        setElement(
          <iframe
            src={url}
            width={oembed.width || 600}
            height={oembed.height || 400}
            title={oembed.title}
            allowFullScreen={oembed.fullscreen || true}
            frameBorder="0"
          />,
        );
      }
    }
    getVisualElement();
  }, []);

  if (!element) return null;
  return element;
};

VisualElement.propTypes = {
  visualElement: PropTypes.string,
};

export default VisualElement;
