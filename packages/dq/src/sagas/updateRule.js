import pathToRegexp from "path-to-regexp";
import { apiJsonPut, JSON_OPTS } from "@truedat/core/services/api";
import { updateRule } from "../routines";
import { API_RULE } from "../api";
import { linkTo } from "../routes";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_RULE);

export function* updateRuleSaga({ payload }) {
  const { rule, ids } = payload;
  const redirectUrl = linkTo.RULE({ id: ids.id });
  const meta = { redirectUrl };
  const url = toApiPath(rule);
  const requestData = { rule };
  try {
    yield put({ meta, ...updateRule.request() });
    const { data } = yield call(apiJsonPut, url, requestData, JSON_OPTS);
    yield put({ meta, ...updateRule.success(data) });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateRule.failure({ status, data }));
    } else {
      yield put(updateRule.failure(error.message));
    }
  } finally {
    yield put(updateRule.fulfill());
  }
}

export function* updateRuleRequestSaga() {
  yield takeLatest(updateRule.TRIGGER, updateRuleSaga);
}
