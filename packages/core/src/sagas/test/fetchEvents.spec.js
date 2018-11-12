import { testSaga } from "redux-saga-test-plan";
import { apiJson, JSON_OPTS } from "../../services/api";
import { fetchEventsRequestSaga, fetchEventsSaga } from "../fetchEvents";
import { fetchEvents } from "../../routines";
import { API_SHOW_EVENTS } from "../../api";

describe("sagas: fetchEventsRequestSaga", () => {
  it("should invoke fetchEventsRequestSaga on trigger", () => {
    expect(() => {
      testSaga(fetchEventsRequestSaga)
        .next()
        .takeLatestEffect(fetchEvents.TRIGGER, fetchEventsSaga)
        .finish()
        .isDone();
    }).not.toThrow();
  });

  it("should throw exception if an unhandled action is received", () => {
    expect(() => {
      testSaga(fetchEventsRequestSaga)
        .next()
        .takeLatestEffect("FOO", fetchEventsSaga);
    }).toThrow();
  });
});

describe("sagas: fetchEventsSaga", () => {
  const id = 1;
  const url = API_SHOW_EVENTS;
  const payload = { resource_id: id, resource_type: "data_structure" };
  const data = [
    { id: 1, service: "My invented service 1", resource_id: id },
    { id: 2, service: "My invented service 2", resource_id: id }
  ];

  it("should put a success action when a response is returned", () => {
    expect(() => {
      testSaga(fetchEventsSaga, payload)
        .next()
        .put(fetchEvents.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .next({ data })
        .put(fetchEvents.success(data))
        .next()
        .put(fetchEvents.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });

  it("should put a failure action when the call returns an error", () => {
    const message = "Request failed";
    const error = { message };
    const payload = { resource_id: id };

    expect(() => {
      testSaga(fetchEventsSaga, payload)
        .next()
        .put(fetchEvents.request())
        .next()
        .call(apiJson, url, JSON_OPTS)
        .throw(error)
        .put(fetchEvents.failure(message))
        .next()
        .put(fetchEvents.fulfill())
        .next()
        .isDone();
    }).not.toThrow();
  });
});
