import { concept } from "..";
import { clearConcept, fetchConcept } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: concept", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(concept(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearConcept.TRIGGER action", () => {
    expect(concept(fooState, { type: clearConcept.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConcept.TRIGGER action", () => {
    expect(concept(fooState, { type: fetchConcept.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConcept.SUCCESS action", () => {
    const data = { id: 1, name: "Concept 1" };
    expect(
      concept(fooState, {
        type: fetchConcept.SUCCESS,
        payload: { data }
      })
    ).toEqual(data);
  });

  it("should ignore unknown actions", () => {
    expect(concept(fooState, { type: "FOO" })).toBe(fooState);
  });
});
