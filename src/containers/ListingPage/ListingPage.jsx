/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectT } from '@ndla/i18n';

import { mapTagsToFilters } from '../../util/listingHelpers';
import { fetchTags } from '../../api/concept/conceptApi';
import { fetchSubjectIds, fetchSubject } from '../Subject/subjectApi';
import ListingContainer from './ListingContainer';

const ListingPage = ({ t, locale, location, isOembed }) => {
  const [subjectIds, setSubjectIds] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filters, setFilters] = useState(new Map());
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getInitialData();
  }, []);

  const getInitialData = async () => {
    const subjectIds = await fetchSubjectIds();
    setSubjectIds(subjectIds);
    const subjects = await Promise.all(subjectIds.map(id => fetchSubject(id)));
    setSubjects(subjects);
    const tags = await fetchTags(locale);
    const filteredTags = tags.filter(tag => tag.match(/.+:(.+)?:(.+)?/));
    setTags(filteredTags);
    setFilters(mapTagsToFilters(filteredTags));
  };

  /*
  useEffect(() => {
    getConceptFromQuery();
  }, [queryParams.concept]);

  useEffect(() => {
    if (tags.length && subjectIds.length) {
      getConcepts(1);
    }
  }, [queryParams.subjects, queryParams.filters, tags, debouncedSearchVal]);

  const getConcepts = async page => {
    const replace = page === 1;
    setLoading(!replace);
    if (queryParams.subjects.length) {
      const concepts = await fetchConceptsBySubject(
        queryParams.subjects,
        page,
        PAGE_SIZE,
        locale,
        debouncedSearchVal,
      );
      handleSetConcepts(concepts.results, concepts.totalCount, replace);
    } else if (queryParams.filters.length) {
      const concepts = await fetchConceptsByTags(
        tags.filter(tag =>
          queryParams.filters.every(filter => tag.includes(filter)),
        ),
        page,
        PAGE_SIZE,
        locale,
        debouncedSearchVal,
      );
      handleSetConcepts(concepts.results, concepts.totalCount, replace);
    } else {
      const concepts = await fetchConcepts(
        page,
        PAGE_SIZE,
        locale,
        debouncedSearchVal,
      );
      handleSetConcepts(concepts.results, concepts.totalCount, replace);
    }
    setLoading(false);
  };

  const getConceptFromQuery = async () => {
    if (queryParams.concept) {
      if (concepts.length) {
        const selectedConcept = concepts.find(
          concept => concept.id.toString() === queryParams.concept,
        );
        setSelectedConcept(selectedConcept);
      } else {
        const selectedConcept = await fetchConcept(queryParams.concept);
        getConcepts(page);
        setSelectedConcept(selectedConcept);
        setPage(1);
      }
    }
  };

  const handleSetConcepts = (newConcepts, totalCount, replace) => {
    setShowButton(newConcepts.length === PAGE_SIZE);
    if (replace) {
      setConcepts(newConcepts);
    } else {
      setConcepts([...concepts, ...newConcepts]);
    }
    setTotalCount(totalCount);
  };
  */

  return (
    <ListingContainer
      isOembed={isOembed}
      subjects={subjects}
      tags={tags}
      filters={filters}
      location={location}
      locale={locale}
    />
  );
};

ListingPage.propTypes = {
  locale: PropTypes.string.isRequired,
  isOembed: PropTypes.bool,
  location: PropTypes.shape({
    search: PropTypes.string,
    pathname: PropTypes.string,
  }),
};

export default injectT(ListingPage);
