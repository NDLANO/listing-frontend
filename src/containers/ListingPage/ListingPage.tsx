/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router';
import { Spinner } from '@ndla/ui';
import qs from 'query-string';
import { mapTagsToFilters, filterTags } from '../../util/listingHelpers';
import ListingContainer from './ListingContainer';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { listingPageQuery } from '../../queries';
import { GQLListingPageQuery } from '../../graphqlTypes';

interface Props {
  isOembed: boolean;
}

const getSubjectsString = (
  subjects: string | string[] | number | boolean | undefined | null,
) => {
  if (
    !subjects ||
    typeof subjects === 'number' ||
    typeof subjects === 'boolean'
  ) {
    return;
  }

  return typeof subjects === 'string' ? subjects : subjects.join(',');
};

const ListingPage = ({ isOembed }: Props): JSX.Element => {
  const location = useLocation();
  const searchParams = qs.parse(location.search, { arrayFormat: 'bracket' });
  const querySubjects = getSubjectsString(searchParams['subjects']);
  const { data, loading, previousData } = useQuery<GQLListingPageQuery>(
    listingPageQuery,
    {
      variables: {
        listingPageSubjects: querySubjects,
      },
    },
  );

  if (loading && !data && !previousData) return <Spinner />;

  if (!loading && (!data?.listingPage?.subjects || !data?.listingPage?.tags)) {
    return <NotFoundPage />;
  }

  const filters = mapTagsToFilters(
    data?.listingPage?.tags ?? previousData?.listingPage?.tags ?? [],
  );
  const filteredTags = filterTags(
    data?.listingPage?.tags ?? previousData?.listingPage?.tags ?? [],
  );

  return (
    <ListingContainer
      isOembed={isOembed}
      subjects={
        data?.listingPage?.subjects ?? previousData?.listingPage?.subjects ?? []
      }
      tags={filteredTags}
      filters={filters}
      location={location}
    />
  );
};

export default ListingPage;
