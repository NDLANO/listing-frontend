/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import { GQLConcept } from '../graphqlTypes';

export function filterTags(tags: string[]) {
  return tags.filter(tag => tag.match(/.+:(.+)?:(.+)?/));
}

export function mapTagsToFilters(tags: string[]) {
  const fitleredTags = filterTags(tags);
  const filters = new Map();
  fitleredTags.forEach(tag => {
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

export function mapConceptToListItem(concept: GQLConcept) {
  return {
    id: concept?.id?.toString(),
    name: concept.title ?? '',
    description: concept.content ?? '',
    image: concept.metaImage?.url
      ? `${concept.metaImage.url}?width=200`
      : undefined,
    category: {
      title: '',
      value: '',
    },
    filters: concept.tags?.flatMap(tag => tag.split(':')) ?? [],
  };
}

export const getTagsParameter = (tags: string[], filters?: string[]) => {
  return filters?.length
    ? tags
        .filter(tag => {
          const splitTag = tag.split(':');
          return (
            filters.every(filter => splitTag.includes(filter)) ||
            splitTag.every(st => filters.includes(st))
          );
        })
        .join()
    : undefined;
};

export const isListeParamUrl = (url: string) =>
  /^(https:\/\/)?liste(\.test|\.staging)?\.ndla\.no\/(nn\/|nb\/)?\?concept=\d+$/.test(
    url,
  );

export const isListePathUrl = (url: string) =>
  /^(https:\/\/)?liste(\.test|\.staging)?\.ndla\.no\/(nn\/|nb\/)?concepts\/\d+$/.test(
    url,
  );
