/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState } from 'react';
import Helmet from 'react-helmet';
// @ts-ignore
import { Remarkable } from 'remarkable';
import Downshift from 'downshift';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import { colors, fonts, spacing } from '@ndla/core';
import { injectT, tType } from '@ndla/i18n';
// @ts-ignore
import ListView from '@ndla/listview';
import {
  // @ts-ignore
  OneColumn,
  // @ts-ignore
  FilterListPhone,
  LanguageSelector,
  // @ts-ignore
  MastheadItem,
  CreatedBy,
} from '@ndla/ui';
// @ts-ignore
import { DropdownInput, DropdownMenu } from '@ndla/forms';
// @ts-ignore
import { ChevronDown, Search } from '@ndla/icons/lib/common';
// @ts-ignore
import Button from '@ndla/button';
// @ts-ignore
import { Spinner } from '@ndla/ui';
// @ts-ignore
import { getLocaleUrls } from '../../util/localeHelpers';
// @ts-ignore
import { mapConceptToListItem } from '../../util/listingHelpers';
// @ts-ignore
import ConceptPage from '../../components/Concept/ConceptPage';
// @ts-ignore
import Footer from '../../components/Footer';
// @ts-ignore
import CopyTextButton from '../../components/CopyTextButton';
// @ts-ignore
import config from '../../config';
import { Location } from '../../interfaces';

const SubjectFilterWrapper = styled.div`
  margin-top: ${spacing.large};
  margin-bottom: ${spacing.small};
`;

const HeaderWithLanguageWrapper = styled.div`
  display: flex;
`;

const StyledLanguageSelector = styled.div`
  margin-top: ${spacing.large};
`;

const StyledEmbedCopyButton = styled.div`
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
const placeholderHasValuesCSS = (props: any) =>
  !props.hasValues
    ? css`
        color: ${colors.brand.primary};
        font-weight: bold;
        ${fonts.sizes('16px')};
      `
    : placeholderCSS;

const categoryFilterCSS = (props: any) => css`
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

const markdown = new Remarkable();
markdown.inline.ruler.enable(['sub', 'sup']);
const renderMarkdown = (text: string) => {
  const rendered = markdown.render(text);
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: rendered }} />
    </>
  );
};

const getEmbedCode = (domain: string, filter: string) => {
  return `<iframe aria-label="${filter}" src="${domain}/listing?filters[]=${filter}" frameborder="0" allowFullscreen="" />`;
};

interface Props {
  isOembed: boolean;
  loading: boolean;
  totalCount: number;
  concepts: any[];
  subjects: any[];
  filters: any;
  selectedSubjects: string[];
  selectedFilters: string[];
  selectedConcept: any;
  selectedListFilter: any;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onLoadMoreClick: () => void;
  handleSelectItem: (value: any) => void;
  handleChangeListFilter: (value: any) => void;
  handleRemoveFilter: () => void;
  handleChangeSubject: (values: string[]) => void;
  handleChangeFilters: (key: any, values: string[]) => void;
  location: Location;
  locale: string;
}

const ListingView = ({
  t,
  isOembed,
  loading,
  totalCount,
  concepts,
  subjects,
  filters,
  selectedSubjects,
  selectedFilters,
  selectedConcept,
  selectedListFilter,
  searchValue,
  setSearchValue,
  onLoadMoreClick,
  handleSelectItem,
  handleChangeListFilter,
  handleRemoveFilter,
  handleChangeSubject,
  handleChangeFilters,
  location,
  locale,
}: Props & tType) => {
  const [showButton, setShowButton] = useState(true);
  const [filterListOpen, setFilterListOpen] = useState(false);
  const [filterSearchValue, setFilterSearchValue] = useState('');
  const [currentListFilters, setCurrentListFilters] = useState<any[]>([]);
  const [detailedItem, setDetailedItem] = useState(null);
  const [viewStyle, setViewStyle] = useState<'grid' | 'list'>('grid');

  const handleStateChangeListFilter = (changes: any) => {
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

  const onConceptSearch = async (value: string) => {
    setSearchValue(value);
    setShowButton(!value);
  };

  const onFilterSearch = (e: any) => {
    const {
      target: { value },
    } = e;
    const filteredFilters = Array.from(filters.keys()).filter((item: any) =>
      item.toLowerCase().startsWith(value.toLowerCase()),
    );
    setFilterSearchValue(value);
    setCurrentListFilters(filteredFilters);
  };

  const onFilterSearchFocus = () => {
    setFilterListOpen(true);
    setCurrentListFilters(Array.from(filters.keys()));
  };

  const categoryFilterInputProps = {
    value: filterSearchValue,
    onChange: onFilterSearch,
    onFocus: onFilterSearchFocus,
    onClick: onFilterSearchFocus,
    placeholder: t(`listview.filters.category.openFilter`),
  };

  const getFilters = () => {
    return filters.get(selectedListFilter)
      ? [
          {
            filterValues: selectedFilters,
            onChange: handleChangeFilters,
            isGroupedOptions: true,
            key: 'default',
            label: 'Filter',
            options: [
              filters.get(selectedListFilter).main.map((filter: any) => ({
                title: filter,
                value: filter,
                disabled: !listItems.some(item =>
                  item.filters.includes(filter),
                ),
              })),
              filters.get(selectedListFilter).sub.map((filter: any) => ({
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

  const filterItems = (listItems: any[]) => {
    let filteredItems = listItems;
    if (selectedFilters.length) {
      filteredItems = filteredItems.filter(item =>
        selectedFilters.every(filter => item.filters.includes(filter)),
      );
    }
    return filteredItems;
  };

  const listItems = !loading
    ? filterItems(concepts.map(concept => mapConceptToListItem(concept)))
    : [];

  return (
    <>
      <OneColumn>
        <Helmet title={t(`themePage.heading`)} />
        {!isOembed && (
          <>
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
                  values={selectedSubjects}
                  messages={{
                    useFilter: t(`listview.filters.subject.useFilter`),
                    openFilter: t(`listview.filters.subject.openFilter`),
                    closeFilter: t(`listview.filters.subject.closeFilter`),
                  }}
                  onChange={handleChangeSubject}
                  viewMode="allModal"
                />
              </SubjectFilterWrapper>
              <StyledEmbedCopyButton>
                {selectedListFilter && (
                  <CopyTextButton
                    copyTitle={t('listview.embedlink.copyTitle')}
                    hasCopiedTitle={t('listview.embedlink.hasCopiedTitle')}
                    stringToCopy={getEmbedCode(
                      config.ndlaListingFrontendDomain,
                      selectedListFilter,
                    )}
                    timeout={5000}
                    ghostPill
                  />
                )}
              </StyledEmbedCopyButton>
              <StyledLanguageSelector>
                <MastheadItem>
                  <LanguageSelector
                    options={getLocaleUrls(locale, location)}
                    currentLanguage={locale}
                    alwaysVisible
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
                {({ getInputProps, getMenuProps, getItemProps }) => {
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
          </>
        )}
        <ListView
          disableSearch={isOembed}
          disableViewOption={isOembed}
          items={listItems}
          detailedItem={detailedItem}
          selectCallback={setDetailedItem}
          viewStyle={viewStyle}
          onChangedViewStyle={(e: any) => setViewStyle(e.viewStyle)}
          searchValue={searchValue}
          onChangedSearchValue={(e: any) => onConceptSearch(e.target.value)}
          selectedItem={
            selectedConcept ? (
              <ConceptPage
                conceptId={Number(selectedConcept.id)}
                language={locale}
                inModal={true}
                handleClose={handleSelectItem}
              />
            ) : null
          }
          onSelectItem={handleSelectItem}
          renderMarkdown={renderMarkdown}
          filters={isOembed ? [] : getFilters()}
          totalCount={totalCount}
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
        {isOembed && (
          <CreatedBy
            name={t('createdBy.listing.content')}
            description={t('createdBy.listing.text')}
            url={`${config.ndlaListingFrontendDomain}/${decodeURIComponent(
              location.search,
            )}`}
          />
        )}
      </OneColumn>
      {!isOembed && <Footer t={t} />}
    </>
  );
};

export default injectT(ListingView);
