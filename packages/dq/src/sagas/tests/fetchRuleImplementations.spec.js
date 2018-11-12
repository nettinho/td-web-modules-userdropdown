import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  fetchRuleImplementationsRequestSaga,
  fetchRuleImplementationsSaga
} from "../fetchRuleImplementations";
import { fetchRuleImplementations } from "../../routines";
import { API_RULE_IMPLEMENTATIONS_FROM_RULE } from "../../api";

describe("sagas: fetchRuleImplementationsRequestSaga", () => {
  it("should invoke fetchRuleImplementationsSaga on trigger", () => {
    expect(() => {
      testSaga(fetchRuleImplementationsRequestSaga)
        .next()
        .takeLatestEffect(
          fetchRuleImplementations.TRIGGER,
          fetchRuleImplementationsSaga
        )
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchRuleImplementationsRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchRuleImplementationsSaga);
    }).toThrow();
  });
});

describe("sagas: fetchRuleImplementationsSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_RULE_IMPLEMENTATIONS_FROM_RULE)({ id });
  const payload = { id };
  const data = {
    collection: [
      { id: 1, name: "Structure 1", description: "desc1" },
      { id: 2, name: "Structure 2", description: "desc2" }
    ]
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchRuleImplementationsSaga, { payload })
        .next()
        .put(fetchRuleImplementations.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchRuleImplementations.success(data))
        .next()
        .put(fetchRuleImplementations.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchRuleImplementationsSaga, { payload })
        .next()
        .put(fetchRuleImplementations.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchRuleImplementations.failure(message))
        .next()
        .put(fetchRuleImplementations.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
