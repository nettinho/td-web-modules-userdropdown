import { ruleUpdating } from "..";
import { updateRule } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: ruleUpdating", () => {
  it("should provide the initial state", () => {
    expect(ruleUpdating(undefined, {})).toBe(false);
  });

  it("should be true after receiving the updateRule.TRIGGER action", () => {
    expect(ruleUpdating(false, { type: updateRule.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the updateRule.FULFILL action", () => {
    expect(ruleUpdating(true, { type: updateRule.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(ruleUpdating(fooState, { type: "FOO" })).toBe(fooState);
  });
});
