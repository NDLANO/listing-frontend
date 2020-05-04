/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

import NotionDialog from './NotionDialog';
import {
  mapTagsToFilters,
  mapConceptToListItem,
  sortConcepts,
} from '../../util/listingHelpers';
import useQueryParameter from '../../util/useQueryParameter';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';
import { fetchConcepts, fetchConceptsBySubject, fetchTags } from './listingApi';
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

const PAGE_SIZE = 1000;

const ListingPage = props => {
  const [concepts, setConcepts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState(null);
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
  });
  const [md, setMd] = useState(null);

  useEffect(() => {
    fetchConcepts(PAGE_SIZE).then(concepts =>
      setConcepts(sortConcepts(concepts.results, props.locale)),
    );
    fetchSubjectIds()
      .then(subjectIds => Promise.all(subjectIds.map(id => fetchSubject(id))))
      .then(subjects => setSubjects(subjects));
    fetchTags().then(tags => setFilters(mapTagsToFilters(tags)));
  }, []);

  useEffect(() => {
    if (queryParams.subjects.length > 0) {
      fetchConceptsBySubject(queryParams.subjects, PAGE_SIZE).then(concepts =>
        setConcepts(sortConcepts(concepts.results, props.locale)),
      );
    } else {
      fetchConcepts(PAGE_SIZE).then(concepts =>
        setConcepts(sortConcepts(concepts.results, props.locale)),
      );
    }
  }, [queryParams.subjects]);

  useEffect(() => {
    if (md === null) {
      const markdown = new Remarkable();
      markdown.inline.ruler.enable(['sub', 'sup']);
      setMd(markdown);
    }
  }, []);

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
    const filteredFilters = listFilters.filter(item =>
      item.toLowerCase().startsWith(value.toLowerCase()),
    );
    setFilterSearchValue(value);
    setCurrentListFilters(filteredFilters);
  };

  const onFilterSearchFocus = () => {
    setFilterListOpen(true);
    setCurrentListFilters(listFilters);
  };

  const filterItems = listItems => {
    let filteredItems = listItems;

    // Filters
    if (queryParams.filters.length) {
      filteredItems = filteredItems.filter(item =>
        queryParams.filters.every(filter => item.filters.includes(filter)),
      );
    }

    // Search
    if (searchValue.length > 0) {
      const searchValueLowercase = searchValue.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().startsWith(searchValueLowercase),
      );
    }

    return filteredItems;
  };

  const getFilters = () => {
    return selectedListFilter
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

  if (!concepts.length || !subjects.length) {
    return null;
  }

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
      .map(concept =>
        mapConceptToListItem(
          concept,
          subjects.find(subject => concept.subjectIds.includes(subject.id)),
        ),
      ),
  );

  const categoryFilterInputProps = {
    value: filterSearchValue,
    onChange: onFilterSearch,
    onFocus: onFilterSearchFocus,
    onClick: onFilterSearchFocus,
    placeholder: 'category filter',
  };

  const listFilters = Array.from(filters.keys());

  const { t } = props;

  return (
    <OneColumn>
      <Helmet title={'NDLA Utlisting'} />
      <SubjectFilterWrapper>
        <FilterListPhone
          preid="subject-list"
          label="Velg fag"
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
      <SeparatorWrapper>eller</SeparatorWrapper>
      <CategoriesFilterWrapper>
        <Downshift
          onSelect={handleChangeListFilter}
          itemToString={item => {
            return item ? item.title || '' : '';
          }}
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
                    hasValues: 1,
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
        onChangedSearchValue={e => setSearchValue(e.target.value)}
        selectedItem={
          selectedItem ? (
            <NotionDialog
              item={selectedItem}
              handleClose={setSelectedItem}
              renderMarkdown={renderMarkdown}
            />
          ) : null
        }
        onSelectItem={setSelectedItem}
        renderMarkdown={renderMarkdown}
        filters={getFilters()}
      />
    </OneColumn>
  );
};

ListingPage.propTypes = {
  listings: PropTypes.exact({
    filters: PropTypes.exact({
      main: PropTypes.arrayOf(PropTypes.string).isRequired,
      sub: PropTypes.arrayOf(PropTypes.string).isRequired,
    }),
    listings: PropTypes.arrayOf(CoverShape),
  }),
  locale: PropTypes.string.isRequired,
  fetchSubjects: PropTypes.func,
  fetchListing: PropTypes.func.isRequired,
  fetchListingBySubject: PropTypes.func.isRequired,
  fetchFilters: PropTypes.func,
  resetFilters: PropTypes.func,
  subjects: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps)(injectT(ListingPage));
