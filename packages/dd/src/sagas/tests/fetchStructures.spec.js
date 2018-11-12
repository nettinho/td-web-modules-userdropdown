import { delay } from "redux-saga";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import {
  fetchStructuresRequestSaga,
  fetchStructuresSaga
} from "../fetchStructures";
import { fetchStructures, selectStructurePage } from "../../routines";
import { API_DATA_STRUCTURES_SEARCH } from "../../api";
import { getStructureQuery } from "../../selectors";
import { takeLatest } from "redux-saga/effects";

describe("sagas: fetchStructuresRequestSaga", () => {
  it("should invoke fetchStructuresSaga on trigger", () => {
    expect(() => {
      testSaga(fetchStructuresRequestSaga)
        .next()
        .all([
          takeLatest(fetchStructures.TRIGGER, fetchStructuresSaga),
          takeLatest(selectStructurePage.TRIGGER, fetchStructuresSaga)
        ])
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchStructuresRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchStructuresSaga);
    }).toThrow();
  });
});

describe("sagas: fetchStructuresSaga", () => {
  const structureQuery = {};
  const data = {
    collection: [
      { id: 1, name: "Structure 1", description: "desc1" },
      { id: 2, name: "Structure 2", description: "desc2" }
    ]
  };
  const headers = {
    "x-total-count": "123"
  };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchStructuresSaga)
        .next()
        .call(delay, 200)
        .next()
        .select(getStructureQuery)
        .next(structureQuery)
        .put(fetchStructures.request(structureQuery))
        .next()
        .call(
          apiJsonPost,
          API_DATA_STRUCTURES_SEARCH,
          structureQuery,
          JSON_OPTS
        )
        .next({ data, headers })
        .put(fetchStructures.success({ data, headers }))
        .next()
        .put(fetchStructures.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchStructuresSaga)
        .next()
        .call(delay, 200)
        .next()
        .select(getStructureQuery)
        .next(structureQuery)
        .put(fetchStructures.request(structureQuery))
        .next()
        .call(
          apiJsonPost,
          API_DATA_STRUCTURES_SEARCH,
          structureQuery,
          JSON_OPTS
        )
        .throw(error)
        .put(fetchStructures.failure(message))
        .next()
        .put(fetchStructures.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
