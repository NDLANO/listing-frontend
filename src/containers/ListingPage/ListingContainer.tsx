/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { useState, useEffect, useCallback } from 'react';
import { gql, useQuery } from '@apollo/client';

import { useTranslation } from 'react-i18next';
import ListingView, { ListItemType } from './ListingView';
import useQueryParameter from '../../util/useQueryParameter';
import { getTagsParameter } from '../../util/listingHelpers';
import { Filter, ListItem } from '../../interfaces';
import {
  GQLListingContainerConceptSearchQuery,
  GQLListingContainerConceptSearchQueryVariables,
  GQLListingContainerSubjectFragment,
} from '../../graphqlTypes';

const PAGE_SIZE = 40;

interface GQLProps {
  subjects: GQLListingContainerSubjectFragment[];
}
interface Props extends GQLProps {
  isOembed: boolean;
  tags: string[];
  filters: Record<string, Filter>;
}

interface QueryParams {
  subjects: string[];
  filters: string[];
  concept?: string;
}

const ListingContainer = ({ isOembed, subjects, tags, filters }: Props) => {
  const [filterListOpen, setFilterListOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [queryParams, setQueryParams] = useQueryParameter<QueryParams>({
    subjects: [],
    filters: [],
    concept: undefined,
  });
  const { i18n } = useTranslation();

  const useDebounce = (val: string, delay: number): string => {
    const [debouncedVal, setDebouncedVal] = useState(val);
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedVal(val);
      }, delay);
      return (): void => clearTimeout(handler);
    }, [val, delay]);
    return `${debouncedVal}*`;
  };
  const debouncedSearchVal = useDebounce(searchValue, 200);

  const { data, loading, fetchMore } = useQuery<
    GQLListingContainerConceptSearchQuery,
    GQLListingContainerConceptSearchQueryVariables
  >(listingContainerConceptSearchQuery, {
    variables: {
      query: debouncedSearchVal,
      subjects: queryParams.subjects.join(),
      tags: getTagsParameter(tags, queryParams.filters),
      pageSize: PAGE_SIZE,
      fallback: true,
      exactMatch: false,
      language: i18n.language,
    },
    notifyOnNetworkStatusChange: true, // For spinner on load more
  });

  const handleSelectItem = (value: ListItemType | null): void => {
    setQueryParams({
      ...queryParams,
      concept: value?.id,
    });
  };

  const handleChangeSubject = (values: string[]): void => {
    setQueryParams({
      ...queryParams,
      subjects: values,
    });
  };

  const handleChangeListFilter = (value: string | null): void => {
    setFilterListOpen(false);
    setQueryParams({
      ...queryParams,
      filters: value ? [value] : [],
    });
  };

  const handleRemoveFilter = useCallback((): void => {
    setQueryParams({
      ...queryParams,
      filters: [],
    });
  }, [queryParams, setQueryParams]);

  const handleChangeFilters = (_: string, values: string[]): void => {
    setQueryParams({
      ...queryParams,
      filters: values,
    });
  };

  const onLoadMoreClick = (): void => {
    if (data?.conceptSearch?.concepts) {
      fetchMore({
        variables: {
          page: Math.floor(data.conceptSearch.concepts.length / PAGE_SIZE + 1),
        },
      });
    }
  };

  useEffect(() => {
    const filterNameExistsInFilters = (filter: string): boolean => {
      const filterKeys = Object.keys(filters);
      return filterKeys.includes(filter);
    };

    const selectedFilter = queryParams.filters[0];
    if (selectedFilter) {
      if (!filterNameExistsInFilters(selectedFilter)) {
        handleRemoveFilter();
      }
    }
  }, [filters, handleRemoveFilter, queryParams.filters]);

  const totalCount = data?.conceptSearch?.totalCount;
  const concepts = data?.conceptSearch?.concepts;
  const showLoadMore =
    concepts !== undefined && totalCount !== undefined
      ? concepts.length < totalCount
      : true;

  return (
    <ListingView
      isOembed={isOembed}
      loading={loading}
      showLoadMore={!!showLoadMore}
      filterListOpen={filterListOpen}
      setFilterListOpen={setFilterListOpen}
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
    />
  );
};

ListingContainer.fragments = {
  subjects: gql`
    fragment ListingContainerSubject on Subject {
      ...ListingViewSubject
    }
    ${ListingView.fragments.subject}
  `,
  concept: gql`
    fragment ListingContainerConcept on Concept {
      ...ListingViewConcept
    }
    ${ListingView.fragments.concept}
  `,
};

const listingContainerConceptSearchQuery = gql`
  query ListingContainerConceptSearch(
    $query: String
    $subjects: String
    $tags: String
    $page: Int
    $pageSize: Int
    $exactMatch: Boolean
    $fallback: Boolean
    $language: String
  ) {
    conceptSearch(
      query: $query
      subjects: $subjects
      tags: $tags
      page: $page
      pageSize: $pageSize
      exactMatch: $exactMatch
      fallback: $fallback
      language: $language
      conceptType: "concept"
    ) {
      totalCount
      concepts {
        ...ListingContainerConcept
      }
    }
  }
  ${ListingContainer.fragments.concept}
`;

export default ListingContainer;
