import _ from "lodash/fp";
import { delay } from "redux-saga";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDomainConcepts } from "../routines";
import { API_BUSINESS_CONCEPT_VERSIONS_SEARCH } from "../api";
import { all, call, put, select, takeLatest } from "redux-saga/effects";

export function* fetchDomainConceptsSaga({ payload }) {
  try {
    yield call(delay, 200);
    const url = API_BUSINESS_CONCEPT_VERSIONS_SEARCH;
    const { concept_id, domain_id, query } = payload;
    const business_concept_id =
      _.isUndefined(concept_id) || _.isNull(concept_id)
        ? undefined
        : [concept_id];
    const filters = {
      business_concept_id,
      domain_id: [domain_id],
      current: [true]
    };
    const body = { filters, query, page: 0, size: 20 };
    const { data } = yield call(apiJsonPost, url, body, JSON_OPTS);
    yield put(fetchDomainConcepts.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchDomainConcepts.failure({ status, data }));
    } else {
      yield put(fetchDomainConcepts.failure(error.message));
    }
  } finally {
    yield put(fetchDomainConcepts.fulfill());
  }
}

export function* fetchDomainConceptsRequestSaga() {
  yield takeLatest(fetchDomainConcepts.TRIGGER, fetchDomainConceptsSaga);
}
