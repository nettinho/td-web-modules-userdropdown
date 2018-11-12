import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptFields } from "../routines";
import { API_CONCEPT_LINKS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptFieldsSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_CONCEPT_LINKS)({
      id
    });
    yield put(fetchConceptFields.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConceptFields.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConceptFields.failure({ status, data }));
    } else {
      yield put(fetchConceptFields.failure(error.message));
    }
  } finally {
    yield put(fetchConceptFields.fulfill());
  }
}

export function* fetchConceptFieldsRequestSaga() {
  yield takeLatest(fetchConceptFields.TRIGGER, fetchConceptFieldsSaga);
}
