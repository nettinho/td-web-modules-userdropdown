import { getFilteredDomains } from "..";

describe("selectors: getFilteredDomains", () => {
  const d1 = { name: "x", description: "a foo thing" };
  const d2 = { name: "xx", description: "a bar thing" };
  const d3 = { name: " xxx", description: "says ÑÍ" };
  const d4 = { name: "xXxX ", description: "SÄŸs BöO" };
  const d5 = { name: "XXXXX", description: "FöÖ bçar" };
  const d6 = { name: "NODESC" };
  const d7 = { description: "NONAME" };
  const d8 = {};

  const domains = [d1, d2, d3, d4, d5, d6, d7, d8];

  it("should return an empty array if no filter is specified", () => {
    const res = getFilteredDomains({ domains });
    expect(res).toHaveLength(0);
  });

  it("should return an empty array if the filter is invalid", () => {
    const res = getFilteredDomains({ domains, domainsFilter: "    " });
    expect(res).toHaveLength(0);
  });

  it("should return all domains whose name or description matches the filter", () => {
    const res = getFilteredDomains({ domains, domainsFilter: "x" });
    expect(res).toHaveLength(5);
  });

  it("should trim and lowercase the filter and searchable properties", () => {
    const res = getFilteredDomains({ domains, domainsFilter: "   X    " });
    expect(res).toHaveLength(5);
  });

  it("should deburr the filter and searchable properties", () => {
    const res1 = getFilteredDomains({ domains, domainsFilter: "FöÓ" });
    expect(res1).toHaveLength(2);
    const res2 = getFilteredDomains({ domains, domainsFilter: "ThÏñG" });
    expect(res2).toHaveLength(2);
    const res3 = getFilteredDomains({ domains, domainsFilter: "CäR" });
    expect(res3).toHaveLength(1);
    const res4 = getFilteredDomains({ domains, domainsFilter: "   nO    " });
    expect(res4).toHaveLength(2);
  });
});
