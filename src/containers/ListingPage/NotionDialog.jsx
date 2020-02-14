import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { injectT } from 'ndla-i18n/lib/injectT';
import {
  NotionDialogContent,
  NotionDialogImage,
  NotionDialogText,
  NotionDialogTags,
  NotionDialogLicenses,
  NotionDialogWrapper,
} from '@ndla/notion';
import Modal, { ModalHeader, ModalBody, ModalCloseButton } from '@ndla/modal';
import Button from '@ndla/button';
import Tabs from '@ndla/tabs';

import { fetchConcept } from './listingApi';

const NotionDialog = (props) => {
  const [copyright, setCopyright] = useState({
    license: '',
    source: '',
    authors: []
  });

  useEffect(() => {
    fetchConcept(props.item.id)
    .then(response => {
      setCopyright({
      license: response.copyright ? response.copyright.license.license : '',
      source: response.source,
      authors: response.copyright ? response.copyright.creators.map(creator => creator.name) : []
    })})
  }, []);

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
      <NotionDialogTags tags={props.item.subject.map(subject => subject.title)} />
      <NotionDialogLicenses
          license={copyright.license}
          source={copyright.source}
          authors={copyright.authors}
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
                            // content: <TextContent t={t} />,
                          },
                          {
                            title: t('license.tabs.images'),
                            // content: <ImageContent t={t} />,
                          },
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
  )
}

NotionDialog.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string,
    subject: PropTypes.arrayOf(PropTypes.exact({
      title: PropTypes.string.isRequired,
      value: PropTypes.string
    }))
  }),
  handleClose: PropTypes.func.isRequired
}

export default injectT(NotionDialog);