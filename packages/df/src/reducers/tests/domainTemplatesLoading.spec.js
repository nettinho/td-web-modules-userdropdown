import { domainTemplatesLoading } from "..";
import { fetchDomainTemplates } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainTemplates", () => {
  const initialState = false;

  it("should provide the initial state", () => {
    expect(domainTemplatesLoading(undefined, {})).toEqual(initialState);
  });

  it("should handle the fetchDomainTemplates.TRIGGER action", () => {
    expect(
      domainTemplatesLoading(fooState, { type: fetchDomainTemplates.TRIGGER })
    ).toEqual(true);
  });

  it("should handle the fetchDomainTemplates.FULFILL action", () => {
    expect(
      domainTemplatesLoading(fooState, { type: fetchDomainTemplates.FULFILL })
    ).toEqual(false);
  });

  it("should ignore unknown actions", () => {
    expect(domainTemplatesLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
