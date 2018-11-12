import { domainsFilter } from "..";
import { filterDomains } from "../../routines";

const fooState = { foo: "bar" };

describe("reducers: domainsFilter", () => {
  it("should provide the initial state", () => {
    expect(domainsFilter(undefined, {})).toBe("");
  });

  it("should contain the filter query after receiving the filterDomains.TRIGGER action", () => {
    const query = "My Filter Text";
    expect(
      domainsFilter(fooState, {
        type: filterDomains.TRIGGER,
        payload: { query }
      })
    ).toBe(query);
  });
});
