/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { OneColumn } from 'ndla-ui';
import { injectT } from 'ndla-i18n';

const ThemePage = ({ t, subjects }) => {
  if (!subjects) {
    return null;
  }

  return (
    <OneColumn>
      <h1>{t('themePage.heading')}</h1>
      <p>{t('themePage.intro')}</p>
      <h2>{t('themePage.chooseTheme')}</h2>
      {subjects.map(subject =>
        <div key={subject.id}>
          <Link to={`/${subject.id}`}>{subject.name}</Link>
          <br/>
        </div>
      )}
    </OneColumn>
  );
}

ThemePage.propTypes = {
  subjects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  )
}
const mapStateToProps = state => ({
  subjects: state.subjects
});

export default connect(mapStateToProps)(injectT(ThemePage));
