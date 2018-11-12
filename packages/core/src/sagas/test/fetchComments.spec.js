import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "../../services/api";
import { fetchCommentsRequestSaga, fetchCommentsSaga } from "../fetchComments";
import { fetchComments } from "../../routines";
import { API_COMMENTS } from "../../api";

describe("sagas: fetchCommentsRequestSaga", () => {
  it("should invoke fetchCommentsRequestSaga on trigger", () => {
    expect(() => {
      testSaga(fetchCommentsRequestSaga)
        .next()
        .takeLatestEffect(fetchComments.TRIGGER, fetchCommentsSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchCommentsRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchCommentsSaga);
    }).toThrow();
  });
});

describe("sagas: fetchCommentsSaga", () => {
  const id = 1;
  const url = API_COMMENTS;
  const payload = { resource_id: id, resource_type: "business_concept" };
  const json_opts = { ...JSON_OPTS, params: payload };
  const data = [
    { content: "My first comment", resource_id: id },
    { content: "My second comment", resource_id: id }
  ];

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchCommentsSaga, { payload })
        .next()
        .put(fetchComments.request(payload))
        .next()
        .call(apiJson, url, json_opts)
        .next({ data })
        .put(fetchComments.success(data))
        .next()
        .put(fetchComments.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };
    const payload = { resource_id: id, resource_type: "business_concept" };
    const json_opts = { ...JSON_OPTS, params: payload };

    expect(() => {
      testSaga(fetchCommentsSaga, { payload })
        .next()
        .put(fetchComments.request(payload))
        .next()
        .call(apiJson, url, json_opts)
        .throw(error)
        .put(fetchComments.failure(message))
        .next()
        .put(fetchComments.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
