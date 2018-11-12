import pathToRegexp from "path-to-regexp";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteConceptLink } from "../routines";
import { API_CONCEPT_LINK } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_CONCEPT_LINK);

export function* deleteConceptLinkSaga({ payload }) {
  try {
    const { id } = payload;
    const meta = { id };
    const url = toApiPath(payload);
    yield put({ meta, ...deleteConceptLink.request() });
    const { data } = yield call(apiJsonDelete, url, JSON_OPTS);
    yield put({ meta, ...deleteConceptLink.success(data) });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteConceptLink.failure({ status, data }));
    } else {
      yield put(deleteConceptLink.failure(error.message));
    }
  } finally {
    yield put(deleteConceptLink.fulfill());
  }
}

export function* deleteConceptLinkRequestSaga() {
  yield takeLatest(deleteConceptLink.TRIGGER, deleteConceptLinkSaga);
}
