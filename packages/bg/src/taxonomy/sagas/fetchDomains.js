import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDomains } from "../routines";
import { API_DOMAINS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchDomainsSaga({ payload }) {
  try {
    const { actions } = payload || {};
    const json_opts = actions
      ? { ...JSON_OPTS, params: { actions } }
      : JSON_OPTS;
    const url = API_DOMAINS;
    yield put(fetchDomains.request(payload));
    const { data } = yield call(apiJson, url, json_opts);
    yield put(fetchDomains.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchDomains.failure({ status, data }));
    } else {
      yield put(fetchDomains.failure(error.message));
    }
  } finally {
    yield put(fetchDomains.fulfill());
  }
}

export function* fetchDomainsRequestSaga() {
  yield takeLatest(fetchDomains.TRIGGER, fetchDomainsSaga);
}
