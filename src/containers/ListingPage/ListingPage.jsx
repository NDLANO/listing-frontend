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
import { injectT } from 'ndla-i18n';
import ListView, { activeAlphabet } from '@ndla/listview';
import { Select } from '@ndla/forms';
import { OneColumn } from 'ndla-ui';
import {
  NotionDialogContent,
  NotionDialogImage,
  NotionDialogText,
  NotionDialogTags,
  NotionDialogLicenses,
  NotionDialogWrapper,
} from '@ndla/notion';
import Modal, { ModalHeader, ModalBody, ModalCloseButton } from '@ndla/modal';
import Button from '@ndla/button';

import { mapConceptToListItem } from '../../util/listingHelpers';
import useURIParameter from '../../util/useURIParameter';
import useQueryParameter from '../../util/useQueryParameter';
import * as actions from './listingActions';
import { fetchSubjects } from '../Subject/subjectActions';
import { getLocale } from '../Locale/localeSelectors';
import { CoverShape } from '../../shapes';

const ListingPage = (props) => {
  const [viewStyle, setViewStyle] = useState('grid');
  const [sortByValue, setSortByValue] = useState('category');
  const [detailedItem, setDetailedItem] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentSubject, setCurrentSubject] = useURIParameter('');
  const [filters, setFilters] = useQueryParameter({ subject: [], category: [] });

  useEffect(() => {
    props.fetchSubjects();
    props.fetchListing();
  }, []);

  const handleChangeSubject = (e) => {
    if (e.target.value.length > 0) {
      props.fetchListingBySubject(e.target.value);
    }
    else {
      props.fetchListing();
    }

    setCurrentSubject(e.target.value);
    setFilters({ subject: [], category: [] });
  }

  const handleChangeFilters = (key, values) => {
    setFilters({
      ...filters,
      [key]: values
    });
  }

  const filterItems = (listItems) => {
    let filteredItems = listItems;

    // Checkboxes
    if (filters.subject.length) {
      filteredItems = filteredItems.filter(item => item.filters.main.some(subject => filters.subject.includes(subject)));
    }
    if (filters.category.length) {
      filteredItems = filteredItems.filter(item => item.filters.sub.some(category => filters.category.includes(category)));
    }

    // Search
    if (searchValue.length > 0) {
      const searchValueLowercase = searchValue.toLowerCase();
      filteredItems = filteredItems.filter(
        item =>
          (item.description &&
            item.description.toLowerCase().indexOf(searchValueLowercase) !== -1) ||
          item.name.toLowerCase().indexOf(searchValueLowercase) !== -1,
      );
    }

    return filteredItems;
  }

  if (!props.listings.listings || !props.subjects) {
    return null;
  }

  // Filtered list items, concepts without subjects are excluded
  const listItems = filterItems(props.listings.listings.filter(concept => concept.subjectIds).map(concept =>
    mapConceptToListItem(concept, props.subjects.find(subject => concept.subjectIds.includes(subject.id)))));

  const { t } = props;

  const renderSelectedItem = () => (
    selectedItem ? 
    <NotionDialogWrapper
      title={selectedItem.name}
      subTitle={selectedItem.category.title}
      closeCallback={setSelectedItem}>
      <NotionDialogContent>
        {selectedItem.image ? (
          <NotionDialogImage
            src={selectedItem.image}
            alt={selectedItem.description}
          />
        ) : null}
        <NotionDialogText>{selectedItem.description}</NotionDialogText>
      </NotionDialogContent>
      <NotionDialogTags tags={selectedItem.subject.map(subject => subject.title)}/>
      <NotionDialogLicenses
          license={selectedItem.license}
          source={selectedItem.source}
          authors={selectedItem.authors}
          licenseBox={
            <Modal
              activateButton={<Button link>{t('article.useContent')}</Button>}
              size="medium">
              {onClose => (
                <div>
                  <ModalHeader modifier="no-bottom-padding">
                    <ModalCloseButton onClick={onClose} title="lukk" />
                  </ModalHeader>
                  <ModalBody>
                    <div>
                      <h1>{t('license.heading')}</h1>
                    </div>
                  </ModalBody>
                </div>
              )}
            </Modal>
          }
        />
    </NotionDialogWrapper>
    :
    null
  )

  return (
    <OneColumn>
      <Helmet title={'NDLA Utlisting'} />
      <Select
        value={currentSubject}
        onChange={handleChangeSubject}>
        <option value={''}>
          Alle fag
        </option>
        {props.subjects.map(item => (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        ))}
      </Select>
      <ListView
        items={listItems}
        alphabet={activeAlphabet(listItems)}
        detailedItem={detailedItem}
        selectCallback={setDetailedItem}
        viewStyle={viewStyle}
        onChangedViewStyle={e => setViewStyle(e.viewStyle)}
        searchValue={searchValue}
        onChangedSearchValue={e => setSearchValue(e.target.value)}
        selectedItem={renderSelectedItem()}
        onSelectItem={setSelectedItem}
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
  fetchListingBySubject: PropTypes.func.isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.exact({
      id: PropTypes.string,
      name: PropTypes.string
    })
  ),
};

const mapDispatchToProps = {
  fetchSubjects,
  fetchListing: actions.fetchListing,
  fetchListingBySubject: actions.fetchListingBySubject
};

const mapStateToProps = state => ({
  subjects: state.subjects,
  listings: state.listings,
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(injectT(ListingPage));
