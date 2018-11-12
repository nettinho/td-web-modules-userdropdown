import { structure } from "..";
import { fetchStructure } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structure", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(structure(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchStructure.TRIGGER action", () => {
    expect(structure(fooState, { type: fetchStructure.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchStructure.SUCCESS action", () => {
    const someStructure = {
      id: 1,
      name: "Structure 1",
      description: "Desc 1",
      system: "sys1",
      type: "table",
      group: "kong"
    };
    const data = someStructure;

    expect(
      structure(fooState, { type: fetchStructure.SUCCESS, payload: { data } })
    ).toMatchObject(someStructure);
  });

  it("should ignore unknown actions", () => {
    expect(structure(fooState, { type: "FOO" })).toBe(fooState);
  });
});
