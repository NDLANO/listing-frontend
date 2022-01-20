/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import { useQuery } from '@apollo/client';
import { Location } from 'history';
import { Spinner } from '@ndla/ui';
import { mapTagsToFilters, filterTags } from '../../util/listingHelpers';
import ListingContainer from './ListingContainer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { listingPageQuery } from '../../queries';
import { GQLListingPageQuery } from '../../graphqlTypes';

interface Props {
  isOembed: boolean;
  location: Location;
}

const ListingPage = ({ location, isOembed }: Props): JSX.Element => {
  const { data, loading } = useQuery<GQLListingPageQuery>(listingPageQuery);

  if (loading) return <Spinner />;
  if (!data?.listingPage?.subjects || !data?.listingPage?.tags) {
    return <NotFoundPage />;
  }

  const filters = mapTagsToFilters(data.listingPage.tags);
  const filteredTags = filterTags(data.listingPage.tags);

  return (
    <ListingContainer
      isOembed={isOembed}
      subjects={data.listingPage.subjects}
      tags={filteredTags}
      filters={filters}
      location={location}
    />
  );
};

export default ListingPage;
