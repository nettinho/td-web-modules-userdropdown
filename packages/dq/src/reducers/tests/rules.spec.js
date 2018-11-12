import { rules } from "..";
import { fetchRules } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: rules", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(rules(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const someRules = [
      { id: 1, name: "Rules 1", description: "Desc 1" },
      { id: 2, name: "Rules 2", description: "Desc 2" }
    ];

    const data = someRules;

    expect(
      rules(fooState, { type: fetchRules.SUCCESS, payload: { data } })
    ).toMatchObject(someRules);
  });

  it("should ignore unknown actions", () => {
    expect(rules(fooState, { type: "FOO" })).toBe(fooState);
  });
});
