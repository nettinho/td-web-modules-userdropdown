import React from "react";
import { shallow } from "enzyme";
import { UserCards } from "../UserCards";

describe("<UserCards />", () => {
  const deleteUser = jest.fn();
  const users = [{ id: 1 }, { id: 2 }];
  const props = { users, deleteUser };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<UserCards {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
