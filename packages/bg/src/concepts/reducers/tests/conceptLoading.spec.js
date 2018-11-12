import { conceptLoading } from "..";
import { fetchConcept } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptLoading", () => {
  it("should provide the initial state", () => {
    expect(conceptLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchConcept.TRIGGER action", () => {
    expect(conceptLoading(fooState, { type: fetchConcept.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the fetchConcept.FULFILL action", () => {
    expect(conceptLoading(fooState, { type: fetchConcept.FULFILL })).toBe(
      false
    );
  });

  it("should ignore unhandled actions", () => {
    expect(conceptLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
