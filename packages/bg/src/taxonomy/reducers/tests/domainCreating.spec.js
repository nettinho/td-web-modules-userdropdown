import { domainCreating } from "..";
import { createDomain } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainCreating", () => {
  it("should provide the initial state", () => {
    expect(domainCreating(undefined, {})).toBe(false);
  });

  it("should be true after receiving the createDomain.TRIGGER action", () => {
    expect(domainCreating(fooState, { type: createDomain.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the createDomain.FULFILL action", () => {
    expect(domainCreating(fooState, { type: createDomain.FULFILL })).toBe(
      false
    );
  });

  it("should ignore unhandled actions", () => {
    expect(domainCreating(fooState, { type: "FOO" })).toBe(fooState);
  });
});
