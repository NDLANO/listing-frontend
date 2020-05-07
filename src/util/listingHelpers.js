/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

export function mapTagsToFilters(tags) {
  const filters = new Map();
  tags
    .filter(tag => tag.match(/.+:?.+:?.+/))
    .forEach(tag => {
      const [list, main, sub] = tag.split(':');
      if (!filters.has(list)) {
        filters.set(list, {
          main: main ? [main] : [],
          sub: sub ? [sub] : [],
        });
      } else {
        main &&
          !filters.get(list).main.includes(main) &&
          filters.get(list).main.push(main);
        sub &&
          !filters.get(list).sub.includes(sub) &&
          filters.get(list).sub.push(sub);
      }
    });
  return filters;
}

function mapTagsToList(tags) {
  const list = [];
  tags.forEach(tag => {
    tag.split(':').forEach(filter => list.push(filter));
  });
  return list;
}

export function mapConceptToListItem(concept, subject) {
  return {
    id: concept.id.toString(),
    name: concept.title.title,
    description: concept.content.content,
    image: concept.metaImage.url,
    subject: [
      {
        title: subject.name,
        value: subject.id,
      },
    ],
    category: {
      title: '',
      value: '',
    },
    filters: concept.tags ? mapTagsToList(concept.tags.tags) : [],
  };
}

export function sortConcepts(concepts, locale) {
  return concepts.sort((a, b) =>
    a.title.title.localeCompare(b.title.title, locale),
  );
}
