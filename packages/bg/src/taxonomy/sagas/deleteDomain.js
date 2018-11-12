import pathToRegexp from "path-to-regexp";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteDomain } from "../routines";
import { API_DOMAIN } from "../api";
import routes, { linkTo } from "../routes";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_DOMAIN);

export function* deleteDomainSaga({ payload }) {
  const domain = payload;
  const url = toApiPath(domain);
  const { parent_id } = domain;
  const redirectUrl = parent_id
    ? linkTo.DOMAIN({ id: parent_id })
    : routes.DOMAINS;
  const meta = { redirectUrl };
  try {
    yield put({ meta, ...deleteDomain.request() });
    const { data } = yield call(apiJsonDelete, url, JSON_OPTS);
    yield put({ meta, ...deleteDomain.success(data) });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteDomain.failure({ status, data, message: error.message }));
    } else {
      yield put(deleteDomain.failure(error.message));
    }
  } finally {
    yield put(deleteDomain.fulfill());
  }
}

export function* deleteDomainRequestSaga() {
  yield takeLatest(deleteDomain.TRIGGER, deleteDomainSaga);
}
