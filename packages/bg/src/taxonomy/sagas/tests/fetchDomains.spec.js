import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import { fetchDomainsRequestSaga, fetchDomainsSaga } from "../fetchDomains";
import { fetchDomains } from "../../routines";
import { API_DOMAINS } from "../../api";

describe("sagas: fetchDomainsRequestSaga", () => {
  it("should invoke fetchDomainsSaga on trigger", () => {
    expect(() => {
      testSaga(fetchDomainsRequestSaga)
        .next()
        .takeLatestEffect(fetchDomains.TRIGGER, fetchDomainsSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchDomainsRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchDomainsSaga);
    }).toThrow();
  });
});

describe("sagas: fetchDomainsSaga", () => {
  const data = {
    collection: [
      { id: 1, name: "Top domain", description: "Desc" },
      { id: 2, name: "Child domain", description: "Desc2", parent_id: 2 }
    ]
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchDomainsSaga, {})
        .next()
        .put(fetchDomains.request())
        .next()
        .call(apiJson, API_DOMAINS, JSON_OPTS)
        .next({ data })
        .put(fetchDomains.success(data))
        .next()
        .put(fetchDomains.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should handle actions in the payload", () => {
    const actions = "show";
    const payload = { actions };
    const json_opts = { params: { actions }, ...JSON_OPTS };
    expect(() => {
      testSaga(fetchDomainsSaga, { payload })
        .next()
        .put(fetchDomains.request(payload))
        .next()
        .call(apiJson, API_DOMAINS, json_opts)
        .next({ data })
        .put(fetchDomains.success(data))
        .next()
        .put(fetchDomains.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call throws an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchDomainsSaga, {})
        .next()
        .put(fetchDomains.request())
        .next()
        .call(apiJson, API_DOMAINS, JSON_OPTS)
        .throw(error)
        .put(fetchDomains.failure(message))
        .next()
        .put(fetchDomains.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
