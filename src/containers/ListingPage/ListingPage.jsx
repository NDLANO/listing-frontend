/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';

import { mapTagsToFilters } from '../../util/listingHelpers';
import ListingContainer from './ListingContainer';
import { conceptPageQuery } from '../../queries';

const ListingPage = ({ locale, location, isOembed }) => {

  const { data, loading } = useQuery(conceptPageQuery);

  if (loading) {
    return null;
  }

  const filteredTags = data.conceptPage.tags.filter(tag => tag.match(/.+:(.+)?:(.+)?/));
  const filters = mapTagsToFilters(filteredTags);

  return (
    <ListingContainer
      isOembed={isOembed}
      subjects={data.conceptPage.subjects}
      tags={filteredTags}
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

export default ListingPage;
