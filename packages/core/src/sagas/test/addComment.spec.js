import { testSaga } from "redux-saga-test-plan";
import { apiJsonPost, JSON_OPTS } from "../../services/api";
import { addCommentRequestSaga, addCommentSaga } from "../addComment";
import { createComment } from "../../routines";
import { API_COMMENTS } from "../../api";

describe("sagas: addCommentRequestSaga", () => {
  it("should invoke addCommentRequestSaga on trigger", () => {
    expect(() => {
      testSaga(addCommentRequestSaga)
        .next()
        .takeLatestEffect(createComment.TRIGGER, addCommentSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(addCommentRequestSaga)
        .next()
        .takeLatestEffect("FOO", addCommentSaga);
    }).toThrow();
  });
});

describe("sagas: addCommentSaga", () => {
  const id = 1;
  const url = API_COMMENTS;
  const comment = "My invented comment";
  const data = {
    resource_id: id,
    resource_type: "business_concept",
    content: comment
  };
  const payload = { comment: data };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(addCommentSaga, { payload })
        .next()
        .put(createComment.request())
        .next()
        .call(apiJsonPost, url, payload, JSON_OPTS)
        .next({ data })
        .put(createComment.success(data))
        .next()
        .put(createComment.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };
    const url = API_COMMENTS;
    const comment = "My invented comment";
    const data = {
      resource_id: id,
      resource_type: "business_concept",
      content: comment
    };
    const payload = { comment: data };

    expect(() => {
      testSaga(addCommentSaga, { payload })
        .next()
        .put(createComment.request())
        .next()
        .call(apiJsonPost, url, payload, JSON_OPTS)
        .throw(error)
        .put(createComment.failure(message))
        .next()
        .put(createComment.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
