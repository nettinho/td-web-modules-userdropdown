import { getDomainTypes } from "..";

describe("selectors: getDomainTypes", () => {
  const d1 = { type: "Type2" };
  const d2 = { type: "Type1" };
  const d3 = { foo: "bar" };
  const domains = [d1, d2, d1, d3, d2, d2, d3];

  it("should return unique domain types", () => {
    const domainTypes = getDomainTypes({ domains });
    expect(domainTypes.length).toBe(2);
    expect(domainTypes).toEqual(["Type1", "Type2"]);
  });
});
