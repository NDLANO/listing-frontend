/*
 *  Copyright (c) 2017-present, NDLA.
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
import { getSubject } from './subjectSelectors';
import Subject from './components/Subject';


class SubjectPage extends Component {
  componentWillMount() {
    console.log('subject page component will mount');
    console.log(this.props);
    const { fetchSubject, params: { subjectId }} = this.props;
    console.log("SP id", subjectId);
    fetchSubject(subjectId);
    //todo -> fetchSubjects
  }

  render() {
    console.log('Are we here yet?');
    const { subject, locale } = this.props;
    console.log('SubjectPage sub ', subject);
    console.log('SubjectPage locale ', locale);
    console.log("!subject", !subject);
    if (!subject) {
        console.log("!subject :´(");
      return null;
    }
    // const scripts = article.requiredLibraries ? article.requiredLibraries.map(lib => ({ src: lib.url, type: lib.mediaType })) : [];
    console.log("title ", subject );

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
    // setSubject: actions.setSubject,
};

SubjectPage.propTypes = {
  params: PropTypes.shape({
    subjectId: PropTypes.string.isRequired,
  }).isRequired,
  subject: SubjectShape,
  locale: PropTypes.string.isRequired,
  fetchSubject: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps ) => {
  console.log('subject mapStateToProps.params ..', state);
  const subjectId = ownProps.params.subjectId;
  console.log('constant subjectId', subjectId);
  // const sub = getSubject(ownProps.params.subjectId);
  //   console.log("SP sub", sub);
  // console.log('getSub ' + JSON.stringify(getSubject(subjectId)(state)));

  //   return {
  //   subject: getSubject(subjectId)(state),
  //   locale: getLocale(state),
  // };
    return {
        subject: state.subjects,
        locale: getLocale(state),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubjectPage);
