import { apiJson, JSON_OPTS } from "../services/api";
import { fetchEvents } from "../routines";
import { API_SHOW_EVENTS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchEventsSaga({ payload }) {
  try {
    const { resource_id, resource_type } = payload || {};
    const json_opts = resource_id
      ? { ...JSON_OPTS, params: { resource_id, resource_type } }
      : JSON_OPTS;
    const url = API_SHOW_EVENTS;
    yield put(fetchEvents.request(payload));
    const { data } = yield call(apiJson, url, json_opts);
    yield put(fetchEvents.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchEvents.failure({ status, data }));
    } else {
      yield put(fetchEvents.failure(error.message));
    }
  } finally {
    yield put(fetchEvents.fulfill());
  }
}

export function* fetchEventsRequestSaga() {
  yield takeLatest(fetchEvents.TRIGGER, fetchEventsSaga);
}
