import { conceptRules } from "..";
import { fetchConceptRules } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptRules", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(conceptRules(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchConceptRules.TRIGGER action", () => {
    expect(conceptRules(fooState, { type: fetchConceptRules.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConceptRules.SUCCESS action", () => {
    const data = [{ id: 1, name: "Concept Rule 1", status: "implemented" }];
    expect(
      conceptRules(fooState, {
        type: fetchConceptRules.SUCCESS,
        payload: { data }
      })
    ).toEqual(data);
  });

  it("should ignore unknown actions", () => {
    expect(conceptRules(fooState, { type: "FOO" })).toBe(fooState);
  });
});
