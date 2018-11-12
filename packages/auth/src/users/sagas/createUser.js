import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { createUser } from "../routines";
import { API_USERS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* createUserSaga({ payload }) {
  try {
    const { user } = payload;
    const url = API_USERS;
    const requestData = { user };
    yield put(createUser.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put(createUser.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createUser.failure({ status, data }));
    } else {
      yield put(createUser.failure(error.message));
    }
  } finally {
    yield put(createUser.fulfill());
  }
}

export function* createUserRequestSaga() {
  yield takeLatest(createUser.TRIGGER, createUserSaga);
}
