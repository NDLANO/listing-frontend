/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import { useQuery } from '@apollo/client';

// @ts-ignore
import { mapTagsToFilters } from '../../util/listingHelpers';
import ListingContainer from './ListingContainer';
// @ts-ignore
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { conceptPageQuery } from '../../queries';
import { Location, ListingPage } from '../../interfaces';

interface Props {
  isOembed: boolean;
  locale: string;
  location: Location;
}

const ListingPage = ({ locale, location, isOembed }: Props) => {

  const { data, loading } = useQuery<ListingPage>(conceptPageQuery);

  if (loading) return null;
  if (!data) return <NotFoundPage/>;

  const filteredTags = data.conceptPage.tags.filter(tag => tag.match(/.+:(.+)?:(.+)?/));
  const filters = mapTagsToFilters(filteredTags);

  return (
    <ListingContainer
      isOembed={isOembed}
      subjects={data.conceptPage.subjects}
      tags={filteredTags}
      filters={filters}
      location={location}
      locale={locale}
    />
  );
};

export default ListingPage;
