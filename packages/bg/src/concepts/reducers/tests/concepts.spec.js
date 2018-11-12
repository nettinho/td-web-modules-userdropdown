import { concepts } from "..";
import { clearConcepts, fetchConcepts } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: concept", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(concepts(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearConcepts.TRIGGER action", () => {
    expect(concepts(fooState, { type: clearConcepts.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConcepts.FAILURE action", () => {
    expect(concepts(fooState, { type: fetchConcepts.FAILURE })).toEqual(
      initialState
    );
  });

  it("should handle the fetchConcepts.SUCCESS action", () => {
    const collection = [{ id: 1, name: "Concept 1", business_concept_id: 4 }];
    const data = { data: collection };
    const headers = { "x-total-count": "123" };
    expect(
      concepts(fooState, {
        type: fetchConcepts.SUCCESS,
        payload: { data, headers }
      })
    ).toEqual(collection);
  });

  it("should ignore unknown actions", () => {
    expect(concepts(fooState, { type: "FOO" })).toBe(fooState);
  });
});
