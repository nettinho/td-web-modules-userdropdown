import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  REQUEST_ELEMENTS_BY_LEVEL,
  REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
  REQUEST_ELEMENTS_BY_LEVEL_FAILED
} from "../constants";
import { API_LINEAGE_GROUPS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* getElementsById({ uuidElement, currentLevel }) {
  try {
    const url =
      uuidElement !== undefined
        ? API_LINEAGE_GROUPS + `/${uuidElement}/index_contains`
        : API_LINEAGE_GROUPS + "/index_top";
    const { data } = yield call(apiJson, url, JSON_OPTS);

    yield put({
      type: REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
      uuidElement,
      currentLevel,
      data
    });
  } catch (error) {
    yield put({
      type: REQUEST_ELEMENTS_BY_LEVEL_FAILED,
      message: error.message
    });
  } finally {
  }
}

export function* lineageRequestSaga() {
  yield takeLatest(REQUEST_ELEMENTS_BY_LEVEL, getElementsById);
}
