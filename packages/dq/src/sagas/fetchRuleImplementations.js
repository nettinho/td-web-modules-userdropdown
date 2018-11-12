import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRuleImplementations } from "../routines";
import { API_RULE_IMPLEMENTATIONS_FROM_RULE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const getRuleImplementationsUrl = pathToRegexp.compile(
  API_RULE_IMPLEMENTATIONS_FROM_RULE
);

export function* fetchRuleImplementationsSaga({ payload }) {
  try {
    const { id } = payload;
    const url = getRuleImplementationsUrl({ id });
    yield put(fetchRuleImplementations.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchRuleImplementations.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchRuleImplementations.failure({ status, data }));
    } else {
      yield put(fetchRuleImplementations.failure(error.message));
    }
  } finally {
    yield put(fetchRuleImplementations.fulfill());
  }
}

export function* fetchRuleImplementationsRequestSaga() {
  yield takeLatest(
    fetchRuleImplementations.TRIGGER,
    fetchRuleImplementationsSaga
  );
}
