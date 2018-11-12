import React from "react";
import { shallow } from "enzyme";
import { User } from "../User";

describe("<User />", () => {
  const user = {
    id: 1,
    user_name: "joe",
    is_admin: true,
    full_name: "Joe Bloggs",
    email: "joe@bloggs.net"
  };
  const props = { user };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<User {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
