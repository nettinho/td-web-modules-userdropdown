import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDomainSaga, fetchDomainRequestSaga } from "../fetchDomain";
import { fetchDomain } from "../../routines";
import { API_DOMAIN } from "../../api";

describe("sagas: fetchDomainRequestSaga", () => {
  it("should invoke fetchDomainSaga on trigger", () => {
    expect(() => {
      testSaga(fetchDomainRequestSaga)
        .next()
        .takeLatestEffect(fetchDomain.TRIGGER, fetchDomainSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchDomainRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchDomainSaga);
    }).toThrow();
  });
});

describe("sagas: fetchDomainSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_DOMAIN)({ id });
  const payload = { id };

  it("should put a success action when a response is returned", () => {
    const data = { id, name: "Top domain", description: "Desc" };

    expect(() => {
      testSaga(fetchDomainSaga, { payload })
        .next()
        .put(fetchDomain.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchDomain.success(data))
        .next()
        .put(fetchDomain.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchDomainSaga, { payload })
        .next()
        .put(fetchDomain.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchDomain.failure(message))
        .next()
        .put(fetchDomain.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
