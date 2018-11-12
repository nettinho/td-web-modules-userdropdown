import { ruleImplementationCreating } from "..";
import { createRuleImplementation } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: ruleImplementationCreating", () => {
  it("should provide the initial state", () => {
    expect(ruleImplementationCreating(undefined, {})).toBe(false);
  });

  it("should be true after receiving the createRuleImplementation.TRIGGER action", () => {
    expect(
      ruleImplementationCreating(false, {
        type: createRuleImplementation.TRIGGER
      })
    ).toBe(true);
  });

  it("should be false after receiving the createRuleImplementation.FULFILL action", () => {
    expect(
      ruleImplementationCreating(true, {
        type: createRuleImplementation.FULFILL
      })
    ).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(ruleImplementationCreating(fooState, { type: "FOO" })).toBe(
      fooState
    );
  });
});
