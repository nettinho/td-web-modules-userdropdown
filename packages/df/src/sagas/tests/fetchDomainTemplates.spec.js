import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "@truedat/core/services/api";
import pathToRegexp from "path-to-regexp";
import {
  fetchDomainTemplatesRequestSaga,
  fetchDomainTemplatesSaga
} from "../fetchDomainTemplates";
import { fetchDomainTemplates } from "../../routines";
import { API_DOMAIN_TEMPLATES } from "../../api";

describe("sagas: fetchDomainTemplatesRequestSaga", () => {
  it("should invoke fetchDomainTemplatesSaga on fetchDomainTemplates.TRIGGER", () => {
    expect(() => {
      testSaga(fetchDomainTemplatesRequestSaga)
        .next()
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchDomainTemplatesRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchDomainTemplatesRequestSaga);
    }).toThrow();
  });
});

describe("sagas: fetchDomainTemplatesSaga", () => {
  const domain_id = 0;
  const url = pathToRegexp.compile(API_DOMAIN_TEMPLATES)({ id: domain_id });
  const json_opts = { ...JSON_OPTS, params: { preprocess: true } };

  it("should fetch domain templates", () => {
    expect(() => {
      testSaga(fetchDomainTemplatesSaga, { payload: { domain_id } })
        .next()
        .put(fetchDomainTemplates.request())
        .next()
        .call(apiJson, url, json_opts)
        .next({ data: [] })
        .put(fetchDomainTemplates.success([]))
        .next()
        .put(fetchDomainTemplates.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should catch response error", () => {
    const response = { status: 400, data: "error" };
    const error = { response };
    expect(() => {
      testSaga(fetchDomainTemplatesSaga, { payload: { domain_id } })
        .next()
        .put(fetchDomainTemplates.request())
        .next()
        .call(apiJson, url, json_opts)
        .throw(error)
        .put(fetchDomainTemplates.failure(response))
        .next()
        .put(fetchDomainTemplates.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should catch message error", () => {
    const message = "error";
    const error = { message };
    expect(() => {
      testSaga(fetchDomainTemplatesSaga, { payload: { domain_id } })
        .next()
        .put(fetchDomainTemplates.request())
        .next()
        .call(apiJson, url, json_opts)
        .throw(error)
        .put(fetchDomainTemplates.failure(message))
        .next()
        .put(fetchDomainTemplates.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
