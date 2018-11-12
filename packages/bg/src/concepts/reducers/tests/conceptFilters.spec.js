import { conceptFilters } from "..";
import { clearConceptFilters, fetchConceptFilters } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptFilters", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(conceptFilters(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearConceptFilters.TRIGGER action", () => {
    expect(
      conceptFilters(fooState, { type: clearConceptFilters.TRIGGER })
    ).toEqual(initialState);
  });

  it("should handle the fetchConceptFilters.REQUEST action", () => {
    expect(
      conceptFilters(fooState, { type: fetchConceptFilters.REQUEST })
    ).toEqual(initialState);
  });

  it("should handle the fetchConceptFilters.SUCCESS action", () => {
    const data = { filter1: ["value1", "value2"] };
    expect(
      conceptFilters(fooState, {
        type: fetchConceptFilters.SUCCESS,
        payload: { data }
      })
    ).toEqual(data);
  });

  it("should ignore unknown actions", () => {
    expect(conceptFilters(fooState, { type: "FOO" })).toBe(fooState);
  });
});
