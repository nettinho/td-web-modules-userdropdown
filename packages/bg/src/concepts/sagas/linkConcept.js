import pathToRegexp from "path-to-regexp";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { linkConcept } from "../routines";
import { API_CONCEPT_LINKS } from "../api";
import { linkTo } from "../routes";
import { call, put, takeLatest } from "redux-saga/effects";

export function* linkConceptSaga({ payload }) {
  try {
    const { id, field, resource_id, resource_type } = payload;
    const redirectUrl = linkTo.CONCEPT_DATA({ id });
    const meta = { redirectUrl };
    const url = pathToRegexp.compile(API_CONCEPT_LINKS)({
      resource_id,
      resource_type
    });
    const requestData = { field };
    yield put({ meta, ...linkConcept.request() });
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put({ meta, ...linkConcept.success(data) });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(linkConcept.failure({ status, data }));
    } else {
      yield put(linkConcept.failure(error.message));
    }
  } finally {
    yield put(linkConcept.fulfill());
  }
}

export function* linkConceptRequestSaga() {
  yield takeLatest(linkConcept.TRIGGER, linkConceptSaga);
}
