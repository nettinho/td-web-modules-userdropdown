import { users, usersLoading } from "..";
import { fetchUsers } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: usersLoading", () => {
  it("should provide the initial state", () => {
    expect(usersLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the TRIGGER action", () => {
    expect(usersLoading(false, { type: fetchUsers.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the FULFILL action", () => {
    expect(usersLoading(true, { type: fetchUsers.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(usersLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});

describe("reducers: users", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(users(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const someUsers = [
      { id: 1, user_name: "Domain 1", full_name: "Desc 1" },
      { id: 2, user_name: "Domain 2", full_name: "Desc 2" }
    ];

    const data = someUsers;

    expect(
      users(fooState, {
        type: fetchUsers.SUCCESS,
        payload: { data }
      })
    ).toMatchObject(data);
  });

  it("should ignore unknown actions", () => {
    expect(users(fooState, { type: "FOO" })).toBe(fooState);
  });
});
