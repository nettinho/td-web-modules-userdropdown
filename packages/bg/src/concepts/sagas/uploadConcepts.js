import { apiJsonPost, UPLOAD_JSON_OPTS } from "@truedat/core/services/api";
import { uploadConcepts } from "../routines";
import { call, put, takeLatest } from "redux-saga/effects";

export function* uploadConceptsSaga({ payload }) {
  try {
    const { action, method, href, ...rest } = payload;
    const meta = { action, method, href };
    yield put(uploadConcepts.request({ method, href, ...rest }));
    const body = rest || {};
    const { data } = yield call(apiJsonPost, href, body.data, UPLOAD_JSON_OPTS);

    yield put({ meta, ...uploadConcepts.success(data) });
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(uploadConcepts.failure({ status, data }));
    } else {
      yield put(uploadConcepts.failure(error.message));
    }
  } finally {
    yield put(uploadConcepts.fulfill());
  }
}

export function* uploadConceptsRequestsSaga() {
  yield takeLatest(uploadConcepts.TRIGGER, uploadConceptsSaga);
}
