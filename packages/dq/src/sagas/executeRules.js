import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { executeRules } from "../routines";
import { API_EXECUTE_RULES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* executeRulesSaga() {
  try {
    const url = API_EXECUTE_RULES;
    yield put(executeRules.request());
    const { data } = yield call(apiJsonPost, url, JSON_OPTS);
    yield put(executeRules.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(executeRules.failure({ status, data }));
    } else {
      yield put(executeRules.failure(error.message));
    }
  } finally {
    yield put(executeRules.fulfill());
  }
}

export function* executeRulesRequestSaga() {
  yield takeLatest(executeRules.TRIGGER, executeRulesSaga);
}
