import _ from "lodash/fp";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { fetchPaths } from "../routines";
import { API_PATHS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchPathsSaga({ payload }) {
  try {
    const { uuids: uuidString, titles: titlesString, type_analysis } = payload;
    const uuids = uuidString ? _.split(",")(uuidString) : undefined;
    const titles = titlesString ? _.split(",")(titlesString) : undefined;
    const b = {
      toplevel: "lineage-load",
      levels: -1,
      type_analysis
    };
    const body = Object.assign({}, b, uuids ? { uuids } : { titles });
    yield put(fetchPaths.request());
    const { data } = yield call(apiJsonPost, API_PATHS, body, JSON_OPTS);
    yield put(fetchPaths.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchPaths.failure({ status, data }));
    } else {
      yield put(fetchPaths.failure(error.message));
    }
  } finally {
    yield put(fetchPaths.fulfill());
  }
}

export function* fetchPathsRequestSaga() {
  yield takeLatest(fetchPaths.TRIGGER, fetchPathsSaga);
}
