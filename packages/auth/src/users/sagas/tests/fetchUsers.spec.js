import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchUsersRequestSaga, fetchUsersSaga } from "../fetchUsers";
import { fetchUsers } from "../../routines";
import { API_USERS } from "../../api";

describe("sagas: fetchUsersRequestSaga", () => {
  it("should invoke fetchUsersSaga on trigger", () => {
    expect(() => {
      testSaga(fetchUsersRequestSaga)
        .next()
        .takeLatestEffect(fetchUsers.TRIGGER, fetchUsersSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchUsersRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchUsersSaga);
    }).toThrow();
  });
});

describe("sagas: fetchUsersSaga", () => {
  const data = {
    collection: [
      { id: 1, name: "User 1", email: "user1@truedat.net" },
      { id: 2, name: "User 2", email: "user2@truedat.net" }
    ]
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchUsersSaga)
        .next()
        .put(fetchUsers.request())
        .next()
        .call(apiJson, API_USERS, JSON_OPTS)
        .next({ data })
        .put(fetchUsers.success(data))
        .next()
        .put(fetchUsers.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchUsersSaga)
        .next()
        .put(fetchUsers.request())
        .next()
        .call(apiJson, API_USERS, JSON_OPTS)
        .throw(error)
        .put(fetchUsers.failure(message))
        .next()
        .put(fetchUsers.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
