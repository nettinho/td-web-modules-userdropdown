import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptLinkFields } from "../routines";
import { API_CONCEPT_LINK_FIELDS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptLinkFieldsSaga({ payload }) {
  try {
    const { concept_id, structure_id } = payload;
    const url = pathToRegexp.compile(API_CONCEPT_LINK_FIELDS)({
      concept_id,
      structure_id
    });
    yield put(fetchConceptLinkFields.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConceptLinkFields.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConceptLinkFields.failure({ status, data }));
    } else {
      yield put(fetchConceptLinkFields.failure(error.message));
    }
  } finally {
    yield put(fetchConceptLinkFields.fulfill());
  }
}

export function* fetchConceptLinkFieldsRequestSaga() {
  yield takeLatest(fetchConceptLinkFields.TRIGGER, fetchConceptLinkFieldsSaga);
}
