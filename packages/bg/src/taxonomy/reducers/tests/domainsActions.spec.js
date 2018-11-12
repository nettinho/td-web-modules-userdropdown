import { domainsActions } from "..";
import { fetchDomains } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainsActions", () => {
  it("should provide the initial state", () => {
    expect(domainsActions(undefined, {})).toEqual({});
  });

  it("should be an empty object after receiving the fetchDomains.TRIGGER action", () => {
    expect(domainsActions(fooState, { type: fetchDomains.TRIGGER })).toEqual(
      {}
    );
  });

  it("should extract _actions from the fetchDomains.SUCCESS action", () => {
    const _actions = { delete: { foo: "bar" } };
    const payload = { _actions };
    expect(
      domainsActions(fooState, { type: fetchDomains.SUCCESS, payload })
    ).toMatchObject(_actions);
  });

  it("should be an empty object after receiving the fetchDomains.SUCCESS action without _actions", () => {
    const data = [{ id: 1 }];
    const payload = { data };
    expect(
      domainsActions(fooState, { type: fetchDomains.SUCCESS, payload })
    ).toEqual({});
  });

  it("should ignore unhandled actions", () => {
    expect(domainsActions(fooState, { type: "FOO" })).toBe(fooState);
  });
});
