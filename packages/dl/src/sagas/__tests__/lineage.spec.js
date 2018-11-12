import { testSaga } from "redux-saga-test-plan";
import { getElementsById, lineageRequestSaga } from "..";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import {
  REQUEST_ELEMENTS_BY_LEVEL,
  REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
  REQUEST_ELEMENTS_BY_LEVEL_FAILED
} from "../../constants";
import { API_LINEAGE_GROUPS } from "../../api";

describe("sagas: lineage request", () => {
  it("should success handling lineageRequestSaga", () => {
    expect(() => {
      testSaga(lineageRequestSaga)
        .next()
        .takeLatestEffect(REQUEST_ELEMENTS_BY_LEVEL, getElementsById)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should fail handling lineageRequestSaga if wrong pattern", () => {
    expect(() => {
      testSaga(lineageRequestSaga)
        .next()
        .takeLatestEffect("WTF_PATTERN", getElementsById);
    }).toThrow();
  });
});

describe("sagas: fetch lineage", () => {
  const data = {
    data: [
      {
        id: "ID1",
        key: "1",
        value: "ID1",
        label: "ElementTitle",
        disabled: false
      }
    ]
  };

  const uuidElement = 1;
  const currentLevel = 1;

  let url = uuidElement
    ? API_LINEAGE_GROUPS + `/${uuidElement}/index_contains`
    : API_LINEAGE_GROUPS + "/index_top";

  it("should handle getElementsById when a response is returned", () => {
    expect(() => {
      testSaga(getElementsById, { uuidElement, currentLevel })
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put({
          type: REQUEST_ELEMENTS_BY_LEVEL_RECEIVED,
          uuidElement,
          currentLevel,
          data
        })
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should handle getElementsById when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };
    expect(() => {
      testSaga(getElementsById, { uuidElement, currentLevel })
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put({ type: REQUEST_ELEMENTS_BY_LEVEL_FAILED, message })
        .next()
        .isDone();
    }).not.toThrow();
  });
});
