/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// Foreløpig rigget for mock objekter. Egen oppgave gjøre det faktiske kallet til nye listing-api .

import fetch from 'isomorphic-fetch';
import { choiceIdent } from '../../util/listingHelpers';
import { resolveJsonOrRejectWithError, apiResourceUrl } from '../../util/apiHelpers';

const baseUrl = apiResourceUrl('/listing-api/v1/listing/');

const mock1 = JSON.parse('{"id":1,"coverPhotoUrl":"https://test.api.ndla.no/image-api/v1/raw/meter_blyant_kollasj.jpg","title":"Meterstokk og blyant","description":"Her er bilder av meterstokk og blyant. Alle bygningsarbeidere har en solid blyant.","articleApiId":9267,"labels":[{"type":"category","labels":["Måleverktøy"]},{"type":"subject","labels":["Betongfaget"]}]}');
const mock2 = JSON.parse('{"id":2,"coverPhotoUrl":"https://test.api.ndla.no/image-api/v1/raw/malband.jpg","title":"Målebånd","description":"Her er to ulike typer målbånd. Det ene har en lengde fra 2\u20133 meter, det andre har gjerne en lengde på 10 meter eller mer.","articleApiId":9268,"labels":[{"type":"category","labels":["Måleverktøy"]},{"type":"subject","labels":["Betongfaget"]}]}');
const mock3 = JSON.parse('{"id":3,"coverPhotoUrl":"https://test.api.ndla.no/image-api/v1/raw/bf_snekker_vater-1.jpg","title":"Vater","description":"Navnet kommer av at vi kan bruke utstyret til å kontrollere om noe er i vater.","articleApiId":9269,"labels":[{"type":"category","labels":["Måleverktøy"]},{"type":"subject","labels":["Betongfaget"]}]}');
const mock4 = JSON.parse('{"id":4,"coverPhotoUrl":"https://test.api.ndla.no/image-api/v1/raw/bf_snekker_snekkervinkel.jpg","title":"Vinkel","description":"Det ene bilde viser en fast vinkel med 90°. Den har også mulighet til å merke av 45°.","articleApiId":9270,"labels":[{"type":"category","labels":["Måleverktøy", "Annet"]},{"type":"subject","labels":["Betongfaget", "Murerfaget"]}]}');
const mock5 = JSON.parse('{"id":5,"coverPhotoUrl":"https://test.api.ndla.no/image-api/v1/raw/bf_snekker_krittsnor.jpg","title":"Krittsnor","description":"Her er snora dratt inn på en spole som er omgitt av fargekritt.","articleApiId":9271,"labels":[{"type":"category","labels":["Måleverktøy"]},{"type":"subject","labels":["Betongfaget"]}]}');

function mockListing(id) {
  return JSON.parse(`
    {"title": "Hammer",
     "description": "Kort tekst for Hammer for subject ${id}", 
     "coverPhoto": "https://test.api.ndla.no/image-api/v1/raw/skyss_vergrei_plakater_a3-4.jpg?cropStart=200,200&cropEnd=400,400", 
     "articleApiId": 187, 
     "labels": [
       {
        "type": "Fag", 
        "labels": ["betongfaget", "murerfaget", "tømrerfaget"]
        },
        {
         "type": "Kategori",
         "labels": ["personlig verktøy"]
        },
        {
         "type": "Nyttig hjemme",
         "labels": ["oppussing", "forsvar"]
        },
        {
         "labels" : ["myke fag", "voksenlivet", "metalurgi"]
        }
     ]
     }`);
}

function mockListing2(id) {
  return JSON.parse(`
    {"title": "Meter og blyant",
     "description": "Kort tekst for Meter og blyant for subject ${id}", 
     "coverPhoto": "https://test.api.ndla.no/image-api/v1/raw/sp7a2995.jpg?cropStart=200,200&cropEnd=400,400", 
     "articleApiId": 188, 
     "labels": [
       {
        "type": "Fag", 
        "labels": ["betongfaget", "tømrerfaget", "elektrofaget" ]
        },
        {
         "type": "Kategori",
         "labels": ["måleverktøy", "personlig verktøy"]
        },
        { "type": null,
         "labels" : ["voksenlivet", "oppussing"]
        },
        { 
         "labels" : ["dugnadsånd"]
        }
     ]
     }`);
}

function mockListing3(id) {
  return JSON.parse(`
    {"title": "Noe annet",
     "description": "Kort tekst for Meter og blyant for subject ${id}", 
     "coverPhoto": "https://test.api.ndla.no/image-api/v1/raw/tad7ebce.jpg?cropStart=200,200&cropEnd=400,400", 
     "articleApiId": 188, 
     "labels": [
       {
        "type": "Fag", 
        "labels": ["other"]
        }
     ]
     }`);
}

/*
 * For optemizing, labels are flattend to a array of options which are the id's of the filter checkboxes,
 * so that this does not need to be done for every filter choice.
 * */
function listingsFlattLabels(labels) {
  // console.log('labels', labels);
  return labels.map(label =>
    // console.log('label:', label);
     label.labels.map(l => choiceIdent(label.type, l)));
}

// Kan lage min egen actual call . . .


// Mock data enn så lenge
export const fetchListingBetterMock = (id) => {
  console.log('fetch id not in use', mock1);
  const mockListings = [mock1].concat(mock2, mock3, mock4, mock5);
  const m = mockListings.map((listing) => {
    const listingsFlattLabels2 = listingsFlattLabels(listing.labels);
    listing.filterChoices = listingsFlattLabels2.reduce((a, b) => a.concat(b), []);
    return listing;
  });
  console.log('mocklisting flattend labels for options:', m);

  return m;
};

// export const fetchArticles = id => fetch(`${baseUrl}?id=${id}`).then(resolveJsonOrRejectWithError);
export const fetchListing = id => fetch(`${baseUrl}/${id}`).then(resolveJsonOrRejectWithError);
//   console.log('api fetchListing');
//   const listings = [1, 2, 3, 4, 5].map((id) => {
//     const theCover = fetch(`${baseUrl}/${id}`).then(resolveJsonOrRejectWithError);
//     console.log('theCover', theCover);
//
//     // theCover.resolve('Success').then(function(value) {
//     //   console.log(value); // "Success"
//     // }, function(value) {
//     //   // not called
//     // });
//     //
//     //
//
//     try{
//
//      const listing = yield call(fetch(`${baseUrl}/${id}`).then(resolveJsonOrRejectWithError))
//
//     }catch (e) {
//       throw e;
//     }
//
//     return theCover;
//   });
//
//   console.log('listings from api:', listings);
//
//   return listings;
// };


export const fetchListingFunMock = (id) => {
  const mockListings = [1, 2].map(() => mockListing(id)).concat([8].map(() => mockListing2(id))).concat([3, 6].map(() => mockListing3(id)));
  console.log('mock fetchListing', mockListings);

  const m = mockListings.map((listing) => {
    const listingsFlattLabels2 = listingsFlattLabels(listing.labels);
    listing.filterChoices = listingsFlattLabels2.reduce((a, b) => a.concat(b), []);
    return listing;
  });
  console.log('mocklisting flattend labels for options:', m);

  return m;
};
