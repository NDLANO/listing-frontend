/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import ListingView from './ListingView';
// @ts-ignore
import useQueryParameter from '../../util/useQueryParameter';
// @ts-ignore
import { getTagsParameter } from '../../util/listingHelpers';
import { conceptSearchQuery } from '../../queries';
import { Location, Subject, Filter, ListItem, ConceptSearch } from '../../interfaces';

const PAGE_SIZE = 100;

interface Props {
  isOembed: boolean;
  subjects: Subject[];
  tags: string[];
  filters: Map<string, Filter>;
  location: Location;
  locale: string;
}

const ListingContainer = ({
  isOembed,
  subjects,
  tags,
  filters,
  location,
  locale,
}: Props) => {
  const [searchValue, setSearchValue] = useState('');
  const [queryParams, setQueryParams] = useQueryParameter({
    subjects: [],
    filters: [],
    concept: undefined,
  });

  const useDebounce = (val: string, delay: number) => {
    const [debouncedVal, setDebouncedVal] = useState(val);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedVal(val);
      }, delay);
      return () => clearTimeout(handler);
    }, [val, delay]);
    return `${debouncedVal}*`;
  };
  const debouncedSearchVal = useDebounce(searchValue, 200);

  const { data, previousData, loading, fetchMore } = useQuery<ConceptSearch>(
    conceptSearchQuery,
    {
      variables: {
        query: debouncedSearchVal,
        subjects: queryParams.subjects.join(),
        tags: getTagsParameter(tags, queryParams.filters),
        pageSize: PAGE_SIZE.toString(),
        exactMatch: false,
        language: locale,
      },
      notifyOnNetworkStatusChange: true,
    },
  );

  const handleSelectItem = (value: ListItem) => {
    setQueryParams({
      ...queryParams,
      concept: value?.id,
    });
  };

  const handleChangeSubject = (values: string[]) => {
    setQueryParams({
      subjects: values,
      filters: [],
    });
  };

  const handleChangeListFilter = (value: string | null) => {
    setQueryParams({
      subjects: [],
      filters: [value],
    });
  };

  const handleRemoveFilter = () => {
    setQueryParams({
      ...queryParams,
      filters: [],
    });
  };

  const handleChangeFilters = (_: string, values: string[]) => {
    setQueryParams({
      ...queryParams,
      filters: values,
    });
  };

  const onLoadMoreClick = () => {
    if (data) {
      fetchMore({
        variables: {
          page: `${Math.floor(
            data.conceptSearch.concepts.length / PAGE_SIZE + 1,
          )}`,
        },
      });
    }
  };

  const totalCount =
    data?.conceptSearch?.totalCount || previousData?.conceptSearch?.totalCount;
  const concepts =
    data?.conceptSearch?.concepts || previousData?.conceptSearch?.concepts;
  const showLoadMore = concepts && totalCount && concepts.length < totalCount;

  return (
    <ListingView
      isOembed={isOembed}
      loading={loading}
      showLoadMore={!!showLoadMore}
      totalCount={totalCount || 0}
      concepts={concepts || []}
      subjects={subjects}
      filters={filters}
      selectedSubjects={queryParams.subjects}
      selectedFilters={queryParams.filters}
      selectedConcept={queryParams.concept}
      selectedListFilter={queryParams.filters?.[0]}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      onLoadMoreClick={onLoadMoreClick}
      handleSelectItem={handleSelectItem}
      handleChangeListFilter={handleChangeListFilter}
      handleRemoveFilter={handleRemoveFilter}
      handleChangeSubject={handleChangeSubject}
      handleChangeFilters={handleChangeFilters}
      location={location}
      locale={locale}
    />
  );
};

export default ListingContainer;
