import { conceptActions } from "..";
import { clearConcept, fetchConcept } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptActions", () => {
  const initialState = {};
  const _actions = {
    action1: { href: "/api/action1", method: "POST" },
    action2: { href: "/api/action2", method: "GET" }
  };

  it("should provide the initial state", () => {
    expect(conceptActions(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearConcept.TRIGGER action", () => {
    expect(conceptActions(fooState, { type: clearConcept.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConcept.TRIGGER action", () => {
    expect(conceptActions(fooState, { type: fetchConcept.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConcept.SUCCESS action", () => {
    expect(
      conceptActions(fooState, {
        type: fetchConcept.SUCCESS,
        payload: { _actions }
      })
    ).toEqual(_actions);
  });

  it("should ignore unknown actions", () => {
    expect(conceptActions(fooState, { type: "FOO" })).toBe(fooState);
  });
});
