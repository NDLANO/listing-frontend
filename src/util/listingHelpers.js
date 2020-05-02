/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

export function mapTagsToFilters(tags) {
  const filters = {
    main: [],
    sub: [],
  };
  tags.forEach(tag => {
    const splitTag = tag.split(':');
    if (splitTag.length > 1) {
      if (!filters.main.includes(splitTag[0])) filters.main.push(splitTag[0]);
      if (!filters.sub.includes(splitTag[1])) filters.sub.push(splitTag[1]);
    }
  });
  return filters;
}

export function mapConceptToListItem(concept) {
  return {
    id: concept.id.toString(),
    name: concept.title.title,
    description: concept.content.content,
    image: concept.metaImage.url,
    category: {
      title: '',
      value: '',
    },
    filters: concept.tags
      ? mapTagsToFilters(concept.tags.tags)
      : { main: [], sub: [] },
  };
}

export function sortConcepts(concepts, locale) {
  return concepts.sort((a, b) =>
    a.title.title.localeCompare(b.title.title, locale))
}
