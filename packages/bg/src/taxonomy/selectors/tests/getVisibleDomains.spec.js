import { getVisibleDomains } from "..";

describe("selectors: getVisibleDomains", () => {
  const parent = { id: 1, name: "parent" };
  const child1 = { id: 2, parent_id: 1, name: "Child 1" };
  const child2 = { id: 3, parent_id: 2, name: "Child 2" };
  const child3 = { id: 4, parent_id: 1, name: "Child 3" };
  const child4 = { id: 5, parent_id: 3, name: "Child 4" };
  const domains = [parent, child1, child2, child3, child4];
  const domainsFilter = "Child 1";

  it("should return child domains if a domain is selected and there is no search filter", () => {
    const visibleDomains = getVisibleDomains({
      domains,
      domain: parent,
      domainsFilter: ""
    });
    expect(visibleDomains).toMatchObject([child1, child3]);
    expect(visibleDomains).not.toMatchObject([child2]);
  });

  it("should return top level domains if no domain is selected and there is no search filter", () => {
    const visibleDomains = getVisibleDomains({
      domains,
      domain: {},
      domainsFilter: ""
    });
    expect(visibleDomains).toMatchObject([parent]);
    expect(visibleDomains).not.toMatchObject([child1]);
    expect(visibleDomains).not.toMatchObject([child2]);
    expect(visibleDomains).not.toMatchObject([child3]);
  });

  it("should return all the domains with name Child 1 if no domain is selected and there search filter is Child 1", () => {
    const visibleDomains = getVisibleDomains({
      domains,
      domain: {},
      domainsFilter
    });
    expect(visibleDomains).toMatchObject([child1]);
    expect(visibleDomains).not.toMatchObject([parent]);
    expect(visibleDomains).not.toMatchObject([child2]);
    expect(visibleDomains).not.toMatchObject([child3]);
    expect(visibleDomains).not.toMatchObject([child4]);
  });

  const domainsFilterChild2 = "Child";
  it("should return all the domains with name Child if a domain is selected and there search filter is Child", () => {
    const visibleDomains = getVisibleDomains({
      domains,
      domain: child1,
      domainsFilter: domainsFilterChild2
    });
    expect(visibleDomains).toMatchObject([child2, child4]);
    expect(visibleDomains).not.toMatchObject([parent]);
    expect(visibleDomains).not.toMatchObject([child3]);
    expect(visibleDomains).not.toMatchObject([child1]);
  });

  it("should handle edge case (empty state)", () => {
    const visibleDomains = getVisibleDomains({ domains: [] });
    expect(visibleDomains).toHaveLength(0);
  });
});
