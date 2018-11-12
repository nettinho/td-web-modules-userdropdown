import { rule } from "..";
import { fetchRule } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: rule", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(rule(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchRule.TRIGGER action", () => {
    expect(rule(fooState, { type: fetchRule.TRIGGER })).toEqual(initialState);
  });

  it("should handle the fetchRule.SUCCESS action", () => {
    const someRule = {
      id: 123,
      current_business_concept_version: { name: "alfalfa", id: 1234 },
      name: "rule1",
      description: "desc1",
      goal: 10,
      minimum: 1,
      principle: { name: "principle1" },
      rule_type_id: 1234,
      rule_type: {},
      type_params: {},
      active: false
    };
    const payload = { data: someRule };

    expect(
      rule(fooState, {
        type: fetchRule.SUCCESS,
        payload
      })
    ).toMatchObject(someRule);
  });

  it("should ignore unknown actions", () => {
    expect(rule(fooState, { type: "FOO" })).toBe(fooState);
  });
});
