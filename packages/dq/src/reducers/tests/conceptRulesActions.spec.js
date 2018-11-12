import { conceptRulesActions } from "..";
import { fetchConceptRules } from "../../routines";

const fooState = { foo: "bar" };
const payload = {};

describe("reducers: conceptRulesActions", () => {
  it("should provide the initial state", () => {
    expect(conceptRulesActions(undefined, {})).toEqual({});
  });

  it("should be an empty object after receiving the fetchConceptRules.REQUEST action", () => {
    expect(
      conceptRulesActions(fooState, {
        type: fetchConceptRules.REQUEST,
        payload
      })
    ).toEqual({});
  });

  it("should be an empty object after receiving the fetchConceptRules.REQUEST action", () => {
    expect(
      conceptRulesActions(fooState, {
        type: fetchConceptRules.REQUEST,
        payload
      })
    ).toEqual({});
  });

  it("should extract _actions from the fetchConceptRules.SUCCESS action", () => {
    const _actions = { delete: { foo: "bar" } };
    const payload = { _actions };
    expect(
      conceptRulesActions(fooState, {
        type: fetchConceptRules.SUCCESS,
        payload
      })
    ).toMatchObject(_actions);
  });

  it("should ignore unhandled actions", () => {
    expect(conceptRulesActions(fooState, { type: "FOO" })).toBe(fooState);
  });
});
