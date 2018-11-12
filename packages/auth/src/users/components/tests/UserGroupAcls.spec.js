import React from "react";
import { shallow } from "enzyme";
import { UserGroupAcls } from "../UserGroupAcls";

describe("<UserGroupAcls />", () => {
  const acl1 = {
    resource: { id: 1, name: "resource1", type: "domain" },
    role: { id: 2, name: "role1" },
    group: { id: 6, name: "group1" }
  };

  const acl2 = {
    resource: { id: 2, name: "resource2", type: "domain" },
    role: { id: 3, name: "role2" },
    group: { id: 3, name: "group2" }
  };

  const acls = [acl1, acl2];

  const props = { acls };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<UserGroupAcls {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
