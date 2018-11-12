import { structures } from "..";
import { fetchStructures } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structures", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(structures(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const someStructures = [
      { id: 1, name: "Structures 1", description: "Desc 1" },
      { id: 2, name: "Structures 2", description: "Desc 2" }
    ];

    const headers = { "x-total-count": "123" };
    const data = { data: someStructures };

    expect(
      structures(fooState, {
        type: fetchStructures.SUCCESS,
        payload: { data, headers }
      })
    ).toMatchObject(someStructures);
  });

  it("should ignore unknown actions", () => {
    expect(structures(fooState, { type: "FOO" })).toBe(fooState);
  });
});
