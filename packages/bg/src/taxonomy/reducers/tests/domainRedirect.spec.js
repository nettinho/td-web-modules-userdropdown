import { clearRedirect } from "@truedat/core/routines";
import { createDomain, updateDomain, addDomainMember } from "../../routines";
import { domainRedirect } from "..";

describe("reducers: domainRedirect", () => {
  const id = 10;
  const resource_id = 20;
  const payload = { data: { id, resource_id } };
  const initialState = "";

  it("should provide the initial state", () => {
    expect(domainRedirect(undefined, {})).toEqual("");
  });

  it("should handle the clearRedirect.TRIGGER action", () => {
    expect(domainRedirect("foo", { type: clearRedirect.TRIGGER })).toEqual(
      initialState
    );
  });

  it("should handle the createDomain.SUCCESS action", () => {
    expect(
      domainRedirect("foo", { type: createDomain.SUCCESS, payload })
    ).toEqual("/domains/10");
  });

  it("should handle the updateDomain.SUCCESS action", () => {
    expect(
      domainRedirect("foo", { type: updateDomain.SUCCESS, payload })
    ).toEqual("/domains/10");
  });

  it("should handle the addDomainMember.SUCCESS action", () => {
    expect(
      domainRedirect("foo", { type: addDomainMember.SUCCESS, payload })
    ).toEqual("/domains/20/members");
  });

  it("should ignore unknown actions", () => {
    expect(domainRedirect("foo", { type: "bar", payload })).toEqual("foo");
  });
});
