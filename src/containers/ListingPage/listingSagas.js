/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {take, call, put, select} from "redux-saga-effects";
import {getLocale} from "../Locale/localeSelectors";
import {getListing} from "./listingSelectors"
import * as constants from "./listingConstants";
import * as actions from "./listingActions";
import * as api from "./listingApi";


export function* fetchListing(id) {
        const locale = yield select(getLocale);
        const listing = yield call(api.fetchListing, id, locale);
        console.log("listing saga  call api.fetchListing result:", listing);
        yield put(actions.setListing(listing));
}

export function* watchFetchListing() {
    while (true) {
        const {payload: id} = yield take(constants.FETCH_LISTING);
        console.log("wathcFetchListing payload id", id );
        // const id = yield take(constants.FETCH_LISTING);
        // const current = yield select(getListing(id));
        // console.log("current: ", current);

        yield call(fetchListing, id);
    }
}

export default [
    watchFetchListing,
];