import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConcept } from "../routines";
import { API_BUSINESS_CONCEPT_VERSION } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_BUSINESS_CONCEPT_VERSION)({ id });
    yield put(fetchConcept.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConcept.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConcept.failure({ status, data }));
    } else {
      yield put(fetchConcept.failure(error.message));
    }
  } finally {
    yield put(fetchConcept.fulfill());
  }
}

export function* fetchConceptRequestSaga() {
  yield takeLatest(fetchConcept.TRIGGER, fetchConceptSaga);
}
