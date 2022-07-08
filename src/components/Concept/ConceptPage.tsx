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
import { useParams } from 'react-router-dom';
import {
  NotionDialogWrapper,
  NotionHeaderWithoutExitButton,
} from '@ndla/notion';
import { CreatedBy, OneColumn } from '@ndla/ui';
import { Spinner } from '@ndla/icons';
import { useTranslation } from 'react-i18next';
import config from '../../config';
import PostResizeMessage from '../PostResizeMessage';
import NotFoundPage from '../../containers/NotFoundPage/NotFoundPage';
import { GQLConceptPageQuery } from '../../graphqlTypes';
import { ListItem } from '../../interfaces';
import ConceptBody from './ConceptBody';
import { LicenseBox } from '../LicenseBox';

interface Props {
  handleClose?: (item: ListItem | null) => void;
  inModal?: boolean;
  conceptId?: number;
}

const conceptPageQuery = gql`
  query ConceptPage($id: Int!) {
    concept(id: $id) {
      title
      ...ConceptBodyConcept
      ...LicenseBoxConcept
    }
  }
  ${LicenseBox.fragments.concept}
  ${ConceptBody.fragments.concept}
`;

const ConceptPage = ({
  handleClose,
  inModal,
  conceptId: conceptIdParam,
}: Props) => {
  const { t, i18n } = useTranslation();
  const [markdown, setMarkdown] = useState<Remarkable | null>(null);
  const { selectedLanguage, conceptId: conceptIdUrlParam } = useParams();
  const language = selectedLanguage ?? i18n.language;
  const conceptId = conceptIdParam ?? parseInt(conceptIdUrlParam ?? '');

  const { data, loading } = useQuery<GQLConceptPageQuery>(conceptPageQuery, {
    variables: {
      id: conceptId,
    },
    skip: !conceptId,
  });

  useEffect(() => {
    if (markdown === null) {
      const md = new Remarkable();
      md.inline.ruler.enable(['sub', 'sup']);
      setMarkdown(md);
    }
  }, [markdown]);

  if (loading) return <Spinner />;
  if (!data || !data.concept) return <NotFoundPage />;

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

  const concept = data.concept;

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
