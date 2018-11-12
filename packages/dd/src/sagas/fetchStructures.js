import { delay } from "redux-saga";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { fetchStructures, selectStructurePage } from "../routines";
import { API_DATA_STRUCTURES_SEARCH } from "../api";
import { getStructureQuery } from "../selectors";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

export function* fetchStructuresSaga() {
  try {
    yield call(delay, 200);
    const body = yield select(getStructureQuery);
    const url = API_DATA_STRUCTURES_SEARCH;
    yield put(fetchStructures.request(body));
    const { data, headers } = yield call(apiJsonPost, url, body, JSON_OPTS);
    yield put(fetchStructures.success({ data, headers }));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchStructures.failure({ status, data }));
    } else {
      yield put(fetchStructures.failure(error.message));
    }
  } finally {
    yield put(fetchStructures.fulfill());
  }
}

export function* fetchStructuresRequestSaga() {
  yield all([
    takeLatest(fetchStructures.TRIGGER, fetchStructuresSaga),
    takeLatest(selectStructurePage.TRIGGER, fetchStructuresSaga)
  ]);
}
