/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

export function findCategoryLabel(labels) {
  return labels.labels
        .filter(_ => _.type === 'category')
        .map(_ => _.labels)
        .map(cleanLabel => cleanLabel.join(', '));
}

export function isSubject(labelTuppel) {
  return labelTuppel.type === 'subject';
}

export function printSubjects(elem) {
  const findSubject = elem.find(isSubject);
  return findSubject.labels;
}

export function mapLabels(coverList) {
// TODO also set to changed/discontinued when the labels api endpoint is ready.
  const myMap = new Map();
  let allLabels = [];

    // Make a map witch has flattend all the labels arrays of all the covers
  coverList.forEach((cover) => {
    cover.labels.labels.forEach((l) => {
      function theType() {
        switch (l.type) {
          case undefined:
            return 'labels.other';
          case null:
            return 'labels.other';
          default:
            return `labels.${l.type}`;
        }
      }
      myMap.set(theType(), [...new Set(myMap.has(theType()) ? myMap.get(theType()).concat(l.labels) : l.labels)]);
    });
  });

  // Flatten the map to an array for listing in the view component
  myMap.forEach((value, key) => {
    allLabels = allLabels.concat([{ type: key, labels: value }]);
  });
  // Make sure the the labels under each label type are sortert alfabeticaly inside the map
  allLabels.forEach((theType) => {
    theType.labels.sort((a, b) => a.localeCompare(b));
  });

  return allLabels;
}

export function choiceIdent(typeName, choiceName) {
  const name = () => {
    if (typeName === undefined || typeName === null) return 'other';
    return typeName;
  };

  return name().concat('+').concat(choiceName).replace(/\s/g, '_');
}

export function buttonSubjectChoiceIdent(subject) {
  return `labels.subject+${subject}`;
}

export function listingsFlattLabels(labels) {
  return labels.map(label => label.labels.map(l => `labels.${choiceIdent(label.type, l)}`));
}

export function mapTagsToFilters(tags) {
  const filters = {
    main: [],
    sub: []
  }
  tags.forEach(tag => {
    const splitTag = tag.split(':');
    if (splitTag.length > 1) {
      if (!filters.main.includes(splitTag[0])) filters.main.push(splitTag[0]);
      if (!filters.sub.includes(splitTag[1])) filters.sub.push(splitTag[1]);
    }
  })
  return filters;
}

export function mapConceptToListItem(concept, subject) {
  return {
    id: concept.id.toString(),
    name: concept.title.title,
    description: concept.content.content,
    image: concept.metaImage.url,
    subject: [{
      title: subject.name,
      value: subject.id
    }],
    category: {
      title: '',
      value: ''
    },
    filters: concept.tags ? mapTagsToFilters(concept.tags.tags) : {main: [], sub: []}
  }
}
