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
import {
  OneColumn,
  FilterListPhone,
  LanguageSelector,
  MastheadItem,
} from '@ndla/ui';
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
import { getLocale } from '../Locale/localeSelectors';
import {
  fetchConcepts,
  fetchConcept,
  fetchConceptsBySubject,
  fetchTags,
  fetchConceptsByTags
} from './listingApi';
import { fetchSubjectIds, fetchSubject } from '../Subject/subjectApi';
import { getLocaleUrls } from '../../util/localeHelpers';

const SubjectFilterWrapper = styled.div`
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.small};
`;

const HeaderWithLanguageWrapper = styled.div`
  display: flex;
`;

const StyledLanguageSelector = styled.div`
  margin-top: ${spacing.large};
  margin-left: auto;
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

const PAGE_SIZE = 20;

const ListingPage = ({ t, locale, location }) => {
  const [concepts, setConcepts] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState(new Map());
  const [tags, setTags] = useState([]);
  const [page, setPage] = useState(1);
  const [showButton, setShowButton] = useState(true);
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
    if (tags.length) {
      getConcepts(1);
    }
  }, [queryParams.subjects, queryParams.filters, tags]);

  useEffect(() => {
    getConceptFromQuery();
  }, [queryParams.concept]);

  const getInitialData = async () => {
    const subjectIds = await fetchSubjectIds();
    const subjects = await Promise.all(subjectIds.map(id => fetchSubject(id)));
    setSubjects(subjects);
    const tags = await fetchTags(locale);
    setTags(tags);
    setFilters(mapTagsToFilters(tags));
  };

  const getConcepts = async page => {
    const replace = page === 1;
    setLoading(!replace);
    if (queryParams.subjects.length) {
      const concepts = await fetchConceptsBySubject(
        queryParams.subjects,
        page,
        PAGE_SIZE,
        locale
      );
      handleSetConcepts(concepts.results, replace);
    } else if (queryParams.filters.length) {
      const concepts = await fetchConceptsByTags(
        tags.filter(tag =>
          queryParams.filters.every(filter => tag.includes(filter)),
        ),
        page,
        PAGE_SIZE,
        locale
      );
      handleSetConcepts(concepts.results, replace);
    } else if (!queryParams.concept) {
      let conceptArray = [];
      let currentPage = page;
      while (conceptArray.length < PAGE_SIZE) {
        const concepts = await fetchConcepts(currentPage, PAGE_SIZE, locale);
        if (!concepts.results.length) break;
        const filteredConcepts = concepts.results.filter(concept => concept.subjectIds);
        conceptArray = [...conceptArray, ...filteredConcepts];
        currentPage++;
      }
      setPage(currentPage);
      handleSetConcepts(conceptArray.slice(0, PAGE_SIZE), replace);
    }
    setLoading(false);
  };

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
        setPage(0);
      }
    }
  };

  const handleSetConcepts = (newConcepts, replace) => {
    if (newConcepts.length) {
      setShowButton(newConcepts.length === PAGE_SIZE);
      if (replace) {
        setConcepts(newConcepts);
      } else {
        setConcepts([...concepts, ...newConcepts]);
      }
    } else {
      setShowButton(false);
    }
  };

  const handleChangeSubject = values => {
    setQueryParams({
      subjects: values,
      filters: [],
    });
    setSelectedListFilter(null);
    setPage(1);
  };

  const handleChangeFilters = (key, values) => {
    setQueryParams({
      ...queryParams,
      filters: values,
    });
    setPage(1);
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
    setShowButton(!value);
  };

  const handleChangeListFilter = value => {
    setQueryParams({
      subjects: [],
      filters: [value],
    });
    setFilterListOpen(false);
    setSelectedListFilter(value);
    setPage(1);
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
  };

  const filterItems = listItems => {
    let filteredItems = listItems;
    if (queryParams.filters.length) {
      filteredItems = filteredItems.filter(item =>
        queryParams.filters.every(filter => item.filters.includes(filter)),
      );
    }
    if (searchValue.length > 0) {
      const searchValueLowercase = searchValue.toLowerCase();
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().startsWith(searchValueLowercase),
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

  const listItems = filterItems(
    concepts.map(concept => mapConceptToListItem(concept)),
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
      <HeaderWithLanguageWrapper>
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
        <StyledLanguageSelector>
          <MastheadItem>
            <LanguageSelector
              options={getLocaleUrls(locale, location)}
              currentLanguage={locale}
            />
          </MastheadItem>
        </StyledLanguageSelector>
      </HeaderWithLanguageWrapper>
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
      {showButton && (
        <ButtonWrapper>
          {loading ? (
            <Spinner />
          ) : (
            <Button onClick={onLoadMoreClick}>
              {t('listingPage.loadMore')}
            </Button>
          )}
        </ButtonWrapper>
      )}
    </OneColumn>
  );
};

ListingPage.propTypes = {
  locale: PropTypes.string.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

const mapStateToProps = state => ({
  locale: getLocale(state),
});

export default connect(mapStateToProps)(injectT(ListingPage));
