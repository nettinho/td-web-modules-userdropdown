import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchRulesRequestSaga, fetchRulesSaga } from "../fetchRules";
import { fetchRules } from "../../routines";
import { API_RULES } from "../../api";

describe("sagas: fetchRulesRequestSaga", () => {
  it("should invoke fetchRulesSaga on trigger", () => {
    expect(() => {
      testSaga(fetchRulesRequestSaga)
        .next()
        .takeLatestEffect(fetchRules.TRIGGER, fetchRulesSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchRulesRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchRulesSaga);
    }).toThrow();
  });
});

describe("sagas: fetchRulesSaga", () => {
  const data = {
    collection: [
      { id: 1, name: "Rule 1", description: "desc1" },
      { id: 2, name: "Rule 2", description: "desc2" }
    ]
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchRulesSaga)
        .next()
        .put(fetchRules.request())
        .next()
        .call(apiJson, API_RULES, JSON_OPTS)
        .next({ data })
        .put(fetchRules.success(data))
        .next()
        .put(fetchRules.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchRulesSaga)
        .next()
        .put(fetchRules.request())
        .next()
        .call(apiJson, API_RULES, JSON_OPTS)
        .throw(error)
        .put(fetchRules.failure(message))
        .next()
        .put(fetchRules.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
