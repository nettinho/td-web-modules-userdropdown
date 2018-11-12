import { domainMembersActions } from "..";
import { fetchDomain, fetchDomainMembers, clearDomain } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainsMembersActions", () => {
  it("should provide the initial state", () => {
    expect(domainMembersActions(undefined, {})).toEqual({});
  });

  it("should be an empty object after receiving the fetchDomain.TRIGGER action", () => {
    expect(
      domainMembersActions(fooState, { type: fetchDomain.TRIGGER })
    ).toEqual({});
  });

  it("should be an empty object after receiving the clearDomain.TRIGGER action", () => {
    expect(
      domainMembersActions(fooState, { type: clearDomain.TRIGGER })
    ).toEqual({});
  });

  it("should extract _actions from the fetchDomainMembers.SUCCESS action", () => {
    const _actions = { delete: { foo: "bar" } };
    const payload = { _actions };
    expect(
      domainMembersActions(fooState, {
        type: fetchDomainMembers.SUCCESS,
        payload
      })
    ).toMatchObject(_actions);
  });

  it("should ignore unhandled actions", () => {
    expect(domainMembersActions(fooState, { type: "FOO" })).toBe(fooState);
  });
});
