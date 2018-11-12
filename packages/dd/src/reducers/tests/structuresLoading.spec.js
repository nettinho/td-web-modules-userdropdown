import { structuresLoading } from "..";
import { fetchStructures } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structuresLoading", () => {
  it("should provide the initial state", () => {
    expect(structuresLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchStructures.TRIGGER action", () => {
    expect(structuresLoading(false, { type: fetchStructures.TRIGGER })).toBe(
      true
    );
  });

  it("should be false after receiving the fetchStructures.FULFILL action", () => {
    expect(structuresLoading(true, { type: fetchStructures.FULFILL })).toBe(
      false
    );
  });

  it("should ignore unhandled actions", () => {
    expect(structuresLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
