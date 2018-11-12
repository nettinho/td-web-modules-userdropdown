import _ from "lodash/fp";
import { testSaga } from "redux-saga-test-plan";
import { apiJsonPost, JSON_OPTS } from "@truedat/core/services/api";
import { fetchPathsRequestSaga, fetchPathsSaga } from "../fetchPaths";
import { fetchPaths } from "../../routines";
import { API_PATHS } from "../../api";

describe("sagas: fetchPathsRequestSaga", () => {
  it("should invoke fetchPathsSaga on trigger", () => {
    expect(() => {
      testSaga(fetchPathsRequestSaga)
        .next()
        .takeLatestEffect(fetchPaths.TRIGGER, fetchPathsSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchPathsRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchPathsSaga);
    }).toThrow();
  });
});

describe("sagas: fetchPathsSaga", () => {
  const uuids = "1,2";
  const type_analysis = "lineage";
  const payload = { uuids, type_analysis };

  const data = {
    collection: [{ id: 1, name: "Path 1" }, { id: 2, name: "Path 2" }]
  };

  const body = {
    uuids: _.split(",")(uuids),
    toplevel: "lineage-load",
    levels: -1,
    type_analysis
  };

  it("should put a success action when uuids are requested and a response is returned", () => {
    expect(() => {
      testSaga(fetchPathsSaga, { payload })
        .next()
        .put(fetchPaths.request())
        .next()
        .call(apiJsonPost, API_PATHS, body, JSON_OPTS)
        .next({ data })
        .put(fetchPaths.success(data))
        .next()
        .put(fetchPaths.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a success action when titles are requested and a response is returned", () => {
    const titles = "title1,title2";
    const payload = { titles, type_analysis };
    const body = {
      titles: _.split(",")(titles),
      toplevel: "lineage-load",
      levels: -1,
      type_analysis
    };

    expect(() => {
      testSaga(fetchPathsSaga, { payload })
        .next()
        .put(fetchPaths.request())
        .next()
        .call(apiJsonPost, API_PATHS, body, JSON_OPTS)
        .next({ data })
        .put(fetchPaths.success(data))
        .next()
        .put(fetchPaths.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };

    expect(() => {
      testSaga(fetchPathsSaga, { payload })
        .next()
        .put(fetchPaths.request())
        .next()
        .call(apiJsonPost, API_PATHS, body, JSON_OPTS)
        .throw(error)
        .put(fetchPaths.failure(message))
        .next()
        .put(fetchPaths.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
