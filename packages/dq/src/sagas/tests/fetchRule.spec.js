import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRuleRequestSaga, fetchRuleSaga } from "../fetchRule";
import { fetchRule } from "../../routines";
import { API_RULE } from "../../api";

describe("sagas: fetchRuleRequestSaga", () => {
  it("should invoke fetchRuleSaga on trigger", () => {
    expect(() => {
      testSaga(fetchRuleRequestSaga)
        .next()
        .takeLatestEffect(fetchRule.TRIGGER, fetchRuleSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchRuleRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchRuleSaga);
    }).toThrow();
  });
});

describe("sagas: fetchRuleSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_RULE)({ id });
  const payload = { id };
  const data = { id: 1, name: "Rule 1", description: "desc1" };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchRuleSaga, { payload })
        .next()
        .put(fetchRule.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchRule.success(data))
        .next()
        .put(fetchRule.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchRuleSaga, { payload })
        .next()
        .put(fetchRule.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchRule.failure(message))
        .next()
        .put(fetchRule.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
