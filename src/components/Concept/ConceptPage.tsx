/*
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Remarkable } from 'remarkable';
import {
  NotionDialogWrapper,
  NotionHeaderWithoutExitButton,
} from '@ndla/notion';
import { CreatedBy, OneColumn, Spinner } from '@ndla/ui';
import { useTranslation } from 'react-i18next';
import config from '../../config';
import PostResizeMessage from '../PostResizeMessage';
import NotFoundPage from '../../containers/NotFoundPage/NotFoundPage';
import { GQLConceptPageQuery } from '../../graphqlTypes';
import { ListItem } from '../../interfaces';
import ConceptBody from './ConceptBody';
import { LicenseBox } from '../LicenseBox';

interface Props {
  conceptId: number;
  handleClose?: (item: ListItem | null) => void;
  inModal?: boolean;
  language: string;
}

const conceptPageQuery = gql`
  query ConceptPage($id: Int!) {
    detailedConcept(id: $id) {
      title
      ...ConceptBodyConcept
      ...LicenseBoxConcept
    }
  }
  ${LicenseBox.fragments.concept}
  ${ConceptBody.fragments.concept}
`;

const ConceptPage = ({ conceptId, handleClose, inModal, language }: Props) => {
  const { t } = useTranslation();
  const [markdown, setMarkdown] = useState<Remarkable | null>(null);

  const { data, loading } = useQuery<GQLConceptPageQuery>(conceptPageQuery, {
    variables: {
      id: conceptId,
    },
  });

  useEffect(() => {
    if (markdown === null) {
      const md = new Remarkable();
      md.inline.ruler.enable(['sub', 'sup']);
      setMarkdown(md);
    }
  }, [markdown]);

  if (loading) return <Spinner />;
  if (!data || !data.detailedConcept) return <NotFoundPage />;

  const renderMarkdown = (text: string | undefined) => {
    const rendered = markdown?.render(text ?? '') ?? '';
    return (
      <>
        <span dangerouslySetInnerHTML={{ __html: rendered }} />
      </>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  const concept = data.detailedConcept;

  const conceptBody = (
    <ConceptBody
      concept={concept}
      renderMarkdown={renderMarkdown}
      language={language}
      licenseBox={<LicenseBox concept={concept} language={language} />}
    />
  );
  return (
    <OneColumn cssModifier={'iframe'}>
      {inModal ? (
        <NotionDialogWrapper
          title={concept.title ?? ''}
          closeCallback={() => handleClose?.(null)}>
          {conceptBody}
        </NotionDialogWrapper>
      ) : (
        <>
          <PostResizeMessage />
          <NotionHeaderWithoutExitButton title={concept.title ?? ''} />
          {conceptBody}
          <CreatedBy
            name={t('createdBy.concept.content')}
            description={t('createdBy.concept.text')}
            url={`${config.ndlaListingFrontendDomain}/?concept=${conceptId}`}
          />
        </>
      )}
    </OneColumn>
  );
};

export default ConceptPage;
