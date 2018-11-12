import { rulesLoading } from "..";
import { fetchRules } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: rulesLoading", () => {
  it("should provide the initial state", () => {
    expect(rulesLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchRules.TRIGGER action", () => {
    expect(rulesLoading(false, { type: fetchRules.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the fetchRules.FULFILL action", () => {
    expect(rulesLoading(true, { type: fetchRules.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(rulesLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
