import { domainMembers } from "..";
import { fetchDomainMembers } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainMembers", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(domainMembers(undefined, {})).toEqual(initialState);
  });

  it("should handle the SUCCESS action", () => {
    const data = [
      { id: 1, name: "Name 1", user_name: "user1" },
      { id: 2, name: "Name 2", user_name: "user2" }
    ];

    expect(
      domainMembers(fooState, {
        type: fetchDomainMembers.SUCCESS,
        payload: { data }
      })
    ).toMatchObject(data);
  });

  it("should ignore unknown actions", () => {
    expect(domainMembers(fooState, { type: "FOO" })).toBe(fooState);
  });
});
