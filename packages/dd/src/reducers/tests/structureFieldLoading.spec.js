import { structureFieldLoading } from "..";
import { fetchStructureField } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structureFieldLoading", () => {
  it("should provide the initial state", () => {
    expect(structureFieldLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchStructureField.TRIGGER action", () => {
    expect(
      structureFieldLoading(false, { type: fetchStructureField.TRIGGER })
    ).toBe(true);
  });

  it("should be false after receiving the fetchStructureField.FULFILL action", () => {
    expect(
      structureFieldLoading(true, { type: fetchStructureField.FULFILL })
    ).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(structureFieldLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
