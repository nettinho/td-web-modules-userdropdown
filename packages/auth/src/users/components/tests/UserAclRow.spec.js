import React from "react";
import { shallow } from "enzyme";
import { UserAclRow } from "../UserAclRow";

describe("<UserAclRow />", () => {
  const acl = {
    resource: "resource1",
    role: "role1"
  };

  const props = { acl };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<UserAclRow {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
