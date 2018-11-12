import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { addDomainMember } from "../routines";
import { API_ACL_ENTRIES_CREATE_OR_UPDATE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* addDomainMemberSaga({ payload }) {
  try {
    const { acl_entry } = payload;
    const url = API_ACL_ENTRIES_CREATE_OR_UPDATE;
    const requestData = { acl_entry };
    yield put(addDomainMember.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put(addDomainMember.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(addDomainMember.failure({ status, data }));
    } else {
      yield put(addDomainMember.failure(error.message));
    }
  } finally {
    yield put(addDomainMember.fulfill());
  }
}

export function* addDomainMemberRequestSaga() {
  yield takeLatest(addDomainMember.TRIGGER, addDomainMemberSaga);
}
