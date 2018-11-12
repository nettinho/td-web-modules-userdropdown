import { apiJsonOptions, JSON_OPTS } from "@truedat/core/services/api";
import { optionsDomains } from "../routines";
import { API_DOMAINS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* optionsDomainsSaga() {
  try {
    const url = API_DOMAINS;
    yield put(optionsDomains.request());
    const { data, headers } = yield call(apiJsonOptions, url, JSON_OPTS);
    yield put(optionsDomains.success({ data, headers }));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(optionsDomains.failure({ status, data }));
    } else {
      yield put(optionsDomains.failure(error.message));
    }
  } finally {
    yield put(optionsDomains.fulfill());
  }
}

export function* optionsDomainsRequestSaga() {
  yield takeLatest(optionsDomains.TRIGGER, optionsDomainsSaga);
}
