/*
 * Copyright (c) 2020-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Remarkable } from 'remarkable';
import {
  NotionDialogContent,
  NotionDialogImage,
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
import { fetchArticle } from '../../api/article/articleApi';
import { fetchConcept } from '../../api/concept/conceptApi';
import { fetchImage } from '../../api/image/imageApi';
import {
  fetchSubject,
  fetchSubjectIds,
} from '../../containers/Subject/subjectApi';
import VisualElement from './VisualElement';

const initialArticle = {
  id: '',
  title: { title: '' },
};

const initialConcept = {
  articleId: null,
  title: '',
  source: '',
  created: '',
  license: '',
  authors: [],
  rightsholders: [],
  visualElement: null,
};

const initialImage = {
  title: '',
  image: {
    url: '',
    alt: '',
  },
  license: '',
  authors: [],
  rightsholders: [],
  origin: '',
};

const ConceptPage = ({ t, conceptId, handleClose, inModal, language }) => {
  const [article, setArticle] = useState(initialArticle);
  const [concept, setConcept] = useState(initialConcept);
  const [image, setImage] = useState(initialImage);
  const [loading, setLoading] = useState(true);
  const [markdown, setMarkdown] = useState(null);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    init();

    if (markdown === null) {
      const md = new Remarkable();
      md.inline.ruler.enable(['sub', 'sup']);
      setMarkdown(md);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    getArticle();
  }, [article.id]);

  const init = async () => {
    const listItem = await getConcept();
    getImage(listItem);
    getSubjects();
  };

  const getSubjects = async () => {
    const subjectIds = await fetchSubjectIds();
    const subjects = await Promise.all(subjectIds.map(id => fetchSubject(id)));
    setSubjects(subjects);
  };

  const getConcept = async () => {
    const concept = await fetchConcept(conceptId, language);
    setConcept({
      articleId: concept.articleId,
      authors: concept.copyright?.creators,
      content: concept.content.content,
      created: concept.created,
      image: concept.metaImage?.url,
      license: concept.copyright?.license?.license,
      rightsholders: concept.copyright?.rightsholders?.map(
        holder => holder.name,
      ),
      source: concept.source,
      subjectIds: concept?.subjectIds,
      title: concept.title?.title,
      visualElement: concept.visualElement?.visualElement,
    });
    return concept;
  };

  const getImage = async concept => {
    const imageId = concept.metaImage?.url?.split('/').pop();
    if (imageId.length) {
      const image = await fetchImage(imageId, language);
      setImage({
        title: image.title?.title,
        image: {
          url: image.imageUrl,
          alt: image.alttext?.alttext,
        },
        license: image.copyright?.license?.license,
        authors: image.copyright?.creators,
        rightsholders: image.copyright?.rightsholders.map(
          holder => holder.name,
        ),
        origin: image.copyright?.origin,
      });
    }
  };

  const getArticle = async () => {
    if (concept.articleId) {
      const article = await fetchArticle(concept.articleId, language);
      setArticle(article);
    }
  };

  const renderMarkdown = text => {
    const rendered = markdown?.render(text);
    return (
      <Fragment>
        <span dangerouslySetInnerHTML={{ __html: rendered }} />
      </Fragment>
    );
  };

  const getTabs = () => {
    const tabs = [];

    concept.license &&
      concept.license !== 'unknown' &&
      tabs.push({
        title: t('license.tabs.text'),
        content: <TextContent t={t} concept={concept} locale={language} />,
      });

    image?.image?.url?.length &&
      tabs.push({
        title: t('license.tabs.images'),
        content: <ImageContent t={t} image={image} />,
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
        {concept.visualElement ? <VisualElement visualElement={concept.visualElement} /> : null}
        <NotionDialogText>{renderMarkdown(concept.content)}</NotionDialogText>
      </NotionDialogContent>
      {concept.subjectIds?.length && (
        <NotionDialogTags
          tags={subjects
            .filter(subject => concept.subjectIds?.includes(subject.id))
            .map(s => s.name)}
        />
      )}
      {article.id && (
        <NotionDialogRelatedLinks
          label={t(`listview.relatedLinks.label`)}
          links={[
            {
              label: article.title?.title,
              href: `${config.ndlaFrontendDomain}/article/${concept.articleId}`,
            },
          ]}
        />
      )}
      <NotionDialogLicenses
        license={concept.license}
        source={concept.source}
        authors={concept.authors?.map(author => author?.name) || []}
        licenseBox={licenseBox}
      />
    </>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <OneColumn>
      {inModal ? (
        <NotionDialogWrapper
          title={concept.title}
          closeCallback={() => handleClose(null)}>
          {conceptBody}
        </NotionDialogWrapper>
      ) : (
        <>
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
  conceptId: PropTypes.number.isRequired,
  handleClose: PropTypes.func,
  inModal: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

export default injectT(ConceptPage);
