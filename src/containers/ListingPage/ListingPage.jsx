/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState, useEffect, Fragment } from 'react';
import Helmet from 'react-helmet';
import { Remarkable } from 'remarkable';
import Downshift from 'downshift';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colors, fonts, spacing } from '@ndla/core';
import { injectT } from '@ndla/i18n';
import ListView from '@ndla/listview';
import { OneColumn, FilterListPhone } from '@ndla/ui';
import { DropdownInput, DropdownMenu } from '@ndla/forms';
import { ChevronDown, Search } from '@ndla/icons/lib/common';
import Button from '@ndla/button';
import { Spinner } from '@ndla/editor';

import NotionDialog from './NotionDialog';
import {
  mapTagsToFilters,
  mapConceptToListItem,
} from '../../util/listingHelpers';
import useQueryParameter from '../../util/useQueryParameter';
import {
  fetchConcepts,
  fetchConcept,
  fetchConceptsBySubject,
  fetchConceptsByTags,
  fetchTags,
} from './listingApi';
import { fetchSubjectIds, fetchSubject } from '../Subject/subjectApi';

const SubjectFilterWrapper = styled.div`
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.small};
`;

const SeparatorWrapper = styled.div`
  margin-bottom: ${spacing.small};
  padding-left: ${spacing.small};
`;

const CategoriesFilterWrapper = styled.div`
  margin-bottom: ${spacing.small};
  position: relative;
  display: inline-block;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: ${spacing.medium};
`

const placeholderCSS = css`
  color: initial;
  font-weight: initial;
  opacity: 0.5;
`;
const placeholderHasValuesCSS = props =>
  !props.hasValues
    ? css`
        color: ${colors.brand.primary};
        font-weight: bold;
        ${fonts.sizes('16px')};
      `
    : placeholderCSS;

const categoryFilterCSS = props => css`
  border: 2px solid ${colors.brand.primary};
  min-height: auto;
  cursor: pointer;
  background-color: transparent;
  flex-grow: 0;
  input {
    cursor: pointer;
    ::placeholder {
      ${placeholderHasValuesCSS(props)}
    }
    :focus {
      ::placeholder {
        ${placeholderCSS}
      }
    }
  }
`;

const PAGE_SIZE = 20;

const ListingPage = ({ t }) => {
  const [concepts, setConcepts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState(new Map());
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentListFilters, setCurrentListFilters] = useState([]);
  const [selectedListFilter, setSelectedListFilter] = useState(null);
  const [viewStyle, setViewStyle] = useState('grid');
  const [detailedItem, setDetailedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [filterSearchValue, setFilterSearchValue] = useState('');
  const [filterListOpen, setFilterListOpen] = useState(false);
  const [queryParams, setQueryParams] = useQueryParameter({
    subjects: [],
    filters: [],
    concept: null,
  });
  const [md, setMd] = useState(null);

  useEffect(() => {
    if (md === null) {
      const markdown = new Remarkable();
      markdown.inline.ruler.enable(['sub', 'sup']);
      setMd(markdown);
    }
  }, []);

  useEffect(() => {
    getInitialData();
    setSelectedListFilter(queryParams.filters?.[0]);
  }, []);

  useEffect(() => {
    getConcepts(1);
  }, [queryParams.subjects, queryParams.filters, searchValue, tags]);

  useEffect(() => {
    getConceptFromQuery();
  }, [queryParams.concept]);

  const getInitialData = async () => {
    const subjectIds = await fetchSubjectIds();
    const subjects = await Promise.all(subjectIds.map(id => fetchSubject(id)));
    setSubjects(subjects);
    const tags = await fetchTags();
    setTags(tags);
    setFilters(mapTagsToFilters(tags));
  }

  const getConcepts = async page => {
    const replace = page === 1;
    setLoading(!replace);
    if (queryParams.subjects.length) {
      const concepts = await fetchConceptsBySubject(searchValue, queryParams.subjects, page, PAGE_SIZE)
      handleSetConcepts(concepts.results, replace);
    } else if (queryParams.filters.length) {
      const concepts = await fetchConceptsByTags(
        searchValue,
        tags.filter(tag =>
          queryParams.filters.every(filter => tag.includes(filter)),
        ),
        page,
        PAGE_SIZE,
      )
      handleSetConcepts(concepts.results, replace);
    } else {
      const concepts = await fetchConcepts(searchValue, page, PAGE_SIZE);
      handleSetConcepts(concepts.results, replace);
    }
    setLoading(false);
  }

  const getConceptFromQuery = async () => {
    if (queryParams.concept) {
      if (concepts.length) {
        const selectedConcept = concepts.find(
          concept => concept.id.toString() === queryParams.concept,
        );
        setSelectedItem(mapConceptToListItem(selectedConcept));
      } else {
        const selectedConcept = await fetchConcept(queryParams.concept);
        handleSetConcepts([selectedConcept], false);
        setSelectedItem(mapConceptToListItem(selectedConcept));
      }
    }
  }

  const handleSetConcepts = (newConcepts, replace) => {
    if (replace) {
      setConcepts(newConcepts);
      setPage(1);
    }
    else {
      setConcepts([...concepts, ...newConcepts]);
    }
  }

  const handleChangeSubject = values => {
    setQueryParams({
      subjects: values,
      filters: [],
    });
    setSelectedListFilter(null);
  };

  const handleChangeFilters = (key, values) => {
    setQueryParams({
      ...queryParams,
      filters: values,
    });
  };

  const handleSelectItem = value => {
    setSelectedItem(value);
    setQueryParams({
      ...queryParams,
      concept: value?.id,
    });
  };

  const onConceptSearch = async value => {
    setSearchValue(value);
  };

  const handleChangeListFilter = value => {
    setQueryParams({
      subjects: [],
      filters: [value],
    });
    setFilterListOpen(false);
    setSelectedListFilter(value);
  };

  const handleStateChangeListFilter = changes => {
    const { isOpen, type } = changes;

    if (type === Downshift.stateChangeTypes.mouseUp) {
      setFilterListOpen(isOpen);
      if (!isOpen) {
        setFilterSearchValue('');
      }
    }

    if (type === Downshift.stateChangeTypes.keyDownEnter) {
      setFilterSearchValue('');
    }
  };

  const handleRemoveFilter = value => {
    setQueryParams({
      ...queryParams,
      filters: [],
    });
    setSelectedListFilter(null);
  };

  const onFilterSearch = e => {
    const {
      target: { value },
    } = e;
    const filteredFilters = Array.from(filters.keys()).filter(item =>
      item.toLowerCase().startsWith(value.toLowerCase()),
    );
    setFilterSearchValue(value);
    setCurrentListFilters(filteredFilters);
  };

  const onFilterSearchFocus = () => {
    setFilterListOpen(true);
    setCurrentListFilters(Array.from(filters.keys()));
  };

  const onLoadMoreClick = () => {
    getConcepts(page + 1);
    setPage(page + 1);
  }

  const filterItems = listItems => {
    let filteredItems = listItems;
    if (queryParams.filters.length) {
      filteredItems = filteredItems.filter(item =>
        queryParams.filters.every(filter => item.filters.includes(filter)),
      );
    }
    return filteredItems;
  };

  const getFilters = () => {
    return filters.get(selectedListFilter)
      ? [
          {
            filterValues: queryParams.filters,
            onChange: handleChangeFilters,
            isGroupedOptions: true,
            key: 'default',
            label: 'Filter',
            options: [
              filters.get(selectedListFilter).main.map(filter => ({
                title: filter,
                value: filter,
                disabled: !listItems.some(item =>
                  item.filters.includes(filter),
                ),
              })),
              filters.get(selectedListFilter).sub.map(filter => ({
                title: filter,
                value: filter,
                disabled: !listItems.some(item =>
                  item.filters.includes(filter),
                ),
              })),
            ],
          },
        ]
      : [];
  };

  const renderMarkdown = text => {
    const rendered = md.render(text);
    return (
      <Fragment>
        <span dangerouslySetInnerHTML={{ __html: rendered }} />
      </Fragment>
    );
  };

  // Filtered list items, concepts without subjects are excluded
  const listItems = filterItems(
    concepts
      .filter(concept => concept.subjectIds)
      .map(concept => mapConceptToListItem(concept)),
  );

  const categoryFilterInputProps = {
    value: filterSearchValue,
    onChange: onFilterSearch,
    onFocus: onFilterSearchFocus,
    onClick: onFilterSearchFocus,
    placeholder: t(`listview.filters.category.openFilter`),
  };

  return (
    <OneColumn>
      <Helmet title={t(`themePage.heading`)} />
      <SubjectFilterWrapper>
        <FilterListPhone
          preid="subject-list"
          label={t(`listview.filters.subject.openFilter`)}
          options={subjects.map(item => ({
            title: item.name,
            value: item.id,
          }))}
          alignedGroup
          showActiveFiltersOnSmallScreen
          values={queryParams.subjects}
          messages={{
            useFilter: t(`listview.filters.subject.useFilter`),
            openFilter: t(`listview.filters.subject.openFilter`),
            closeFilter: t(`listview.filters.subject.closeFilter`),
          }}
          onChange={handleChangeSubject}
          viewMode="allModal"
        />
      </SubjectFilterWrapper>
      <SeparatorWrapper>{t(`listingPage.or`)}</SeparatorWrapper>
      <CategoriesFilterWrapper>
        <Downshift
          onSelect={handleChangeListFilter}
          onStateChange={handleStateChangeListFilter}
          isOpen={filterListOpen}>
          {({ getInputProps, getRootProps, getMenuProps, getItemProps }) => {
            return (
              <div>
                <DropdownInput
                  multiSelect
                  {...getInputProps(categoryFilterInputProps)}
                  data-testid={'dropdownInput'}
                  iconRight={
                    filterListOpen ? (
                      <Search />
                    ) : (
                      <span onClick={onFilterSearchFocus}>
                        <ChevronDown />
                      </span>
                    )
                  }
                  values={selectedListFilter ? [selectedListFilter] : []}
                  removeItem={handleRemoveFilter}
                  customCSS={categoryFilterCSS({
                    hasValues: selectedListFilter,
                  })}
                />
                <DropdownMenu
                  getMenuProps={getMenuProps}
                  getItemProps={getItemProps}
                  isOpen={filterListOpen}
                  items={currentListFilters}
                  maxRender={1000}
                  hideTotalSearchCount
                  positionAbsolute
                />
              </div>
            );
          }}
        </Downshift>
      </CategoriesFilterWrapper>
      <ListView
        items={listItems}
        detailedItem={detailedItem}
        selectCallback={setDetailedItem}
        viewStyle={viewStyle}
        onChangedViewStyle={e => setViewStyle(e.viewStyle)}
        searchValue={searchValue}
        onChangedSearchValue={e => onConceptSearch(e.target.value)}
        selectedItem={
          selectedItem ? (
            <NotionDialog
              item={selectedItem}
              subjects={subjects}
              handleClose={handleSelectItem}
              renderMarkdown={renderMarkdown}
            />
          ) : null
        }
        onSelectItem={handleSelectItem}
        renderMarkdown={renderMarkdown}
        filters={getFilters()}
      />
      <ButtonWrapper>
        {loading ?
          <Spinner/>
          :
          <Button onClick={onLoadMoreClick}>
            Last mer
          </Button>
        }
      </ButtonWrapper>
      
    </OneColumn>
  );
};

export default injectT(ListingPage);
