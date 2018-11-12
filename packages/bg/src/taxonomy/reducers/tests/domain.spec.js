import { domain } from "..";
import { clearDomain, fetchDomain, updateDomain } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domain", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(domain(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearDomain.TRIGGER action", () => {
    expect(domain(fooState, { type: clearDomain.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchDomain.TRIGGER action", () => {
    expect(domain(fooState, { type: fetchDomain.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the fetchDomain.SUCCESS action", () => {
    const data = { id: 1, name: "Domain 1" };
    expect(
      domain(fooState, {
        type: fetchDomain.SUCCESS,
        payload: { data }
      })
    ).toEqual(data);
  });

  it("should handle the updateDomain.SUCCESS action", () => {
    const domain1 = { id: 1, name: "Domain 1" };
    expect(
      domain(fooState, {
        type: updateDomain.SUCCESS,
        payload: { data: domain1 }
      })
    ).toEqual(domain1);
  });

  it("should ignore unknown actions", () => {
    expect(domain(fooState, { type: "FOO" })).toBe(fooState);
  });
});
