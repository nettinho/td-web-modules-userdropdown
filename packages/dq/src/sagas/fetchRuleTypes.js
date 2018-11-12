import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRuleTypes } from "../routines";
import { API_RULE_TYPES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchRuleTypesSaga() {
  try {
    const url = API_RULE_TYPES;
    yield put(fetchRuleTypes.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchRuleTypes.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchRuleTypes.failure({ status, data }));
    } else {
      yield put(fetchRuleTypes.failure(error.message));
    }
  } finally {
    yield put(fetchRuleTypes.fulfill());
  }
}

export function* fetchRuleTypesRequestSaga() {
  yield takeLatest(fetchRuleTypes.TRIGGER, fetchRuleTypesSaga);
}
