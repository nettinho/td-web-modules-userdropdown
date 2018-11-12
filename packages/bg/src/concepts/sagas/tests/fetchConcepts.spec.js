import { delay } from "redux-saga";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { fetchConceptsRequestSaga, fetchConceptsSaga } from "../fetchConcepts";
import { fetchConcepts, selectConceptPage } from "../../routines";
import { API_BUSINESS_CONCEPT_VERSIONS_SEARCH } from "../../api";
import { getConceptQuery } from "../../selectors";
import { takeLatest } from "redux-saga/effects";

describe("sagas: fetchConceptsRequestSaga", () => {
  it("should invoke fetchConceptsSaga on fetchConcepts.TRIGGER", () => {
    expect(() => {
      testSaga(fetchConceptsRequestSaga)
        .next()
        .all([
          takeLatest(fetchConcepts.TRIGGER, fetchConceptsSaga),
          takeLatest(selectConceptPage.TRIGGER, fetchConceptsSaga)
        ])
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchConceptsRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchConceptsRequestSaga);
    }).toThrow();
  });
});

describe("sagas: fetchConceptsSaga", () => {
  const conceptQuery = { filters: {} };
  const data = {
    collection: [
      { id: 1, name: "Concept 1", description: "desc1" },
      { id: 2, name: "Concept 2", description: "desc2" }
    ]
  };
  const headers = {
    "x-total-count": "123"
  };

  it("should pass the query parameter to the API with 200ms delay", () => {
    expect(() => {
      testSaga(fetchConceptsSaga)
        .next()
        .call(delay, 200)
        .next()
        .select(getConceptQuery)
        .next(conceptQuery)
        .put(fetchConcepts.request(conceptQuery))
        .next()
        .call(
          apiJsonPost,
          API_BUSINESS_CONCEPT_VERSIONS_SEARCH,
          conceptQuery,
          JSON_OPTS
        )
        .next({ data, headers })
        .put(fetchConcepts.success({ data, headers }))
        .next()
        .put(fetchConcepts.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchConceptsSaga)
        .next()
        .call(delay, 200)
        .next()
        .select(getConceptQuery)
        .next(conceptQuery)
        .put(fetchConcepts.request(conceptQuery))
        .next()
        .call(
          apiJsonPost,
          API_BUSINESS_CONCEPT_VERSIONS_SEARCH,
          conceptQuery,
          JSON_OPTS
        )
        .throw(error)
        .put(fetchConcepts.failure(message))
        .next()
        .put(fetchConcepts.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
