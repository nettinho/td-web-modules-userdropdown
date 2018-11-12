import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchStructureFilters } from "../routines";
import { API_DATA_STRUCTURE_FILTERS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchStructureFiltersSaga() {
  try {
    const url = API_DATA_STRUCTURE_FILTERS;
    yield put(fetchStructureFilters.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchStructureFilters.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchStructureFilters.failure({ status, data }));
    } else {
      yield put(fetchStructureFilters.failure(error.message));
    }
  } finally {
    yield put(fetchStructureFilters.fulfill());
  }
}

export function* fetchStructureFiltersRequestSaga() {
  yield takeLatest(fetchStructureFilters.TRIGGER, fetchStructureFiltersSaga);
}
