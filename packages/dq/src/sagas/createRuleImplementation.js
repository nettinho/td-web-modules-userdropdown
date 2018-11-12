import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { createRuleImplementation } from "../routines";
import { API_RULE_IMPLEMENTATIONS } from "../api";
import { linkTo } from "../routes";
import { call, put, takeLatest } from "redux-saga/effects";

export function* createRuleImplementationSaga({ payload }) {
  try {
    const { rule_implementation, ids } = payload;
    const redirectUrl = linkTo.RULE({ id: ids.id });
    const meta = { redirectUrl };
    const url = API_RULE_IMPLEMENTATIONS;
    const requestData = { rule_implementation };
    yield put({ meta, ...createRuleImplementation.request() });
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put({ meta, ...createRuleImplementation.success(data) });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createRuleImplementation.failure({ status, data }));
    } else {
      yield put(createRuleImplementation.failure(error.message));
    }
  } finally {
    yield put(createRuleImplementation.fulfill());
  }
}

export function* createRuleImplementationRequestSaga() {
  yield takeLatest(
    createRuleImplementation.TRIGGER,
    createRuleImplementationSaga
  );
}
