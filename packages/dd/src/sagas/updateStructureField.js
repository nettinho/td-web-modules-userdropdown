import pathToRegexp from "path-to-regexp";
import { apiJsonPatch, JSON_OPTS } from "@truedat/core/services/api";
import { updateStructureField } from "../routines";
import { API_DATA_FIELD } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* updateStructureFieldSaga({ payload }) {
  try {
    const { data_field } = payload;
    const url = pathToRegexp.compile(API_DATA_FIELD)(data_field);
    const requestData = { data_field };
    yield put(updateStructureField.request());
    const { data } = yield call(apiJsonPatch, url, requestData, JSON_OPTS);
    yield put(updateStructureField.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateStructureField.failure({ status, data }));
    } else {
      yield put(updateStructureField.failure(error.message));
    }
  } finally {
    yield put(updateStructureField.fulfill());
  }
}

export function* updateStructureFieldRequestSaga() {
  yield takeLatest(updateStructureField.TRIGGER, updateStructureFieldSaga);
}
