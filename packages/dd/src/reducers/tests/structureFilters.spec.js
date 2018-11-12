import { structureFilters } from "..";
import { clearStructureFilters, fetchStructureFilters } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structureFilters", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(structureFilters(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearStructureFilters.TRIGGER action", () => {
    expect(
      structureFilters(fooState, { type: clearStructureFilters.TRIGGER })
    ).toEqual(initialState);
  });

  it("should handle the fetchStructureFilters.REQUEST action", () => {
    expect(
      structureFilters(fooState, { type: fetchStructureFilters.REQUEST })
    ).toEqual(initialState);
  });

  it("should handle the fetchStructureFilters.SUCCESS action", () => {
    const data = { filter1: ["value1", "value2"] };
    expect(
      structureFilters(fooState, {
        type: fetchStructureFilters.SUCCESS,
        payload: { data }
      })
    ).toEqual(data);
  });

  it("should ignore unknown actions", () => {
    expect(structureFilters(fooState, { type: "FOO" })).toBe(fooState);
  });
});
