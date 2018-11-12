import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRule } from "../routines";
import { API_RULE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_RULE);

export function* fetchRuleSaga({ payload }) {
  try {
    const { id } = payload;
    const url = toApiPath({ id });
    yield put(fetchRule.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchRule.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchRule.failure({ status, data }));
    } else {
      yield put(fetchRule.failure(error.message));
    }
  } finally {
    yield put(fetchRule.fulfill());
  }
}

export function* fetchRuleRequestSaga() {
  yield takeLatest(fetchRule.TRIGGER, fetchRuleSaga);
}
