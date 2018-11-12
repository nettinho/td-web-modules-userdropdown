import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { createDomain } from "../routines";
import { API_DOMAINS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* createDomainSaga({ payload }) {
  try {
    const { domain } = payload;
    const url = API_DOMAINS;
    const requestData = { domain };
    yield put(createDomain.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put(createDomain.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createDomain.failure({ status, data }));
    } else {
      yield put(createDomain.failure(error.message));
    }
  } finally {
    yield put(createDomain.fulfill());
  }
}

export function* createDomainRequestSaga() {
  yield takeLatest(createDomain.TRIGGER, createDomainSaga);
}
