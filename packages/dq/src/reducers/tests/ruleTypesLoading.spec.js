import { ruleTypesLoading } from "..";
import { fetchRuleTypes } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: ruleTypesLoading", () => {
  it("should provide the initial state", () => {
    expect(ruleTypesLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchRuleTypes.TRIGGER action", () => {
    expect(ruleTypesLoading(false, { type: fetchRuleTypes.TRIGGER })).toBe(
      true
    );
  });

  it("should be false after receiving the fetchRuleTypes.FULFILL action", () => {
    expect(ruleTypesLoading(true, { type: fetchRuleTypes.FULFILL })).toBe(
      false
    );
  });

  it("should ignore unhandled actions", () => {
    expect(ruleTypesLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
