import { testSaga } from "redux-saga-test-plan";
import { apiJsonOptions, JSON_OPTS } from "@truedat/core/services/api";
import {
  optionsDomainsSaga,
  optionsDomainsRequestSaga
} from "../optionsDomains";
import { optionsDomains } from "../../routines";
import { API_DOMAINS } from "../../api";

describe("sagas: optionsDomainsRequestSaga", () => {
  it("should invoke optionsDomainsSaga on trigger", () => {
    expect(() => {
      testSaga(optionsDomainsRequestSaga)
        .next()
        .takeLatestEffect(optionsDomains.TRIGGER, optionsDomainsSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(optionsDomainsRequestSaga)
        .next()
        .takeLatestEffect("FOO", optionsDomainsSaga);
    }).toThrow();
  });
});

describe("sagas: optionsDomainsSaga", () => {
  const url = API_DOMAINS;

  it("should put a success action when a response is returned", () => {
    const data = { data: "foo", headers: { allow: "GET" } };
    expect(() => {
      testSaga(optionsDomainsSaga)
        .next()
        .put(optionsDomains.request())
        .next()
        .call(apiJsonOptions, url, JSON_OPTS)
        .next(data)
        .put(optionsDomains.success(data))
        .next()
        .put(optionsDomains.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(optionsDomainsSaga)
        .next()
        .put(optionsDomains.request())
        .next()
        .call(apiJsonOptions, url, JSON_OPTS)
        .throw(error)
        .put(optionsDomains.failure(message))
        .next()
        .put(optionsDomains.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
