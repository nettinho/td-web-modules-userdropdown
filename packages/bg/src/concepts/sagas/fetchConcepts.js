import { delay } from "redux-saga";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConcepts, selectConceptPage } from "../routines";
import { getConceptQuery } from "../selectors";
import { API_BUSINESS_CONCEPT_VERSIONS_SEARCH } from "../api";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

export function* fetchConceptsSaga() {
  try {
    yield call(delay, 200);
    const body = yield select(getConceptQuery);
    const url = API_BUSINESS_CONCEPT_VERSIONS_SEARCH;
    yield put(fetchConcepts.request(body));
    const { data, headers } = yield call(apiJsonPost, url, body, JSON_OPTS);
    yield put(fetchConcepts.success({ data, headers }));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConcepts.failure({ status, data }));
    } else {
      yield put(fetchConcepts.failure(error.message));
    }
  } finally {
    yield put(fetchConcepts.fulfill());
  }
}

export function* fetchConceptsRequestSaga() {
  yield all([
    takeLatest(fetchConcepts.TRIGGER, fetchConceptsSaga),
    takeLatest(selectConceptPage.TRIGGER, fetchConceptsSaga)
  ]);
}
