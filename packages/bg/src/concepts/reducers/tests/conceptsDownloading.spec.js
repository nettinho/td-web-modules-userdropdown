import { conceptsDownloading } from "..";
import { downloadConcepts } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptsDownloading", () => {
  it("should provide the initial state", () => {
    expect(conceptsDownloading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the downloadConcepts.TRIGGER action", () => {
    expect(
      conceptsDownloading(fooState, { type: downloadConcepts.TRIGGER })
    ).toBe(true);
  });

  it("should be false after receiving the downloadConcepts.FULFILL action", () => {
    expect(
      conceptsDownloading(fooState, { type: downloadConcepts.FULFILL })
    ).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(conceptsDownloading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
