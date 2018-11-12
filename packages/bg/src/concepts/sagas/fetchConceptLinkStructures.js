import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptLinkStructures } from "../routines";
import { API_CONCEPT_LINK_STRUCTURES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptLinkStructuresSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_CONCEPT_LINK_STRUCTURES)({
      id
    });
    yield put(fetchConceptLinkStructures.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConceptLinkStructures.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConceptLinkStructures.failure({ status, data }));
    } else {
      yield put(fetchConceptLinkStructures.failure(error.message));
    }
  } finally {
    yield put(fetchConceptLinkStructures.fulfill());
  }
}

export function* fetchConceptLinkStructuresRequestSaga() {
  yield takeLatest(
    fetchConceptLinkStructures.TRIGGER,
    fetchConceptLinkStructuresSaga
  );
}
