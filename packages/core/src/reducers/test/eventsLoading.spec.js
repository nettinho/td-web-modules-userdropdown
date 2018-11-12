import { eventsLoading } from "..";
import { fetchEvents } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: eventsLoading", () => {
  it("should provide the initial state", () => {
    expect(eventsLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchEvents.TRIGGER action", () => {
    expect(eventsLoading(false, { type: fetchEvents.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the fetchEvents.FULFILL action", () => {
    expect(eventsLoading(true, { type: fetchEvents.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(eventsLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
