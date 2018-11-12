import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptArchive } from "../routines";
import { API_CONCEPT_ARCHIVE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptArchiveSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_CONCEPT_ARCHIVE)({ id });
    yield put(fetchConceptArchive.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConceptArchive.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConceptArchive.failure({ status, data }));
    } else {
      yield put(fetchConceptArchive.failure(error.message));
    }
  } finally {
    yield put(fetchConceptArchive.fulfill());
  }
}

export function* fetchConceptArchiveRequestSaga() {
  yield takeLatest(fetchConceptArchive.TRIGGER, fetchConceptArchiveSaga);
}
