import { structureField } from "..";
import { fetchStructureField } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: structureField", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(structureField(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchStructureField.TRIGGER action", () => {
    expect(
      structureField(fooState, { type: fetchStructureField.TRIGGER })
    ).toEqual(initialState);
  });

  it("should handle the fetchStructureField.SUCCESS action", () => {
    const someStructureField = {
      id: 1,
      name: "StructureField 1",
      description: "Desc 1",
      type: "Type 1",
      nullable: true,
      precision: "Precision 1"
    };
    const data = someStructureField;

    expect(
      structureField(fooState, {
        type: fetchStructureField.SUCCESS,
        payload: { data }
      })
    ).toMatchObject(someStructureField);
  });

  it("should ignore unknown actions", () => {
    expect(structureField(fooState, { type: "FOO" })).toBe(fooState);
  });
});
