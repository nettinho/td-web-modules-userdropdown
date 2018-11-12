import { ruleLoading } from "..";
import { fetchRule } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: ruleLoading", () => {
  it("should provide the initial state", () => {
    expect(ruleLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchRule.TRIGGER action", () => {
    expect(ruleLoading(false, { type: fetchRule.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the fetchRule.FULFILL action", () => {
    expect(ruleLoading(true, { type: fetchRule.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(ruleLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
