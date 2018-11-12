import { domainsLoading } from "..";
import { fetchDomains } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainsLoading", () => {
  it("should provide the initial state", () => {
    expect(domainsLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchDomains.TRIGGER action", () => {
    expect(domainsLoading(false, { type: fetchDomains.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the fetchDomains.FULFILL action", () => {
    expect(domainsLoading(true, { type: fetchDomains.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(domainsLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
