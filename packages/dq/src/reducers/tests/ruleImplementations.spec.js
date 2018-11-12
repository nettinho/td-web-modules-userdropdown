import { ruleImplementations } from "..";
import { fetchRuleImplementations } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: ruleImplementations", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(ruleImplementations(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const someRuleImplementations = [
      {
        id: 1,
        implementation_key: "RuleImplementations 1",
        description: "Desc 1"
      },
      {
        id: 2,
        implementation_key: "RuleImplementations 2",
        description: "Desc 2"
      }
    ];

    const payload = { data: someRuleImplementations };

    expect(
      ruleImplementations(fooState, {
        type: fetchRuleImplementations.SUCCESS,
        payload
      })
    ).toMatchObject(someRuleImplementations);
  });

  it("should ignore unknown actions", () => {
    expect(ruleImplementations(fooState, { type: "FOO" })).toBe(fooState);
  });
});
