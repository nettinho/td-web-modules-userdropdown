import { domainMembersLoading } from "..";
import { fetchDomainMembers } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainMembersLoading", () => {
  it("should provide the initial state", () => {
    expect(domainMembersLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchDomainMembers.TRIGGER action", () => {
    expect(
      domainMembersLoading(false, { type: fetchDomainMembers.TRIGGER })
    ).toBe(true);
  });

  it("should be false after receiving the fetchDomainMembers.FULFILL action", () => {
    expect(
      domainMembersLoading(true, { type: fetchDomainMembers.FULFILL })
    ).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(domainMembersLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
