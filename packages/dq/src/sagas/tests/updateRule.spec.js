import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonPut, JSON_OPTS } from "@truedat/core/services/api";
import { updateRuleRequestSaga, updateRuleSaga } from "../updateRule";
import { updateRule } from "../../routines";
import { API_RULE } from "../../api";

describe("sagas: updateRuleRequestSaga", () => {
  it("should invoke updateRuleSaga on trigger", () => {
    expect(() => {
      testSaga(updateRuleRequestSaga)
        .next()
        .takeLatestEffect(updateRule.TRIGGER, updateRuleSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(updateRuleRequestSaga)
        .next()
        .takeLatestEffect("FOO", updateRuleSaga);
    }).toThrow();
  });
});

describe("sagas: updateRuleSaga", () => {
  const id = 124;
  const description = "A new description";
  const url = pathToRegexp.compile(API_RULE)({ id });
  const rule = { id, description };
  const ids = { id };
  const payload = { rule, ids };
  const requestData = { rule };
  const meta = { redirectUrl: "/rules/124" };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(updateRuleSaga, { payload })
        .next()
        .put({ meta, ...updateRule.request() })
        .next()
        .call(apiJsonPut, url, requestData, JSON_OPTS)
        .next({ data: payload })
        .put({ meta, ...updateRule.success({ rule, ids }) })
        .next()
        .put(updateRule.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(updateRuleSaga, { payload })
        .next()
        .put({ meta, ...updateRule.request() })
        .next()
        .call(apiJsonPut, url, requestData, JSON_OPTS)
        .throw(error)
        .put(updateRule.failure(message))
        .next()
        .put(updateRule.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
