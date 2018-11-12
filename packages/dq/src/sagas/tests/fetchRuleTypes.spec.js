import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  fetchRuleTypesRequestSaga,
  fetchRuleTypesSaga
} from "../fetchRuleTypes";
import { fetchRuleTypes } from "../../routines";
import { API_RULE_TYPES } from "../../api";

describe("sagas: fetchRuleTypesRequestSaga", () => {
  it("should invoke fetchRuleTypesSaga on trigger", () => {
    expect(() => {
      testSaga(fetchRuleTypesRequestSaga)
        .next()
        .takeLatestEffect(fetchRuleTypes.TRIGGER, fetchRuleTypesSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchRuleTypesRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchRuleTypesSaga);
    }).toThrow();
  });
});

describe("sagas: fetchRuleTypesSaga", () => {
  const data = {
    collection: [
      { id: 1, name: "RuleType 1", description: "desc1" },
      { id: 2, name: "RuleType 2", description: "desc2" }
    ]
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchRuleTypesSaga)
        .next()
        .put(fetchRuleTypes.request())
        .next()
        .call(apiJson, API_RULE_TYPES, JSON_OPTS)
        .next({ data })
        .put(fetchRuleTypes.success(data))
        .next()
        .put(fetchRuleTypes.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchRuleTypesSaga)
        .next()
        .put(fetchRuleTypes.request())
        .next()
        .call(apiJson, API_RULE_TYPES, JSON_OPTS)
        .throw(error)
        .put(fetchRuleTypes.failure(message))
        .next()
        .put(fetchRuleTypes.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
