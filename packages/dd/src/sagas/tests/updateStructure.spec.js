import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonPatch, JSON_OPTS } from "@truedat/core/services/api";
import {
  updateStructureRequestSaga,
  updateStructureSaga
} from "../updateStructure";
import { updateStructure } from "../../routines";
import { API_DATA_STRUCTURE } from "../../api";

describe("sagas: updateStructureRequestSaga", () => {
  it("should invoke updateStructureSaga on trigger", () => {
    expect(() => {
      testSaga(updateStructureRequestSaga)
        .next()
        .takeLatestEffect(updateStructure.TRIGGER, updateStructureSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(updateStructureRequestSaga)
        .next()
        .takeLatestEffect("FOO", updateStructureSaga);
    }).toThrow();
  });
});

describe("sagas: updateStructureSaga", () => {
  const id = 1;
  const description = "A new description";
  const lopd = "2";
  const ou = "Domain 1";
  const url = pathToRegexp.compile(API_DATA_STRUCTURE)({ id });
  const data_structure = { id, description, lopd, ou };
  const payload = { data_structure };
  const requestData = { data_structure: { description, lopd, ou } };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(updateStructureSaga, { payload })
        .next()
        .put(updateStructure.request())
        .next()
        .call(apiJsonPatch, url, requestData, JSON_OPTS)
        .next({ data: payload })
        .put(updateStructure.success({ data_structure }))
        .next()
        .put(updateStructure.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(updateStructureSaga, { payload })
        .next()
        .put(updateStructure.request())
        .next()
        .call(apiJsonPatch, url, requestData, JSON_OPTS)
        .throw(error)
        .put(updateStructure.failure(message))
        .next()
        .put(updateStructure.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
