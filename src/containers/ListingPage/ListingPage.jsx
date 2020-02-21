/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { injectT } from '@ndla/i18n';
import ListView from '@ndla/listview';
import { OneColumn, FilterListPhone } from '@ndla/ui';
import NotionDialog from './NotionDialog';

import { mapConceptToListItem } from '../../util/listingHelpers';
import useQueryParameter from '../../util/useQueryParameter';
import * as actions from './listingActions';
import { fetchSubjects } from '../Subject/subjectActions';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';

const SubjectFilterWrapper = styled.div`
  margin-top: 60px;
  margin-bottom: 13px;
`;

const ListingPage = props => {
  const [viewStyle, setViewStyle] = useState('grid');
  const [detailedItem, setDetailedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [queryParams, setQueryParams] = useQueryParameter({
    subjects: [],
    filters: [],
  });

  useEffect(() => {
    props.fetchSubjects();
  }, []);

  useEffect(() => {
    if (queryParams.subjects.length > 0) {
      props.fetchListingBySubject(queryParams.subjects);
      props.fetchFilters(queryParams.subjects);
    } else {
      props.fetchListing();
      props.resetFilters();
    }
  }, [queryParams.subjects]);

  const handleChangeSubject = values => {
    setQueryParams({ subjects: values, filters: [] });
  };

  const handleChangeFilters = (key, values) => {
    setQueryParams({
      ...queryParams,
      filters: values,
    });
  };

  const filterItems = listItems => {
    let filteredItems = listItems;

    // Checkboxes
    if (queryParams.filters.length) {
      filteredItems = filteredItems.filter(item =>
        queryParams.filters.every(filter =>
          [...item.filters.main, ...item.filters.sub].includes(filter),
        ),
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

  if (!props.listings.listings || !props.subjects) {
    return null;
  }

  // Filtered list items, concepts without subjects are excluded
  const listItems = filterItems(
    props.listings.listings
      .filter(concept => concept.subjectIds)
      .map(concept =>
        mapConceptToListItem(
          concept,
          props.subjects.find(subject =>
            concept.subjectIds.includes(subject.id),
          ),
        ),
      ),
  );

  const { t } = props;

  return (
    <OneColumn>
      <Helmet title={'NDLA Utlisting'} />
      <SubjectFilterWrapper>
        <FilterListPhone
          preid="subject-list"
          label="Filtrer på fag"
          options={props.subjects.map(item => ({
            title: item.name,
            value: item.id,
          }))}
          alignedGroup
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
            <NotionDialog item={selectedItem} handleClose={setSelectedItem} />
          ) : null
        }
        onSelectItem={setSelectedItem}
        filters={[
          {
            filterValues: queryParams.filters,
            onChange: handleChangeFilters,
            isGroupedOptions: true,
            key: 'default',
            label: 'Filter',
            options: [
              props.listings.filters.main.map(filter => ({
                title: filter,
                value: filter,
                disabled: !listItems.some(item =>
                  item.filters.main.includes(filter),
                ),
              })),
              props.listings.filters.sub.map(filter => ({
                title: filter,
                value: filter,
                disabled: !listItems.some(item =>
                  item.filters.sub.includes(filter),
                ),
              })),
            ],
          },
        ]}
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
  fetchListing: PropTypes.func.isRequired,
  fetchListingBySubject: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
};

const mapDispatchToProps = {
  fetchSubjects,
  fetchListing: actions.fetchListing,
  fetchListingBySubject: actions.fetchListingBySubject,
  fetchFilters: actions.fetchFilters,
  resetFilters: actions.resetFilters,
};

const mapStateToProps = state => ({
  subjects: state.subjects,
  listings: state.listings,
  locale: getLocale(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectT(ListingPage));
