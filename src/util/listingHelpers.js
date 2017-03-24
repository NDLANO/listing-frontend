/*
 *  Copyright (c) 2016-present, NDLA.
 *
 *  This source code is licensed under the GPLv3 license found in the
 *  LICENSE file in the root directory of this source tree.
 *
 */

export function findCategoryLabel(labels) {
  return labels
        .filter(_ => _.type === 'category')
        .map(_ => _.labels)
        .map(cleanLabel => cleanLabel.join(', '));
}

export function isSubject(labelTuppel) {
  // Dette er foreløpig for v1 til vi får avklaringer i #252 #253
  return labelTuppel.type === 'subject' || labelTuppel.type === 'Fag';
}

export function printSubjects(elem) {
  const findSubject = elem.find(isSubject);
  return findSubject.labels;
}

export function mapLabels(coverList) {
  const myMap = new Map();
  let allLabels = [];

    // Make a map witch has flattend all the labels arrays of all the dockets
  coverList.forEach((cover) => {
    cover.labels.forEach((l) => {
      function theType() {
        switch (l.type) {
          case undefined:
            return 'Annet';
          case null:
            return 'Annet';
          default:
            return l.type;
        }
      }
      myMap.set(theType(), [...new Set(myMap.has(theType()) ? myMap.get(theType()).concat(l.labels) : l.labels)]);
    });
  });

    // Flatten the map to an array for listing in the view component
  myMap.forEach((value, key) => {
    allLabels = allLabels.concat([{ type: key, labels: value }]);
  });

  return allLabels;
}

export function choiceIdent(typeName, choiceName) {
  return typeName.concat('+').concat(choiceName).replace(/\s/g, '_');
}
