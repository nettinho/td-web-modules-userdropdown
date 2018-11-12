import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDomainTemplates } from "../routines";
import { API_DOMAIN_TEMPLATES } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchDomainTemplatesSaga({ payload }) {
  try {
    const { domain_id } = payload;
    const url = pathToRegexp.compile(API_DOMAIN_TEMPLATES)({ id: domain_id });
    yield put(fetchDomainTemplates.request());
    const json_opts = { ...JSON_OPTS, params: { preprocess: true } };
    const { data } = yield call(apiJson, url, json_opts);
    yield put(fetchDomainTemplates.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchDomainTemplates.failure({ status, data }));
    } else {
      yield put(fetchDomainTemplates.failure(error.message));
    }
  } finally {
    yield put(fetchDomainTemplates.fulfill());
  }
}

export function* fetchDomainTemplatesRequestSaga() {
  yield takeLatest(fetchDomainTemplates.TRIGGER, fetchDomainTemplatesSaga);
}
