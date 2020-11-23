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
import { CreatedBy, Spinner } from '@ndla/ui';
import config from '../../config';
import {
  ImageContent,
  TextContent,
} from '../../containers/ListingPage/LicenseBox';
import {
  fetchArticle,
  fetchConcept,
  fetchImage,
} from '../../containers/ListingPage/listingApi';
import {
  fetchSubject,
  fetchSubjectIds,
} from '../../containers/Subject/subjectApi';
import { mapConceptToListItem } from '../../util/listingHelpers';

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

const initialItem = {
  id: '',
  name: '',
  description: '',
  image: '',
  subjectIds: [],
  category: {
    title: '',
    value: '',
  },
  filters: [],
};

const ConceptPage = ({ t, conceptId, handleClose, inModal, language }) => {
  const [article, setArticle] = useState(initialArticle);
  const [concept, setConcept] = useState(initialConcept);
  const [image, setImage] = useState(initialImage);
  const [item, setItem] = useState(initialItem);
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
    const listItem = mapConceptToListItem(concept);
    setItem(listItem);
    setConcept({
      articleId: concept.articleId,
      title: concept.title?.title,
      source: concept.source,
      created: concept.created,
      license: concept.copyright?.license?.license,
      authors: concept.copyright?.creators.map(creator => creator.name),
      rightsholders: concept.copyright?.rightsholders.map(
        holder => holder.name,
      ),
    });
    return listItem;
  };

  const getImage = async item => {
    const imageId = item.image.split('/').pop();
    if (imageId.length) {
      const image = await fetchImage(imageId, language);
      setImage({
        title: image.title?.title,
        image: {
          url: image.imageUrl,
          alt: image.alttext?.alttext,
        },
        license: image.copyright?.license?.license,
        authors: image.copyright?.creators.map(creator => creator.name),
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
              <Tabs
                singleLine
                tabs={[
                  {
                    title: t('license.tabs.text'),
                    content: <TextContent t={t} concept={concept} />,
                  },
                  ...(image.image.url.length
                    ? [
                        {
                          title: t('license.tabs.images'),
                          content: <ImageContent t={t} image={image} />,
                        },
                      ]
                    : []),
                ]}
              />
            </>
          </ModalBody>
        </>
      )}
    </Modal>
  );

  const conceptBody = (
    <>
      <NotionDialogContent>
        {item.image ? (
          <NotionDialogImage src={item.image} alt={item.description} />
        ) : null}
        <NotionDialogText>{renderMarkdown(item.description)}</NotionDialogText>
      </NotionDialogContent>
      <NotionDialogTags
        tags={subjects
          .filter(subject => item.subjectIds?.includes(subject.id))
          .map(s => s.name)}
      />
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
        authors={concept.authors}
        licenseBox={licenseBox}
      />
    </>
  );

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {inModal ? (
        <NotionDialogWrapper
          title={item.name}
          closeCallback={() => handleClose(null)}>
          {conceptBody}
        </NotionDialogWrapper>
      ) : (
        <>
          <NotionHeaderWithoutExitButton title={item.name} />
          {conceptBody}
          <CreatedBy
            name={t('createdBy.content')}
            description={t('createdBy.text')}
            url={`${config.ndlaListingFrontendDomain}/?concept=${conceptId}`}
          />
        </>
      )}
    </>
  );
};

ConceptPage.propTypes = {
  conceptId: PropTypes.number.isRequired,
  handleClose: PropTypes.func,
  inModal: PropTypes.bool,
  language: PropTypes.string.isRequired,
};

export default injectT(ConceptPage);
