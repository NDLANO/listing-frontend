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

const NotionDialog = props => {
  const [articleId, setArticleId] = useState(undefined);
  const [articleTitle, setArticleTitle] = useState('');
  const [concept, setConcept] = useState(initialConcept);
  const [image, setImage] = useState(initialImage);

  useEffect(() => {
    // Concept
    fetchConcept(props.item.id).then(response => {
      setArticleId(response.articleId);
      setConcept({
        title: response.title ? response.title.title : '',
        source: response.source,
        created: response.created,
        license: response.copyright ? response.copyright.license.license : '',
        authors: response.copyright
          ? response.copyright.creators.map(creator => creator.name)
          : [],
        rightsholders: response.copyright
          ? response.copyright.rightsholders.map(holder => holder.name)
          : [],
      });
    });

    // Image
    const imageId = props.item.image.split('/').pop();
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
    // Article
    if (articleId) {
      fetchArticle(articleId).then(response => {
        setArticleTitle(response.title ? response.title.title : '');
      });
    }
  }, [articleId]);

  const { t } = props;

  return (
    <NotionDialogWrapper
      title={props.item.name}
      closeCallback={() => props.handleClose(null)}>
      <NotionDialogContent>
        {props.item.image ? (
          <NotionDialogImage
            src={props.item.image}
            alt={props.item.description}
          />
        ) : null}
        <NotionDialogText>{props.item.description}</NotionDialogText>
      </NotionDialogContent>
      <NotionDialogTags
        tags={props.item.subject.map(subject => subject.title)}
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
    </NotionDialogWrapper>
  );
};

NotionDialog.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    subject: PropTypes.arrayOf(
      PropTypes.exact({
        title: PropTypes.string.isRequired,
        value: PropTypes.string,
      }),
    ),
  }),
  handleClose: PropTypes.func.isRequired,
};

export default injectT(NotionDialog);
