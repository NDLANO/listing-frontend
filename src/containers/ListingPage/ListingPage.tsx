/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import qs from "query-string";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import styled from "@emotion/styled";
import { colors, spacing } from "@ndla/core";
import { Spinner } from "@ndla/icons";
import ListingContainer from "./ListingContainer";
import { GQLListingPageQuery, GQLListingPageQueryVariables } from "../../graphqlTypes";
import { mapTagsToFilters, filterTags } from "../../util/listingHelpers";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

const AlertBanner = styled.div`
  text-align: center;
  background-color: ${colors.support.yellow};
  padding-block: ${spacing.nsmall};
  padding-inline: ${spacing.normal};
`;

interface Props {
  isOembed: boolean;
}

const getSubjectsString = (subjects: string | string[] | number | boolean | undefined | null) => {
  if (!subjects || typeof subjects === "number" || typeof subjects === "boolean") {
    return;
  }

  return typeof subjects === "string" ? subjects : subjects.join(",");
};

const ListingPage = ({ isOembed }: Props): JSX.Element => {
  const { t } = useTranslation();
  const location = useLocation();
  const searchParams = qs.parse(location.search, { arrayFormat: "bracket" });
  const querySubjects = getSubjectsString(searchParams["subjects"]);
  const { data, loading, previousData } = useQuery<GQLListingPageQuery, GQLListingPageQueryVariables>(
    listingPageQuery,
    {
      variables: {
        listingPageSubjects: querySubjects,
      },
    },
  );

  if (loading && !data && !previousData) return <Spinner />;

  if (!loading && (!data?.listingPage?.subjects || !data?.listingPage?.tags)) {
    return <NotFoundPage />;
  }

  const filters = mapTagsToFilters(data?.listingPage?.tags ?? previousData?.listingPage?.tags ?? []);
  const filteredTags = filterTags(data?.listingPage?.tags ?? previousData?.listingPage?.tags ?? []);

  return (
    <>
      <AlertBanner>{t("alert")}</AlertBanner>
      <ListingContainer
        isOembed={isOembed}
        subjects={data?.listingPage?.subjects ?? previousData?.listingPage?.subjects ?? []}
        tags={filteredTags}
        filters={filters}
      />
    </>
  );
};

ListingPage.fragments = {
  subjects: gql`
    fragment ListingPageSubject on Subject {
      ...ListingContainerSubject
    }
  `,
};

export const listingPageQuery = gql`
  query ListingPage($listingPageSubjects: String) {
    listingPage(subjects: $listingPageSubjects) {
      subjects {
        ...ListingContainerSubject
      }
      tags
    }
  }
  ${ListingContainer.fragments.subjects}
`;

export default ListingPage;
