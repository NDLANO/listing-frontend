/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { OneColumn } from 'ndla-ui';
import * as actions from './subjectActions';
import { getLocale } from '../Locale/localeSelectors';
import { SubjectShape } from '../../shapes';
import Subject from './components/Subject';


class SubjectPage extends Component {
  componentWillMount() {
    const { fetchSubject, params: { subjectId } } = this.props;
    fetchSubject(subjectId);
    // todo -> fetchSubjects
  }

  render() {
    const { subject } = this.props;
    if (!subject) {
      return null;
    }

    return (
      <OneColumn>
        <Helmet
          title={`NDLA | ${subject.title}`}
        />
        <p>make a grid here with react component ...
            {`${JSON.stringify(subject)}`}
        </p>
        <Subject subject={subject} />
      </OneColumn>
    );
  }
}

const mapDispatchToProps = {
  fetchSubject: actions.fetchSubject,
};

SubjectPage.propTypes = {
  params: PropTypes.shape({
    subjectId: PropTypes.string.isRequired,
  }).isRequired,
  subject: SubjectShape,
  locale: PropTypes.string.isRequired,
  fetchSubject: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  subject: state.subjects,
  locale: getLocale(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPage);
