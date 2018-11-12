import { getDescendents } from "..";

describe("selectors: getDescendents", () => {
  const d1 = { id: 1, name: "Domain 1" };
  const d2 = { id: 2, parent_id: 1, name: "Domain 1/2" };
  const d3 = { id: 3, parent_id: 1, name: "Domain 1/3" };
  const d4 = { id: 4, parent_id: 2, name: "Domain 1/2/4" };
  const d5 = { id: 5, name: "Domain 5" };
  const d6 = { id: 6, parent_id: 5, name: "Domain 5/6" };
  const d7 = { id: 7, parent_id: 6, name: "Domain 5/6/7" };
  const d8 = { id: 8, parent_id: 4, name: "Domain 1/2/4/8" };

  const domains = [d1, d2, d3, d4, d5, d6, d7, d8];

  it("should return all domains if no domain is selected", () => {
    const res = getDescendents({ domains });
    expect(res).toHaveLength(8);
  });

  it("should return all descendents of a selected domain", () => {
    const res = getDescendents({ domains, domain: d1 });
    expect(res).toHaveLength(4);
    expect(res).toEqual(expect.arrayContaining([d2, d3, d4, d8]));
  });

  it("should return all descendents of another selected domain", () => {
    const res = getDescendents({ domains, domain: d5 });
    expect(res).toHaveLength(2);
    expect(res).toEqual(expect.arrayContaining([d6, d7]));
  });

  it("should return an empty list if the selected domain has no descendents", () => {
    const res = getDescendents({ domains, domain: d8 });
    expect(res).toHaveLength(0);
  });
});
