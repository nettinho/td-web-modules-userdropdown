import React from "react";
import { shallow } from "enzyme";
import { UserCard } from "../UserCard";

describe("<UserCard />", () => {
  const deleteUser = jest.fn();
  const user = {
    id: 1,
    user_name: "joe",
    is_admin: true,
    full_name: "Joe Bloggs",
    email: "joe@bloggs.net"
  };
  const props = { user, deleteUser };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<UserCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
