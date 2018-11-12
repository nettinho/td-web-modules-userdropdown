import _ from "lodash/fp";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { createRule } from "../routines";
import { API_RULES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* createRuleSaga({ payload }) {
  try {
    const { rule, ids } = payload;
    const url = API_RULES;
    const requestData = { rule };
    const meta = { bc_id: _.get("id")(ids) };
    yield put({ meta, ...createRule.request() });
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put({ meta, ...createRule.success(data) });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createRule.failure({ status, data }));
    } else {
      yield put(createRule.failure(error.message));
    }
  } finally {
    yield put(createRule.fulfill());
  }
}

export function* createRuleRequestSaga() {
  yield takeLatest(createRule.TRIGGER, createRuleSaga);
}
