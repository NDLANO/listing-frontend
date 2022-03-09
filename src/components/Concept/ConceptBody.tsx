import { gql } from '@apollo/client';
import styled from '@emotion/styled';
import {
  NotionDialogContent,
  NotionDialogLicenses,
  NotionDialogRelatedLinks,
  NotionDialogTags,
  NotionDialogText,
} from '@ndla/notion';
import { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import config from '../../config';
import { GQLConceptBodyConceptFragment } from '../../graphqlTypes';
import VisualElement from './VisualElement';

const VisualElementWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface Props {
  concept: GQLConceptBodyConceptFragment;
  renderMarkdown: (text: string | undefined) => ReactNode;
  language: string;
  licenseBox: ReactNode;
}

const ConceptBody = ({
  concept,
  renderMarkdown,
  language,
  licenseBox,
}: Props) => {
  const { t } = useTranslation();
  return (
    <>
      <NotionDialogContent>
        {concept.visualElement ? (
          <VisualElementWrapper>
            <VisualElement
              visualElement={concept.visualElement}
              language={language}
            />
          </VisualElementWrapper>
        ) : null}
        <NotionDialogText>{renderMarkdown(concept.content)}</NotionDialogText>
      </NotionDialogContent>
      {concept.subjectNames?.length && (
        <NotionDialogTags tags={concept.subjectNames} />
      )}
      {concept?.articles && concept.articles.length > 0 && (
        <NotionDialogRelatedLinks
          label={t(`listview.relatedLinks.label`)}
          links={concept.articles.map(article => ({
            label: article.title,
            href: `${config.ndlaFrontendDomain}/article/${article.id}`,
          }))}
        />
      )}
      <NotionDialogLicenses
        license={concept.copyright?.license?.license}
        source={concept.copyright?.origin}
        authors={
          concept.copyright?.creators?.map(creator => creator?.name) || []
        }
        licenseBox={licenseBox}
      />
    </>
  );
};

ConceptBody.fragments = {
  concept: gql`
    fragment ConceptBodyConcept on Concept {
      content
      subjectNames
      articles {
        title
        id
      }
      copyright {
        license {
          license
        }
        origin
        creators {
          name
        }
      }
      visualElement {
        ...ListingVisualElement
      }
    }
    ${VisualElement.fragments.visualElement}
  `,
};

export default ConceptBody;
