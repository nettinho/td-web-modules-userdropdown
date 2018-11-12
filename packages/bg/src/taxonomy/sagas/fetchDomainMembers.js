import pathToRegexp from "path-to-regexp";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDomainMembers } from "../routines";
import { API_DOMAIN_MEMBERS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchDomainMembersSaga({ payload }) {
  try {
    const { id } = payload;
    const url = pathToRegexp.compile(API_DOMAIN_MEMBERS)({ id });
    yield put(fetchDomainMembers.request());
    const { data } = yield call(apiJson, url, JSON_OPTS);
    yield put(fetchDomainMembers.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchDomainMembers.failure({ status, data }));
    } else {
      yield put(fetchDomainMembers.failure(error.message));
    }
  } finally {
    yield put(fetchDomainMembers.fulfill());
  }
}

export function* fetchDomainMembersRequestSaga() {
  yield takeLatest(fetchDomainMembers.TRIGGER, fetchDomainMembersSaga);
}
