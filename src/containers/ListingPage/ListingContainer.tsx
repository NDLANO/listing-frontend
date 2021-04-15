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
import { conceptSearchQuery } from '../../queries';
import { Location } from '../../interfaces';

//const PAGE_SIZE = 100;

interface Props {
  isOembed: boolean;
  subjects: string[];
  filters: any;
  location: Location;
  locale: string;
}

const ListingContainer = ({
  isOembed,
  subjects,
  filters,
  location,
  locale,
}: Props) => {
  const [page, setPage] = useState(1);
  const [selectedListFilter, setSelectedListFilter] = useState(null);
  //const [selectedConcept, setSelectedConcept] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [queryParams, setQueryParams] = useQueryParameter({
    subjects: [],
    filters: [],
    concept: null,
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

  const { data, previousData, loading } = useQuery(conceptSearchQuery, {
    variables: {
      query: debouncedSearchVal,
      subjects: queryParams.subjects.join(),
      language: locale,
    },
  });

  const handleSelectItem = (value: any) => {
    //setSelectedConcept(value);
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
    setSelectedListFilter(null);
    setPage(1);
  };

  const handleChangeListFilter = (value: any) => {
    setQueryParams({
      subjects: [],
      filters: [value],
    });
    setSelectedListFilter(value);
    setPage(1);
  };

  const handleRemoveFilter = () => {
    setQueryParams({
      ...queryParams,
      filters: [],
    });
    setSelectedListFilter(null);
  };

  const handleChangeFilters = (_: any, values: string[]) => {
    setQueryParams({
      ...queryParams,
      filters: values,
    });
    setPage(1);
  };

  const onLoadMoreClick = () => {
    //getConcepts(page + 1);
    setPage(page + 1);
  };

  console.log(loading);
  console.log(data);

  return (
    <ListingView
      isOembed={isOembed}
      loading={loading}
      totalCount={123}
      concepts={data?.conceptSearch || previousData?.conceptSearch}
      subjects={subjects}
      filters={filters}
      selectedSubjects={queryParams.subjects}
      selectedFilters={queryParams.filters}
      selectedConcept={queryParams.concept}
      selectedListFilter={selectedListFilter}
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
