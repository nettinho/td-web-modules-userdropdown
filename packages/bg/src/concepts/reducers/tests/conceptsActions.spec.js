import { conceptsActions } from "..";
import { fetchConcepts } from "../../routines";

const fooState = { foo: "bar" };
const payload = {};

describe("reducers: conceptsActions", () => {
  it("should provide the initial state", () => {
    expect(conceptsActions(undefined, {})).toEqual({});
  });

  it("should be an empty object after receiving the fetchConcepts.REQUEST action", () => {
    expect(
      conceptsActions(fooState, { type: fetchConcepts.REQUEST, payload })
    ).toEqual({});
  });

  it("should extract _actions from the fetchConcepts.SUCCESS action", () => {
    const _actions = { delete: { foo: "bar" } };
    const data = { _actions };
    const payload = { data };
    expect(
      conceptsActions(fooState, { type: fetchConcepts.SUCCESS, payload })
    ).toMatchObject(_actions);
  });

  it("should be an empty object after receiving the fetchConcepts.SUCCESS action without _actions", () => {
    const data = [{ id: 1 }];
    const payload = { data };
    expect(
      conceptsActions(fooState, { type: fetchConcepts.SUCCESS, payload })
    ).toEqual({});
  });

  it("should ignore unhandled actions", () => {
    expect(conceptsActions(fooState, { type: "FOO" })).toBe(fooState);
  });
});
