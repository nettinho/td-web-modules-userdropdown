import { roles, rolesLoading } from "..";
import { fetchRoles } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: rolesLoading", () => {
  it("should provide the initial state", () => {
    expect(rolesLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the TRIGGER action", () => {
    expect(rolesLoading(false, { type: fetchRoles.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the FULFILL action", () => {
    expect(rolesLoading(true, { type: fetchRoles.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(rolesLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: roles", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(roles(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const someRoles = [{ id: 1, name: "Role 1" }, { id: 2, name: "Role 2" }];

    expect(
      roles(fooState, {
        type: fetchRoles.SUCCESS,
        payload: { data: someRoles }
      })
    ).toMatchObject(someRoles);
  });

  it("should ignore unknown actions", () => {
    expect(roles(fooState, { type: "FOO" })).toBe(fooState);
  });
});
