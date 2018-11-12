import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDomain } from "../routines";
import { API_DOMAIN } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_DOMAIN);

export function* fetchDomainSaga({ payload }) {
  try {
    const { id } = payload;
    const url = toApiPath({ id });
    yield put(fetchDomain.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchDomain.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchDomain.failure({ status, data }));
    } else {
      yield put(fetchDomain.failure(error.message));
    }
  } finally {
    yield put(fetchDomain.fulfill());
  }
}

export function* fetchDomainRequestSaga() {
  yield takeLatest(fetchDomain.TRIGGER, fetchDomainSaga);
}
