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

export function mapConceptToListItem(concept) {
  return {
    id: concept.id.toString(),
    name: concept.title,
    description: concept.content,
    image: concept.metaImage?.url
      ? `${concept.metaImage.url}?width=200`
      : undefined,
    subjectIds: concept.subjectIds,
    category: {
      title: '',
      value: '',
    },
    filters: concept.tags ? mapTagsToList(concept.tags) : [],
  };
}

export const getTagsParameter = (tags, filters) => {
  return tags.filter(tag => {
    const splitTag = tag.split(':');
    return filters.every(filter => splitTag.includes(filter)) ||
    splitTag.every(st => filters.includes(st));
  }).join();
}

export const isValidListeUrl = url =>
  /^(https?:\/\/)?(www\.)?liste(\.?(test|staging))?\.ndla\.no\/\?concept=\d+$/.test(
    url,
  );
