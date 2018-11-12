import { delay } from "redux-saga";
import {
  apiJson,
  apiJsonDelete,
  apiJsonPatch,
  apiJsonPost,
  apiJsonPut,
  JSON_OPTS
} from "@truedat/core/services/api";
import { conceptAction } from "../routines";
import { call, put, takeLatest } from "redux-saga/effects";

const methodFromVerb = {
  GET: apiJson,
  DELETE: apiJsonDelete,
  PATCH: apiJsonPatch,
  POST: apiJsonPost,
  PUT: apiJsonPut
};

export function* conceptActionSaga({ payload }) {
  try {
    const { action, method, href, ...rest } = payload;
    const meta = { action, method, href };
    yield put(conceptAction.request({ method, href, ...rest }));
    const apiMethod = methodFromVerb[method];
    if (method == "GET") {
      const { data } = yield call(apiMethod, href, JSON_OPTS);
      yield put({ meta, ...conceptAction.success(data) });
    } else if (method == "DELETE") {
      const { data } = yield call(apiMethod, href, JSON_OPTS);
      yield call(delay, 500); // give a bit of time for elasticsearch to flush
      yield put({ meta, ...conceptAction.success(data) });
    } else {
      const body = rest || {};
      const { data } = yield call(apiMethod, href, body, JSON_OPTS);
      yield put({ meta, ...conceptAction.success(data) });
    }
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(conceptAction.failure({ status, data }));
    } else {
      yield put(conceptAction.failure(error.message));
    }
  } finally {
    yield put(conceptAction.fulfill());
  }
}

export function* conceptActionRequestSaga() {
  yield takeLatest(conceptAction.TRIGGER, conceptActionSaga);
}
