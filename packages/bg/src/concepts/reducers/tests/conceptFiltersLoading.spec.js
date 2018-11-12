import { conceptFiltersLoading } from "..";
import { fetchConceptFilters } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptFiltersLoading", () => {
  const initialState = false;

  it("should provide the initial state", () => {
    expect(conceptFiltersLoading(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchConceptFilters.REQUEST action", () => {
    expect(
      conceptFiltersLoading(fooState, { type: fetchConceptFilters.REQUEST })
    ).toEqual(true);
  });

  it("should handle the fetchConceptFilters.FULFILL action", () => {
    expect(
      conceptFiltersLoading(fooState, { type: fetchConceptFilters.FULFILL })
    ).toEqual(false);
  });

  it("should ignore unknown actions", () => {
    expect(conceptFiltersLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
