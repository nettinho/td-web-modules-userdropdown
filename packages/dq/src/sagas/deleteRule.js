import pathToRegexp from "path-to-regexp";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteRule } from "../routines";
import { API_RULE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_RULE);

export function* deleteRuleSaga({ payload }) {
  try {
    const id = payload;
    const url = toApiPath(id);
    yield put(deleteRule.request());
    const { data } = yield call(apiJsonDelete, url, JSON_OPTS);
    yield put(deleteRule.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteRule.failure({ status, data }));
    } else {
      yield put(deleteRule.failure(error.message));
    }
  } finally {
    yield put(deleteRule.fulfill());
  }
}

export function* deleteRuleRequestSaga() {
  yield takeLatest(deleteRule.TRIGGER, deleteRuleSaga);
}
