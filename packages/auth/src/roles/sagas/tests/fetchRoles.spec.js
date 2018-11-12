import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRolesRequestSaga, fetchRolesSaga } from "../fetchRoles";
import { fetchRoles } from "../../routines";
import { API_ROLES } from "../../api";

describe("sagas: fetchRolesRequestSaga", () => {
  it("should invoke fetchRolesSaga on trigger", () => {
    expect(() => {
      testSaga(fetchRolesRequestSaga)
        .next()
        .takeLatestEffect(fetchRoles.TRIGGER, fetchRolesSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchRolesRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchRolesSaga);
    }).toThrow();
  });
});

describe("sagas: fetchRolesSaga", () => {
  const data = {
    collection: [
      { id: 1, name: "Role 1", email: "user1@truedat.net" },
      { id: 2, name: "Role 2", email: "user2@truedat.net" }
    ]
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchRolesSaga)
        .next()
        .put(fetchRoles.request())
        .next()
        .call(apiJson, API_ROLES, JSON_OPTS)
        .next({ data })
        .put(fetchRoles.success(data))
        .next()
        .put(fetchRoles.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchRolesSaga)
        .next()
        .put(fetchRoles.request())
        .next()
        .call(apiJson, API_ROLES, JSON_OPTS)
        .throw(error)
        .put(fetchRoles.failure(message))
        .next()
        .put(fetchRoles.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
