import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  fetchStructureFiltersRequestSaga,
  fetchStructureFiltersSaga
} from "../fetchStructureFilters";
import { fetchStructureFilters } from "../../routines";
import { API_DATA_STRUCTURE_FILTERS } from "../../api";

describe("sagas: fetchStructureFiltersRequestSaga", () => {
  it("should invoke fetchStructureFiltersSaga on trigger", () => {
    expect(() => {
      testSaga(fetchStructureFiltersRequestSaga)
        .next()
        .takeLatestEffect(
          fetchStructureFilters.TRIGGER,
          fetchStructureFiltersSaga
        )
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchStructureFiltersRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchStructureFiltersSaga);
    }).toThrow();
  });
});

describe("sagas: fetchStructureFiltersSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_DATA_STRUCTURE_FILTERS)({ id });
  const data = { system: ["SAP, SAS"], name: ["KNA1", "KNB1"] };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchStructureFiltersSaga)
        .next()
        .put(fetchStructureFilters.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchStructureFilters.success(data))
        .next()
        .put(fetchStructureFilters.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchStructureFiltersSaga)
        .next()
        .put(fetchStructureFilters.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchStructureFilters.failure(message))
        .next()
        .put(fetchStructureFilters.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
