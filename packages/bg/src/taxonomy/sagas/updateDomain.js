import pathToRegexp from "path-to-regexp";
import { apiJsonPut, JSON_OPTS } from "@truedat/core/services/api";
import { updateDomain } from "../routines";
import { API_DOMAIN } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_DOMAIN);

export function* updateDomainSaga({ payload }) {
  try {
    const { domain } = payload;
    const url = toApiPath(domain);
    const requestData = { domain };
    yield put(updateDomain.request());
    const { data } = yield call(apiJsonPut, url, requestData, JSON_OPTS);
    yield put(updateDomain.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateDomain.failure({ status, data }));
    } else {
      yield put(updateDomain.failure(error.message));
    }
  } finally {
    yield put(updateDomain.fulfill());
  }
}

export function* updateDomainRequestSaga() {
  yield takeLatest(updateDomain.TRIGGER, updateDomainSaga);
}
