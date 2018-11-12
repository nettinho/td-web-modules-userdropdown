import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonDelete, JSON_OPTS } from "@truedat/core/services/api";
import { deleteRuleRequestSaga, deleteRuleSaga } from "../deleteRule";
import { deleteRule } from "../../routines";
import { API_RULE } from "../../api";

describe("sagas: deleteRuleRequestSaga", () => {
  it("should invoke deleteRuleSaga on trigger", () => {
    expect(() => {
      testSaga(deleteRuleRequestSaga)
        .next()
        .takeLatestEffect(deleteRule.TRIGGER, deleteRuleSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(deleteRuleRequestSaga)
        .next()
        .takeLatestEffect("FOO", deleteRule);
    }).toThrow();
  });
});

describe("sagas: deleteRuleSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_RULE)({ id });
  const payload = { id };
  const data = {};

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(deleteRuleSaga, { payload })
        .next()
        .put(deleteRule.request())
        .next()
        .call(apiJsonDelete, url, JSON_OPTS)
        .next({ data })
        .put(deleteRule.success(data))
        .next()
        .put(deleteRule.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(deleteRuleSaga, { payload })
        .next()
        .put(deleteRule.request())
        .next()
        .call(apiJsonDelete, url, JSON_OPTS)
        .throw(error)
        .put(deleteRule.failure(message))
        .next()
        .put(deleteRule.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
