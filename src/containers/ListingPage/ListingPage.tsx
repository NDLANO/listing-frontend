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
import { Spinner } from '@ndla/ui';

// @ts-ignore
import { mapTagsToFilters, filterTags } from '../../util/listingHelpers';
import ListingContainer from './ListingContainer';
// @ts-ignore
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { listingPageQuery } from '../../queries';
import { Location, ListingPageType } from '../../interfaces';

interface Props {
  isOembed: boolean;
  locale: string;
  location: Location;
}

const ListingPage = ({ locale, location, isOembed }: Props): JSX.Element => {
  const { data, loading } = useQuery<ListingPageType>(listingPageQuery);

  if (loading) return <Spinner />;
  if (!data) return <NotFoundPage />;

  const filters = mapTagsToFilters(data.listingPage.tags);
  const filteredTags = filterTags(data.listingPage.tags);

  return (
    <ListingContainer
      isOembed={isOembed}
      subjects={data.listingPage.subjects}
      tags={filteredTags}
      filters={filters}
      location={location}
      locale={locale}
    />
  );
};

export default ListingPage;
