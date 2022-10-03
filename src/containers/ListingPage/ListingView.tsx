/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { ChangeEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { Remarkable } from 'remarkable';
import Downshift, {
  StateChangeOptions,
  ControllerStateAndHelpers,
} from 'downshift';
import { gql } from '@apollo/client';
import styled from '@emotion/styled';
import { css, SerializedStyles } from '@emotion/react';
import { colors, fonts, spacing } from '@ndla/core';
import ListView from '@ndla/listview';
import {
  OneColumn,
  // @ts-ignore
  FilterListPhone,
  LanguageSelector,
  MastheadItem,
  CreatedBy,
} from '@ndla/ui';
import { Spinner } from '@ndla/icons';
// @ts-ignore
import { DropdownInput, DropdownMenu } from '@ndla/forms';
import { ChevronDown, Search } from '@ndla/icons/common';
import Button from '@ndla/button';
import { useTranslation } from 'react-i18next';
import { mapConceptToListItem } from '../../util/listingHelpers';
import ConceptPage from '../../components/Concept/ConceptPage';
import Footer from '../../components/Footer';
import CopyTextButton from '../../components/CopyTextButton';
import config from '../../config';
import { Filter, ListItem } from '../../interfaces';
import {
  GQLListingViewConceptFragment,
  GQLListingViewSubjectFragment,
} from '../../graphqlTypes';

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
const placeholderHasValuesCSS = (props: {
  hasValues?: string;
}): SerializedStyles =>
  !props.hasValues
    ? css`
        color: ${colors.brand.primary};
        font-weight: bold;
        ${fonts.sizes('16px')};
      `
    : placeholderCSS;

const categoryFilterCSS = (props: {
  hasValues?: string;
}): SerializedStyles => css`
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
const renderMarkdown = (text: string): JSX.Element => {
  const rendered = markdown.render(text);
  return (
    <>
      <span dangerouslySetInnerHTML={{ __html: rendered }} />
    </>
  );
};

const formatToListFilterQuery = (listFilter: string): string => {
  return `?filters[]=${listFilter}`;
};

const formatToSubjectFiltersQuery = (subjectFilters: string[]): string => {
  return `?subjects[]=${subjectFilters.join('&subjects[]=')}`;
};

type ViewStyle = 'grid' | 'list';

interface Props {
  isOembed: boolean;
  loading: boolean;
  showLoadMore: boolean;
  filterListOpen: boolean;
  setFilterListOpen: (value: boolean) => void;
  totalCount: number;
  concepts: GQLListingViewConceptFragment[];
  subjects: GQLListingViewSubjectFragment[];
  filters: Record<string, Filter>;
  selectedSubjects: string[];
  selectedFilters: string[];
  selectedConcept?: string;
  selectedListFilter?: string;
  searchValue: string;
  setSearchValue: (value: string) => void;
  onLoadMoreClick: () => void;
  handleSelectItem: (value: ListItem | null) => void;
  handleChangeListFilter: (
    selectedItem: string | null,
    stateAndHelpers: ControllerStateAndHelpers<string>,
  ) => void;
  handleRemoveFilter: () => void;
  handleChangeSubject: (values: string[]) => void;
  handleChangeFilters: (key: string, values: string[]) => void;
}

const ListingView = ({
  isOembed,
  loading,
  showLoadMore,
  filterListOpen,
  setFilterListOpen,
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
}: Props): JSX.Element => {
  const location = useLocation();
  const [filterSearchValue, setFilterSearchValue] = useState('');
  const [currentListFilters, setCurrentListFilters] = useState<string[]>([]);
  const [detailedItem, setDetailedItem] = useState(null);
  const [viewStyle, setViewStyle] = useState<ViewStyle>('grid');
  const { t, i18n } = useTranslation();

  const handleStateChangeListFilter = (
    changes: StateChangeOptions<string>,
  ): void => {
    const { isOpen, type } = changes;

    if (type === Downshift.stateChangeTypes.mouseUp) {
      setFilterListOpen(!!isOpen);
      if (!isOpen) {
        setFilterSearchValue('');
      }
    }

    if (type === Downshift.stateChangeTypes.keyDownEnter) {
      setFilterSearchValue('');
    }
  };

  const onFilterSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
    const filteredFilters = Object.keys(filters).filter(item =>
      item.toLowerCase().startsWith(value.toLowerCase()),
    );
    setFilterSearchValue(value);
    setCurrentListFilters(filteredFilters.sort());
  };

  const onFilterSearchFocus = (): void => {
    setFilterListOpen(true);
    setCurrentListFilters(Object.keys(filters).sort());
  };

  const categoryFilterInputProps = {
    value: filterSearchValue,
    onChange: onFilterSearch,
    onFocus: onFilterSearchFocus,
    onClick: onFilterSearchFocus,
    placeholder: t(`listview.filters.category.openFilter`),
  };

  const getFilters = (): object[] => {
    if (selectedListFilter) {
      const mainOptions = filters[selectedListFilter]?.main.map(filter => ({
        title: filter,
        value: filter,
        disabled: !listItems.some(item => item.filters.includes(filter)),
      }));
      const subOptions = filters[selectedListFilter]?.sub.map(filter => ({
        title: filter,
        value: filter,
        disabled: !listItems.some(item => item.filters.includes(filter)),
      }));

      return [
        {
          filterValues: selectedFilters,
          onChange: handleChangeFilters,
          isGroupedOptions: true,
          key: 'default',
          label: 'Filter',
          options: [mainOptions || [], subOptions || []],
        },
      ];
    }
    return [];
  };

  const listItems: ListItem[] = concepts
    ? concepts.map(concept => mapConceptToListItem(concept))
    : [];

  function getSubjectNamesByIds(subjectIds: string[]): string {
    return subjects
      .filter(sub => subjectIds.includes(sub.id))
      .map(sub => sub.name)
      .join(', ');
  }

  const getEmbedCode = (): string => {
    const filterQuery = selectedListFilter
      ? formatToListFilterQuery(selectedListFilter)
      : formatToSubjectFiltersQuery(selectedSubjects);

    const ariaLabel = `${t('listview.filters.default.filteredBy')} ${
      selectedListFilter
        ? selectedListFilter
        : getSubjectNamesByIds(selectedSubjects)
    }`;

    return `<iframe aria-label="${ariaLabel}" src="${config.ndlaListingFrontendDomain}/listing${filterQuery}" frameborder="0" allowFullscreen="" />`;
  };

  return (
    <>
      <OneColumn>
        <>
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
                  {(selectedListFilter || selectedSubjects.length > 0) && (
                    <CopyTextButton
                      copyTitle={t('listview.embedlink.copyTitle')}
                      hasCopiedTitle={t('listview.embedlink.hasCopiedTitle')}
                      stringToCopy={getEmbedCode()}
                      timeout={5000}
                      ghostPill
                    />
                  )}
                </StyledEmbedCopyButton>
                <StyledLanguageSelector>
                  <MastheadItem>
                    {/* @ts-ignore */}
                    <LanguageSelector
                      currentLanguage={i18n.language}
                      alwaysVisible
                    />
                  </MastheadItem>
                </StyledLanguageSelector>
              </HeaderWithLanguageWrapper>
              <CategoriesFilterWrapper>
                <Downshift
                  onSelect={handleChangeListFilter}
                  onStateChange={handleStateChangeListFilter}
                  isOpen={filterListOpen}>
                  {({
                    getInputProps,
                    getMenuProps,
                    getItemProps,
                  }): JSX.Element => {
                    return (
                      <div>
                        <DropdownInput
                          multiSelect
                          // eslint-disable-next-line react/jsx-props-no-spreading
                          {...getInputProps(categoryFilterInputProps)}
                          data-testid={'dropdownInput'}
                          idField={'id'}
                          labelField={'label'}
                          iconRight={
                            filterListOpen ? (
                              <Search />
                            ) : (
                              <span onClick={onFilterSearchFocus}>
                                <ChevronDown />
                              </span>
                            )
                          }
                          values={
                            selectedListFilter
                              ? [
                                  {
                                    id: selectedListFilter,
                                    label: selectedListFilter,
                                  },
                                ]
                              : []
                          }
                          removeItem={handleRemoveFilter}
                          customCss={categoryFilterCSS({
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
            onChangedViewStyle={(e: { viewStyle: ViewStyle }): void =>
              setViewStyle(e.viewStyle)
            }
            searchValue={searchValue}
            onChangedSearchValue={(e: ChangeEvent<HTMLInputElement>): void =>
              setSearchValue(e.target.value)
            }
            selectedItem={
              selectedConcept ? (
                <ConceptPage
                  conceptId={parseInt(selectedConcept)}
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
          {showLoadMore && (
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
        </>
      </OneColumn>
      {!isOembed && <Footer />}
    </>
  );
};

ListingView.fragments = {
  subject: gql`
    fragment ListingViewSubject on Subject {
      id
      name
    }
  `,
  concept: gql`
    fragment ListingViewConcept on Concept {
      id
      title
      content
      tags
      metaImage {
        url
      }
    }
  `,
};

export default ListingView;
