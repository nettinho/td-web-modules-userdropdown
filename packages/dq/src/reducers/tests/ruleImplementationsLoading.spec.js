import { ruleImplementationsLoading } from "..";
import { fetchRuleImplementations } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: ruleImplementationsLoading", () => {
  it("should provide the initial state", () => {
    expect(ruleImplementationsLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchRuleImplementations.TRIGGER action", () => {
    expect(
      ruleImplementationsLoading(false, {
        type: fetchRuleImplementations.TRIGGER
      })
    ).toBe(true);
  });

  it("should be false after receiving the fetchRuleImplementations.FULFILL action", () => {
    expect(
      ruleImplementationsLoading(true, {
        type: fetchRuleImplementations.FULFILL
      })
    ).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(ruleImplementationsLoading(fooState, { type: "FOO" })).toBe(
      fooState
    );
  });
});
