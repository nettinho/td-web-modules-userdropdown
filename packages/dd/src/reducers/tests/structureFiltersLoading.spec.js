import { structureFiltersLoading } from "..";
import { fetchStructureFilters } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structureFiltersLoading", () => {
  const initialState = false;

  it("should provide the initial state", () => {
    expect(structureFiltersLoading(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchStructureFilters.REQUEST action", () => {
    expect(
      structureFiltersLoading(fooState, { type: fetchStructureFilters.REQUEST })
    ).toEqual(true);
  });

  it("should handle the fetchStructureFilters.FULFILL action", () => {
    expect(
      structureFiltersLoading(fooState, { type: fetchStructureFilters.FULFILL })
    ).toEqual(false);
  });

  it("should ignore unknown actions", () => {
    expect(structureFiltersLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
