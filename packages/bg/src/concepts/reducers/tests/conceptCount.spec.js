import { conceptCount } from "..";
import { clearConcepts, fetchConcepts } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: conceptCount", () => {
  const initialState = 0;

  it("should provide the initial state", () => {
    expect(conceptCount(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearConcepts.TRIGGER action", () => {
    expect(conceptCount(fooState, { type: clearConcepts.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConcepts.SUCCESS action", () => {
    const count = 123;
    const headers = { "x-total-count": `${count}` };
    expect(
      conceptCount(fooState, {
        type: fetchConcepts.SUCCESS,
        payload: { headers }
      })
    ).toEqual(count);
  });

  it("should ignore unknown actions", () => {
    expect(conceptCount(fooState, { type: "FOO" })).toBe(fooState);
  });
});
