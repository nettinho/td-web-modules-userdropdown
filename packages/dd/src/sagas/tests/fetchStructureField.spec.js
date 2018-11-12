import pathToRegexp from "path-to-regexp";
import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  fetchStructureFieldRequestSaga,
  fetchStructureFieldSaga
} from "../fetchStructureField";
import { fetchStructureField } from "../../routines";
import { API_DATA_FIELD } from "../../api";

describe("sagas: fetchStructureFieldRequestSaga", () => {
  it("should invoke fetchStructureFieldSaga on trigger", () => {
    expect(() => {
      testSaga(fetchStructureFieldRequestSaga)
        .next()
        .takeLatestEffect(fetchStructureField.TRIGGER, fetchStructureFieldSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchStructureFieldRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchStructureFieldSaga);
    }).toThrow();
  });
});

describe("sagas: fetchStructureFieldSaga", () => {
  const id = 1;
  const url = pathToRegexp.compile(API_DATA_FIELD)({ id });
  const payload = { id };
  const data = { id: 1, name: "StructureField 1", description: "desc1" };

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchStructureFieldSaga, { payload })
        .next()
        .put(fetchStructureField.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchStructureField.success(data))
        .next()
        .put(fetchStructureField.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchStructureFieldSaga, { payload })
        .next()
        .put(fetchStructureField.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchStructureField.failure(message))
        .next()
        .put(fetchStructureField.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
