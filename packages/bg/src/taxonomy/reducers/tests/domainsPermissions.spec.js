import { domainsPermissions } from "..";
import { optionsDomains } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainsPermissions", () => {
  const initialState = {};

  it("should provide the initial state", () => {
    expect(domainsPermissions(undefined, {})).toEqual(initialState);
  });

  it("should be true after receiving the domainsPermissions.SUCCESS action", () => {
    const headers = { allow: "POST, GET" };
    const response = { list: true };
    expect(
      domainsPermissions(fooState, {
        type: optionsDomains.SUCCESS,
        payload: { headers }
      })
    ).toMatchObject(response);
  });

  it("should ignore unhandled actions", () => {
    expect(domainsPermissions(fooState, { type: "FOO" })).toBe(fooState);
  });
});
