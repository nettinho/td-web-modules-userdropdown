import { getUserGroupAcls } from "..";

describe("selectors: getUserGroupAcls", () => {
  const acl1 = {
    resource: { id: 1, name: "resource1", type: "domain" },
    role: { id: 2, name: "role1" }
  };

  const acl2 = {
    resource: { id: 2, name: "resource2", type: "domain" },
    role: { id: 3, name: "role2" }
  };

  const acl3 = {
    resource: { id: 4, name: "resource3", type: "domain" },
    role: { id: 5, name: "role5" },
    group: { id: 6, name: "group5" }
  };

  const acls = [acl1, acl2, acl3];

  const user = { acls: acls };

  it("should return user acls", () => {
    const res = getUserGroupAcls({ user });
    expect(res).toHaveLength(1);
    expect(res).toEqual(
      expect.arrayContaining([
        {
          resource: acl3.resource.name,
          role: acl3.role.name,
          group: acl3.group.name
        }
      ])
    );
  });

  it("should return empty array when we have no acls", () => {
    const res = getUserGroupAcls({ user: { acls: [] } });
    expect(res).toHaveLength(0);
    expect(res).toEqual(expect.arrayContaining([]));
  });
});
