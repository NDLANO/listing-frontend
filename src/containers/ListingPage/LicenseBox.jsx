import React from 'react';
import PropTypes from 'prop-types';

import {
  MediaList,
  MediaListItem,
  MediaListItemBody,
  MediaListItemActions,
  MediaListItemImage,
  MediaListItemMeta,
} from '@ndla/ui';
import { FileDocumentOutline } from '@ndla/icons/common';
import { metaTypes } from '@ndla/licenses';
import Button, { CopyButton } from '@ndla/button';

export const TextContent = ({ t, concept }) => (
  <div>
    <div className="u-introduction">
      <h2>{t('license.text.heading')}</h2>
      <p>{t('license.text.description')}</p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <FileDocumentOutline className="c-medialist__icon" />
        </MediaListItemImage>
        <MediaListItemBody
          license={concept.license}
          title={t('license.text.rules')}
          resourceUrl=''
          locale='nb'
          resourceType='text'>
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  {
                    label: 'Tittel',
                    description: concept.title,
                    metaType: metaTypes.title,
                  },
                  {
                    label: 'Opphaver',
                    description: concept.authors.toString(),
                    metaType: metaTypes.author,
                  },
                  {
                    label: 'Rettighetshaver',
                    description: concept.rightsholders.toString(),
                    metaType: metaTypes.copyrightHolder,
                  },
                  {
                    label: 'Publiseringsdato',
                    description: concept.created,
                    metaType: metaTypes.other,
                  },
                ]}
              />
              <CopyButton outline copyNode={t('license.hasCopiedTitle')}>
                {t('license.copyTitle')}
              </CopyButton>
              <Button
                outline
                onClick={() => { }}>
                {t('license.download')}
              </Button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>
)

TextContent.propTypes = {
  t: PropTypes.func.isRequired,
  concept: PropTypes.exact({
    title: PropTypes.string,
    source: PropTypes.string,
    created: PropTypes.string,
    license: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    rightsholders: PropTypes.arrayOf(PropTypes.string)
  })
}

export const ImageContent = ({ t, image }) => (
  <div>
    <div className="u-introduction">
      <h2>{t('license.images.heading')}</h2>
      <p>{t('license.images.description')}</p>
    </div>
    <MediaList>
      <MediaListItem>
        <MediaListItemImage>
          <img src={image.image.url} alt={image.image.alt} />
        </MediaListItemImage>
        <MediaListItemBody
          license={image.license}
          title={t('license.images.rules')}
          resourceUrl=''
          locale='nb'
          resourceType='image'>
          <MediaListItemActions>
            <div className="c-medialist__ref">
              <MediaListItemMeta
                items={[
                  {
                    label: 'Tittel',
                    description: image.title,
                    metaType: metaTypes.title,
                  },
                  {
                    label: 'Opphaver',
                    description: image.authors.toString(),
                    metaType: metaTypes.author,
                  },
                  {
                    label: 'Rettighetshaver',
                    description: image.rightsholders.toString(),
                    metaType: metaTypes.copyrightHolder,
                  },
                  {
                    label: 'Kilde',
                    description: image.origin,
                    metaType: metaTypes.other,
                  },
                ]}
              />
              <CopyButton outline copyNode={t('license.hasCopiedTitle')}>
                {t('license.copyTitle')}
              </CopyButton>
              <Button
                outline
                onClick={() => { }}>
                {t('license.download')}
              </Button>
            </div>
          </MediaListItemActions>
        </MediaListItemBody>
      </MediaListItem>
    </MediaList>
  </div>
)

ImageContent.propTypes = {
  t: PropTypes.func.isRequired,
  image: PropTypes.exact({
    title: PropTypes.string,
    image: PropTypes.exact({
      url: PropTypes.string,
      alt: PropTypes.string
    }),
    license: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.string),
    rightsholders: PropTypes.arrayOf(PropTypes.string),
    origin: PropTypes.string
  })
}