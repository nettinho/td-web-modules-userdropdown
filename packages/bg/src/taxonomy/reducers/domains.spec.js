import { fetchDomains } from "../routines";
import { domains } from ".";

const fooState = { foo: "bar" };

describe("reducers: domains", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(domains(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const data = [
      { id: 1, name: "Domain 1", description: "Desc 1" },
      { id: 2, name: "Domain 2", description: "Desc 2", parent_id: 1 }
    ];

    expect(
      domains(fooState, {
        type: fetchDomains.SUCCESS,
        payload: { data }
      })
    ).toMatchObject(data);
  });

  it("should ignore unknown actions", () => {
    expect(domains(fooState, { type: "FOO" })).toBe(fooState);
  });
});
