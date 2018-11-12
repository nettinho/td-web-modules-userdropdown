import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRules } from "../routines";
import { API_RULES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchRulesSaga() {
  try {
    const url = API_RULES;
    yield put(fetchRules.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchRules.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchRules.failure({ status, data }));
    } else {
      yield put(fetchRules.failure(error.message));
    }
  } finally {
    yield put(fetchRules.fulfill());
  }
}

export function* fetchRulesRequestSaga() {
  yield takeLatest(fetchRules.TRIGGER, fetchRulesSaga);
}
