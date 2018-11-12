import { events } from "..";
import { clearEvents, fetchEvents } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: events", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(events(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const someEvents = [
      { id: 1, service: "My invented service 1", resource_id: 2 },
      { id: 2, service: "My invented service 2", resource_id: 2 }
    ];

    const data = someEvents;

    expect(
      events(fooState, { type: fetchEvents.SUCCESS, payload: { data } })
    ).toMatchObject(someEvents);
  });

  it("should handle the CLEAR events", () => {
    const someEvents = [
      { id: 1, service: "My invented service 1", resource_id: 2 },
      { id: 2, service: "My invented service 2", resource_id: 2 }
    ];

    expect(events(someEvents, { type: clearEvents.TRIGGER })).toMatchObject([]);
  });

  it("should ignore unknown actions", () => {
    expect(events(fooState, { type: "FOO" })).toBe(fooState);
  });
});
