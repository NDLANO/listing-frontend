/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import ListView, { activeAlphabet } from '@ndla/listview';
import { OneColumn } from 'ndla-ui';

import { mapConceptToListItem } from '../../util/listingHelpers';
import * as actions from './listingActions';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';

const ListingPage = (props) => {
  const [viewType, setViewType] = useState('grid');
  const [sortBy, setSortBy] = useState('category');
  const [detailedItem, setDetailedItem] = useState(null);
  const [selectItem, setSelectItem] = useState(null);
  const [filters, setFilters] = useState({ subject: [], category: [] });

  useEffect(() => {
    const { fetchListing, match: { params } } = props;
    fetchListing(params.subjectId);
  }, []);

  const handleChangeFilters = (key, values) => {
    setFilters({
      ...filters,
      [key]: values
    });
  }

  const filterItems = (listItems) => {
    let filteredItems = listItems;

    if (filters.subject.length) {
      filteredItems = filteredItems.filter(item => item.filters.main.some(subject => filters.subject.includes(subject)));
    }
    if (filters.category.length) {
      filteredItems = filteredItems.filter(item => item.filters.sub.some(category => filters.category.includes(category)));
    }
    return filteredItems;
  }

  const listItems = filterItems(props.listings.listings.map(concept => mapConceptToListItem(concept, props.listings.subjectName)));

  return (
    <OneColumn>
      <Helmet title={'NDLA Utlisting'} />
      <ListView
        items={listItems}
        alphabet={activeAlphabet(listItems)}
        viewStyle={viewType}
        onChangedViewStyle={({ v }) => setViewType(v)}
        detailedItem={detailedItem}
        selectCallback={setDetailedItem}
        onSelectItem={setSelectItem}
        filters={[
          {
            options: props.listings.filters.main.map(item => ({ title: item, value: item })),
            filterValues: filters.subject,
            onChange: handleChangeFilters,
            key: 'subject',
            label: '',
          },
          {
            options: props.listings.filters.sub.map(item => ({ title: item, value: item })),
            filterValues: filters.category,
            onChange: handleChangeFilters,
            key: 'category',
            label: '',
          },
        ]}
      />
    </OneColumn>
  );
}

ListingPage.propTypes = {
  match: ReactRouterPropTypes.match.isRequired,
  listings: PropTypes.exact({
    subjectName: PropTypes.string,
    filters: PropTypes.exact({
      main: PropTypes.arrayOf(PropTypes.string).isRequired,
      sub: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    listings: PropTypes.arrayOf(CoverShape)
  }),
  locale: PropTypes.string.isRequired,
  fetchListing: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  fetchListing: actions.fetchListing,
};

const mapStateToProps = state => ({
  listings: state.listings,
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListingPage);
