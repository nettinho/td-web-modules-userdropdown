import { structureLoading } from "..";
import { fetchStructure } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structureLoading", () => {
  it("should provide the initial state", () => {
    expect(structureLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchStructure.TRIGGER action", () => {
    expect(structureLoading(false, { type: fetchStructure.TRIGGER })).toBe(
      true
    );
  });

  it("should be false after receiving the fetchStructure.FULFILL action", () => {
    expect(structureLoading(true, { type: fetchStructure.FULFILL })).toBe(
      false
    );
  });

  it("should ignore unhandled actions", () => {
    expect(structureLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
