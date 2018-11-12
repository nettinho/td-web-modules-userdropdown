import { domainLoading } from "..";
import { fetchDomain } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainLoading", () => {
  it("should provide the initial state", () => {
    expect(domainLoading(undefined, {})).toBe(false);
  });

  it("should be true after receiving the fetchDomain.TRIGGER action", () => {
    expect(domainLoading(fooState, { type: fetchDomain.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the fetchDomain.FULFILL action", () => {
    expect(domainLoading(fooState, { type: fetchDomain.FULFILL })).toBe(false);
  });

  it("should ignore unhandled actions", () => {
    expect(domainLoading(fooState, { type: "FOO" })).toBe(fooState);
  });
});
