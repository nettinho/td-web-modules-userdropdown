import React from "react";
import { shallow } from "enzyme";
import { UserAcls } from "../UserAcls";

describe("<UserAcls />", () => {
  const acl1 = {
    resource: { id: 1, name: "resource1", type: "domain" },
    role: { id: 2, name: "role1" }
  };

  const acl2 = {
    resource: { id: 2, name: "resource2", type: "domain" },
    role: { id: 3, name: "role2" }
  };

  const acls = [acl1, acl2];

  const props = { acls };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<UserAcls {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
