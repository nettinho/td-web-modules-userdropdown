import React from "react";
import { shallow } from "enzyme";
import { GroupCard } from "../GroupCard";

describe("<GroupCard />", () => {
  const deleteGroup = jest.fn();
  const group = {
    id: 1,
    name: "administrators",
    description: "Administrators"
  };
  const props = { group, deleteGroup };

  it("matches the latest snapshot", () => {
    const wrapper = shallow(<GroupCard {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
