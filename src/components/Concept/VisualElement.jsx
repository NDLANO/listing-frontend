
import { NotionDialogImage } from '@ndla/notion';
import React from 'react';
import PropTypes from 'prop-types';
import { fetch, resolveJsonOrRejectWithError } from '../../util/apiHelpers'

const reduceElementDataAttributes = (el, filter) => {
  if (!el.attributes) return null;
  let attrs = [].slice.call(el.attributes).filter(a => a.name !== 'style');
  if (filter) attrs = attrs.filter(a => filter.includes(a.name));
  const obj = attrs.reduce(
    (all, attr) =>
      Object.assign({}, all, { [attr.name.replace('data-', '')]: attr.value }),
    {},
  );
  return obj;
};

const parseEmbedTag = embedTag => {
  if (embedTag === '') {
    return undefined;
  }
  const el = document.createElement('html');
  el.innerHTML = embedTag;
  const embedElements = el.getElementsByTagName('embed');
  if (embedElements.length !== 1) {
    return undefined;
  }

  const obj = reduceElementDataAttributes(embedElements[0]);
  delete obj.id;
  return obj;
}

// TODO Flytte ut til en api fil?
const fetchImage = async url => {
  const res = await fetch(url);
  const resolved = resolveJsonOrRejectWithError(res);
  return resolved;
}

const VisualElement = (visualElement) => {
    if (!visualElement) return null;
    const parsedElement = parseEmbedTag(visualElement.visualElement);
    if (parsedElement?.resource === "image") {
      const image = fetchImage(parsedElement.url);
      // TODO: Fiks slik at image faktisk resolver og man kan hente ut imageUrl
      return <NotionDialogImage src={image.imageUrl} alt={parsedElement.alt} />
    // TODO: Håndtere og teste forskjellige typer visuelt element
    } if (parsedElement?.resource) {
        return <iframe title={"visual element"} src={parsedElement.url} alt={parsedElement.alt} />
    }
    return null;
}

VisualElement.propTypes = {
    visualElement: PropTypes.shape({
      visualElement: PropTypes.string,
    }),
}

export default VisualElement;
