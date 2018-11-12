import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptLinks } from "../routines";
import { API_CONCEPT_LINKS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptLinksSaga({ payload }) {
  try {
    const { resource_id, resource_type } = payload;
    const url = pathToRegexp.compile(API_CONCEPT_LINKS)({
      resource_id,
      resource_type
    });
    yield put(fetchConceptLinks.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConceptLinks.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConceptLinks.failure({ status, data }));
    } else {
      yield put(fetchConceptLinks.failure(error.message));
    }
  } finally {
    yield put(fetchConceptLinks.fulfill());
  }
}

export function* fetchConceptLinksRequestSaga() {
  yield takeLatest(fetchConceptLinks.TRIGGER, fetchConceptLinksSaga);
}
