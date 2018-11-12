import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchUserSaga, fetchUserRequestSaga } from "../fetchUser";
import { fetchUser } from "../../routines";
import { API_USER } from "../../api";

describe("sagas: fetchUserRequestSaga", () => {
  it("should invoke fetchUserSaga on trigger", () => {
    expect(() => {
      testSaga(fetchUserRequestSaga)
        .next()
        .takeLatestEffect(fetchUser.TRIGGER, fetchUserSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchUserRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchUserSaga);
    }).toThrow();
  });
});

describe("sagas: fetchUserSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_USER)({ id });
  const payload = { id };

  it("should put a success action when a response is returned", () => {
    const data = { id, name: "User 1", email: "user1@truedat.net" };

    expect(() => {
      testSaga(fetchUserSaga, { payload })
        .next()
        .put(fetchUser.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchUser.success(data))
        .next()
        .put(fetchUser.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call throws an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchUserSaga, { payload })
        .next()
        .put(fetchUser.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchUser.failure(message))
        .next()
        .put(fetchUser.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
