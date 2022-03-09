/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import { GQLListingViewConceptFragment } from '../graphqlTypes';

export function filterTags(tags: string[]) {
  return tags.filter(tag => tag.match(/.+:(.+)?:(.+)?/));
}

export function mapTagsToFilters(tags?: string[]) {
  const filteredTags = tags?.filter(tag => tag.match(/.+:(.+)?:(.+)?/)) ?? [];

  const filters = filteredTags.reduce<
    Record<string, { main: string[]; sub: string[] }>
  >((acc, curr) => {
    const [list, main, sub] = curr.split(':');
    if (!list) return acc;

    if (!acc[list]) {
      acc[list] = { main: main ? [main] : [], sub: sub ? [sub] : [] };
      return acc;
    }

    if (main && acc[list] && !acc[list]?.main.includes(main)) {
      acc[list]?.main.concat(main);
    }
    if (sub && acc[list] && !acc[list]?.sub.includes(sub)) {
      acc[list]?.sub.concat(sub);
    }
    return acc;
  }, {});
  return filters;
}

export function mapConceptToListItem(concept: GQLListingViewConceptFragment) {
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
