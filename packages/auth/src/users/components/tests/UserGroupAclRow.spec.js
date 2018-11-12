import React from "react";
import { shallow } from "enzyme";
import { UserGroupAclRow } from "../UserGroupAclRow";

describe("<UserGroupAclRow />", () => {
  const acl = {
    resource: "resource1",
    role: "role1",
    group: "grupo1"
  };

  const props = { acl };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<UserGroupAclRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
