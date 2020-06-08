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
import { fetchImage, fetchArticle } from './listingApi';
import { TextContent, ImageContent } from './LicenseBox';

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
  subjects,
  handleClose,
  concept,
}) => {
  const [articleId, setArticleId] = useState(undefined);
  const [articleTitle, setArticleTitle] = useState('');
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    setArticleId(concept.articleId);

    const imageId = item.image.split('/').pop();
    if (imageId.length) {
      fetchImage(imageId).then(response => {
        setImage({
          title: response.title ? response.title.title : '',
          image: {
            url: response.imageUrl,
            alt: response.alttext ? response.alttext.alttext : '',
          },
          license: response.copyright ? response.copyright.license.license : '',
          authors: response.copyright
            ? response.copyright.creators.map(creator => creator.name)
            : [],
          rightsholders: response.copyright
            ? response.copyright.rightsholders.map(holder => holder.name)
            : [],
          origin: response.copyright ? response.copyright.origin : '',
        });
      });
    }
  }, []);

  useEffect(() => {
    if (articleId) {
      fetchArticle(articleId).then(response => {
        setArticleTitle(response.title ? response.title.title : '');
      });
    }
  }, [articleId]);

  const notionDialogConcept = {
    title: concept.title ? concept.title.title : '',
    source: concept.source,
    created: concept.created,
    license: concept.copyright ? concept.copyright.license.license : '',
    authors: concept.copyright
      ? concept.copyright.creators.map(creator => creator.name)
      : [],
    rightsholders: concept.copyright
      ? concept.copyright.rightsholders.map(holder => holder.name)
      : [],
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
      <NotionDialogTags
        tags={subjects
          .filter(subject => item.subjectIds.includes(subject.id))
          .map(s => s.name)}
      />
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
      <NotionDialogLicenses
        license={notionDialogConcept.license}
        source={notionDialogConcept.source}
        authors={notionDialogConcept.authors}
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
                          content: (
                            <TextContent t={t} concept={notionDialogConcept} />
                          ),
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
    </NotionDialogWrapper>
  );
};

NotionDialog.propTypes = {
  concept: PropTypes.shape({
    articleId: PropTypes.string,
    title: {
      title: PropTypes.string,
    },
    source: PropTypes.string,
    created: PropTypes.string,
    copyright: PropTypes.shape({
      creators: PropTypes.arrayOf(PropTypes.string),
      rightsholders: PropTypes.arrayOf(PropTypes.string),
      license: PropTypes.shape({
        license: PropTypes.string,
      }),
    }),
  }),
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    subjectIds: PropTypes.arrayOf(PropTypes.string),
  }),
  subjects: PropTypes.arrayOf(PropTypes.object),
  handleClose: PropTypes.func.isRequired,
  renderMarkdown: PropTypes.func.isRequired,
};

export default injectT(NotionDialog);
