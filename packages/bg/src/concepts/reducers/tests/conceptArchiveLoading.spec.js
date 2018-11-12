import { conceptArchiveLoading } from "..";
import { fetchConceptArchive } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptArchiveLoading", () => {
  it("should provide the initial state", () => {
    expect(conceptArchiveLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchConcept.TRIGGER action", () => {
    expect(
      conceptArchiveLoading(fooState, { type: fetchConceptArchive.TRIGGER })
    ).toBe(true);
  });

  it("should be false after receiving the fetchConcept.FULFILL action", () => {
    expect(
      conceptArchiveLoading(fooState, { type: fetchConceptArchive.FULFILL })
    ).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(conceptArchiveLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
