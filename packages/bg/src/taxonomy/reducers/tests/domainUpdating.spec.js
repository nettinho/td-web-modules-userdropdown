import { domainUpdating } from "..";
import { updateDomain } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainUpdating", () => {
  it("should provide the initial state", () => {
    expect(domainUpdating(undefined, {})).toBe(false);
  });

  it("should be true after receiving the updateDomain.TRIGGER action", () => {
    expect(domainUpdating(fooState, { type: updateDomain.TRIGGER })).toBe(true);
  });

  it("should be false after receiving the updateDomain.FULFILL action", () => {
    expect(domainUpdating(fooState, { type: updateDomain.FULFILL })).toBe(
      false
    );
  });

  it("should ignore unhandled actions", () => {
    expect(domainUpdating(fooState, { type: "FOO" })).toBe(fooState);
  });
});
