import pathToRegexp from "path-to-regexp";
import _ from "lodash/fp";
import { apiJsonPatch, JSON_OPTS } from "@truedat/core/services/api";
import { updateStructure } from "../routines";
import { API_DATA_STRUCTURE } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* updateStructureSaga({ payload }) {
  try {
    const { data_structure } = payload;
    const url = pathToRegexp.compile(API_DATA_STRUCTURE)(data_structure);
    const requestData = { data_structure: _.omit(["id"])(data_structure) };
    yield put(updateStructure.request());
    const { data } = yield call(apiJsonPatch, url, requestData, JSON_OPTS);
    yield put(updateStructure.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(updateStructure.failure({ status, data }));
    } else {
      yield put(updateStructure.failure(error.message));
    }
  } finally {
    yield put(updateStructure.fulfill());
  }
}

export function* updateStructureRequestSaga() {
  yield takeLatest(updateStructure.TRIGGER, updateStructureSaga);
}
