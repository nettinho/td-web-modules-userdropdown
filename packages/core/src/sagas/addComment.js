import { apiJsonPost, JSON_OPTS } from "../services/api";
import { createComment } from "../routines";
import { API_COMMENTS } from "../api";
import { call, put, takeLatest } from "redux-saga/effects";

export function* addCommentSaga({ payload }) {
  try {
    const url = API_COMMENTS;
    const { comment } = payload;
    const requestData = { comment };
    yield put(createComment.request());
    const { data } = yield call(apiJsonPost, url, requestData, JSON_OPTS);
    yield put(createComment.success(data));
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      yield put(createComment.failure({ status, data }));
    } else {
      yield put(createComment.failure(error.message));
    }
  } finally {
    yield put(createComment.fulfill());
  }
}

export function* addCommentRequestSaga() {
  yield takeLatest(createComment.TRIGGER, addCommentSaga);
}
