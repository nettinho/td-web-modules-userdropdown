import { domainTemplates } from "..";
import { clearDomainTemplates, fetchDomainTemplates } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainTemplates", () => {
  const initialState = [];

  it("should provide the initial state", () => {
    expect(domainTemplates(undefined, {})).toEqual(initialState);
  });

  it("should handle the clearConcept.TRIGGER action", () => {
    expect(
      domainTemplates(fooState, { type: clearDomainTemplates.TRIGGER })
    ).toEqual(initialState);
  });

  it("should handle the fetchDomainTemplates.TRIGGER action", () => {
    expect(
      domainTemplates(fooState, { type: fetchDomainTemplates.TRIGGER })
    ).toEqual(initialState);
  });

  it("should handle the fetchDomainTemplates.SUCCESS action", () => {
    const data = { id: 1, name: "Concept 1" };
    expect(
      domainTemplates(fooState, {
        type: fetchDomainTemplates.SUCCESS,
        payload: { data }
      })
    ).toEqual(data);
  });

  it("should ignore unknown actions", () => {
    expect(domainTemplates(fooState, { type: "FOO" })).toBe(fooState);
  });
});
