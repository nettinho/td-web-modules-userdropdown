import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import FileSaver from "file-saver";
import { downloadConcepts } from "../routines";
import { getConceptQuery } from "../selectors";
import { API_BUSINESS_CONCEPT_VERSIONS_CSV } from "../api";
import { call, put, select, takeLatest } from "redux-saga/effects";

export function* downloadConceptsSaga() {
  try {
    const body = yield select(getConceptQuery);
    const url = API_BUSINESS_CONCEPT_VERSIONS_CSV;
    yield put(downloadConcepts.request(body));
    const { data } = yield call(apiJsonPost, url, body, JSON_OPTS);
    var blob = new Blob([data], { type: "text/csv;charset=utf-8" });
    FileSaver.saveAs(blob, "concepts.csv");
    yield put(downloadConcepts.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(downloadConcepts.failure({ status, data }));
    } else {
      yield put(downloadConcepts.failure(error.message));
    }
  } finally {
    yield put(downloadConcepts.fulfill());
  }
}

export function* downloadConceptsRequestSaga() {
  yield takeLatest(downloadConcepts.TRIGGER, downloadConceptsSaga);
}
