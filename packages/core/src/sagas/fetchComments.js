import { apiJson, JSON_OPTS } from "../services/api";
import { fetchComments } from "../routines";
import { API_COMMENTS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* fetchCommentsSaga({ payload }) {
  try {
    const { resource_id, resource_type } = payload || {};
    const json_opts = resource_id
      ? { ...JSON_OPTS, params: { resource_id, resource_type } }
      : JSON_OPTS;
    const url = API_COMMENTS;
    yield put(fetchComments.request({ resource_id, resource_type }));
    const { data } = yield call(apiJson, url, json_opts);
    yield put(fetchComments.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(fetchComments.failure({ status, data }));
    } else {
      yield put(fetchComments.failure(error.message));
    }
  } finally {
    yield put(fetchComments.fulfill());
  }
}

export function* fetchCommentsRequestSaga() {
  yield takeLatest(fetchComments.TRIGGER, fetchCommentsSaga);
}
