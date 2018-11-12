import { ruleCreating } from "..";
import { createRule } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: ruleCreating", () => {
  it("should provide the initial state", () => {
    expect(ruleCreating(undefined, {})).toBe(false);
  });

  it("should be true after receiving the createRule.TRIGGER action", () => {
    expect(ruleCreating(false, { type: createRule.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the createRule.FULFILL action", () => {
    expect(ruleCreating(true, { type: createRule.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(ruleCreating(fooState, { type: "FOO" })).toBe(fooState);
  });
});
