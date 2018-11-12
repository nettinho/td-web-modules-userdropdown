import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  fetchStructureRequestSaga,
  fetchStructureSaga
} from "../fetchStructure";
import { fetchStructure } from "../../routines";
import { API_DATA_STRUCTURE } from "../../api";

describe("sagas: fetchStructureRequestSaga", () => {
  it("should invoke fetchStructureSaga on trigger", () => {
    expect(() => {
      testSaga(fetchStructureRequestSaga)
        .next()
        .takeLatestEffect(fetchStructure.TRIGGER, fetchStructureSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchStructureRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchStructureSaga);
    }).toThrow();
  });
});

describe("sagas: fetchStructureSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_DATA_STRUCTURE)({ id });
  const payload = { id };
  const data = { id: 1, name: "Structure 1", description: "desc1" };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchStructureSaga, { payload })
        .next()
        .put(fetchStructure.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchStructure.success(data))
        .next()
        .put(fetchStructure.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchStructureSaga, { payload })
        .next()
        .put(fetchStructure.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchStructure.failure(message))
        .next()
        .put(fetchStructure.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
