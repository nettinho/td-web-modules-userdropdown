import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptFilters } from "../routines";
import { API_CONCEPT_FILTERS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptFiltersSaga() {
  try {
    const url = API_CONCEPT_FILTERS;
    yield put(fetchConceptFilters.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConceptFilters.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConceptFilters.failure({ status, data }));
    } else {
      yield put(fetchConceptFilters.failure(error.message));
    }
  } finally {
    yield put(fetchConceptFilters.fulfill());
  }
}

export function* fetchConceptFiltersRequestSaga() {
  yield takeLatest(fetchConceptFilters.TRIGGER, fetchConceptFiltersSaga);
}
