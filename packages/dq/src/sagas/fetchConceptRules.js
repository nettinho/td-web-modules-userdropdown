import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptRules } from "../routines";
import { API_CONCEPT_RULES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchConceptRulesSaga({ payload }) {
  try {
    const { business_concept_id } = payload;
    const url = pathToRegexp.compile(API_CONCEPT_RULES)({
      id: business_concept_id
    });
    yield put(fetchConceptRules.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchConceptRules.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchConceptRules.failure({ status, data }));
    } else {
      yield put(fetchConceptRules.failure(error.message));
    }
  } finally {
    yield put(fetchConceptRules.fulfill());
  }
}

export function* fetchConceptRulesRequestSaga() {
  yield takeLatest(fetchConceptRules.TRIGGER, fetchConceptRulesSaga);
}
