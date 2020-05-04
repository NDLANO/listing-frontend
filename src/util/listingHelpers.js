/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

export function mapTagsToFilters(tags) {
  const filters = new Map()
  tags.forEach(tag => {
    const [list, main, sub] = tag.split(':');
    if (!filters.has(list)) {
      filters.set(list, {
        main: main ? [main] : [],
        sub: sub ? [sub] : []
      })
    }
    else {
      main && filters.get(list).main.push(main);
      sub && filters.get(list).sub.push(sub)
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
      : { list: [], main: [], sub: [] },
  };
}

export function sortConcepts(concepts, locale) {
  return concepts.sort((a, b) =>
    a.title.title.localeCompare(b.title.title, locale))
}
