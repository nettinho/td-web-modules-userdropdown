import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonPatch, JSON_OPTS } from "@truedat/core/services/api";
import {
  updateStructureFieldRequestSaga,
  updateStructureFieldSaga
} from "../updateStructureField";
import { updateStructureField } from "../../routines";
import { API_DATA_FIELD } from "../../api";

describe("sagas: updateStructureFieldRequestSaga", () => {
  it("should invoke updateStructureFieldSaga on trigger", () => {
    expect(() => {
      testSaga(updateStructureFieldRequestSaga)
        .next()
        .takeLatestEffect(
          updateStructureField.TRIGGER,
          updateStructureFieldSaga
        )
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(updateStructureFieldRequestSaga)
        .next()
        .takeLatestEffect("FOO", updateStructureFieldSaga);
    }).toThrow();
  });
});

describe("sagas: updateStructureFieldSaga", () => {
  const id = 1;
  const description = "A new description";
  const url = pathToRegexp.compile(API_DATA_FIELD)({ id });
  const data_field = { id, description };
  const payload = { data_field };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(updateStructureFieldSaga, { payload })
        .next()
        .put(updateStructureField.request())
        .next()
        .call(apiJsonPatch, url, payload, JSON_OPTS)
        .next({ data: payload })
        .put(updateStructureField.success({ data_field }))
        .next()
        .put(updateStructureField.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(updateStructureFieldSaga, { payload })
        .next()
        .put(updateStructureField.request())
        .next()
        .call(apiJsonPatch, url, payload, JSON_OPTS)
        .throw(error)
        .put(updateStructureField.failure(message))
        .next()
        .put(updateStructureField.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
