import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  fetchDomainMembersSaga,
  fetchDomainMembersRequestSaga
} from "../fetchDomainMembers";
import { fetchDomainMembers } from "../../routines";
import { API_DOMAIN_MEMBERS } from "../../api";

describe("sagas: fetchDomainMembersRequestSaga", () => {
  it("should invoke fetchDomainMembersSaga on trigger", () => {
    expect(() => {
      testSaga(fetchDomainMembersRequestSaga)
        .next()
        .takeLatestEffect(fetchDomainMembers.TRIGGER, fetchDomainMembersSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchDomainMembersRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchDomainMembersSaga);
    }).toThrow();
  });
});

describe("sagas: fetchDomainMembersSaga", () => {
  const id = 1;
  const payload = { id };
  const url = pathToRegexp.compile(API_DOMAIN_MEMBERS)({ id });
  const data = {
    collection: [{ id: 1 }, { id: 2 }]
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchDomainMembersSaga, { payload })
        .next()
        .put(fetchDomainMembers.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchDomainMembers.success(data))
        .next()
        .put(fetchDomainMembers.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call throws an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchDomainMembersSaga, { payload })
        .next()
        .put(fetchDomainMembers.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchDomainMembers.failure(message))
        .next()
        .put(fetchDomainMembers.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
