/**
 * Copyright (c) 2021-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import { i18n } from '@ndla/i18n';
import { messagesNB, messagesEN, messagesNN } from '@ndla/ui';
import nb from './phrases/phrases-nb';
import nn from './phrases/phrases-nn';
import en from './phrases/phrases-en';

i18n.addResourceBundle('en', 'translation', en, true, false);
i18n.addResourceBundle('nn', 'translation', nn, true, false);
i18n.addResourceBundle('nb', 'translation', nb, true, false);
i18n.addResourceBundle('en', 'translation', messagesEN, true, false);
i18n.addResourceBundle('nn', 'translation', messagesNN, true, false);
i18n.addResourceBundle('nb', 'translation', messagesNB, true, false);

export default i18n;
