import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectT } from '@ndla/i18n';
import {
  NotionDialogContent,
  NotionDialogImage,
  NotionDialogText,
  NotionDialogTags,
  NotionDialogRelatedLinks,
  NotionDialogLicenses,
  NotionDialogWrapper,
} from '@ndla/notion';
import Modal, { ModalHeader, ModalBody, ModalCloseButton } from '@ndla/modal';
import Button from '@ndla/button';
import Tabs from '@ndla/tabs';

import config from '../../config';
import { fetchConcept, fetchImage, fetchArticle } from './listingApi';
import { TextContent, ImageContent } from './LicenseBox';

const initialConcept = {
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

const NotionDialog = ({
  t,
  renderMarkdown,
  item,
  locale,
  subjects,
  handleClose,
}) => {
  const [articleId, setArticleId] = useState(undefined);
  const [articleTitle, setArticleTitle] = useState('');
  const [concept, setConcept] = useState(initialConcept);
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    getConcept();
    getImage();
  }, []);

  useEffect(() => {
    getArticle();
  }, [articleId]);

  const getConcept = async () => {
    const concept = await fetchConcept(item.id, locale);
    setArticleId(concept.articleId);
    setConcept({
      title: concept.title?.title,
      source: concept.source,
      created: concept.created,
      license: concept.copyright?.license?.license,
      authors: concept.copyright?.creators.map(creator => creator.name),
      rightsholders: concept.copyright?.rightsholders.map(
        holder => holder.name,
      ),
    });
  };

  const getImage = async () => {
    const imageId = item.image.split('/').pop();
    if (imageId.length) {
      const image = await fetchImage(imageId, locale);
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
    if (articleId) {
      const article = await fetchArticle(articleId, locale);
      setArticleTitle(article.title?.title);
    }
  };

  return (
    <NotionDialogWrapper
      title={item.name}
      closeCallback={() => handleClose(null)}>
      <NotionDialogContent>
        {item.image ? (
          <NotionDialogImage src={item.image} alt={item.description} />
        ) : null}
        <NotionDialogText>{renderMarkdown(item.description)}</NotionDialogText>
      </NotionDialogContent>
      {item.subjectIds && (
        <NotionDialogTags
          tags={subjects
            .filter(subject => item.subjectIds.includes(subject.id))
            .map(s => s.name)}
        />
      )}
      {articleId && (
        <NotionDialogRelatedLinks
          label={t(`listview.relatedLinks.label`)}
          links={[
            {
              label: articleTitle,
              href: `${config.ndlaFrontendDomain}/article/${articleId}`,
            },
          ]}
        />
      )}
      {concept.license && concept.license !== 'unknown' && (
        <NotionDialogLicenses
          license={concept.license}
          source={concept.source}
          authors={concept.authors}
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
                    </div>
                  </ModalBody>
                </div>
              )}
            </Modal>
          }
        />
      )}
    </NotionDialogWrapper>
  );
};

NotionDialog.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    subjectIds: PropTypes.arrayOf(PropTypes.string),
  }),
  locale: PropTypes.string,
  subjects: PropTypes.arrayOf(PropTypes.object),
  handleClose: PropTypes.func.isRequired,
  renderMarkdown: PropTypes.func.isRequired,
};

export default injectT(NotionDialog);
