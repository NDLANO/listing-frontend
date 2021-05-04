/*
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/client';
import { Remarkable } from 'remarkable';
import {
  NotionDialogContent,
  NotionDialogLicenses,
  NotionDialogRelatedLinks,
  NotionDialogTags,
  NotionDialogText,
  NotionDialogWrapper,
  NotionHeaderWithoutExitButton,
} from '@ndla/notion';
import { injectT } from '@ndla/i18n';
import Modal, { ModalBody, ModalCloseButton, ModalHeader } from '@ndla/modal';
import Button from '@ndla/button';
import Tabs from '@ndla/tabs';
import { CreatedBy, OneColumn, Spinner } from '@ndla/ui';
import config from '../../config';
import { ImageContent, TextContent, OembedContent } from '../LicenseBox';
import VisualElement from './VisualElement';
import PostResizeMessage from '../PostResizeMessage';
import NotFoundPage from '../../containers/NotFoundPage/NotFoundPage';
import { detailedConceptQuery, listingPageQuery } from '../../queries';

const ConceptPage = ({
  t,
  conceptId,
  subjects,
  handleClose,
  inModal,
  language,
}) => {
  const [markdown, setMarkdown] = useState(null);

  const { data, loading } = useQuery(detailedConceptQuery, {
    variables: {
      id: conceptId,
    },
  });
  const { data: listingData } = useQuery(listingPageQuery, {
    skip: inModal,
  });

  useEffect(() => {
    if (markdown === null) {
      const md = new Remarkable();
      md.inline.ruler.enable(['sub', 'sup']);
      setMarkdown(md);
    }
  }, [markdown]);

  if (loading) return <Spinner />;
  if (!data) return <NotFoundPage />;

  const renderMarkdown = text => {
    const rendered = markdown?.render(text);
    return (
      <Fragment>
        <span dangerouslySetInnerHTML={{ __html: rendered }} />
      </Fragment>
    );
  };

  if (loading) {
    return <Spinner />;
  }

  const concept = data.detailedConcept;
  const conceptSubjects = subjects || listingData?.listingPage?.subjects;

  const getTabs = () => {
    const tabs = [];
    concept.copyright?.license?.license &&
      concept.copyright.license.license !== 'unknown' &&
      tabs.push({
        title: t('license.tabs.text'),
        content: <TextContent t={t} concept={concept} locale={language} />,
      });

    concept?.image?.src?.length &&
      tabs.push({
        title: t('license.tabs.images'),
        content: <ImageContent t={t} image={concept.image} />,
      });

    tabs.push({
      title: t('license.tabs.embedlink'),
      content: (
        <OembedContent
          t={t}
          oembed={`${config.ndlaListingFrontendDomain}/concepts/${conceptId}`}
        />
      ),
    });

    return tabs;
  };

  const licenseBox = (
    <Modal
      activateButton={<Button link>{t('article.useContent')}</Button>}
      size="medium">
      {onClose => (
        <>
          <ModalHeader modifier="no-bottom-padding">
            <ModalCloseButton onClick={onClose} title={t('modal.closeModal')} />
          </ModalHeader>
          <ModalBody>
            <>
              <h1>{t('license.heading')}</h1>
              <Tabs singleLine tabs={getTabs()} />
            </>
          </ModalBody>
        </>
      )}
    </Modal>
  );

  const conceptBody = (
    <>
      <NotionDialogContent>
        {concept.visualElement ? (
          <VisualElement visualElement={concept.visualElement} />
        ) : null}
        <NotionDialogText>{renderMarkdown(concept.content)}</NotionDialogText>
      </NotionDialogContent>
      {concept.subjectIds?.length && (
        <NotionDialogTags
          tags={conceptSubjects
            ?.filter(subject => concept.subjectIds?.includes(subject.id))
            ?.map(s => s.name)}
        />
      )}
      {concept.visualElement.articles?.length > 0 && (
        <NotionDialogRelatedLinks
          label={t(`listview.relatedLinks.label`)}
          links={concept.visualElement.articles.map(article => ({
            label: article.title?.title,
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

  return (
    <OneColumn cssModifier={'iframe'}>
      {inModal ? (
        <NotionDialogWrapper
          title={concept.title}
          closeCallback={() => handleClose(null)}>
          {conceptBody}
        </NotionDialogWrapper>
      ) : (
        <>
          <PostResizeMessage />
          <NotionHeaderWithoutExitButton title={concept.title} />
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

ConceptPage.propTypes = {
  conceptId: PropTypes.string.isRequired,
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
  ),
  handleClose: PropTypes.func,
  inModal: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

export default injectT(ConceptPage);
