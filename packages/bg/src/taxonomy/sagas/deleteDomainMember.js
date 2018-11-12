import pathToRegexp from "path-to-regexp";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteDomainMember } from "../routines";
import { API_ACL_ENTRY } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

const toApiPath = pathToRegexp.compile(API_ACL_ENTRY);

export function* deleteDomainMemberSaga({ payload }) {
  try {
    const url = toApiPath(payload);
    yield put(deleteDomainMember.request());
    yield call(apiJsonDelete, url, JSON_OPTS);
    yield put(deleteDomainMember.success(payload));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(deleteDomainMember.failure({ status, data }));
    } else {
      yield put(deleteDomainMember.failure(error.message));
    }
  } finally {
    yield put(deleteDomainMember.fulfill());
  }
}

export function* deleteDomainMemberRequestSaga() {
  yield takeLatest(deleteDomainMember.TRIGGER, deleteDomainMemberSaga);
}
